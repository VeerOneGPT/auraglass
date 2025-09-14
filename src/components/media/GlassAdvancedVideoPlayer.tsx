'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Glass } from '../../primitives';
import { cn } from '../../lib/utilsComprehensive';
import { useMedia, MediaFile, MediaChapter, TranscriptEntry } from './GlassMediaProvider';

export interface AdvancedVideoPlayerProps {
  mediaFile: MediaFile;
  className?: string;
  showControls?: boolean;
  showTranscript?: boolean;
  showChapters?: boolean;
  showAnalytics?: boolean;
  autoplay?: boolean;
  muted?: boolean;
  loop?: boolean;
  preload?: 'none' | 'metadata' | 'auto';
  poster?: string;
  onTimeUpdate?: (currentTime: number) => void;
  onEnded?: () => void;
  onError?: (error: string) => void;
}

interface ControlsProps {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  playbackRate: number;
  isFullscreen: boolean;
  isMuted: boolean;
  quality: string;
  buffered: number;
  onPlayPause: () => void;
  onSeek: (time: number) => void;
  onVolumeChange: (volume: number) => void;
  onPlaybackRateChange: (rate: number) => void;
  onQualityChange: (quality: string) => void;
  onFullscreenToggle: () => void;
  onMuteToggle: () => void;
}

const formatTime = (seconds: number): string => {
  if (isNaN(seconds)) return '0:00';
  
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  } else {
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  }
};

const VideoControls: React.FC<ControlsProps> = ({
  isPlaying,
  currentTime,
  duration,
  volume,
  playbackRate,
  isFullscreen,
  isMuted,
  quality,
  buffered,
  onPlayPause,
  onSeek,
  onVolumeChange,
  onPlaybackRateChange,
  onQualityChange,
  onFullscreenToggle,
  onMuteToggle
}) => {
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [showQualityMenu, setShowQualityMenu] = useState(false);
  const [seeking, setSeeking] = useState(false);

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const time = percent * duration;
    onSeek(time);
  };

  const handleProgressDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    if (seeking) {
      const rect = e.currentTarget.getBoundingClientRect();
      const percent = (e.clientX - rect.left) / rect.width;
      const time = Math.max(0, Math.min(duration, percent * duration));
      onSeek(time);
    }
  };

  const playbackSpeeds = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
  const qualities = ['auto', '144p', '240p', '360p', '480p', '720p', '1080p'];

  return (
    <div className="glass-glass-glass-absolute bottom-0 left-0 right-0 glass-gradient-primary glass-gradient-primary via-black/40 glass-gradient-primary glass-glass-glass-p-4">
      {/* Progress Bar */}
      <div
        className="glass-glass-glass-w-full glass-glass-glass-h-2 glass-surface-subtle/20 glass-radius-full glass-glass-glass-cursor-pointer glass-glass-glass-mb-4 glass-glass-glass-relative"
        onClick={handleProgressClick}
        onMouseMove={handleProgressDrag}
        onMouseDown={() => setSeeking(true)}
        onMouseUp={() => setSeeking(false)}
        onMouseLeave={() => setSeeking(false)}
      >
        {/* Buffered Progress */}
        <div
          className="glass-glass-glass-absolute top-0 left-0 glass-glass-glass-h-full glass-surface-subtle/30 glass-radius-full"
          style={{ width: `${(buffered / duration) * 100}%` }}
        />
        
        {/* Played Progress */}
        <div
          className="glass-glass-glass-absolute top-0 left-0 glass-glass-glass-h-full glass-surface-blue glass-radius-full"
          style={{ width: `${(currentTime / duration) * 100}%` }}
        />
        
        {/* Progress Handle */}
        <div
          className="glass-glass-glass-absolute glass--glass--glass--glass--glassglass--glass-top-1/2 transform -translate-y-1/2 glass-glass-glass-w-4 glass-glass-glass-h-4 glass-surface-blue glass-radius-full glass-glass-glass-border-2 glass-glass-glass-border-white glass-glass-glass-shadow-md"
          style={{ left: `calc(${(currentTime / duration) * 100}% - 8px)` }}
        />
      </div>

      <div className="glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-justify-between glass-glass-glass-text-primary">
        {/* Left Controls */}
        <div className="glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-gap-3">
          {/* Play/Pause */}
          <button
            onClick={onPlayPause}
            className="glass-glass-glass-w-12 glass-glass-glass-h-12 glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-justify-center glass-surface-subtle/20 hover:glass-surface-subtle/30 glass-radius-full transition-colors"
          >
            {isPlaying ? (
              <div className="glass-glass-glass-flex glass-glass-glass-gap-1">
                <div className="glass-glass-glass-w-1 glass-glass-glass-h-4 glass-surface-subtle glass-radius-full" />
                <div className="glass-glass-glass-w-1 glass-glass-glass-h-4 glass-surface-subtle glass-radius-full" />
              </div>
            ) : (
              <div className="glass-glass-glass-w-0 glass-glass-glass-h-0 glass-glass-glass-border-l-4 glass-glass-glass-border-l-white glass-glass-glass-border-y-4 glass-glass-glass-border-y-transparent ml-1" />
            )}
          </button>

          {/* Volume */}
          <div
            className="glass-glass-glass-relative"
            onMouseEnter={() => setShowVolumeSlider(true)}
            onMouseLeave={() => setShowVolumeSlider(false)}
          >
            <button
              onClick={onMuteToggle}
              className="glass-glass-glass-w-10 glass-glass-glass-h-10 glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-justify-center hover:glass-surface-subtle/20 glass-radius-full transition-colors"
            >
              {isMuted || volume === 0 ? '🔇' : volume < 0.5 ? '🔉' : '🔊'}
            </button>
            
            {showVolumeSlider && (
              <div className="glass-glass-glass-absolute bottom-12 left-1/2 transform -translate-x-1/2 glass-surface-dark/80 glass-radius-lg glass-glass-glass-p-2">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => onVolumeChange(Number(e.target.value))}
                  className="glass-glass-glass-w-16 glass-glass-glass-h-1 glass-surface-subtle/20 glass-radius-full appearance-none slider-thumb-white"
                />
              </div>
            )}
          </div>

          {/* Time Display */}
          <div className="glass-glass-glass-text-sm font-mono">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
        </div>

        {/* Right Controls */}
        <div className="glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-gap-3">
          {/* Playback Speed */}
          <div className="glass-glass-glass-relative">
            <button
              onClick={() => setShowSpeedMenu(!showSpeedMenu)}
              className="glass-glass-glass-px-3 glass-glass-glass-py-2 glass-glass-glass-text-sm hover:glass-surface-subtle/20 glass-radius-md transition-colors"
            >
              {playbackRate}x
            </button>
            
            {showSpeedMenu && (
              <div className="glass-glass-glass-absolute bottom-12 right-0 glass-surface-dark/90 glass-radius-lg glass-glass-glass-p-2 glass-min-glass-glass-w-20">
                {playbackSpeeds.map(speed => (
                  <button
                    key={speed}
                    onClick={() => {
                      onPlaybackRateChange(speed);
                      setShowSpeedMenu(false);
                    }}
                    className={cn(
                      "block w-full text-left px-3 py-2 text-sm rounded hover:bg-white/20 transition-colors",
                      speed === playbackRate && "bg-blue-500"
                    )}
                  >
                    {speed}x
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quality */}
          <div className="glass-glass-glass-relative">
            <button
              onClick={() => setShowQualityMenu(!showQualityMenu)}
              className="glass-glass-glass-px-3 glass-glass-glass-py-2 glass-glass-glass-text-sm hover:glass-surface-subtle/20 glass-radius-md transition-colors"
            >
              {quality}
            </button>
            
            {showQualityMenu && (
              <div className="glass-glass-glass-absolute bottom-12 right-0 glass-surface-dark/90 glass-radius-lg glass-glass-glass-p-2 glass-min-glass-glass-w-20">
                {qualities.map(q => (
                  <button
                    key={q}
                    onClick={() => {
                      onQualityChange(q);
                      setShowQualityMenu(false);
                    }}
                    className={cn(
                      "block w-full text-left px-3 py-2 text-sm rounded hover:bg-white/20 transition-colors",
                      q === quality && "bg-blue-500"
                    )}
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Fullscreen */}
          <button
            onClick={onFullscreenToggle}
            className="glass-glass-glass-w-10 glass-glass-glass-h-10 glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-justify-center hover:glass-surface-subtle/20 glass-radius-full transition-colors"
          >
            {isFullscreen ? '⊟' : '⊞'}
          </button>
        </div>
      </div>
    </div>
  );
};

const ChapterList: React.FC<{
  chapters: MediaChapter[];
  currentTime: number;
  onChapterClick: (chapter: MediaChapter) => void;
}> = ({ chapters, currentTime, onChapterClick }) => {
  return (
    <div className="glass-surface-subtle glass-glass-glass-text-primary glass-glass-glass-p-4 glass-radius-lg">
      <h3 className="glass-glass-glass-text-lg glass-glass-glass-font-semibold glass-glass-glass-mb-4">Chapters</h3>
      <div className="glass-glass-glass-space-y-2 max-glass-glass-glass-h-96 glass-glass-glass-overflow-y-auto">
        {chapters.map(chapter => {
          const isActive = currentTime >= chapter.startTime && currentTime <= chapter.endTime;
          
          return (
            <button
              key={chapter.id}
              onClick={() => onChapterClick(chapter)}
              className={cn(
                "flex items-center gap-3 w-full p-3 rounded-lg text-left transition-colors",
                isActive ? "bg-blue-600" : "bg-gray-800 hover:bg-gray-700"
              )}
            >
              {chapter.thumbnail && (
                <img
                  src={chapter.thumbnail}
                  alt={chapter.title}
                  className="glass-glass-glass-w-16 h-9 object-cover glass-radius"
                />
              )}
              <div className="glass-glass-glass-flex-1">
                <div className="glass-glass-glass-font-medium">{chapter.title}</div>
                <div className="glass-glass-glass-text-sm glass-text-secondary">
                  {formatTime(chapter.startTime)} - {formatTime(chapter.endTime)}
                </div>
                {chapter.description && (
                  <div className="glass-glass-glass-text-xs glass-text-secondary mt-1">
                    {chapter.description}
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

const TranscriptPanel: React.FC<{
  transcript: TranscriptEntry[];
  currentTime: number;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onTranscriptClick: (entry: TranscriptEntry) => void;
}> = ({ transcript, currentTime, searchQuery, onSearchChange, onTranscriptClick }) => {
  const [highlightedResults, setHighlightedResults] = useState<TranscriptEntry[]>([]);

  useEffect(() => {
    if (searchQuery) {
      const results = transcript.filter(entry =>
        entry.text.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setHighlightedResults(results);
    } else {
      setHighlightedResults([]);
    }
  }, [searchQuery, transcript]);

  const highlightText = (text: string, query: string) => {
    if (!query) return text;
    
    const regex = new RegExp(`(${query})`, 'gi');
    return text.split(regex).map((part, index) => 
      part.toLowerCase() === query.toLowerCase() ? (
        <mark key={index} className="glass-surface-subtle glass-text-inverse glass-radius glass-glass-glass-px-1">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <div className="glass-surface-subtle glass-glass-glass-text-primary glass-glass-glass-p-4 glass-radius-lg glass-glass-glass-h-full glass-glass-glass-flex glass-glass-glass-flex-col">
      <div className="glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-justify-between glass-glass-glass-mb-4">
        <h3 className="glass-glass-glass-text-lg glass-glass-glass-font-semibold">Transcript</h3>
        <div className="glass-glass-glass-text-sm glass-text-secondary">
          {transcript.length} entries
        </div>
      </div>

      {/* Search */}
      <div className="glass-glass-glass-mb-4">
        <input
          type="text"
          placeholder="Search transcript..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="glass-glass-glass-w-full glass-glass-glass-px-3 glass-glass-glass-py-2 glass-surface-primary glass-glass-glass-border glass-glass-glass-border-gray-700 glass-radius-lg glass-glass-glass-text-primary placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {searchQuery && (
          <div className="glass-glass-glass-text-sm glass-text-secondary mt-2">
            {highlightedResults.length} results found
          </div>
        )}
      </div>

      {/* Transcript Entries */}
      <div className="glass-glass-glass-flex-1 glass-glass-glass-overflow-y-auto glass-glass-glass-space-y-3">
        {(searchQuery ? highlightedResults : transcript).map(entry => {
          const isActive = currentTime >= entry.startTime && currentTime <= entry.endTime;
          const confidence = entry.confidence || 0;
          
          return (
            <button
              key={entry.id}
              onClick={() => onTranscriptClick(entry)}
              className={cn(
                "flex flex-col items-start gap-2 w-full p-3 rounded-lg text-left transition-colors",
                isActive ? "bg-blue-600" : "bg-gray-800 hover:bg-gray-700"
              )}
            >
              <div className="glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-justify-between glass-glass-glass-w-full">
                <div className="glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-gap-2">
                  <span className="glass-glass-glass-text-xs glass-text-secondary font-mono">
                    {formatTime(entry.startTime)}
                  </span>
                  {entry.speaker && (
                    <span className="glass-glass-glass-text-xs glass-surface-subtle text-gray-300 glass-glass-glass-px-2 glass-glass-glass-py-1 glass-radius">
                      {entry.speaker}
                    </span>
                  )}
                </div>
                <div className="glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-gap-2">
                  {confidence > 0 && (
                    <div
                      className={cn(
                        "text-xs px-2 py-1 rounded",
                        confidence > 0.9 ? "bg-green-600" : 
                        confidence > 0.7 ? "bg-yellow-600" : "bg-red-600"
                      )}
                    >
                      {Math.round(confidence * 100)}%
                    </div>
                  )}
                  {entry.sentiment && (
                    <div className="glass-glass-glass-text-xs">
                      {entry.sentiment === 'positive' ? '😊' : 
                       entry.sentiment === 'negative' ? '😔' : '😐'}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="glass-glass-glass-text-sm leading-relaxed">
                {searchQuery ? highlightText(entry.text, searchQuery) : entry.text}
              </div>
              
              {entry.keywords && entry.keywords.length > 0 && (
                <div className="glass-glass-glass-flex glass-glass-glass-flex-wrap glass-glass-glass-gap-1 mt-2">
                  {entry.keywords.map(keyword => (
                    <span
                      key={keyword}
                      className="glass-glass-glass-text-xs glass-surface-subtle text-gray-300 glass-glass-glass-px-2 glass-glass-glass-py-1 glass-radius"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export const GlassAdvancedVideoPlayer: React.FC<AdvancedVideoPlayerProps> = ({
  mediaFile,
  className,
  showControls = true,
  showTranscript = false,
  showChapters = false,
  showAnalytics = false,
  autoplay = false,
  muted = false,
  loop = false,
  preload = 'metadata',
  poster,
  onTimeUpdate,
  onEnded,
  onError
}) => {
  const {
    playbackState,
    setPlaybackState,
    play,
    pause,
    seekTo,
    setVolume,
    setPlaybackRate,
    toggleMute,
    toggleFullscreen,
    setQuality,
    transcripts,
    generateTranscript,
    searchTranscript,
    getTranscriptAtTime,
    setActiveChapter,
    getChapterAtTime,
    trackView,
    trackEngagement
  } = useMedia();

  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [showControlsOverlay, setShowControlsOverlay] = useState(showControls);
  const [controlsTimeout, setControlsTimeout] = useState<NodeJS.Timeout | null>(null);
  const [transcriptSearch, setTranscriptSearch] = useState('');
  const [hasTranscript, setHasTranscript] = useState(false);

  const isPlaying = playbackState?.mediaId === mediaFile.id && playbackState.isPlaying;
  const currentTime = playbackState?.mediaId === mediaFile.id ? playbackState.currentTime : 0;
  const duration = playbackState?.mediaId === mediaFile.id ? playbackState.duration : mediaFile.duration || 0;
  const volume = playbackState?.volume || 1;
  const playbackRate = playbackState?.playbackRate || 1;
  const isFullscreen = playbackState?.isFullscreen || false;
  const isMuted = playbackState?.isMuted || false;
  const quality = playbackState?.quality || 'auto';

  // Initialize transcript
  useEffect(() => {
    if (!transcripts[mediaFile.id] && showTranscript) {
      generateTranscript(mediaFile.id).then(() => {
        setHasTranscript(true);
      });
    } else if (transcripts[mediaFile.id]) {
      setHasTranscript(true);
    }
  }, [mediaFile.id, showTranscript, generateTranscript, transcripts]);

  // Mouse movement handling for controls
  const handleMouseMove = useCallback(() => {
    setShowControlsOverlay(true);
    
    if (controlsTimeout) {
      clearTimeout(controlsTimeout);
    }
    
    const timeout = setTimeout(() => {
      if (isPlaying) {
        setShowControlsOverlay(false);
      }
    }, 3000);
    
    setControlsTimeout(timeout);
  }, [isPlaying, controlsTimeout]);

  // Video event handlers
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const currentTime = videoRef.current.currentTime;
      
      if (playbackState && playbackState.mediaId === mediaFile.id) {
        setPlaybackState({ ...playbackState, currentTime });
      }
      
      onTimeUpdate?.(currentTime);
      
      // Update active chapter
      const activeChapter = getChapterAtTime(mediaFile.id, currentTime);
      if (activeChapter) {
        setActiveChapter(mediaFile.id, activeChapter.id);
      }
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      const duration = videoRef.current.duration;
      if (playbackState && playbackState.mediaId === mediaFile.id) {
        setPlaybackState({ ...playbackState, duration, isLoading: false });
      }
    }
  };

  const handleEnded = () => {
    if (playbackState && playbackState.mediaId === mediaFile.id) {
      setPlaybackState({ ...playbackState, isPlaying: false, currentTime: 0 });
    }
    
    trackView(mediaFile.id, duration);
    onEnded?.();
  };

  const handleError = () => {
    if (playbackState && playbackState.mediaId === mediaFile.id) {
      setPlaybackState({ ...playbackState, isError: true, isLoading: false });
    }
    
    onError?.('Video playback error occurred');
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      pause();
      if (videoRef.current) {
        videoRef.current.pause();
      }
    } else {
      play(mediaFile.id);
      if (videoRef.current) {
        videoRef.current.play();
      }
    }
  };

  const handleSeek = (time: number) => {
    seekTo(time);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
  };

  const handlePlaybackRateChange = (rate: number) => {
    setPlaybackRate(rate);
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
    }
  };

  const handleMuteToggle = () => {
    toggleMute();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
  };

  const handleFullscreenToggle = () => {
    toggleFullscreen();
    
    if (!isFullscreen) {
      if (containerRef.current?.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  const handleChapterClick = (chapter: MediaChapter) => {
    handleSeek(chapter.startTime);
    setActiveChapter(mediaFile.id, chapter.id);
  };

  const handleTranscriptClick = (entry: TranscriptEntry) => {
    handleSeek(entry.startTime);
  };

  return (
    <div className={cn("relative bg-black rounded-lg overflow-hidden", className)}>
      <div
        ref={containerRef}
        className="glass-glass-glass-relative glass-glass-glass-w-full glass-glass-glass-h-full glass-glass-glass-flex"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setShowControlsOverlay(false)}
      >
        {/* Video Container */}
        <div className="glass-glass-glass-flex-1 glass-glass-glass-relative">
          <video
            ref={videoRef}
            src={mediaFile.src}
            poster={poster || mediaFile.poster}
            autoPlay={autoplay}
            muted={muted}
            loop={loop}
            preload={preload}
            className="glass-glass-glass-w-full glass-glass-glass-h-full object-contain"
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={handleEnded}
            onError={handleError}
            onClick={handlePlayPause}
          />

          {/* Loading Overlay */}
          {playbackState?.isLoading && (
            <div className="glass-glass-glass-absolute glass-glass-glass-inset-0 glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-justify-center glass-surface-dark/50">
              <div className="animate-spin glass-radius-full glass-glass-glass-h-16 glass-glass-glass-w-16 glass-glass-glass-border-4 glass-glass-glass-border-white glass-glass-glass-border-t-transparent" />
            </div>
          )}

          {/* Error Overlay */}
          {playbackState?.isError && (
            <div className="glass-glass-glass-absolute glass-glass-glass-inset-0 glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-justify-center glass-surface-dark/80 glass-glass-glass-text-primary">
              <div className="glass-glass-glass-text-center">
                <div className="glass-glass-glass-text-4xl glass-glass-glass-mb-4">⚠️</div>
                <h3 className="glass-glass-glass-text-xl glass-glass-glass-font-semibold glass-glass-glass-mb-2">Playback Error</h3>
                <p className="text-gray-300">Unable to load video content</p>
              </div>
            </div>
          )}

          {/* Controls Overlay */}
          {showControlsOverlay && (
            <VideoControls
              isPlaying={isPlaying}
              currentTime={currentTime}
              duration={duration}
              volume={volume}
              playbackRate={playbackRate}
              isFullscreen={isFullscreen}
              isMuted={isMuted}
              quality={quality}
              buffered={videoRef.current?.buffered.length ? 
                videoRef.current.buffered.end(videoRef.current.buffered.length - 1) : 0}
              onPlayPause={handlePlayPause}
              onSeek={handleSeek}
              onVolumeChange={handleVolumeChange}
              onPlaybackRateChange={handlePlaybackRateChange}
              onQualityChange={setQuality}
              onFullscreenToggle={handleFullscreenToggle}
              onMuteToggle={handleMuteToggle}
            />
          )}
        </div>

        {/* Side Panels */}
        <div className="glass-glass-glass-flex">
          {/* Chapters Panel */}
          {showChapters && mediaFile.chapters && mediaFile.chapters.length > 0 && (
            <Glass className="glass-glass-glass-w-80 glass-glass-glass-h-full overflow-hidden">
              <ChapterList
                chapters={mediaFile.chapters}
                currentTime={currentTime}
                onChapterClick={handleChapterClick}
              />
            </Glass>
          )}

          {/* Transcript Panel */}
          {showTranscript && hasTranscript && transcripts[mediaFile.id] && (
            <Glass className="glass-glass-glass-w-96 glass-glass-glass-h-full overflow-hidden">
              <TranscriptPanel
                transcript={transcripts[mediaFile.id]}
                currentTime={currentTime}
                searchQuery={transcriptSearch}
                onSearchChange={setTranscriptSearch}
                onTranscriptClick={handleTranscriptClick}
              />
            </Glass>
          )}
        </div>
      </div>
    </div>
  );
};
