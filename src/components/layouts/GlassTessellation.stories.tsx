import type { Meta, StoryObj } from '@storybook/react';
import { GlassTessellation, type TessellationTile } from './GlassTessellation';
import { 
  Home, 
  Settings, 
  User, 
  Mail, 
  Search, 
  Bell, 
  Heart, 
  Share,
  Star,
  Circle,
  Triangle,
  Square,
  Hexagon,
  Diamond,
  Zap,
  Flame,
  Droplets,
  Wind,
  Sun,
  Moon,
  Cloud,
  Snowflake
} from 'lucide-react';

// Basic geometric tiles
const basicTiles: TessellationTile[] = [
  { id: 'home', content: <Home size={16} />, shape: 'hexagon', color: '#3B82F6' },
  { id: 'user', content: <User size={14} />, shape: 'triangle', color: '#EF4444' },
  { id: 'settings', content: <Settings size={14} />, shape: 'square', color: '#10B981' },
  { id: 'mail', content: <Mail size={12} />, shape: 'rhombus', color: '#F59E0B' },
  { id: 'search', content: <Search size={14} />, shape: 'pentagon', color: '#8B5CF6' },
  { id: 'bell', content: <Bell size={12} />, shape: 'hexagon', color: '#EC4899' },
  { id: 'heart', content: <Heart size={12} />, shape: 'triangle', color: '#EF4444' },
  { id: 'share', content: <Share size={12} />, shape: 'square', color: '#06B6D4' },
];

// Elemental themed tiles
const elementalTiles: TessellationTile[] = [
  { id: 'fire', content: <Flame size={16} />, shape: 'triangle', color: '#DC2626' },
  { id: 'water', content: <Droplets size={16} />, shape: 'hexagon', color: '#0891B2' },
  { id: 'air', content: <Wind size={16} />, shape: 'rhombus', color: '#7C3AED' },
  { id: 'earth', content: <Square size={16} />, shape: 'square', color: '#059669' },
  { id: 'lightning', content: <Zap size={14} />, shape: 'triangle', color: '#FBBF24' },
  { id: 'ice', content: <Snowflake size={14} />, shape: 'hexagon', color: '#67E8F9' },
  { id: 'sun', content: <Sun size={16} />, shape: 'octagon', color: '#F59E0B' },
  { id: 'moon', content: <Moon size={14} />, shape: 'pentagon', color: '#A78BFA' },
  { id: 'cloud', content: <Cloud size={14} />, shape: 'rhombus', color: '#9CA3AF' },
  { id: 'star', content: <Star size={14} />, shape: 'pentagon', color: '#FCD34D' },
];

// Geometric shapes tiles
const shapeTiles: TessellationTile[] = [
  { id: 'circle', content: <Circle size={16} />, shape: 'hexagon', color: '#3B82F6' },
  { id: 'triangle', content: <Triangle size={16} />, shape: 'triangle', color: '#EF4444' },
  { id: 'square', content: <Square size={16} />, shape: 'square', color: '#10B981' },
  { id: 'diamond', content: <Diamond size={16} />, shape: 'rhombus', color: '#8B5CF6' },
  { id: 'hexagon', content: <Hexagon size={16} />, shape: 'hexagon', color: '#EC4899' },
];

// Large collection for complex patterns
const manyTiles: TessellationTile[] = [
  ...Array.from({ length: 50 }, (_, i) => {
    const shapes: TessellationTile['shape'][] = ['triangle', 'square', 'hexagon', 'rhombus', 'pentagon'];
    const icons = [Home, User, Settings, Mail, Search, Bell, Heart, Share, Star, Circle];
    const colors = ['#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899', '#06B6D4', '#DC2626'];
    
    const shape = shapes[i % shapes.length];
    const IconComponent = icons[i % icons.length];
    const color = colors[i % colors.length];
    
    return {
      id: `tile-${i}`,
      content: <IconComponent size={14} />,
      shape,
      color,
      priority: Math.floor(Math.random() * 10)
    };
  })
];

// Color-coded tiles
const colorCodedTiles: TessellationTile[] = [
  { id: 'red', content: <div className="w-4 h-4 bg-red-500 rounded-full" />, shape: 'triangle', color: '#EF4444' },
  { id: 'blue', content: <div className="w-4 h-4 bg-blue-500 rounded-full" />, shape: 'hexagon', color: '#3B82F6' },
  { id: 'green', content: <div className="w-4 h-4 bg-green-500 rounded-full" />, shape: 'square', color: '#10B981' },
  { id: 'yellow', content: <div className="w-4 h-4 bg-yellow-500 rounded-full" />, shape: 'rhombus', color: '#F59E0B' },
  { id: 'purple', content: <div className="w-4 h-4 bg-purple-500 rounded-full" />, shape: 'pentagon', color: '#8B5CF6' },
  { id: 'pink', content: <div className="w-4 h-4 bg-pink-500 rounded-full" />, shape: 'hexagon', color: '#EC4899' },
  { id: 'cyan', content: <div className="w-4 h-4 bg-cyan-500 rounded-full" />, shape: 'triangle', color: '#06B6D4' },
  { id: 'orange', content: <div className="w-4 h-4 bg-orange-500 rounded-full" />, shape: 'square', color: '#EA580C' },
];

const meta = {
  title: 'Glass UI/Layouts/GlassTessellation',
  component: GlassTessellation,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    tessellationType: {
      control: { type: 'select' },
      options: ['triangular', 'square', 'hexagonal', 'rhombic', 'pentagonal', 'mixed'],
    },
    containerWidth: {
      control: { type: 'range', min: 400, max: 1200, step: 50 },
    },
    containerHeight: {
      control: { type: 'range', min: 300, max: 800, step: 50 },
    },
    tileSize: {
      control: { type: 'range', min: 30, max: 120, step: 10 },
    },
    spacing: {
      control: { type: 'range', min: 0, max: 20, step: 2 },
    },
    animatePattern: {
      control: 'boolean',
    },
    morphPattern: {
      control: 'boolean',
    },
    morphSpeed: {
      control: { type: 'range', min: 1000, max: 5000, step: 500 },
    },
    showGrid: {
      control: 'boolean',
    },
    interactive: {
      control: 'boolean',
    },
    soundEnabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof GlassTessellation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    tiles: basicTiles,
    tessellationType: 'hexagonal',
    containerWidth: 800,
    containerHeight: 600,
    tileSize: 60,
    spacing: 2,
    animatePattern: true,
    morphPattern: false,
    showGrid: false,
    interactive: true,
    soundEnabled: true,
  },
};

export const TriangularPattern: Story = {
  args: {
    tiles: basicTiles,
    tessellationType: 'triangular',
    containerWidth: 800,
    containerHeight: 600,
    tileSize: 70,
    spacing: 4,
  },
};

export const SquarePattern: Story = {
  args: {
    tiles: basicTiles,
    tessellationType: 'square',
    containerWidth: 800,
    containerHeight: 600,
    tileSize: 80,
    spacing: 6,
  },
};

export const HexagonalPattern: Story = {
  args: {
    tiles: elementalTiles,
    tessellationType: 'hexagonal',
    containerWidth: 900,
    containerHeight: 700,
    tileSize: 75,
    spacing: 4,
  },
};

export const RhombicPattern: Story = {
  args: {
    tiles: shapeTiles,
    tessellationType: 'rhombic',
    containerWidth: 800,
    containerHeight: 600,
    tileSize: 65,
    spacing: 8,
  },
};

export const PentagonalPattern: Story = {
  args: {
    tiles: colorCodedTiles,
    tessellationType: 'pentagonal',
    containerWidth: 800,
    containerHeight: 600,
    tileSize: 55,
    spacing: 6,
  },
};

export const MixedPattern: Story = {
  args: {
    tiles: elementalTiles,
    tessellationType: 'mixed',
    containerWidth: 800,
    containerHeight: 600,
    tileSize: 60,
    spacing: 4,
  },
};

export const LargePattern: Story = {
  args: {
    tiles: manyTiles,
    tessellationType: 'hexagonal',
    containerWidth: 1000,
    containerHeight: 800,
    tileSize: 50,
    spacing: 2,
  },
};

export const SmallTiles: Story = {
  args: {
    tiles: manyTiles,
    tessellationType: 'square',
    containerWidth: 800,
    containerHeight: 600,
    tileSize: 35,
    spacing: 2,
  },
};

export const LargeTiles: Story = {
  args: {
    tiles: basicTiles,
    tessellationType: 'hexagonal',
    containerWidth: 800,
    containerHeight: 600,
    tileSize: 100,
    spacing: 8,
  },
};

export const TightSpacing: Story = {
  args: {
    tiles: colorCodedTiles,
    tessellationType: 'triangular',
    containerWidth: 800,
    containerHeight: 600,
    tileSize: 60,
    spacing: 0,
  },
};

export const WideSpacing: Story = {
  args: {
    tiles: shapeTiles,
    tessellationType: 'square',
    containerWidth: 800,
    containerHeight: 600,
    tileSize: 70,
    spacing: 15,
  },
};

export const WithGrid: Story = {
  args: {
    tiles: basicTiles,
    tessellationType: 'hexagonal',
    containerWidth: 800,
    containerHeight: 600,
    showGrid: true,
  },
};

export const MorphingPattern: Story = {
  args: {
    tiles: elementalTiles,
    tessellationType: 'mixed',
    containerWidth: 800,
    containerHeight: 600,
    morphPattern: true,
    morphSpeed: 3000,
  },
};

export const FastMorphing: Story = {
  args: {
    tiles: colorCodedTiles,
    tessellationType: 'mixed',
    containerWidth: 800,
    containerHeight: 600,
    morphPattern: true,
    morphSpeed: 1500,
  },
};

export const SlowMorphing: Story = {
  args: {
    tiles: shapeTiles,
    tessellationType: 'mixed',
    containerWidth: 800,
    containerHeight: 600,
    morphPattern: true,
    morphSpeed: 5000,
  },
};

export const NoAnimation: Story = {
  args: {
    tiles: basicTiles,
    tessellationType: 'hexagonal',
    containerWidth: 800,
    containerHeight: 600,
    animatePattern: false,
  },
};

export const NonInteractive: Story = {
  args: {
    tiles: basicTiles,
    tessellationType: 'square',
    containerWidth: 800,
    containerHeight: 600,
    interactive: false,
  },
};

export const ElementalTheme: Story = {
  args: {
    tiles: elementalTiles,
    tessellationType: 'hexagonal',
    containerWidth: 900,
    containerHeight: 700,
    tileSize: 80,
    spacing: 6,
    morphPattern: true,
    morphSpeed: 4000,
  },
};

export const GeometricShapes: Story = {
  args: {
    tiles: shapeTiles,
    tessellationType: 'rhombic',
    containerWidth: 700,
    containerHeight: 500,
    tileSize: 90,
    spacing: 10,
  },
};

export const ColorSpectrum: Story = {
  args: {
    tiles: colorCodedTiles,
    tessellationType: 'triangular',
    containerWidth: 800,
    containerHeight: 600,
    tileSize: 65,
    spacing: 4,
    showGrid: true,
  },
};

export const CompactLayout: Story = {
  args: {
    tiles: basicTiles,
    tessellationType: 'hexagonal',
    containerWidth: 600,
    containerHeight: 400,
    tileSize: 45,
    spacing: 1,
  },
};

export const SpacedLayout: Story = {
  args: {
    tiles: elementalTiles,
    tessellationType: 'pentagonal',
    containerWidth: 1000,
    containerHeight: 700,
    tileSize: 80,
    spacing: 12,
  },
};

export const CustomGlass: Story = {
  args: {
    tiles: basicTiles,
    tessellationType: 'hexagonal',
    containerWidth: 800,
    containerHeight: 600,
    glassConfig: {
      blur: 20,
      opacity: 0.8,
      saturation: 1.3,
      brightness: 1.2,
      contrast: 1.1
    }
  },
};

export const MinimalGlass: Story = {
  args: {
    tiles: basicTiles,
    tessellationType: 'square',
    containerWidth: 800,
    containerHeight: 600,
    glassConfig: {
      blur: 5,
      opacity: 0.98,
      saturation: 1.0,
      brightness: 1.0,
      contrast: 1.0
    }
  },
};

export const InteractiveDemo: Story = {
  args: {
    tiles: elementalTiles,
    tessellationType: 'hexagonal',
    containerWidth: 900,
    containerHeight: 700,
    tileSize: 70,
    morphPattern: true,
    onTileClick: (tile) => console.log('Clicked tile:', tile.id),
    onTileHover: (tile) => console.log('Hovered tile:', tile?.id || 'none'),
  },
};