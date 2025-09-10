import type { Meta, StoryObj } from '@storybook/react';
import { GlassDeepDreamGlass, type NeuralLayer } from './GlassDeepDreamGlass';

const mockNeuralLayers: NeuralLayer[] = [
  {
    id: 'conv2d_1',
    name: 'Early Features',
    description: 'Basic edges and textures',
    type: 'conv',
    depth: 1,
    features: ['edges', 'lines', 'basic_shapes'],
    strength: 0.5
  },
  {
    id: 'conv2d_5',
    name: 'Texture Patterns',
    description: 'Complex textures and patterns',
    type: 'conv',
    depth: 5,
    features: ['textures', 'patterns', 'repetition'],
    strength: 0.7
  },
  {
    id: 'mixed3a',
    name: 'Object Parts',
    description: 'Parts of objects and shapes',
    type: 'inception',
    depth: 10,
    features: ['object_parts', 'curves', 'complex_shapes'],
    strength: 1.0
  },
  {
    id: 'mixed4a',
    name: 'Abstract Objects',
    description: 'Abstract object representations',
    type: 'inception',
    depth: 15,
    features: ['abstract_objects', 'compositions', 'spatial_relations'],
    strength: 1.2
  },
  {
    id: 'mixed4d',
    name: 'Complex Structures',
    description: 'Complex architectural structures',
    type: 'inception',
    depth: 18,
    features: ['buildings', 'architecture', 'complex_structures'],
    strength: 1.5
  },
  {
    id: 'mixed5b',
    name: 'High-Level Concepts',
    description: 'Abstract concepts and scenes',
    type: 'inception',
    depth: 25,
    features: ['scenes', 'concepts', 'abstract_ideas'],
    strength: 2.0
  },
  {
    id: 'dense_1',
    name: 'Global Features',
    description: 'High-level global representations',
    type: 'dense',
    depth: 30,
    features: ['global_patterns', 'semantic_meaning', 'context'],
    strength: 1.8
  }
];

const meta = {
  title: 'Glass UI/AI/GlassDeepDreamGlass',
  component: GlassDeepDreamGlass,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    canvasWidth: {
      control: { type: 'range', min: 400, max: 1200, step: 50 },
    },
    canvasHeight: {
      control: { type: 'range', min: 300, max: 800, step: 50 },
    },
    animationSpeed: {
      control: { type: 'range', min: 0.1, max: 3.0, step: 0.1 },
    },
    showLayerSelector: {
      control: 'boolean',
    },
    showPreview: {
      control: 'boolean',
    },
    showSettings: {
      control: 'boolean',
    },
    enableRealTime: {
      control: 'boolean',
    },
    enableAnimation: {
      control: 'boolean',
    },
    enableTiling: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof GlassDeepDreamGlass>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    availableLayers: mockNeuralLayers,
    selectedLayers: ['mixed3a'],
    canvasWidth: 800,
    canvasHeight: 600,
    showLayerSelector: true,
    showPreview: true,
    showSettings: true,
    enableRealTime: false,
    enableAnimation: true,
    enableTiling: true,
    animationSpeed: 1.0,
    dreamSettings: {
      iterations: 20,
      learningRate: 0.01,
      octaveScale: 1.4,
      octaves: 4,
      maxLoss: 10.0,
      stepSize: 1.5,
      tileSize: 512,
    },
  },
};

export const EarlyLayers: Story = {
  args: {
    availableLayers: mockNeuralLayers.filter(l => l.depth <= 5),
    selectedLayers: ['conv2d_1', 'conv2d_5'],
    canvasWidth: 800,
    canvasHeight: 600,
    showLayerSelector: true,
    showPreview: true,
    showSettings: true,
    enableRealTime: false,
    enableAnimation: true,
    dreamSettings: {
      iterations: 15,
      learningRate: 0.005,
      stepSize: 1.0,
    },
  },
};

export const DeepLayers: Story = {
  args: {
    availableLayers: mockNeuralLayers.filter(l => l.depth >= 15),
    selectedLayers: ['mixed4d', 'mixed5b'],
    canvasWidth: 800,
    canvasHeight: 600,
    showLayerSelector: true,
    showPreview: true,
    showSettings: true,
    enableRealTime: false,
    enableAnimation: true,
    dreamSettings: {
      iterations: 30,
      learningRate: 0.02,
      stepSize: 2.0,
      octaves: 5,
    },
  },
};

export const ConvolutionalLayers: Story = {
  args: {
    availableLayers: mockNeuralLayers.filter(l => l.type === 'conv'),
    selectedLayers: ['conv2d_1'],
    canvasWidth: 800,
    canvasHeight: 600,
    showLayerSelector: true,
    showPreview: true,
    showSettings: true,
    enableRealTime: false,
    enableAnimation: true,
    dreamSettings: {
      iterations: 25,
      learningRate: 0.008,
      stepSize: 1.2,
    },
  },
};

export const InceptionLayers: Story = {
  args: {
    availableLayers: mockNeuralLayers.filter(l => l.type === 'inception'),
    selectedLayers: ['mixed3a', 'mixed4a'],
    canvasWidth: 800,
    canvasHeight: 600,
    showLayerSelector: true,
    showPreview: true,
    showSettings: true,
    enableRealTime: false,
    enableAnimation: true,
    dreamSettings: {
      iterations: 20,
      learningRate: 0.015,
      stepSize: 1.8,
      octaveScale: 1.3,
    },
  },
};

export const DenseLayers: Story = {
  args: {
    availableLayers: mockNeuralLayers.filter(l => l.type === 'dense'),
    selectedLayers: ['dense_1'],
    canvasWidth: 800,
    canvasHeight: 600,
    showLayerSelector: true,
    showPreview: true,
    showSettings: true,
    enableRealTime: false,
    enableAnimation: true,
    dreamSettings: {
      iterations: 40,
      learningRate: 0.025,
      stepSize: 2.5,
    },
  },
};

export const MultiLayerDream: Story = {
  args: {
    availableLayers: mockNeuralLayers,
    selectedLayers: ['conv2d_1', 'mixed3a', 'mixed4d', 'dense_1'],
    canvasWidth: 800,
    canvasHeight: 600,
    showLayerSelector: true,
    showPreview: true,
    showSettings: true,
    enableRealTime: false,
    enableAnimation: true,
    dreamSettings: {
      iterations: 35,
      learningRate: 0.012,
      stepSize: 1.6,
      octaves: 6,
    },
  },
};

export const HighIterations: Story = {
  args: {
    availableLayers: mockNeuralLayers,
    selectedLayers: ['mixed4a'],
    canvasWidth: 800,
    canvasHeight: 600,
    showLayerSelector: true,
    showPreview: true,
    showSettings: true,
    enableRealTime: false,
    enableAnimation: true,
    dreamSettings: {
      iterations: 80,
      learningRate: 0.005,
      stepSize: 0.8,
      octaves: 3,
    },
  },
};

export const LowIterations: Story = {
  args: {
    availableLayers: mockNeuralLayers,
    selectedLayers: ['mixed3a'],
    canvasWidth: 800,
    canvasHeight: 600,
    showLayerSelector: true,
    showPreview: true,
    showSettings: true,
    enableRealTime: true,
    enableAnimation: true,
    dreamSettings: {
      iterations: 8,
      learningRate: 0.02,
      stepSize: 2.0,
      octaves: 2,
    },
  },
};

export const HighLearningRate: Story = {
  args: {
    availableLayers: mockNeuralLayers,
    selectedLayers: ['mixed3a', 'mixed4a'],
    canvasWidth: 800,
    canvasHeight: 600,
    showLayerSelector: true,
    showPreview: true,
    showSettings: true,
    enableRealTime: false,
    enableAnimation: true,
    dreamSettings: {
      iterations: 15,
      learningRate: 0.08,
      stepSize: 3.0,
      octaves: 3,
    },
  },
};

export const LowLearningRate: Story = {
  args: {
    availableLayers: mockNeuralLayers,
    selectedLayers: ['mixed4d'],
    canvasWidth: 800,
    canvasHeight: 600,
    showLayerSelector: true,
    showPreview: true,
    showSettings: true,
    enableRealTime: false,
    enableAnimation: true,
    dreamSettings: {
      iterations: 50,
      learningRate: 0.001,
      stepSize: 0.5,
      octaves: 8,
    },
  },
};

export const ManyOctaves: Story = {
  args: {
    availableLayers: mockNeuralLayers,
    selectedLayers: ['mixed3a'],
    canvasWidth: 800,
    canvasHeight: 600,
    showLayerSelector: true,
    showPreview: true,
    showSettings: true,
    enableRealTime: false,
    enableAnimation: true,
    dreamSettings: {
      iterations: 40,
      learningRate: 0.01,
      stepSize: 1.5,
      octaves: 8,
      octaveScale: 1.2,
    },
  },
};

export const FewOctaves: Story = {
  args: {
    availableLayers: mockNeuralLayers,
    selectedLayers: ['mixed4d'],
    canvasWidth: 800,
    canvasHeight: 600,
    showLayerSelector: true,
    showPreview: true,
    showSettings: true,
    enableRealTime: false,
    enableAnimation: true,
    dreamSettings: {
      iterations: 20,
      learningRate: 0.02,
      stepSize: 2.0,
      octaves: 2,
      octaveScale: 1.8,
    },
  },
};

export const RealTimeMode: Story = {
  args: {
    availableLayers: mockNeuralLayers,
    selectedLayers: ['conv2d_5'],
    canvasWidth: 600,
    canvasHeight: 400,
    showLayerSelector: true,
    showPreview: true,
    showSettings: true,
    enableRealTime: true,
    enableAnimation: true,
    dreamSettings: {
      iterations: 10,
      learningRate: 0.015,
      stepSize: 1.5,
      octaves: 3,
    },
  },
};

export const AnimationDisabled: Story = {
  args: {
    availableLayers: mockNeuralLayers,
    selectedLayers: ['mixed3a'],
    canvasWidth: 800,
    canvasHeight: 600,
    showLayerSelector: true,
    showPreview: true,
    showSettings: true,
    enableRealTime: false,
    enableAnimation: false,
    enableTiling: true,
    dreamSettings: {
      iterations: 25,
      learningRate: 0.01,
      stepSize: 1.5,
    },
  },
};

export const FastAnimation: Story = {
  args: {
    availableLayers: mockNeuralLayers,
    selectedLayers: ['mixed3a'],
    canvasWidth: 800,
    canvasHeight: 600,
    showLayerSelector: true,
    showPreview: true,
    showSettings: true,
    enableRealTime: false,
    enableAnimation: true,
    animationSpeed: 3.0,
    dreamSettings: {
      iterations: 15,
      learningRate: 0.02,
      stepSize: 2.0,
    },
  },
};

export const SlowAnimation: Story = {
  args: {
    availableLayers: mockNeuralLayers,
    selectedLayers: ['mixed4a'],
    canvasWidth: 800,
    canvasHeight: 600,
    showLayerSelector: true,
    showPreview: true,
    showSettings: true,
    enableRealTime: false,
    enableAnimation: true,
    animationSpeed: 0.3,
    dreamSettings: {
      iterations: 30,
      learningRate: 0.008,
      stepSize: 1.2,
    },
  },
};

export const MinimalInterface: Story = {
  args: {
    availableLayers: mockNeuralLayers.slice(0, 3),
    selectedLayers: ['mixed3a'],
    canvasWidth: 600,
    canvasHeight: 400,
    showLayerSelector: false,
    showPreview: true,
    showSettings: false,
    enableRealTime: false,
    enableAnimation: false,
    dreamSettings: {
      iterations: 20,
      learningRate: 0.01,
      stepSize: 1.5,
    },
  },
};

export const LayerSelectorOnly: Story = {
  args: {
    availableLayers: mockNeuralLayers,
    selectedLayers: ['conv2d_1', 'mixed3a'],
    canvasWidth: 400,
    canvasHeight: 300,
    showLayerSelector: true,
    showPreview: false,
    showSettings: false,
    enableRealTime: false,
    enableAnimation: false,
  },
};

export const SettingsOnly: Story = {
  args: {
    availableLayers: mockNeuralLayers,
    selectedLayers: ['mixed3a'],
    canvasWidth: 400,
    canvasHeight: 300,
    showLayerSelector: false,
    showPreview: false,
    showSettings: true,
    enableRealTime: false,
    enableAnimation: false,
    dreamSettings: {
      iterations: 25,
      learningRate: 0.015,
      stepSize: 1.8,
      octaves: 4,
    },
  },
};

export const PreviewOnly: Story = {
  args: {
    availableLayers: mockNeuralLayers,
    selectedLayers: ['mixed4a'],
    canvasWidth: 800,
    canvasHeight: 600,
    showLayerSelector: false,
    showPreview: true,
    showSettings: false,
    enableRealTime: false,
    enableAnimation: true,
  },
};

export const LargeCanvas: Story = {
  args: {
    availableLayers: mockNeuralLayers,
    selectedLayers: ['mixed3a', 'mixed4d'],
    canvasWidth: 1200,
    canvasHeight: 800,
    showLayerSelector: true,
    showPreview: true,
    showSettings: true,
    enableRealTime: false,
    enableAnimation: true,
    dreamSettings: {
      iterations: 30,
      learningRate: 0.008,
      stepSize: 1.2,
      octaves: 5,
      tileSize: 1024,
    },
  },
};

export const SmallCanvas: Story = {
  args: {
    availableLayers: mockNeuralLayers,
    selectedLayers: ['conv2d_5'],
    canvasWidth: 400,
    canvasHeight: 300,
    showLayerSelector: true,
    showPreview: true,
    showSettings: true,
    enableRealTime: true,
    enableAnimation: true,
    dreamSettings: {
      iterations: 15,
      learningRate: 0.02,
      stepSize: 2.0,
      tileSize: 256,
    },
  },
};

export const NoLayersSelected: Story = {
  args: {
    availableLayers: mockNeuralLayers,
    selectedLayers: [],
    canvasWidth: 800,
    canvasHeight: 600,
    showLayerSelector: true,
    showPreview: true,
    showSettings: true,
    enableRealTime: false,
    enableAnimation: false,
  },
};

export const AllLayersSelected: Story = {
  args: {
    availableLayers: mockNeuralLayers,
    selectedLayers: mockNeuralLayers.map(l => l.id),
    canvasWidth: 800,
    canvasHeight: 600,
    showLayerSelector: true,
    showPreview: true,
    showSettings: true,
    enableRealTime: false,
    enableAnimation: true,
    dreamSettings: {
      iterations: 50,
      learningRate: 0.005,
      stepSize: 1.0,
      octaves: 6,
    },
  },
};

export const HighIntensity: Story = {
  args: {
    availableLayers: mockNeuralLayers.map(l => ({ ...l, strength: l.strength * 2 })),
    selectedLayers: ['mixed3a', 'mixed4a'],
    canvasWidth: 800,
    canvasHeight: 600,
    showLayerSelector: true,
    showPreview: true,
    showSettings: true,
    enableRealTime: false,
    enableAnimation: true,
    dreamSettings: {
      iterations: 20,
      learningRate: 0.025,
      stepSize: 3.0,
    },
  },
};

export const LowIntensity: Story = {
  args: {
    availableLayers: mockNeuralLayers.map(l => ({ ...l, strength: l.strength * 0.3 })),
    selectedLayers: ['mixed4d', 'mixed5b'],
    canvasWidth: 800,
    canvasHeight: 600,
    showLayerSelector: true,
    showPreview: true,
    showSettings: true,
    enableRealTime: false,
    enableAnimation: true,
    dreamSettings: {
      iterations: 40,
      learningRate: 0.05,
      stepSize: 4.0,
    },
  },
};