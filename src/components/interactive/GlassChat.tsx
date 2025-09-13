'use client';

import { cn } from '../../lib/utilsComprehensive';
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
import { Motion } from '../../primitives';
import { GlassButton } from '../button';
import { CardContent, CardHeader, CardTitle, GlassCard } from '../card';
import type { ConsciousnessFeatures } from '../layout/GlassContainer';
import { usePredictiveEngine, useInteractionRecorder } from '../advanced/GlassPredictiveEngine';
import { useAchievements } from '../advanced/GlassAchievementSystem';
import { useBiometricAdaptation } from '../advanced/GlassBiometricAdaptation';
import { useEyeTracking } from '../advanced/GlassEyeTracking';
import { useSpatialAudio } from '../advanced/GlassSpatialAudio';

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

export interface GlassChatProps extends ConsciousnessFeatures {
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
    // Consciousness features
    consciousness = false,
    predictive = false,
    adaptive = false,
    eyeTracking = false,
    spatialAudio = false,
    trackAchievements = false,
    ...props
}) => {
    const [newMessage, setNewMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [attachments, setAttachments] = useState<File[]>([]);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    
    // Consciousness state
    const [messageInteractionCounts, setMessageInteractionCounts] = useState<Record<string, number>>({});
    const [suggestedResponses, setSuggestedResponses] = useState<string[]>([]);
    const [adaptiveInputHeight, setAdaptiveInputHeight] = useState(40);
    const [focusedMessage, setFocusedMessage] = useState<string | null>(null);
    const [conversationInsights, setConversationInsights] = useState<{
        sentiment: 'positive' | 'neutral' | 'negative';
        urgency: 'low' | 'medium' | 'high';
        topics: string[];
    } | null>(null);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    
    // Consciousness hooks
    const predictiveEngine = predictive ? usePredictiveEngine() : null;
    const eyeTracker = eyeTracking ? useEyeTracking() : null;
    const biometricAdapter = adaptive ? useBiometricAdaptation() : null;
    const spatialAudioEngine = spatialAudio ? useSpatialAudio() : null;
    const interactionRecorder = consciousness ? useInteractionRecorder() : null;
    const achievementTracker = trackAchievements ? useAchievements() : null;

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

    // Consciousness effects
    // Biometric adaptation for input height and response timing
    useEffect(() => {
        if (!adaptive || !biometricAdapter) return;

        const updateAdaptiveFeatures = () => {
            const stressLevel = biometricAdapter.currentStressLevel;

            // Adjust input height based on stress levels
            if (stressLevel > 0.7) {
                setAdaptiveInputHeight(60); // Larger input for stressed users
            } else if (stressLevel < 0.3) {
                setAdaptiveInputHeight(32); // Compact for calm users
            } else {
                setAdaptiveInputHeight(40); // Default
            }

            // Record biometric adaptation for achievements
            if (trackAchievements && achievementTracker) {
                achievementTracker.recordAction('chat_adaptive_ui', {
                    stressLevel: stressLevel,
                    inputHeight: adaptiveInputHeight
                });
            }
        };

        const interval = setInterval(updateAdaptiveFeatures, 2000);
        return () => clearInterval(interval);
    }, [adaptive, biometricAdapter, achievementTracker, trackAchievements, adaptiveInputHeight]);

    // Eye tracking for message focus
    useEffect(() => {
        if (!eyeTracking || !eyeTracker) return;

        const handleGazeData = (gazeData: any) => {
            // Find which message is being focused on
            const messageElements = document.querySelectorAll('[data-consciousness-message="true"]');
            let focusedMessageId: string | null = null;

            messageElements.forEach((element) => {
                const rect = element.getBoundingClientRect();
                if (gazeData.x >= rect.left && gazeData.x <= rect.right &&
                    gazeData.y >= rect.top && gazeData.y <= rect.bottom) {
                    focusedMessageId = element.getAttribute('data-message-id');
                }
            });

            setFocusedMessage(focusedMessageId);

            // Record achievement for eye tracking engagement
            if (trackAchievements && achievementTracker && focusedMessageId) {
                achievementTracker.recordAction('message_gaze_focus', {
                    messageId: focusedMessageId,
                    gazeTime: Date.now()
                });
            }
        };

        // Eye tracking methods not available in current implementation
        // eyeTracker.startTracking(handleGazeData);
        // return () => eyeTracker.stopTracking();
    }, [eyeTracking, eyeTracker, achievementTracker, trackAchievements]);

    // Predictive response suggestions
    useEffect(() => {
        if (!predictive || !predictiveEngine) return;

        const generateSuggestions = async () => {
            try {
                const conversationContext = {
                    messages: messages.slice(-5).map(m => ({
                        content: m.content,
                        sender: m.sender.name,
                        timestamp: m.timestamp
                    })),
                    currentUser: currentUser?.name || 'User'
                };

                // Use available predictive data
                const predictions = predictiveEngine.predictions;
                const insights = predictiveEngine.insights;

                // Generate simple suggestions based on available data
                const suggestions = predictions
                    .filter(p => p.type === 'suggest')
                    .map(p => p.metadata?.text || '')
                    .filter(text => text.length > 0)
                    .slice(0, 3);

                setSuggestedResponses(suggestions);

                // Transform insights array to expected object format
                const transformedInsights = insights && insights.length > 0 ? {
                    sentiment: (insights.find(i => i.type === 'sentiment')?.metadata?.sentiment as 'positive' | 'neutral' | 'negative') || 'neutral',
                    urgency: (insights.find(i => i.type === 'urgency')?.metadata?.urgency as 'low' | 'medium' | 'high') || 'medium',
                    topics: insights
                        .filter(i => i.type === 'topic')
                        .map(i => i.metadata?.topic || '')
                        .filter(topic => topic.length > 0)
                } : null;

                setConversationInsights(transformedInsights);

            } catch (error) {
                console.warn('Predictive response generation failed:', error);
            }
        };

        if (messages.length > 0) {
            const timeoutId = setTimeout(generateSuggestions, 500);
            return () => clearTimeout(timeoutId);
        }
    }, [messages, predictive, predictiveEngine, currentUser]);

    // Spatial audio for message notifications
    useEffect(() => {
        if (!spatialAudio || !spatialAudioEngine) return;

        const latestMessage = messages[messages.length - 1];
        if (!latestMessage || latestMessage.sender.id === currentUser?.id) return;

        // Play spatial audio notification for new messages
        spatialAudioEngine.playGlassSound('message-notification', undefined, {
            volume: 0.6,
            reverb: 0.3
        });

        // Record achievement for audio engagement
        if (trackAchievements && achievementTracker) {
            achievementTracker.recordAction('spatial_audio_notification', {
                messageId: latestMessage.id,
                sender: latestMessage.sender.name
            });
        }
    }, [messages, spatialAudio, spatialAudioEngine, currentUser, trackAchievements, achievementTracker]);

    // Message interaction tracking
    useEffect(() => {
        if (!consciousness || !interactionRecorder) return;

        const recordMessageInteraction = (messageId: string, interactionType: string) => {
            setMessageInteractionCounts(prev => ({
                ...prev,
                [messageId]: (prev[messageId] || 0) + 1
            }));

            // Create synthetic event for interaction recording
            const syntheticEvent = {
                currentTarget: { id: `message-${messageId}` },
                type: interactionType === 'click' ? 'click' : interactionType === 'hover' ? 'mouseenter' : 'focus'
            } as any;

            if (interactionType === 'click') {
                interactionRecorder.recordClick(syntheticEvent);
            } else if (interactionType === 'hover') {
                interactionRecorder.recordHover(syntheticEvent);
            } else {
                interactionRecorder.recordFocus(syntheticEvent);
            }
        };

        // Set up global interaction listeners for message elements
        const handleMessageClick = (event: MouseEvent) => {
            const messageElement = (event.target as Element).closest('[data-consciousness-message="true"]');
            if (messageElement) {
                const messageId = messageElement.getAttribute('data-message-id');
                if (messageId) {
                    recordMessageInteraction(messageId, 'message_click');
                }
            }
        };

        document.addEventListener('click', handleMessageClick);
        return () => document.removeEventListener('click', handleMessageClick);
    }, [consciousness, interactionRecorder, title]);

    // Handle input change
    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewMessage(e.target.value);

        if (enableTyping && !isTyping && e.target.value.length > 0) {
            setIsTyping(true);
            onTyping?.(true);
        }
    }, [enableTyping, isTyping, onTyping]);

    // Enhanced send message handler with consciousness tracking
    const handleSendMessage = useCallback(() => {
        if (!newMessage.trim() && attachments.length === 0) return;

        // Record interaction for achievements and learning
        if (consciousness && interactionRecorder) {
            // Create synthetic event for message send interaction
            const syntheticEvent = {
                currentTarget: { id: 'chat-input' },
                type: 'click'
            } as any;
            interactionRecorder.recordClick(syntheticEvent);
        }

        // Track achievement for message sending
        if (trackAchievements && achievementTracker) {
            achievementTracker.recordAction('chat_message_sent', {
                messageLength: newMessage.trim().length,
                hasAttachments: attachments.length > 0,
                timestamp: Date.now()
            });
        }

        // Play spatial audio feedback for message sent
        if (spatialAudio && spatialAudioEngine) {
            spatialAudioEngine.playGlassSound('message-sent', undefined, {
                volume: 0.4,
                reverb: 0.2
            });
        }

        onSendMessage?.(newMessage.trim(), attachments);
        setNewMessage('');
        setAttachments([]);
        setIsTyping(false);
        onTyping?.(false);
        setSuggestedResponses([]); // Clear suggestions after sending

        // Reset textarea height with adaptive sizing
        if (inputRef.current) {
            inputRef.current.style.height = 'auto';
            if (adaptive) {
                inputRef.current.style.minHeight = `${adaptiveInputHeight}px`;
            }
        }
    }, [newMessage, attachments, onSendMessage, onTyping, consciousness, interactionRecorder, title, 
        trackAchievements, achievementTracker, spatialAudio, spatialAudioEngine, suggestedResponses, 
        adaptive, adaptiveInputHeight]);

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
        <Motion preset="fadeIn" className="glass-glass-w-full glass-glass-h-full">
            <GlassCard className={cn('flex flex-col h-full overflow-hidden', className)} {...props}>
                {/* Header */}
                <CardHeader className="pb-3 glass-glass-border-b glass-glass-border-white/10">
                    <div className="glass-glass-flex glass-glass-items-center glass-glass-justify-between">
                        <div>
                            <CardTitle className="glass-glass-text-primary glass-glass-text-lg glass-glass-font-semibold glass-glass-flex glass-glass-items-center glass-glass-gap-2">
                                <Hash className="glass-glass-w-5 glass-glass-h-5" />
                                {title}
                            </CardTitle>
                            {subtitle && (
                                <p className="glass-glass-text-primary/60 glass-glass-text-sm glass-mt-1">{subtitle}</p>
                            )}
                        </div>

                        <div className="glass-glass-flex glass-glass-items-center glass-glass-gap-2">
                            <GlassButton variant="ghost" size="sm" className="glass-glass-p-2">
                                <Search className="glass-glass-w-4 glass-glass-h-4" />
                            </GlassButton>

                            <GlassButton variant="ghost" size="sm" className="glass-glass-p-2">
                                <Phone className="glass-glass-w-4 glass-glass-h-4" />
                            </GlassButton>

                            <GlassButton variant="ghost" size="sm" className="glass-glass-p-2">
                                <Video className="glass-glass-w-4 glass-glass-h-4" />
                            </GlassButton>

                            <GlassButton variant="ghost" size="sm" className="glass-glass-p-2">
                                <MoreVertical className="glass-glass-w-4 glass-glass-h-4" />
                            </GlassButton>
                        </div>
                    </div>

                    {/* Participant count */}
                    {participants.length > 0 && (
                        <div className="glass-glass-flex glass-glass-items-center glass-glass-gap-2 glass-mt-2">
                            <Users className="glass-glass-w-4 glass-glass-h-4 glass-glass-text-primary/60" />
                            <span className="glass-glass-text-primary/60 glass-glass-text-sm">
                                {participants.filter(p => p.status === 'online').length} online • {participants.length} total
                            </span>
                        </div>
                    )}
                </CardHeader>

                <div className="glass-glass-flex glass-glass-flex-1 overflow-hidden">
                    {/* Messages Area */}
                    <div className="glass-glass-flex-1 glass-glass-flex glass-glass-flex-col overflow-hidden">
                        {/* Messages */}
                        <CardContent className="glass-glass-flex-1 glass-glass-overflow-y-auto glass-glass-p-4 glass-glass-gap-4">
                            {Object.entries(groupedMessages).map(([date, dateMessages]) => (
                                <div key={date}>
                                    {/* Date separator */}
                                    <div className="glass-glass-flex glass-glass-items-center glass-glass-justify-center glass-glass-my-6">
                                        <div className="glass-glass-px-3 glass-glass-py-1 glass-surface-subtle/10 glass-radius-full">
                                            <span className="glass-glass-text-primary/60 glass-glass-text-xs">
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
                                    <div className="glass-glass-gap-3">
                                        {dateMessages.map((message, index) => {
                                            const isCurrentUser = message.sender.id === currentUser?.id;
                                            const prevMessage = dateMessages[index - 1];
                                            const showAvatar = showAvatars && (!prevMessage || prevMessage.sender.id !== message.sender.id);

                                            return (
                                                <div
                                                    key={message.id}
                                                    className={cn(
                                                        'flex glass-gap-3 group animate-slide-in-up',
                                                        isCurrentUser ? 'flex-row-reverse' : 'flex-row',
                                                        eyeTracking && focusedMessage === message.id && 'consciousness-message-focused',
                                                        consciousness && messageInteractionCounts[message.id] > 0 && 'consciousness-message-interacted',
                                                        predictive && conversationInsights?.sentiment === 'positive' && 'consciousness-positive-context',
                                                        predictive && conversationInsights?.sentiment === 'negative' && 'consciousness-negative-context',
                                                        predictive && conversationInsights?.urgency === 'high' && 'consciousness-urgent-context'
                                                    )}
                                                    style={{ 
                                                        animationDelay: `${Math.min(index, 20) * 20}ms`,
                                                        animationFillMode: 'both'
                                                    }}
                                                    data-consciousness-message="true"
                                                    data-message-id={message.id}
                                                    data-message-sentiment={conversationInsights?.sentiment}
                                                    data-message-urgency={conversationInsights?.urgency}
                                                    data-interaction-count={messageInteractionCounts[message.id] || 0}
                                                    data-gaze-focused={focusedMessage === message.id}
                                                >
                                                    {/* Avatar */}
                                                    {showAvatar && showAvatars && (
                                                        <div className="glass-glass-flex-shrink-0">
                                                            <div className="glass-glass-w-8 glass-glass-h-8 glass-radius-full glass-surface-subtle/20 glass-glass-flex glass-glass-items-center glass-glass-justify-center">
                                                                {message.sender.avatar ? (
                                                                    <img
                                                                        src={message.sender.avatar}
                                                                        alt={message.sender.name}
                                                                        className="glass-glass-w-full glass-glass-h-full glass-radius-full object-cover"
                                                                    />
                                                                ) : (
                                                                    <span className="glass-glass-text-primary/80 glass-glass-text-sm glass-glass-font-medium">
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
                                                                'flex items-center glass-gap-2 glass-mb-1',
                                                                isCurrentUser ? 'justify-end' : 'justify-start'
                                                            )}>
                                                                <span className="glass-glass-text-primary/80 glass-glass-text-sm glass-glass-font-medium">
                                                                    {message.sender.name}
                                                                </span>
                                                                {message.sender.status && (
                                                                    <div className={cn(
                                                                        'w-2 h-2 glass-radius-full',
                                                                        message.sender.status === 'online' ? 'bg-green-400' :
                                                                            message.sender.status === 'away' ? 'bg-yellow-400' :
                                                                                message.sender.status === 'busy' ? 'bg-red-400' : 'bg-gray-400'
                                                                    )} />
                                                                )}
                                                            </div>
                                                        )}

                                                        {/* Message bubble */}
                                                        <div className={cn(
                                                            'relative glass-px-4 glass-py-2 rounded-2xl max-w-full break-words',
                                                            isCurrentUser
                                                                ? 'bg-primary text-primary-foreground ml-auto'
                                                                : 'bg-white/10 glass-text-primary'
                                                        )}>
                                                            {/* Reply indicator */}
                                                            {message.replyTo && (
                                                                <div className="glass-glass-text-xs opacity-70 glass-glass-mb-2 pb-2 glass-glass-border-b glass-glass-border-current glass-glass-border-opacity-20">
                                                                    Replying to message
                                                                </div>
                                                            )}

                                                            {/* Message content */}
                                                            <div className="glass-glass-text-sm">
                                                                {message.content}
                                                            </div>

                                                            {/* Attachments */}
                                                            {message.attachments && message.attachments.length > 0 && (
                                                                <div className="glass-mt-2 glass-glass-gap-2">
                                                                    {message.attachments.map((attachment, attIndex) => (
                                                                        <div key={attIndex} className="glass-glass-flex glass-glass-items-center glass-glass-gap-2 glass-glass-p-2 glass-surface-dark/20 glass-radius-md">
                                                                            {attachment.type === 'image' && <ImageIcon className="glass-glass-w-4 glass-glass-h-4" />}
                                                                            {attachment.type === 'file' && <File className="glass-glass-w-4 glass-glass-h-4" />}
                                                                            <span className="glass-glass-text-xs glass-glass-truncate">{attachment.name}</span>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            )}

                                                            {/* Reactions */}
                                                            {message.reactions && message.reactions.length > 0 && (
                                                                <div className="glass-glass-flex glass-glass-gap-1 glass-mt-2">
                                                                    {message.reactions.map((reaction, reactionIndex) => (
                                                                        <GlassButton
                                                                            key={reactionIndex}
                                                                            variant="ghost"
                                                                            size="sm"
                                                                            onClick={(e) => onMessageReaction?.(message.id, reaction.emoji)}
                                                                            className="glass-glass-h-6 glass-glass-px-2 glass-glass-text-xs"
                                                                        >
                                                                            {reaction.emoji} {reaction.count}
                                                                        </GlassButton>
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </div>

                                                        {/* Timestamp and status */}
                                                        <div className={cn(
                                                            'flex items-center glass-gap-2 glass-mt-1 glass-text-xs glass-text-primary/50',
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
                                                        'opacity-0 group-hover:opacity-100 transition-opacity flex glass-gap-1',
                                                        isCurrentUser ? 'flex-row-reverse' : 'flex-row'
                                                    )}>
                                                        {enableReactions && (
                                                            <GlassButton
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={(e) => setShowEmojiPicker(!showEmojiPicker)}
                                                                className="glass-glass-p-1"
                                                            >
                                                                <Smile className="w-3 h-3" />
                                                            </GlassButton>
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}

                            <div ref={messagesEndRef} />
                        </CardContent>

                        {/* Message Input */}
                        <div className={cn(
                            "border-t border-white/10 glass-p-4",
                            adaptive && "consciousness-adaptive-input",
                            predictive && suggestedResponses.length > 0 && "consciousness-predictive-suggestions",
                            consciousness && "consciousness-enhanced-input"
                        )} 
                        data-consciousness-input-area="true"
                        data-adaptive-height={adaptiveInputHeight}
                        data-has-suggestions={suggestedResponses.length > 0}
                        data-conversation-sentiment={conversationInsights?.sentiment}
                        data-conversation-urgency={conversationInsights?.urgency}
                        >
                            {/* Predictive Response Suggestions */}
                            {predictive && suggestedResponses.length > 0 && (
                                <div className="glass-glass-mb-3" data-consciousness-suggestions="true">
                                    <div className="glass-glass-text-xs glass-glass-text-primary/60 glass-glass-mb-2 glass-glass-flex glass-glass-items-center glass-glass-gap-1">
                                        <span>Suggested responses</span>
                                        {conversationInsights?.sentiment && (
                                            <span className={cn(
                                                "glass-px-2 glass-py-0.5 glass-radius-md glass-text-xs",
                                                conversationInsights.sentiment === 'positive' ? 'bg-green-500/20 text-green-300' :
                                                conversationInsights.sentiment === 'negative' ? 'bg-red-500/20 text-red-300' :
                                                'bg-yellow-500/20 text-yellow-300'
                                            )}>
                                                {conversationInsights.sentiment}
                                            </span>
                                        )}
                                        {conversationInsights?.urgency === 'high' && (
                                            <span className="glass-glass-px-2 glass-glass-py-0.5 glass-radius-md glass-glass-text-xs bg-orange-500/20 text-orange-300">
                                                urgent
                                            </span>
                                        )}
                                    </div>
                                    <div className="glass-glass-flex glass-glass-gap-2 glass-glass-flex-wrap">
                                        {suggestedResponses.map((suggestion, index) => (
                                            <GlassButton
                                                key={index}
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => setNewMessage(suggestion)}
                                                className="glass-glass-text-xs glass-glass-px-3 glass-glass-py-1 h-auto consciousness-suggestion-button"
                                                data-suggestion-index={index}
                                            >
                                                {suggestion}
                                            </GlassButton>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Conversation Insights */}
                            {predictive && conversationInsights?.topics && conversationInsights.topics.length > 0 && (
                                <div className="glass-glass-mb-3" data-consciousness-insights="true">
                                    <div className="glass-glass-text-xs glass-glass-text-primary/60 glass-glass-mb-2">Conversation topics:</div>
                                    <div className="glass-glass-flex glass-glass-gap-1 glass-glass-flex-wrap">
                                        {conversationInsights.topics.map((topic, index) => (
                                            <span key={index} className="glass-glass-px-2 glass-glass-py-0.5 glass-radius-md glass-glass-text-xs glass-surface-primary/20 glass-glass-text-primary">
                                                {topic}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Attachments preview */}
                            {attachments.length > 0 && (
                                <div className="glass-glass-flex glass-glass-gap-2 glass-glass-mb-3 glass-overflow-x-auto">
                                    {attachments.map((file, index) => (
                                        <div key={index} className="glass-glass-flex glass-glass-items-center glass-glass-gap-2 glass-surface-subtle/10 glass-radius-md glass-glass-px-3 glass-glass-py-2">
                                            <File className="glass-glass-w-4 glass-glass-h-4" />
                                            <span className="glass-glass-text-sm glass-glass-text-primary glass-glass-truncate max-w-32">
                                                {file.name}
                                            </span>
                                            <GlassButton
                                                variant="ghost"
                                                size="sm"
                                                onClick={(e) => removeAttachment(index)}
                                                className="glass-glass-p-1 h-auto"
                                            >
                                                <X className="w-3 h-3" />
                                            </GlassButton>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Input area */}
                            <div className="glass-glass-flex glass-glass-items-end glass-glass-gap-2">
                                {/* File attachment */}
                                {enableAttachments && (
                                    <GlassButton
                                        variant="ghost"
                                        size="sm"
                                        onClick={handleFileAttachment}
                                        className="glass-glass-p-2"
                                    >
                                        <Paperclip className="glass-glass-w-4 glass-glass-h-4" />
                                    </GlassButton>
                                )}

                                {/* Voice recording */}
                                {enableVoice && (
                                    <GlassButton
                                        variant={isRecording ? "destructive" : "ghost"}
                                        size="sm"
                                        onClick={handleVoiceToggle}
                                        className="glass-glass-p-2"
                                    >
                                        {isRecording ? <MicOff className="glass-glass-w-4 glass-glass-h-4" /> : <Mic className="glass-glass-w-4 glass-glass-h-4" />}
                                    </GlassButton>
                                )}

                                {/* Text input */}
                                <div className="glass-glass-flex-1 glass-glass-relative">
                                    <textarea
                                        ref={inputRef}
                                        value={newMessage}
                                        onChange={handleInputChange}
                                        onKeyPress={handleKeyPress}
                                        placeholder={predictive && conversationInsights?.urgency === 'high' 
                                            ? "Type urgent response..." 
                                            : adaptive 
                                            ? "Type a message (adaptive sizing enabled)..." 
                                            : "Type a message..."}
                                        className={cn(
                                            "w-full bg-glass-fill ring-1 ring-white/10 glass-radius-lg glass-px-4 glass-py-2 glass-text-primary placeholder-white/50 focus:outline-none focus:ring-white/30 resize-none max-h-[120px]",
                                            adaptive && "consciousness-adaptive-textarea",
                                            predictive && conversationInsights?.urgency === 'high' && "consciousness-urgent-input",
                                            eyeTracking && "consciousness-eye-trackable"
                                        )}
                                        style={{
                                            minHeight: adaptive ? `${adaptiveInputHeight}px` : '40px'
                                        }}
                                        rows={1}
                                        data-consciousness-input="true"
                                        data-adaptive-height={adaptiveInputHeight}
                                        data-urgency={conversationInsights?.urgency}
                                        data-eye-tracking={String(!!eyeTracking)}
                                    />

                                    {/* Emoji button */}
                                    <GlassButton
                                        variant="ghost"
                                        size="sm"
                                        onClick={(e) => setShowEmojiPicker(!showEmojiPicker)}
                                        className="glass-glass-absolute right-2 glass--glass-top-1/2 transform -translate-y-1/2 glass-glass-p-1"
                                    >
                                        <Smile className="glass-glass-w-4 glass-glass-h-4" />
                                    </GlassButton>
                                </div>

                                {/* Send button */}
                                <GlassButton
                                    variant="primary"
                                    size="sm"
                                    onClick={handleSendMessage}
                                    disabled={!newMessage.trim() && attachments.length === 0}
                                    className={cn(
                                        "glass-p-2",
                                        consciousness && "consciousness-send-button",
                                        predictive && conversationInsights?.urgency === 'high' && "consciousness-urgent-send",
                                        adaptive && "consciousness-adaptive-send"
                                    )}
                                    consciousness={consciousness}
                                    predictive={predictive}
                                    adaptive={adaptive}
                                    spatialAudio={spatialAudio}
                                    trackAchievements={trackAchievements}
                                    data-consciousness-send="true"
                                    data-urgency={conversationInsights?.urgency}
                                    data-has-attachments={attachments.length > 0}
                                    data-message-length={newMessage.trim().length}
                                >
                                    <Send className="glass-glass-w-4 glass-glass-h-4" />
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
                        <div className="w-64 glass-glass-border-l glass-glass-border-white/10 glass-glass-flex glass-glass-flex-col">
                            <div className="glass-glass-p-4 glass-glass-border-b glass-glass-border-white/10">
                                <h3 className="glass-glass-text-primary glass-glass-font-medium glass-glass-flex glass-glass-items-center glass-glass-gap-2">
                                    <Users className="glass-glass-w-4 glass-glass-h-4" />
                                    Participants ({participants.length})
                                </h3>
                            </div>

                            <div className="glass-glass-flex-1 glass-glass-overflow-y-auto glass-glass-p-2">
                                {participants.map((participant) => (
                                    <div key={participant.id} className="glass-glass-flex glass-glass-items-center glass-glass-gap-3 glass-glass-p-2 glass-radius-lg hover:glass-surface-subtle/5">
                                        <div className="glass-glass-relative">
                                            <div className="glass-glass-w-8 glass-glass-h-8 glass-radius-full glass-surface-subtle/20 glass-glass-flex glass-glass-items-center glass-glass-justify-center">
                                                {participant.avatar ? (
                                                    <img
                                                        src={participant.avatar}
                                                        alt={participant.name}
                                                        className="glass-glass-w-full glass-glass-h-full glass-radius-full object-cover"
                                                    />
                                                ) : (
                                                    <span className="glass-glass-text-primary/80 glass-glass-text-sm glass-glass-font-medium">
                                                        {participant.name.charAt(0).toUpperCase()}
                                                    </span>
                                                )}
                                            </div>
                                            <div className={cn(
                                                'absolute -bottom-1 -right-1 w-3 h-3 glass-radius-full border-2 border-black',
                                                participant.status === 'online' ? 'bg-green-400' :
                                                    participant.status === 'away' ? 'bg-yellow-400' :
                                                        participant.status === 'busy' ? 'bg-red-400' : 'bg-gray-400'
                                            )} />
                                        </div>

                                        <div className="glass-glass-flex-1 glass-glass-min-w-0">
                                            <p className="glass-glass-text-primary glass-glass-text-sm glass-glass-font-medium glass-glass-truncate">
                                                {participant.name}
                                            </p>
                                            <p className="glass-glass-text-primary/60 glass-glass-text-xs">
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

// Consciousness-Enhanced Chat Variants
export const GlassPredictiveChat: React.FC<GlassChatProps> = (props) => (
    <GlassChat {...props} consciousness={true} predictive={true} />
);

export const GlassAdaptiveChat: React.FC<GlassChatProps> = (props) => (
    <GlassChat {...props} consciousness={true} adaptive={true} />
);

export const GlassEyeTrackingChat: React.FC<GlassChatProps> = (props) => (
    <GlassChat {...props} consciousness={true} eyeTracking={true} />
);

export const GlassSpatialAudioChat: React.FC<GlassChatProps> = (props) => (
    <GlassChat {...props} consciousness={true} spatialAudio={true} />
);

export const GlassAchievementChat: React.FC<GlassChatProps> = (props) => (
    <GlassChat {...props} consciousness={true} trackAchievements={true} />
);

export const GlassConsciousnessChat: React.FC<GlassChatProps> = (props) => (
    <GlassChat 
        {...props} 
        consciousness={true} 
        predictive={true} 
        adaptive={true} 
        eyeTracking={true} 
        spatialAudio={true} 
        trackAchievements={true} 
    />
);

export default GlassChat;
