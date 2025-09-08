'use client';

import { cn } from '@/lib/utils';
import {
    File,
    Hash,
    Image as ImageIcon,
    Mic,
    MicOff,
    MoreVertical,
    Paperclip,
    Phone,
    Search,
    Send,
    Smile,
    Users,
    Video,
    X
} from 'lucide-react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Motion } from '../../primitives/motion/Motion';
import { GlassButton } from '../button';
import { CardContent, CardHeader, CardTitle, GlassCard } from '../card';

export interface ChatMessage {
    id: string;
    content: string;
    sender: {
        id: string;
        name: string;
        avatar?: string;
        status?: 'online' | 'offline' | 'away' | 'busy';
    };
    timestamp: Date;
    type: 'text' | 'image' | 'file' | 'system';
    reactions?: Array<{
        emoji: string;
        count: number;
        users: string[];
    }>;
    replyTo?: string;
    edited?: boolean;
    attachments?: Array<{
        type: 'image' | 'file' | 'video';
        url: string;
        name: string;
        size?: number;
    }>;
}

export interface ChatParticipant {
    id: string;
    name: string;
    avatar?: string;
    status: 'online' | 'offline' | 'away' | 'busy';
    role?: 'admin' | 'moderator' | 'member';
    lastSeen?: Date;
}

export interface GlassChatProps {
    /**
     * Chat messages
     */
    messages: ChatMessage[];
    /**
     * Chat participants
     */
    participants?: ChatParticipant[];
    /**
     * Current user
     */
    currentUser?: {
        id: string;
        name: string;
        avatar?: string;
    };
    /**
     * Chat title
     */
    title?: string;
    /**
     * Chat subtitle/description
     */
    subtitle?: string;
    /**
     * Enable message reactions
     */
    enableReactions?: boolean;
    /**
     * Enable file attachments
     */
    enableAttachments?: boolean;
    /**
     * Enable voice messages
     */
    enableVoice?: boolean;
    /**
     * Enable typing indicators
     */
    enableTyping?: boolean;
    /**
     * Show participant list
     */
    showParticipants?: boolean;
    /**
     * Show message timestamps
     */
    showTimestamps?: boolean;
    /**
     * Show user avatars
     */
    showAvatars?: boolean;
    /**
     * Message send handler
     */
    onSendMessage?: (content: string, attachments?: File[]) => void;
    /**
     * Message reaction handler
     */
    onMessageReaction?: (messageId: string, emoji: string) => void;
    /**
     * Typing handler
     */
    onTyping?: (isTyping: boolean) => void;
    /**
     * Custom className
     */
    className?: string;
}

/**
 * GlassChat component
 * A comprehensive chat interface with messages, participants, and real-time features
 */
export const GlassChat: React.FC<GlassChatProps> = ({
    messages,
    participants = [],
    currentUser,
    title = 'Chat',
    subtitle,
    enableReactions = true,
    enableAttachments = true,
    enableVoice = false,
    enableTyping = true,
    showParticipants = false,
    showTimestamps = true,
    showAvatars = true,
    onSendMessage,
    onMessageReaction,
    onTyping,
    className,
    ...props
}) => {
    const [newMessage, setNewMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [attachments, setAttachments] = useState<File[]>([]);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [isRecording, setIsRecording] = useState(false);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Handle typing indicator
    useEffect(() => {
        if (!enableTyping) return;

        const timeout = setTimeout(() => {
            if (isTyping) {
                setIsTyping(false);
                onTyping?.(false);
            }
        }, 2000);

        return () => clearTimeout(timeout);
    }, [newMessage, isTyping, enableTyping, onTyping]);

    // Handle input change
    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewMessage(e.target.value);

        if (enableTyping && !isTyping && e.target.value.length > 0) {
            setIsTyping(true);
            onTyping?.(true);
        }
    }, [enableTyping, isTyping, onTyping]);

    // Handle send message
    const handleSendMessage = useCallback(() => {
        if (!newMessage.trim() && attachments.length === 0) return;

        onSendMessage?.(newMessage.trim(), attachments);
        setNewMessage('');
        setAttachments([]);
        setIsTyping(false);
        onTyping?.(false);

        // Reset textarea height
        if (inputRef.current) {
            inputRef.current.style.height = 'auto';
        }
    }, [newMessage, attachments, onSendMessage, onTyping]);

    // Handle key press
    const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    }, [handleSendMessage]);

    // Handle file attachment
    const handleFileAttachment = useCallback(() => {
        fileInputRef.current?.click();
    }, []);

    const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        setAttachments(prev => [...prev, ...files]);
        e.target.value = '';
    }, []);

    // Remove attachment
    const removeAttachment = useCallback((index: number) => {
        setAttachments(prev => prev.filter((_, i) => i !== index));
    }, []);

    // Handle voice recording
    const handleVoiceToggle = useCallback(() => {
        setIsRecording(!isRecording);
        // Voice recording logic would go here
    }, [isRecording]);

    // Format timestamp
    const formatTimestamp = useCallback((date: Date) => {
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);

        if (minutes < 1) return 'Just now';
        if (minutes < 60) return `${minutes}m ago`;
        if (hours < 24) return `${hours}h ago`;
        if (days === 1) return 'Yesterday';
        if (days < 7) return `${days}d ago`;
        return date.toLocaleDateString();
    }, []);

    // Group messages by date
    const groupedMessages = messages.reduce((groups, message) => {
        const date = message.timestamp.toDateString();
        if (!groups[date]) {
            groups[date] = [];
        }
        groups[date].push(message);
        return groups;
    }, {} as Record<string, ChatMessage[]>);

    // Auto-resize textarea
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.style.height = 'auto';
            inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 120)}px`;
        }
    }, [newMessage]);

    return (
        <Motion preset="fadeIn" className="w-full h-full">
            <GlassCard className={cn('flex flex-col h-full overflow-hidden', className)} {...props}>
                {/* Header */}
                <CardHeader className="pb-3 border-b border-white/10">
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-white text-lg font-semibold flex items-center gap-2">
                                <Hash className="w-5 h-5" />
                                {title}
                            </CardTitle>
                            {subtitle && (
                                <p className="text-white/60 text-sm mt-1">{subtitle}</p>
                            )}
                        </div>

                        <div className="flex items-center gap-2">
                            <GlassButton variant="ghost" size="sm" className="p-2">
                                <Search className="w-4 h-4" />
                            </GlassButton>

                            <GlassButton variant="ghost" size="sm" className="p-2">
                                <Phone className="w-4 h-4" />
                            </GlassButton>

                            <GlassButton variant="ghost" size="sm" className="p-2">
                                <Video className="w-4 h-4" />
                            </GlassButton>

                            <GlassButton variant="ghost" size="sm" className="p-2">
                                <MoreVertical className="w-4 h-4" />
                            </GlassButton>
                        </div>
                    </div>

                    {/* Participant count */}
                    {participants.length > 0 && (
                        <div className="flex items-center gap-2 mt-2">
                            <Users className="w-4 h-4 text-white/60" />
                            <span className="text-white/60 text-sm">
                                {participants.filter(p => p.status === 'online').length} online • {participants.length} total
                            </span>
                        </div>
                    )}
                </CardHeader>

                <div className="flex flex-1 overflow-hidden">
                    {/* Messages Area */}
                    <div className="flex-1 flex flex-col overflow-hidden">
                        {/* Messages */}
                        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                            {Object.entries(groupedMessages).map(([date, dateMessages]) => (
                                <div key={date}>
                                    {/* Date separator */}
                                    <div className="flex items-center justify-center my-6">
                                        <div className="px-3 py-1 bg-white/10 rounded-full">
                                            <span className="text-white/60 text-xs">
                                                {new Date(date).toLocaleDateString(undefined, {
                                                    weekday: 'long',
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Messages for this date */}
                                    <div className="space-y-3">
                                        {dateMessages.map((message, index) => {
                                            const isCurrentUser = message.sender.id === currentUser?.id;
                                            const prevMessage = dateMessages[index - 1];
                                            const showAvatar = showAvatars && (!prevMessage || prevMessage.sender.id !== message.sender.id);

                                            return (
                                                <Motion
                                                    key={message.id}
                                                    preset="slideUp"
                                                    delay={index * 20}
                                                    className={cn(
                                                        'flex gap-3 group',
                                                        isCurrentUser ? 'flex-row-reverse' : 'flex-row'
                                                    )}
                                                >
                                                    {/* Avatar */}
                                                    {showAvatar && showAvatars && (
                                                        <div className="flex-shrink-0">
                                                            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                                                                {message.sender.avatar ? (
                                                                    <img
                                                                        src={message.sender.avatar}
                                                                        alt={message.sender.name}
                                                                        className="w-full h-full rounded-full object-cover"
                                                                    />
                                                                ) : (
                                                                    <span className="text-white/80 text-sm font-medium">
                                                                        {message.sender.name.charAt(0).toUpperCase()}
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    )}

                                                    {/* Message Content */}
                                                    <div className={cn(
                                                        'flex-1 max-w-[70%]',
                                                        isCurrentUser ? 'items-end' : 'items-start'
                                                    )}>
                                                        {/* Sender name */}
                                                        {showAvatar && (
                                                            <div className={cn(
                                                                'flex items-center gap-2 mb-1',
                                                                isCurrentUser ? 'justify-end' : 'justify-start'
                                                            )}>
                                                                <span className="text-white/80 text-sm font-medium">
                                                                    {message.sender.name}
                                                                </span>
                                                                {message.sender.status && (
                                                                    <div className={cn(
                                                                        'w-2 h-2 rounded-full',
                                                                        message.sender.status === 'online' ? 'bg-green-400' :
                                                                            message.sender.status === 'away' ? 'bg-yellow-400' :
                                                                                message.sender.status === 'busy' ? 'bg-red-400' : 'bg-gray-400'
                                                                    )} />
                                                                )}
                                                            </div>
                                                        )}

                                                        {/* Message bubble */}
                                                        <div className={cn(
                                                            'relative px-4 py-2 rounded-2xl max-w-full break-words',
                                                            isCurrentUser
                                                                ? 'bg-primary text-primary-foreground ml-auto'
                                                                : 'bg-white/10 text-white'
                                                        )}>
                                                            {/* Reply indicator */}
                                                            {message.replyTo && (
                                                                <div className="text-xs opacity-70 mb-2 pb-2 border-b border-current border-opacity-20">
                                                                    Replying to message
                                                                </div>
                                                            )}

                                                            {/* Message content */}
                                                            <div className="text-sm">
                                                                {message.content}
                                                            </div>

                                                            {/* Attachments */}
                                                            {message.attachments && message.attachments.length > 0 && (
                                                                <div className="mt-2 space-y-2">
                                                                    {message.attachments.map((attachment, attIndex) => (
                                                                        <div key={attIndex} className="flex items-center gap-2 p-2 bg-black/20 rounded">
                                                                            {attachment.type === 'image' && <ImageIcon className="w-4 h-4" />}
                                                                            {attachment.type === 'file' && <File className="w-4 h-4" />}
                                                                            <span className="text-xs truncate">{attachment.name}</span>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            )}

                                                            {/* Reactions */}
                                                            {message.reactions && message.reactions.length > 0 && (
                                                                <div className="flex gap-1 mt-2">
                                                                    {message.reactions.map((reaction, reactionIndex) => (
                                                                        <GlassButton
                                                                            key={reactionIndex}
                                                                            variant="ghost"
                                                                            size="sm"
                                                                            onClick={() => onMessageReaction?.(message.id, reaction.emoji)}
                                                                            className="h-6 px-2 text-xs"
                                                                        >
                                                                            {reaction.emoji} {reaction.count}
                                                                        </GlassButton>
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </div>

                                                        {/* Timestamp and status */}
                                                        <div className={cn(
                                                            'flex items-center gap-2 mt-1 text-xs text-white/50',
                                                            isCurrentUser ? 'justify-end' : 'justify-start'
                                                        )}>
                                                            {showTimestamps && (
                                                                <span>{formatTimestamp(message.timestamp)}</span>
                                                            )}
                                                            {message.edited && (
                                                                <span>(edited)</span>
                                                            )}
                                                        </div>
                                                    </div>

                                                    {/* Message actions */}
                                                    <div className={cn(
                                                        'opacity-0 group-hover:opacity-100 transition-opacity flex gap-1',
                                                        isCurrentUser ? 'flex-row-reverse' : 'flex-row'
                                                    )}>
                                                        {enableReactions && (
                                                            <GlassButton
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                                                                className="p-1"
                                                            >
                                                                <Smile className="w-3 h-3" />
                                                            </GlassButton>
                                                        )}
                                                    </div>
                                                </Motion>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}

                            <div ref={messagesEndRef} />
                        </CardContent>

                        {/* Message Input */}
                        <div className="border-t border-white/10 p-4">
                            {/* Attachments preview */}
                            {attachments.length > 0 && (
                                <div className="flex gap-2 mb-3 overflow-x-auto">
                                    {attachments.map((file, index) => (
                                        <div key={index} className="flex items-center gap-2 bg-white/10 rounded px-3 py-2">
                                            <File className="w-4 h-4" />
                                            <span className="text-sm text-white truncate max-w-32">
                                                {file.name}
                                            </span>
                                            <GlassButton
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => removeAttachment(index)}
                                                className="p-1 h-auto"
                                            >
                                                <X className="w-3 h-3" />
                                            </GlassButton>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Input area */}
                            <div className="flex items-end gap-2">
                                {/* File attachment */}
                                {enableAttachments && (
                                    <GlassButton
                                        variant="ghost"
                                        size="sm"
                                        onClick={handleFileAttachment}
                                        className="p-2"
                                    >
                                        <Paperclip className="w-4 h-4" />
                                    </GlassButton>
                                )}

                                {/* Voice recording */}
                                {enableVoice && (
                                    <GlassButton
                                        variant={isRecording ? "destructive" : "ghost"}
                                        size="sm"
                                        onClick={handleVoiceToggle}
                                        className="p-2"
                                    >
                                        {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                                    </GlassButton>
                                )}

                                {/* Text input */}
                                <div className="flex-1 relative">
                                    <textarea
                                        ref={inputRef}
                                        value={newMessage}
                                        onChange={handleInputChange}
                                        onKeyPress={handleKeyPress}
                                        placeholder="Type a message..."
                                    className="w-full bg-glass-fill ring-1 ring-white/10 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-white/30 resize-none min-h-[40px] max-h-[120px]"
                                        rows={1}
                                    />

                                    {/* Emoji button */}
                                    <GlassButton
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                                        className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1"
                                    >
                                        <Smile className="w-4 h-4" />
                                    </GlassButton>
                                </div>

                                {/* Send button */}
                                <GlassButton
                                    variant="primary"
                                    size="sm"
                                    onClick={handleSendMessage}
                                    disabled={!newMessage.trim() && attachments.length === 0}
                                    className="p-2"
                                >
                                    <Send className="w-4 h-4" />
                                </GlassButton>
                            </div>

                            {/* Hidden file input */}
                            <input
                                ref={fileInputRef}
                                type="file"
                                multiple
                                onChange={handleFileChange}
                                className="hidden"
                                accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.txt"
                            />
                        </div>
                    </div>

                    {/* Participants sidebar */}
                    {showParticipants && participants.length > 0 && (
                        <div className="w-64 border-l border-white/10 flex flex-col">
                            <div className="p-4 border-b border-white/10">
                                <h3 className="text-white font-medium flex items-center gap-2">
                                    <Users className="w-4 h-4" />
                                    Participants ({participants.length})
                                </h3>
                            </div>

                            <div className="flex-1 overflow-y-auto p-2">
                                {participants.map((participant) => (
                                    <div key={participant.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5">
                                        <div className="relative">
                                            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                                                {participant.avatar ? (
                                                    <img
                                                        src={participant.avatar}
                                                        alt={participant.name}
                                                        className="w-full h-full rounded-full object-cover"
                                                    />
                                                ) : (
                                                    <span className="text-white/80 text-sm font-medium">
                                                        {participant.name.charAt(0).toUpperCase()}
                                                    </span>
                                                )}
                                            </div>
                                            <div className={cn(
                                                'absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-black',
                                                participant.status === 'online' ? 'bg-green-400' :
                                                    participant.status === 'away' ? 'bg-yellow-400' :
                                                        participant.status === 'busy' ? 'bg-red-400' : 'bg-gray-400'
                                            )} />
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <p className="text-white text-sm font-medium truncate">
                                                {participant.name}
                                            </p>
                                            <p className="text-white/60 text-xs">
                                                {participant.status === 'online' ? 'Online' :
                                                    participant.status === 'away' ? 'Away' :
                                                        participant.status === 'busy' ? 'Busy' :
                                                            participant.lastSeen ? `Last seen ${formatTimestamp(participant.lastSeen)}` : 'Offline'}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </GlassCard>
        </Motion>
    );
};

export default GlassChat;
