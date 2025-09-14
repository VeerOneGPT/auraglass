import { io, Socket } from 'socket.io-client';
import { EventEmitter } from 'events';

export interface CursorPosition {
  x: number;
  y: number;
  userId: string;
  userName?: string;
  color?: string;
}

export interface CollaborativeEdit {
  type: 'insert' | 'delete' | 'replace';
  position: number;
  content?: string;
  length?: number;
  userId: string;
  timestamp: number;
  documentId: string;
}

export interface PresenceInfo {
  userId: string;
  userName: string;
  status: 'online' | 'away' | 'busy';
  lastActivity: Date;
  cursor?: CursorPosition;
  selection?: { start: number; end: number };
}

export interface CollaborationRoom {
  roomId: string;
  participants: PresenceInfo[];
  documentState?: any;
  createdAt: Date;
}

export class CollaborationService extends EventEmitter {
  private socket: Socket | null = null;
  private currentRoom: string | null = null;
  private userId: string;
  private userName: string;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private operationQueue: CollaborativeEdit[] = [];
  private isConnected = false;
  private presenceMap = new Map<string, PresenceInfo>();

  constructor(
    private serverUrl: string,
    private authToken?: string
  ) {
    super();
    this.userId = this.generateUserId();
    this.userName = 'User';
  }

  async connect(userName?: string): Promise<void> {
    if (userName) this.userName = userName;

    return new Promise((resolve, reject) => {
      this.socket = io(this.serverUrl, {
        auth: {
          token: this.authToken,
          userId: this.userId,
          userName: this.userName,
        },
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        reconnectionAttempts: this.maxReconnectAttempts,
      });

      this.setupEventHandlers();

      this.socket.on('connect', () => {
        this.isConnected = true;
        this.reconnectAttempts = 0;
        this.flushOperationQueue();
        this.emit('connected');
        resolve();
      });

      this.socket.on('connect_error', (error) => {
        this.reconnectAttempts++;
        if (this.reconnectAttempts >= this.maxReconnectAttempts) {
          reject(new Error(`Failed to connect: ${error.message}`));
        }
      });
    });
  }

  private setupEventHandlers(): void {
    if (!this.socket) return;

    this.socket.on('disconnect', () => {
      this.isConnected = false;
      this.emit('disconnected');
    });

    this.socket.on('cursor-update', (data: CursorPosition) => {
      this.updatePresenceCursor(data);
      this.emit('cursor-moved', data);
    });

    this.socket.on('operation-applied', (operation: CollaborativeEdit) => {
      this.emit('document-changed', operation);
    });

    this.socket.on('presence-update', (presence: PresenceInfo) => {
      this.presenceMap.set(presence.userId, presence);
      this.emit('presence-changed', Array.from(this.presenceMap.values()));
    });

    this.socket.on('user-joined', (user: PresenceInfo) => {
      this.presenceMap.set(user.userId, user);
      this.emit('user-joined', user);
    });

    this.socket.on('user-left', (userId: string) => {
      this.presenceMap.delete(userId);
      this.emit('user-left', userId);
    });

    this.socket.on('room-state', (state: CollaborationRoom) => {
      this.currentRoom = state.roomId;
      state.participants.forEach(p => this.presenceMap.set(p.userId, p));
      this.emit('room-synced', state);
    });

    this.socket.on('conflict-detected', (conflict: any) => {
      this.emit('conflict', conflict);
    });
  }

  async joinRoom(roomId: string): Promise<void> {
    if (!this.socket || !this.isConnected) {
      throw new Error('Not connected to collaboration server');
    }

    return new Promise((resolve, reject) => {
      this.socket!.emit('join-room', roomId, (response: any) => {
        if (response.error) {
          reject(new Error(response.error));
        } else {
          this.currentRoom = roomId;
          resolve();
        }
      });
    });
  }

  async leaveRoom(): Promise<void> {
    if (!this.socket || !this.currentRoom) return;

    return new Promise((resolve) => {
      this.socket!.emit('leave-room', this.currentRoom, () => {
        this.currentRoom = null;
        this.presenceMap.clear();
        resolve();
      });
    });
  }

  sendCursorPosition(x: number, y: number): void {
    if (!this.socket || !this.isConnected || !this.currentRoom) return;

    const cursorData: CursorPosition = {
      x,
      y,
      userId: this.userId,
      userName: this.userName,
      color: this.getUserColor(),
    };

    this.socket.emit('cursor-move', cursorData);
  }

  sendEdit(edit: Omit<CollaborativeEdit, 'userId' | 'timestamp'>): void {
    const fullEdit: CollaborativeEdit = {
      ...edit,
      userId: this.userId,
      timestamp: Date.now(),
    };

    if (!this.socket || !this.isConnected) {
      this.operationQueue.push(fullEdit);
      return;
    }

    this.socket.emit('collaborative-edit', fullEdit);
  }

  updatePresence(status: 'online' | 'away' | 'busy'): void {
    if (!this.socket || !this.isConnected) return;

    const presence: PresenceInfo = {
      userId: this.userId,
      userName: this.userName,
      status,
      lastActivity: new Date(),
    };

    this.socket.emit('update-presence', presence);
  }

  updateSelection(start: number, end: number): void {
    if (!this.socket || !this.isConnected) return;

    this.socket.emit('selection-change', {
      userId: this.userId,
      selection: { start, end },
    });
  }

  async createRoom(initialState?: any): Promise<string> {
    if (!this.socket || !this.isConnected) {
      throw new Error('Not connected to collaboration server');
    }

    return new Promise((resolve, reject) => {
      this.socket!.emit('create-room', { initialState }, (response: any) => {
        if (response.error) {
          reject(new Error(response.error));
        } else {
          resolve(response.roomId);
        }
      });
    });
  }

  getRoomParticipants(): PresenceInfo[] {
    return Array.from(this.presenceMap.values());
  }

  getParticipantCount(): number {
    return this.presenceMap.size;
  }

  private updatePresenceCursor(cursorData: CursorPosition): void {
    const presence = this.presenceMap.get(cursorData.userId);
    if (presence) {
      presence.cursor = cursorData;
      presence.lastActivity = new Date();
      this.presenceMap.set(cursorData.userId, presence);
    }
  }

  private flushOperationQueue(): void {
    if (!this.socket || !this.isConnected) return;

    while (this.operationQueue.length > 0) {
      const operation = this.operationQueue.shift();
      if (operation) {
        this.socket.emit('collaborative-edit', operation);
      }
    }
  }

  private generateUserId(): string {
    return `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  private getUserColor(): string {
    const colors = [
      '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4',
      '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F',
    ];
    const index = parseInt(this.userId.substr(-2), 36) % colors.length;
    return colors[index];
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
      this.currentRoom = null;
      this.presenceMap.clear();
    }
  }

  isConnectedToServer(): boolean {
    return this.isConnected;
  }

  getCurrentRoom(): string | null {
    return this.currentRoom;
  }
}