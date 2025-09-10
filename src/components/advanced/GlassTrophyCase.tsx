'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {
    BookOpen,
    Calendar,
    Clock,
    Crown,
    Diamond,
    Eye,
    Flame,
    Gift,
    Grid,
    Heart,
    List,
    Lock,
    Search,
    Share2,
    Sparkles,
    Target,
    TrendingUp,
    Trophy,
    Unlock,
    Zap
} from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react';
import { cn } from '@/lib/utilsComprehensive';

type AchievementTier = 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';
type AchievementCategory = 'reading' | 'engagement' | 'social' | 'exploration' | 'time' | 'special';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  tier: AchievementTier;
  category: AchievementCategory;
  progress: number;
  maxProgress: number;
  unlocked: boolean;
  unlockedAt?: Date;
  rarity: number; // 1-100, how rare this achievement is
  points: number;
  prerequisite?: string[]; // IDs of required achievements
  secret?: boolean; // Hidden until unlocked
  animated?: boolean;
  glowColor: string;
  reward?: {
    type: 'theme' | 'badge' | 'feature' | 'title';
    value: string;
  };
}

interface GlassTrophyCaseProps {
  achievements?: Achievement[];
  userStats?: Record<string, number>;
  onAchievementUnlock?: (achievement: Achievement) => void;
  showProgress?: boolean;
  enableSound?: boolean;
  className?: string;
}

const tierColors: Record<AchievementTier, { primary: string; secondary: string; glow: string; }> = {
  bronze: { primary: '#CD7F32', secondary: '#8B4513', glow: '#FFD700' },
  silver: { primary: '#C0C0C0', secondary: '#A9A9A9', glow: '#E6E6FA' },
  gold: { primary: '#FFD700', secondary: '#FFA500', glow: '#FFFF99' },
  platinum: { primary: '#E5E4E2', secondary: '#BCC6CC', glow: '#F0F8FF' },
  diamond: { primary: '#B9F2FF', secondary: '#87CEEB', glow: '#00FFFF' }
};

const categoryIcons: Record<AchievementCategory, React.ComponentType<{ className?: string }>> = {
  reading: BookOpen,
  engagement: Heart,
  social: Share2,
  exploration: Eye,
  time: Clock,
  special: Sparkles
};

const defaultAchievements: Achievement[] = [
  {
    id: 'first-article',
    title: 'First Steps',
    description: 'Read your first article',
    icon: BookOpen,
    tier: 'bronze',
    category: 'reading',
    progress: 1,
    maxProgress: 1,
    unlocked: true,
    unlockedAt: new Date('2024-01-15'),
    rarity: 95,
    points: 10,
    glowColor: '#FFD700'
  },
  {
    id: 'speed-reader',
    title: 'Speed Reader',
    description: 'Read 50 articles',
    icon: Zap,
    tier: 'silver',
    category: 'reading',
    progress: 47,
    maxProgress: 50,
    unlocked: false,
    rarity: 60,
    points: 50,
    glowColor: '#E6E6FA'
  },
  {
    id: 'bookworm',
    title: 'Bookworm',
    description: 'Read 500 articles',
    icon: BookOpen,
    tier: 'gold',
    category: 'reading',
    progress: 347,
    maxProgress: 500,
    unlocked: false,
    rarity: 15,
    points: 200,
    glowColor: '#FFFF99'
  },
  {
    id: 'streak-master',
    title: 'Streak Master',
    description: 'Maintain a 30-day reading streak',
    icon: Flame,
    tier: 'gold',
    category: 'time',
    progress: 15,
    maxProgress: 30,
    unlocked: false,
    rarity: 20,
    points: 150,
    glowColor: '#FF6347'
  },
  {
    id: 'early-bird',
    title: 'Early Bird',
    description: 'Read 10 articles before 8 AM',
    icon: Calendar,
    tier: 'bronze',
    category: 'time',
    progress: 3,
    maxProgress: 10,
    unlocked: false,
    rarity: 40,
    points: 30,
    glowColor: '#87CEEB'
  },
  {
    id: 'social-butterfly',
    title: 'Social Butterfly',
    description: 'Share 25 articles',
    icon: Share2,
    tier: 'silver',
    category: 'social',
    progress: 12,
    maxProgress: 25,
    unlocked: false,
    rarity: 35,
    points: 75,
    glowColor: '#FFB6C1'
  },
  {
    id: 'curator',
    title: 'Curator',
    description: 'Bookmark 100 articles',
    icon: Target,
    tier: 'silver',
    category: 'engagement',
    progress: 67,
    maxProgress: 100,
    unlocked: false,
    rarity: 45,
    points: 60,
    glowColor: '#98FB98'
  },
  {
    id: 'explorer',
    title: 'Explorer',
    description: 'Read articles from 10 different categories',
    icon: Eye,
    tier: 'gold',
    category: 'exploration',
    progress: 7,
    maxProgress: 10,
    unlocked: false,
    rarity: 25,
    points: 120,
    glowColor: '#DDA0DD'
  },
  {
    id: 'trendsetter',
    title: 'Trendsetter',
    description: 'Be among first 10 to read 5 trending articles',
    icon: TrendingUp,
    tier: 'platinum',
    category: 'special',
    progress: 2,
    maxProgress: 5,
    unlocked: false,
    rarity: 5,
    points: 300,
    glowColor: '#F0F8FF'
  },
  {
    id: 'perfectionist',
    title: 'Perfectionist',
    description: 'Complete 50 article quizzes with 100% score',
    icon: Crown,
    tier: 'diamond',
    category: 'engagement',
    progress: 12,
    maxProgress: 50,
    unlocked: false,
    rarity: 2,
    points: 500,
    glowColor: '#00FFFF'
  },
  {
    id: 'night-owl',
    title: 'Night Owl',
    description: 'Read 20 articles after midnight',
    icon: Calendar,
    tier: 'bronze',
    category: 'time',
    progress: 8,
    maxProgress: 20,
    unlocked: false,
    rarity: 30,
    points: 40,
    glowColor: '#191970'
  },
  {
    id: 'glass-master',
    title: 'Glass Master',
    description: 'Discover the rainbow glass mode',
    icon: Diamond,
    tier: 'diamond',
    category: 'special',
    progress: 0,
    maxProgress: 1,
    unlocked: false,
    secret: true,
    rarity: 1,
    points: 1000,
    glowColor: '#FF1493',
    reward: {
      type: 'theme',
      value: 'rainbow-exclusive'
    }
  }
];

export function GlassTrophyCase({
  achievements = defaultAchievements,
  userStats = {},
  onAchievementUnlock,
  showProgress = true,
  enableSound = true,
  className = ''
}: GlassTrophyCaseProps) {
  const [selectedCategory, setSelectedCategory] = useState<AchievementCategory | 'all'>('all');
  const [selectedTier, setSelectedTier] = useState<AchievementTier | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'recent' | 'progress' | 'rarity' | 'points'>('recent');
  const [showLocked, setShowLocked] = useState(true);
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);

  // Filter and sort achievements
  const filteredAchievements = useMemo(() => {
    return achievements
      .filter(achievement => {
        // Category filter
        if (selectedCategory !== 'all' && achievement.category !== selectedCategory) {
          return false;
        }

        // Tier filter
        if (selectedTier !== 'all' && achievement.tier !== selectedTier) {
          return false;
        }

        // Show locked filter
        if (!showLocked && !achievement.unlocked) {
          return false;
        }

        // Search filter
        if (searchQuery) {
          const query = searchQuery.toLowerCase();
          return achievement.title.toLowerCase().includes(query) ||
                 achievement.description.toLowerCase().includes(query);
        }

        // Secret achievements
        if (achievement.secret && !achievement.unlocked) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'recent':
            if (a.unlockedAt && b.unlockedAt) {
              return b.unlockedAt.getTime() - a.unlockedAt.getTime();
            }
            return a.unlocked === b.unlocked ? 0 : a.unlocked ? -1 : 1;

          case 'progress':
            const aProgress = a.progress / a.maxProgress;
            const bProgress = b.progress / b.maxProgress;
            return bProgress - aProgress;

          case 'rarity':
            return a.rarity - b.rarity;

          case 'points':
            return b.points - a.points;

          default:
            return 0;
        }
      });
  }, [achievements, selectedCategory, selectedTier, searchQuery, showLocked, sortBy]);

  // Calculate stats
  const stats = useMemo(() => {
    const unlocked = achievements.filter(a => a.unlocked).length;
    const total = achievements.filter(a => !a.secret || a.unlocked).length;
    const totalPoints = achievements
      .filter(a => a.unlocked)
      .reduce((sum, a) => sum + a.points, 0);

    const tierCounts = achievements.reduce((counts, achievement) => {
      if (achievement.unlocked) {
        counts[achievement.tier] = (counts[achievement.tier] || 0) + 1;
      }
      return counts;
    }, {} as Record<AchievementTier, number>);

    return {
      unlocked,
      total,
      totalPoints,
      tierCounts,
      completionRate: Math.round((unlocked / total) * 100)
    };
  }, [achievements]);

  // Categories with counts
  const categories = useMemo(() => {
    const categoryCounts = achievements.reduce((counts, achievement) => {
      counts[achievement.category] = (counts[achievement.category] || 0) + 1;
      return counts;
    }, {} as Record<AchievementCategory, number>);

    return Object.entries(categoryCounts).map(([category, count]) => ({
      id: category as AchievementCategory,
      name: category.charAt(0).toUpperCase() + category.slice(1),
      count,
      icon: categoryIcons[category as AchievementCategory]
    }));
  }, [achievements]);

  // Play unlock sound
  const playUnlockSound = () => {
    if (!enableSound) return;

    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      // Victory fanfare
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C, E, G, C
      notes.forEach((freq, index) => {
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();

        osc.connect(gain);
        gain.connect(audioContext.destination);

        osc.frequency.value = freq;
        osc.type = 'sine';

        gain.gain.setValueAtTime(0.1, audioContext.currentTime + index * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5 + index * 0.1);

        osc.start(audioContext.currentTime + index * 0.1);
        osc.stop(audioContext.currentTime + 0.5 + index * 0.1);
      });
    } catch (error) {
      console.warn('Unable to play unlock sound:', error);
    }
  };

  // Check for newly unlocked achievements
  useEffect(() => {
    achievements.forEach(achievement => {
      if (!achievement.unlocked && achievement.progress >= achievement.maxProgress) {
        const updatedAchievement = { ...achievement, unlocked: true, unlockedAt: new Date() };
        playUnlockSound();
        onAchievementUnlock?.(updatedAchievement);
      }
    });
  }, [achievements, onAchievementUnlock]);

  const AchievementCard = ({ achievement }: { achievement: Achievement }) => {
    const tierColor = tierColors[achievement.tier];
    const progressPercentage = (achievement.progress / achievement.maxProgress) * 100;

    return (
      <motion.div
        className={`relative p-6 rounded-xl border-2 cursor-pointer transition-all ${
          achievement.unlocked
            ? 'border-white/40 bg-white/10 hover:bg-white/15'
            : 'border-white/20 bg-white/5 hover:bg-white/10 opacity-70'
        }`}
        style={{
          borderColor: achievement.unlocked ? tierColor.primary : undefined,
          boxShadow: achievement.unlocked
            ? `0 0 20px ${tierColor.glow}40, inset 0 0 20px ${tierColor.primary}10`
            : undefined
        }}
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setSelectedAchievement(achievement)}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        layout
      >
        {/* Tier badge */}
        <div
          className="absolute -top-2 -right-2 px-2 py-1 rounded-full text-xs font-bold border"
          style={{
            backgroundColor: `${tierColor.primary}20`,
            borderColor: `${tierColor.primary}40`,
            color: tierColor.primary
          }}
        >
          {achievement.tier.toUpperCase()}
        </div>

        {/* Unlock glow effect */}
        {achievement.unlocked && (
          <motion.div
            className="absolute inset-0 rounded-xl"
            style={{
              background: `radial-gradient(circle at center, ${tierColor.glow}20 0%, transparent 70%)`,
              filter: 'blur(10px)'
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}

        {/* Lock overlay for locked achievements */}
        {!achievement.unlocked && (
          <div className="absolute top-4 right-4">
            <Lock className="w-5 h-5 text-white/40" />
          </div>
        )}

        {/* Achievement icon */}
        <div className="flex items-center justify-center mb-4">
          <div
            className={`p-4 rounded-full border-2 ${
              achievement.unlocked ? 'border-white/40' : 'border-white/20'
            }`}
            style={{
              backgroundColor: `${tierColor.primary}20`,
              borderColor: achievement.unlocked ? tierColor.primary : undefined
            }}
          >
            <achievement.icon
              className={`w-8 h-8 ${
                achievement.unlocked ? 'text-white' : 'text-white/50'
              }`}
            />
          </div>
        </div>

        {/* Achievement details */}
        <div className="text-center mb-4">
          <h3 className={`text-lg font-bold mb-2 ${
            achievement.unlocked ? 'text-white' : 'text-white/60'
          }`}>
            {achievement.title}
          </h3>
          <p className={`text-sm ${
            achievement.unlocked ? 'text-white/80' : 'text-white/50'
          }`}>
            {achievement.description}
          </p>
        </div>

        {/* Progress bar */}
        {showProgress && !achievement.unlocked && (
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-white/60">Progress</span>
              <span className="text-xs text-white/60">
                {achievement.progress}/{achievement.maxProgress}
              </span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: tierColor.primary }}
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
              />
            </div>
          </div>
        )}

        {/* Points and rarity */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-yellow-400" />
            <span className="text-white/60">{achievement.points} pts</span>
          </div>
          <div className="flex items-center gap-1">
            <Diamond className="w-3 h-3 text-white/40" />
            <span className="text-white/40">{achievement.rarity}% rare</span>
          </div>
        </div>

        {/* Unlock date */}
        {achievement.unlocked && achievement.unlockedAt && (
          <div className="mt-2 text-center">
            <span className="text-xs text-white/50">
              Unlocked {achievement.unlockedAt.toLocaleDateString()}
            </span>
          </div>
        )}
      </motion.div>
    );
  };

  return (
    <div className={`w-full max-w-7xl mx-auto ${className}`}>
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <Trophy className="w-8 h-8 text-yellow-400" />
            Glass Trophy Case
          </h1>
          <p className="text-white/60">
            Showcase your reading achievements and unlock special rewards
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          {/* Stats */}
          <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-xl p-4">
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{stats.unlocked}</div>
                <div className="text-xs text-white/60">Unlocked</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{stats.total}</div>
                <div className="text-xs text-white/60">Total</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">{stats.totalPoints}</div>
                <div className="text-xs text-white/60">Points</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-4 mb-6">
        {/* Search */}
        <div className="relative flex-1 min-w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search achievements..."
            className={cn(
              'glass-foundation-complete glass-w-full glass-pl-10 glass-pr-4 glass-py-3',
              'glass-text-primary placeholder:glass-text-muted glass-radius-xl',
              'glass-border-subtle glass-focus glass-transition'
            )}
          />
        </div>

        {/* Category filter */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value as any)}
          className={cn(
            'glass-foundation-complete glass-px-4 glass-py-3 glass-radius-xl',
            'glass-text-primary glass-border-subtle glass-focus glass-transition'
          )}
        >
          <option value="all">All Categories</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name} ({category.count})
            </option>
          ))}
        </select>

        {/* Tier filter */}
        <select
          value={selectedTier}
          onChange={(e) => setSelectedTier(e.target.value as any)}
          className={cn(
            'glass-foundation-complete glass-px-4 glass-py-3 glass-radius-xl',
            'glass-text-primary glass-border-subtle glass-focus glass-transition'
          )}
        >
          <option value="all">All Tiers</option>
          <option value="bronze">Bronze</option>
          <option value="silver">Silver</option>
          <option value="gold">Gold</option>
          <option value="platinum">Platinum</option>
          <option value="diamond">Diamond</option>
        </select>

        {/* Sort */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as any)}
          className={cn(
            'glass-foundation-complete glass-px-4 glass-py-3 glass-radius-xl',
            'glass-text-primary glass-border-subtle glass-focus glass-transition'
          )}
        >
          <option value="recent">Recent</option>
          <option value="progress">Progress</option>
          <option value="rarity">Rarity</option>
          <option value="points">Points</option>
        </select>

        {/* View mode */}
        <div className="flex bg-white/10 rounded-xl p-1">
          <motion.button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg transition-all ${
              viewMode === 'grid' ? 'bg-white/20 text-white' : 'text-white/60'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Grid className="w-4 h-4" />
          </motion.button>
          <motion.button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg transition-all ${
              viewMode === 'list' ? 'bg-white/20 text-white' : 'text-white/60'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <List className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Show locked toggle */}
        <motion.button
          onClick={() => setShowLocked(!showLocked)}
          className={`px-4 py-3 border border-white/20 rounded-xl transition-all ${
            showLocked ? 'bg-white/10 text-white' : 'bg-white/5 text-white/60'
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {showLocked ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
        </motion.button>
      </div>

      {/* Achievements Grid/List */}
      <motion.div
        className={viewMode === 'grid'
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
          : 'space-y-4'
        }
        layout
      >
        <AnimatePresence>
          {filteredAchievements.map((achievement) => (
            <AchievementCard key={achievement.id} achievement={achievement} />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Achievement Detail Modal */}
      <AnimatePresence>
        {selectedAchievement && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedAchievement(null)}
            />

            <motion.div
              className="fixed inset-0 flex items-center justify-center z-50 p-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <div className="max-w-lg w-full backdrop-blur-lg bg-white/10 border border-white/20 rounded-xl p-8">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-4">
                    <div
                      className="p-6 rounded-full border-2"
                      style={{
                        backgroundColor: `${tierColors[selectedAchievement.tier].primary}20`,
                        borderColor: tierColors[selectedAchievement.tier].primary
                      }}
                    >
                      <selectedAchievement.icon
                        className="w-12 h-12"
                      />
                    </div>
                  </div>

                  <h2 className="text-2xl font-bold text-white mb-2">
                    {selectedAchievement.title}
                  </h2>

                  <div className="flex items-center justify-center gap-2 mb-4">
                    <div
                      className="px-3 py-1 rounded-full text-sm font-bold border"
                      style={{
                        backgroundColor: `${tierColors[selectedAchievement.tier].primary}20`,
                        borderColor: `${tierColors[selectedAchievement.tier].primary}40`,
                        color: tierColors[selectedAchievement.tier].primary
                      }}
                    >
                      {selectedAchievement.tier.toUpperCase()}
                    </div>
                    <div className="px-3 py-1 bg-white/10 border border-white/20 rounded-full text-sm text-white/80">
                      {selectedAchievement.rarity}% rare
                    </div>
                  </div>

                  <p className="text-white/70 mb-6">
                    {selectedAchievement.description}
                  </p>

                  {!selectedAchievement.unlocked && (
                    <div className="mb-6">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-white/60">Progress</span>
                        <span className="text-sm text-white/60">
                          {selectedAchievement.progress}/{selectedAchievement.maxProgress}
                        </span>
                      </div>
                      <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-1000"
                          style={{
                            backgroundColor: tierColors[selectedAchievement.tier].primary,
                            width: `${(selectedAchievement.progress / selectedAchievement.maxProgress) * 100}%`
                          }}
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-center gap-6 mb-6">
                    <div className="text-center">
                      <div className="text-xl font-bold text-yellow-400">
                        {selectedAchievement.points}
                      </div>
                      <div className="text-sm text-white/60">Points</div>
                    </div>

                    <div className="text-center">
                      <div className="text-xl font-bold text-white">
                        {selectedAchievement.category}
                      </div>
                      <div className="text-sm text-white/60">Category</div>
                    </div>
                  </div>

                  {selectedAchievement.reward && (
                    <div className="p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl mb-6">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Gift className="w-5 h-5 text-purple-400" />
                        <span className="text-white font-medium">Reward</span>
                      </div>
                      <div className="text-purple-300 text-sm">
                        Unlocks: {selectedAchievement.reward.value}
                      </div>
                    </div>
                  )}

                  {selectedAchievement.unlocked && selectedAchievement.unlockedAt && (
                    <div className="text-green-400 text-sm">
                      ✓ Unlocked on {selectedAchievement.unlockedAt.toLocaleDateString()}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Empty state */}
      {filteredAchievements.length === 0 && (
        <motion.div
          className="text-center py-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Trophy className="w-16 h-16 text-white/30 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white/60 mb-2">No achievements found</h3>
          <p className="text-white/40">
            Try adjusting your filters or {!showLocked ? 'show locked achievements' : 'start reading to unlock some!'}
          </p>
        </motion.div>
      )}
    </div>
  );
}

export default GlassTrophyCase;
