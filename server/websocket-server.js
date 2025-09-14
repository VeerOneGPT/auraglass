const { Server } = require('socket.io');
const http = require('http');
const Redis = require('ioredis');
const jwt = require('jsonwebtoken');

const PORT = process.env.WS_PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'default-secret-change-in-production';
const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';

// Create HTTP server
const server = http.createServer();

// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// Initialize Redis
const redis = new Redis(REDIS_URL);
const pubClient = redis.duplicate();
const subClient = redis.duplicate();

// Room management
const rooms = new Map();
const userSessions = new Map();

// Authentication middleware
io.use(async (socket, next) => {
  try {
    const token = socket.handshake.auth.token;
    const userId = socket.handshake.auth.userId;
    const userName = socket.handshake.auth.userName || 'Anonymous';

    if (token) {
      // Verify JWT token
      const decoded = jwt.verify(token, JWT_SECRET);
      socket.userId = decoded.userId;
      socket.userName = decoded.userName || userName;
    } else if (userId) {
      // Use provided userId for anonymous users
      socket.userId = userId;
      socket.userName = userName;
    } else {
      throw new Error('No authentication provided');
    }

    next();
  } catch (error) {
    next(new Error('Authentication failed'));
  }
});

// Connection handler
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.userId} (${socket.userName})`);

  // Store user session
  userSessions.set(socket.userId, {
    socketId: socket.id,
    userName: socket.userName,
    connectedAt: new Date(),
  });

  // Join room
  socket.on('join-room', async (roomId, callback) => {
    try {
      // Leave previous room if any
      const currentRoom = Array.from(socket.rooms).find(r => r !== socket.id);
      if (currentRoom) {
        await leaveRoom(socket, currentRoom);
      }

      // Join new room
      socket.join(roomId);

      // Initialize room if it doesn't exist
      if (!rooms.has(roomId)) {
        rooms.set(roomId, {
          participants: new Set(),
          documentState: null,
          createdAt: new Date(),
        });
      }

      const room = rooms.get(roomId);
      room.participants.add(socket.userId);

      // Get room participants
      const participants = Array.from(room.participants).map(userId => {
        const session = userSessions.get(userId);
        return {
          userId,
          userName: session?.userName || 'Unknown',
          status: 'online',
          lastActivity: new Date(),
        };
      });

      // Notify others in room
      socket.to(roomId).emit('user-joined', {
        userId: socket.userId,
        userName: socket.userName,
        status: 'online',
        lastActivity: new Date(),
      });

      // Send room state to the joining user
      socket.emit('room-state', {
        roomId,
        participants,
        documentState: room.documentState,
        createdAt: room.createdAt,
      });

      // Store room state in Redis
      await redis.setex(
        `room:${roomId}`,
        3600,
        JSON.stringify({
          participants: Array.from(room.participants),
          documentState: room.documentState,
        })
      );

      callback({ success: true });
    } catch (error) {
      console.error('Error joining room:', error);
      callback({ error: error.message });
    }
  });

  // Leave room
  socket.on('leave-room', async (roomId, callback) => {
    try {
      await leaveRoom(socket, roomId);
      callback({ success: true });
    } catch (error) {
      callback({ error: error.message });
    }
  });

  // Create room
  socket.on('create-room', async ({ initialState }, callback) => {
    try {
      const roomId = generateRoomId();

      rooms.set(roomId, {
        participants: new Set([socket.userId]),
        documentState: initialState || null,
        createdAt: new Date(),
      });

      socket.join(roomId);

      // Store in Redis
      await redis.setex(
        `room:${roomId}`,
        3600,
        JSON.stringify({
          participants: [socket.userId],
          documentState: initialState,
        })
      );

      callback({ roomId });
    } catch (error) {
      callback({ error: error.message });
    }
  });

  // Cursor movement
  socket.on('cursor-move', (data) => {
    const roomId = Array.from(socket.rooms).find(r => r !== socket.id);
    if (roomId) {
      // Store cursor position in Redis (expires after 30 seconds)
      redis.setex(
        `cursor:${socket.userId}`,
        30,
        JSON.stringify({
          x: data.x,
          y: data.y,
          roomId,
        })
      );

      // Broadcast to others in room
      socket.to(roomId).emit('cursor-update', {
        ...data,
        userId: socket.userId,
        userName: socket.userName,
      });
    }
  });

  // Collaborative editing
  socket.on('collaborative-edit', async (operation) => {
    const roomId = Array.from(socket.rooms).find(r => r !== socket.id);
    if (roomId) {
      try {
        // Apply operational transformation if needed
        const transformedOp = await applyOperationalTransform(operation, roomId);

        // Update document state
        const room = rooms.get(roomId);
        if (room) {
          room.documentState = applyOperation(room.documentState, transformedOp);

          // Store in Redis
          await redis.setex(
            `document:${roomId}`,
            3600,
            JSON.stringify(room.documentState)
          );
        }

        // Broadcast to all users in room (including sender)
        io.to(roomId).emit('operation-applied', transformedOp);
      } catch (error) {
        socket.emit('conflict-detected', {
          operation,
          error: error.message,
        });
      }
    }
  });

  // Selection change
  socket.on('selection-change', (data) => {
    const roomId = Array.from(socket.rooms).find(r => r !== socket.id);
    if (roomId) {
      socket.to(roomId).emit('selection-update', {
        userId: socket.userId,
        selection: data.selection,
      });
    }
  });

  // Presence update
  socket.on('update-presence', (presence) => {
    const roomId = Array.from(socket.rooms).find(r => r !== socket.id);
    if (roomId) {
      socket.to(roomId).emit('presence-update', {
        ...presence,
        userId: socket.userId,
      });
    }
  });

  // Disconnection
  socket.on('disconnect', async () => {
    console.log(`User disconnected: ${socket.userId}`);

    // Get user's room
    const roomId = Array.from(socket.rooms).find(r => r !== socket.id);
    if (roomId) {
      await leaveRoom(socket, roomId);
    }

    // Remove user session
    userSessions.delete(socket.userId);

    // Clear cursor from Redis
    await redis.del(`cursor:${socket.userId}`);
  });
});

// Helper functions
async function leaveRoom(socket, roomId) {
  socket.leave(roomId);

  const room = rooms.get(roomId);
  if (room) {
    room.participants.delete(socket.userId);

    // Notify others
    socket.to(roomId).emit('user-left', socket.userId);

    // Clean up empty rooms
    if (room.participants.size === 0) {
      rooms.delete(roomId);
      await redis.del(`room:${roomId}`);
      await redis.del(`document:${roomId}`);
    } else {
      // Update Redis
      await redis.setex(
        `room:${roomId}`,
        3600,
        JSON.stringify({
          participants: Array.from(room.participants),
          documentState: room.documentState,
        })
      );
    }
  }
}

function generateRoomId() {
  return `room-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

function applyOperation(documentState, operation) {
  // Simplified operation application
  // In production, use a proper OT library like ShareJS or Yjs
  if (!documentState) {
    documentState = { content: '', version: 0 };
  }

  switch (operation.type) {
    case 'insert':
      const before = documentState.content.substring(0, operation.position);
      const after = documentState.content.substring(operation.position);
      documentState.content = before + operation.content + after;
      break;

    case 'delete':
      documentState.content =
        documentState.content.substring(0, operation.position) +
        documentState.content.substring(operation.position + operation.length);
      break;

    case 'replace':
      documentState.content =
        documentState.content.substring(0, operation.position) +
        operation.content +
        documentState.content.substring(operation.position + operation.length);
      break;
  }

  documentState.version++;
  return documentState;
}

async function applyOperationalTransform(operation, roomId) {
  // Simplified OT - in production, use a proper OT algorithm
  // This is a placeholder that just returns the operation as-is
  return operation;
}

// Start server
server.listen(PORT, () => {
  console.log(`WebSocket server running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, closing server...');
  io.close(() => {
    redis.disconnect();
    pubClient.disconnect();
    subClient.disconnect();
    process.exit(0);
  });
});