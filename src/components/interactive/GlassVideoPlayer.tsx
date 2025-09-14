'use client';

import { cn } from '../../lib/utilsComprehensive';
import {
    AlertCircle,
    Loader2,
    Maximize,
    Minimize,
    Pause,
    Play,
    Settings,
    SkipBack,
    SkipForward,
    Volume2,
    VolumeX
} from 'lucide-react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Motion } from '../../primitives';
import { GlassButton } from '../button';
import { CardContent, GlassCard } from '../card';
import { GlassBadge } from '../data-display';

export interface VideoSource {
    src: string;
    type: string;
    quality?: string;
    bitrate?: number;
}

export interface SubtitleTrack {
    src: string;
    label: string;
    language: string;
    default?: boolean;
}

export interface GlassVideoPlayerProps {
    /**
     * Video sources
     */
    sources: VideoSource[];
    /**
     * Video poster image
     */
    poster?: string;
    /**
     * Video title
     */
    title?: string;
    /**
     * Auto-play video
     */
    autoPlay?: boolean;
    /**
     * Show controls
     */
    controls?: boolean;
    /**
     * Enable fullscreen
     */
    enableFullscreen?: boolean;
    /**
     * Enable picture-in-picture
     */
    enablePiP?: boolean;
    /**
     * Enable theater mode
     */
    enableTheaterMode?: boolean;
    /**
     * Subtitle tracks
     */
    subtitles?: SubtitleTrack[];
    /**
     * Playback speed options
     */
    playbackSpeeds?: number[];
    /**
     * Custom className
     */
    className?: string;
    /**
     * Play event handler
     */
    onPlay?: () => void;
    /**
     * Pause event handler
     */
    onPause?: () => void;
    /**
     * Time update handler
     */
    onTimeUpdate?: (currentTime: number, duration: number) => void;
    /**
     * Volume change handler
     */
    onVolumeChange?: (volume: number, muted: boolean) => void;
    /**
     * Fullscreen change handler
     */
    onFullscreenChange?: (fullscreen: boolean) => void;
}

/**
 * GlassVideoPlayer component
 * A comprehensive video player with glassmorphism design and advanced controls
 */
export const GlassVideoPlayer: React.FC<GlassVideoPlayerProps> = ({
    sources,
    poster,
    title,
    autoPlay = false,
    controls = true,
    enableFullscreen = true,
    enablePiP = true,
    enableTheaterMode = false,
    subtitles = [],
    playbackSpeeds = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2],
    className,
    onPlay,
    onPause,
    onTimeUpdate,
    onVolumeChange,
    onFullscreenChange,
    ...props
}) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isTheaterMode, setIsTheaterMode] = useState(false);
    const [showControls, setShowControls] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentQuality, setCurrentQuality] = useState<string>('auto');
    const [playbackSpeed, setPlaybackSpeed] = useState(1);
    const [showSettings, setShowSettings] = useState(false);

    // Hide controls after inactivity
    const controlsTimeoutRef = useRef<NodeJS.Timeout>();

    // Handle play/pause
    const handlePlayPause = useCallback(async () => {
        if (!videoRef.current) return;

        try {
            if (isPlaying) {
                await videoRef.current.pause();
                setIsPlaying(false);
                onPause?.();
            } else {
                await videoRef.current.play();
                setIsPlaying(true);
                onPlay?.();
            }
        } catch (err) {
            console.error('Playback error:', err);
        }
    }, [isPlaying, onPlay, onPause]);

    // Handle time update
    const handleTimeUpdate = useCallback(() => {
        if (!videoRef.current) return;

        const current = videoRef.current.currentTime;
        const total = videoRef.current.duration || 0;

        setCurrentTime(current);
        setDuration(total);
        onTimeUpdate?.(current, total);
    }, [onTimeUpdate]);

    // Handle seek
    const handleSeek = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (!videoRef.current || !containerRef.current) return;

        const rect = e.currentTarget.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        const newTime = percent * duration;

        videoRef.current.currentTime = newTime;
        setCurrentTime(newTime);
    }, [duration]);

    // Handle volume change
    const handleVolumeChange = useCallback((newVolume: number) => {
        if (!videoRef.current) return;

        const clampedVolume = Math.max(0, Math.min(1, newVolume));
        videoRef.current.volume = clampedVolume;
        setVolume(clampedVolume);
        setIsMuted(clampedVolume === 0);
        onVolumeChange?.(clampedVolume, clampedVolume === 0);
    }, [onVolumeChange]);

    // Handle mute toggle
    const handleMuteToggle = useCallback(() => {
        if (!videoRef.current) return;

        const newMuted = !isMuted;
        videoRef.current.muted = newMuted;
        setIsMuted(newMuted);
        onVolumeChange?.(newMuted ? 0 : volume, newMuted);
    }, [isMuted, volume, onVolumeChange]);

    // Handle fullscreen toggle
    const handleFullscreenToggle = useCallback(async () => {
        if (!containerRef.current) return;

        try {
            if (!isFullscreen) {
                await containerRef.current.requestFullscreen();
                setIsFullscreen(true);
            } else {
                await document.exitFullscreen();
                setIsFullscreen(false);
            }
            onFullscreenChange?.(!isFullscreen);
        } catch (err) {
            console.error('Fullscreen error:', err);
        }
    }, [isFullscreen, onFullscreenChange]);

    // Handle keyboard shortcuts
    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (!videoRef.current) return;

            switch (e.key.toLowerCase()) {
                case ' ':
                    e.preventDefault();
                    handlePlayPause();
                    break;
                case 'arrowleft':
                    e.preventDefault();
                    videoRef.current.currentTime = Math.max(0, currentTime - 10);
                    break;
                case 'arrowright':
                    e.preventDefault();
                    videoRef.current.currentTime = Math.min(duration, currentTime + 10);
                    break;
                case 'arrowup':
                    e.preventDefault();
                    handleVolumeChange(volume + 0.1);
                    break;
                case 'arrowdown':
                    e.preventDefault();
                    handleVolumeChange(volume - 0.1);
                    break;
                case 'm':
                    e.preventDefault();
                    handleMuteToggle();
                    break;
                case 'f':
                    e.preventDefault();
                    if (enableFullscreen) handleFullscreenToggle();
                    break;
            }
        };

        document.addEventListener('keydown', handleKeyPress);
        return () => document.removeEventListener('keydown', handleKeyPress);
    }, [handlePlayPause, handleVolumeChange, handleMuteToggle, handleFullscreenToggle, currentTime, duration, volume, enableFullscreen]);

    // Auto-hide controls
    const resetControlsTimeout = useCallback(() => {
        if (controlsTimeoutRef.current) {
            clearTimeout(controlsTimeoutRef.current);
        }

        setShowControls(true);

        if (isPlaying) {
            controlsTimeoutRef.current = setTimeout(() => {
                setShowControls(false);
            }, 3000);
        }
    }, [isPlaying]);

    useEffect(() => {
        resetControlsTimeout();
        return () => {
            if (controlsTimeoutRef.current) {
                clearTimeout(controlsTimeoutRef.current);
            }
        };
    }, [resetControlsTimeout]);

    // Handle mouse movement to show controls
    const handleMouseMove = useCallback(() => {
        resetControlsTimeout();
    }, [resetControlsTimeout]);

    // Format time
    const formatTime = useCallback((time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }, []);

    // Handle video load
    const handleLoadedData = useCallback(() => {
        setIsLoading(false);
        setError(null);
    }, []);

    // Handle video error
    const handleError = useCallback(() => {
        setIsLoading(false);
        setError('Failed to load video');
    }, []);

    // Skip forward/backward
    const handleSkip = useCallback((seconds: number) => {
        if (!videoRef.current) return;
        videoRef.current.currentTime = Math.max(0, Math.min(duration, currentTime + seconds));
    }, [currentTime, duration]);

    if (sources.length === 0) {
        return (
            <GlassCard className={cn('p-8', className)}>
                <div className="glass-glass-glass-text-center glass-glass-glass-text-primary/60">
                    No video sources provided
                </div>
            </GlassCard>
        );
    }

    return (
        <Motion preset="fadeIn" className="glass-glass-glass-w-full">
            <GlassCard
                className={cn(
                    'overflow-hidden relative group',
                    isFullscreen && 'fixed inset-0 z-50 rounded-none',
                    isTheaterMode && 'aspect-video max-w-6xl mx-auto',
                    className
                )}
                ref={containerRef}
                onMouseMove={handleMouseMove}
                {...props}
            >
                <CardContent className="glass-glass-glass-p-0">
                    {/* Video Element */}
                    <div className="glass-glass-glass-relative glass-surface-dark aspect-video overflow-hidden">
                        <video
                            ref={videoRef}
                            className="glass-glass-glass-w-full glass-glass-glass-h-full object-contain"
                            poster={poster}
                            autoPlay={autoPlay}
                            onLoadedData={handleLoadedData}
                            onTimeUpdate={handleTimeUpdate}
                            onPlay={() => setIsPlaying(true)}
                            onPause={() => setIsPlaying(false)}
                            onError={handleError}
                            onWaiting={() => setIsLoading(true)}
                            onCanPlay={() => setIsLoading(false)}
                        >
                            {sources.map((source, index) => (
                                <source key={index} src={source.src} type={source.type} />
                            ))}
                            {subtitles.map((subtitle, index) => (
                                <track
                                    key={index}
                                    src={subtitle.src}
                                    label={subtitle.label}
                                    kind="subtitles"
                                    srcLang={subtitle.language}
                                    default={subtitle.default}
                                />
                            ))}
                            Your browser does not support the video tag.
                        </video>

                        {/* Loading State */}
                        {isLoading && (
                            <div className="glass-glass-glass-absolute glass-glass-glass-inset-0 glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-justify-center glass-surface-dark/50">
                                <Loader2 className="glass-glass-glass-w-8 glass-glass-glass-h-8 glass-glass-glass-text-primary animate-spin" />
                            </div>
                        )}

                        {/* Error State */}
                        {error && (
                            <div className="glass-glass-glass-absolute glass-glass-glass-inset-0 glass-glass-glass-flex glass-glass-glass-flex-col glass-glass-glass-items-center glass-glass-glass-justify-center glass-surface-dark/50 glass-glass-glass-text-primary">
                                <AlertCircle className="glass-glass-glass-w-12 glass-glass-glass-h-12 glass-glass-glass-mb-4" />
                                <p>{error}</p>
                            </div>
                        )}

                        {/* Big Play Button */}
                        {!isPlaying && !isLoading && !error && (
                            <div className="glass-glass-glass-absolute glass-glass-glass-inset-0 glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-justify-center">
                                <GlassButton
                                    variant="secondary"
                                    size="lg"
                                    onClick={handlePlayPause}
                                    className="glass-glass-glass-p-6 glass-radius-full"
                                >
                                    <Play className="glass-glass-glass-w-8 glass-glass-glass-h-8" />
                                </GlassButton>
                            </div>
                        )}

                        {/* Controls Overlay */}
                        {controls && showControls && (
                            <div className="glass-glass-glass-absolute glass-glass-glass-inset-0 glass-gradient-primary glass-gradient-primary via-transparent glass-gradient-primary">
                                {/* Top Bar */}
                                <div className="glass-glass-glass-absolute top-0 left-0 right-0 glass-glass-glass-p-4 glass-glass-glass-flex glass-glass-glass-justify-between glass-glass-glass-items-center">
                                    {title && (
                                        <GlassBadge variant="secondary" className="glass-surface-dark/50">
                                            {title}
                                        </GlassBadge>
                                    )}

                                    <div className="glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-gap-2">
                                        {enableTheaterMode && (
                                            <GlassButton
                                                variant="ghost"
                                                size="sm"
                                                onClick={(e) => setIsTheaterMode(!isTheaterMode)}
                                                className="glass-glass-glass-text-primary"
                                            >
                                                {isTheaterMode ? <Minimize className="glass-glass-glass-w-4 glass-glass-glass-h-4" /> : <Maximize className="glass-glass-glass-w-4 glass-glass-glass-h-4" />}
                                            </GlassButton>
                                        )}

                                        <GlassButton
                                            variant="ghost"
                                            size="sm"
                                            onClick={(e) => setShowSettings(!showSettings)}
                                            className="glass-glass-glass-text-primary"
                                        >
                                            <Settings className="glass-glass-glass-w-4 glass-glass-glass-h-4" />
                                        </GlassButton>
                                    </div>
                                </div>

                                {/* Center Controls */}
                                <div className="glass-glass-glass-absolute glass-glass-glass-inset-0 glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-justify-center">
                                    <div className="glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <GlassButton
                                            variant="secondary"
                                            size="lg"
                                            onClick={(e) => handleSkip(-10)}
                                            className="glass-glass-glass-p-3"
                                        >
                                            <SkipBack className="glass-glass-glass-w-6 glass-glass-glass-h-6" />
                                        </GlassButton>

                                        <GlassButton
                                            variant="secondary"
                                            size="lg"
                                            onClick={handlePlayPause}
                                            className="glass-glass-glass-p-4"
                                        >
                                            {isPlaying ? (
                                                <Pause className="glass-glass-glass-w-8 glass-glass-glass-h-8" />
                                            ) : (
                                                <Play className="glass-glass-glass-w-8 glass-glass-glass-h-8" />
                                            )}
                                        </GlassButton>

                                        <GlassButton
                                            variant="secondary"
                                            size="lg"
                                            onClick={(e) => handleSkip(10)}
                                            className="glass-glass-glass-p-3"
                                        >
                                            <SkipForward className="glass-glass-glass-w-6 glass-glass-glass-h-6" />
                                        </GlassButton>
                                    </div>
                                </div>

                                {/* Bottom Controls */}
                                <div className="glass-glass-glass-absolute bottom-0 left-0 right-0 glass-glass-glass-p-4">
                                    {/* Progress Bar */}
                                    <div
                                        className="glass-glass-glass-w-full glass-glass-glass-h-1 glass-surface-subtle/20 glass-radius-full glass-glass-glass-mb-4 glass-glass-glass-cursor-pointer"
                                        onClick={handleSeek}
                                    >
                                        <div
                                            className="glass-glass-glass-h-full glass-surface-primary glass-radius-full transition-all duration-100"
                                            style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
                                        />
                                    </div>

                                    {/* Control Buttons */}
                                    <div className="glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-justify-between">
                                        <div className="glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-gap-4">
                                            <GlassButton
                                                variant="ghost"
                                                size="sm"
                                                onClick={handlePlayPause}
                                                className="glass-glass-glass-text-primary glass-glass-glass-p-2"
                                            >
                                                {isPlaying ? (
                                                    <Pause className="glass-glass-glass-w-5 glass-glass-glass-h-5" />
                                                ) : (
                                                    <Play className="glass-glass-glass-w-5 glass-glass-glass-h-5" />
                                                )}
                                            </GlassButton>

                                            <div className="glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-gap-2">
                                                <GlassButton
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={handleMuteToggle}
                                                    className="glass-glass-glass-text-primary glass-glass-glass-p-2"
                                                >
                                                    {isMuted || volume === 0 ? (
                                                        <VolumeX className="glass-glass-glass-w-5 glass-glass-glass-h-5" />
                                                    ) : (
                                                        <Volume2 className="glass-glass-glass-w-5 glass-glass-glass-h-5" />
                                                    )}
                                                </GlassButton>

                                                <div className="glass-glass-glass-w-20 glass-glass-glass-h-1 glass-surface-subtle/20 glass-radius-full glass-glass-glass-cursor-pointer">
                                                    <div
                                                        className="glass-glass-glass-h-full glass-surface-subtle glass-radius-full"
                                                        style={{ width: `${isMuted ? 0 : volume * 100}%` }}
                                                    />
                                                </div>
                                            </div>

                                            <span className="glass-glass-glass-text-primary glass-glass-glass-text-sm">
                                                {formatTime(currentTime)} / {formatTime(duration)}
                                            </span>
                                        </div>

                                        <div className="glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-gap-2">
                                            <span className="glass-glass-glass-text-primary glass-glass-glass-text-sm">{playbackSpeed}x</span>

                                            {enableFullscreen && (
                                                <GlassButton
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={handleFullscreenToggle}
                                                    className="glass-glass-glass-text-primary glass-glass-glass-p-2"
                                                >
                                                    {isFullscreen ? (
                                                        <Minimize className="glass-glass-glass-w-5 glass-glass-glass-h-5" />
                                                    ) : (
                                                        <Maximize className="glass-glass-glass-w-5 glass-glass-glass-h-5" />
                                                    )}
                                                </GlassButton>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </CardContent>
            </GlassCard>
        </Motion>
    );
};

export default GlassVideoPlayer;
