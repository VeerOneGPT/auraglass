import React, { useState, useEffect, useCallback } from 'react';
import { createGlassStyle } from '../../core/mixins/glassMixins';
import { OptimizedGlass } from '../../primitives';

export interface ComponentExample {
  id: string;
  name: string;
  description?: string;
  category: string;
  component: React.ComponentType<any>;
  props?: Record<string, any>;
  code?: string;
}

export interface PlaygroundTab {
  id: string;
  label: string;
  content: React.ReactNode;
}

export interface GlassComponentPlaygroundProps {
  /** Available component examples */
  examples: ComponentExample[];
  /** Default selected example */
  defaultExample?: string;
  /** Whether to show code panel */
  showCode?: boolean;
  /** Whether to show props panel */
  showProps?: boolean;
  /** Custom tabs */
  customTabs?: PlaygroundTab[];
  /** Custom className */
  className?: string;
  /** Theme for the playground */
  theme?: 'light' | 'dark' | 'auto';
  /** Code editor theme */
  codeTheme?: 'light' | 'dark';
}

export const GlassComponentPlayground: React.FC<GlassComponentPlaygroundProps> = ({
  examples,
  defaultExample,
  showCode = true,
  showProps = true,
  customTabs = [],
  className = '',
  theme = 'dark',
  codeTheme = 'dark',
}) => {
  const [selectedExample, setSelectedExample] = useState<string>(
    defaultExample || examples[0]?.id || ''
  );
  const [activeTab, setActiveTab] = useState<'preview' | 'code' | 'props' | string>('preview');
  const [componentProps, setComponentProps] = useState<Record<string, any>>({});
  const [componentCode, setComponentCode] = useState<string>('');
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Group examples by category
  useEffect(() => {
    const uniqueCategories = Array.from(new Set(examples.map(ex => ex.category)));
    setCategories(uniqueCategories);
  }, [examples]);

  // Update component props and code when example changes
  useEffect(() => {
    const example = examples.find(ex => ex.id === selectedExample);
    if (example) {
      setComponentProps(example.props || {});
      setComponentCode(example.code || generateCodeFromProps(example.component, example.props || {}));
    }
  }, [selectedExample, examples]);

  // Generate code from component and props
  const generateCodeFromProps = useCallback((component: React.ComponentType<any>, props: Record<string, any>): string => {
    const componentName = component.displayName || component.name || 'Component';
    const propsString = Object.entries(props)
      .map(([key, value]) => {
        if (typeof value === 'string') {
          return `${key}="${value}"`;
        } else if (typeof value === 'boolean') {
          return value ? key : `${key}={false}`;
        } else if (typeof value === 'number') {
          return `${key}={${value}}`;
        } else if (Array.isArray(value)) {
          return `${key}={${JSON.stringify(value)}}`;
        } else if (typeof value === 'object') {
          return `${key}={${JSON.stringify(value, null, 2)}}`;
        }
        return `${key}={${String(value)}}`;
      })
      .join('\n  ');

    return `<${componentName}${propsString ? `\n  ${propsString}` : ''}\n/>`;
  }, []);

  // Handle prop change
  const handlePropChange = useCallback((propName: string, value: any) => {
    setComponentProps(prev => ({
      ...prev,
      [propName]: value,
    }));

    const example = examples.find(ex => ex.id === selectedExample);
    if (example) {
      const newCode = generateCodeFromProps(example.component, { ...componentProps, [propName]: value });
      setComponentCode(newCode);
    }
  }, [componentProps, selectedExample, examples, generateCodeFromProps]);

  // Filter examples by category
  const filteredExamples = selectedCategory === 'all'
    ? examples
    : examples.filter(ex => ex.category === selectedCategory);

  const currentExample = examples.find(ex => ex.id === selectedExample);

  // Render prop editor
  const renderPropEditor = () => {
    if (!showProps || !currentExample) return null;

    const propKeys = Object.keys(componentProps);

    return (
      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-white mb-3">Component Props</h4>

        {propKeys.length === 0 ? (
          <p className="text-sm text-white/50">No editable props available</p>
        ) : (
          propKeys.map(propName => {
            const value = componentProps[propName];
            const valueType = typeof value;

            return (
              <div key={propName} className="space-y-2">
                <label className="block text-sm text-white/70">
                  {propName} ({valueType})
                </label>

                {valueType === 'string' && (
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => handlePropChange(propName, e.target.value)}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                  />
                )}

                {valueType === 'number' && (
                  <input
                    type="number"
                    value={value}
                    onChange={(e) => handlePropChange(propName, Number(e.target.value))}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                  />
                )}

                {valueType === 'boolean' && (
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={(e) => handlePropChange(propName, e.target.checked)}
                      className="rounded border-white/20 text-blue-500 focus:ring-blue-500"
                    />
                    <span className="text-sm text-white/70">{value ? 'True' : 'False'}</span>
                  </label>
                )}

                {(valueType === 'object' || Array.isArray(value)) && (
                  <textarea
                    value={JSON.stringify(value, null, 2)}
                    onChange={(e) => {
                      try {
                        const parsed = JSON.parse(e.target.value);
                        handlePropChange(propName, parsed);
                      } catch (err) {
                        // Invalid JSON, don't update
                      }
                    }}
                    rows={4}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white placeholder-white/50 focus:outline-none focus:border-white/40 font-mono text-sm"
                  />
                )}
              </div>
            );
          })
        )}
      </div>
    );
  };

  return (
    <OptimizedGlass
      className={`flex flex-col h-full ${className}`}
      intent="neutral"
      elevation="level1"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <h2 className="text-xl font-semibold text-white">Component Playground</h2>

        <div className="flex items-center space-x-4">
          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 bg-white/10 border border-white/20 rounded text-white focus:outline-none focus:border-white/40"
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Component List */}
        <div className="w-64 border-r border-white/10 p-4 overflow-y-auto">
          <h3 className="text-sm font-semibold text-white mb-4">Components</h3>

          <div className="space-y-2">
            {filteredExamples.map(example => (
              <button
                key={example.id}
                onClick={() => setSelectedExample(example.id)}
                className={`w-full text-left p-3 rounded transition-colors ${
                  selectedExample === example.id
                    ? 'bg-white/20 text-white'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <div className="font-medium text-sm">{example.name}</div>
                {example.description && (
                  <div className="text-xs opacity-70 mt-1">{example.description}</div>
                )}
                <div className="text-xs opacity-50 mt-1 capitalize">{example.category}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Tabs */}
          <div className="flex border-b border-white/10">
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === 'preview'
                  ? 'text-white border-b-2 border-blue-400'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              Preview
            </button>

            {showCode && (
              <button
                onClick={() => setActiveTab('code')}
                className={`px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === 'code'
                    ? 'text-white border-b-2 border-blue-400'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                Code
              </button>
            )}

            {showProps && (
              <button
                onClick={() => setActiveTab('props')}
                className={`px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === 'props'
                    ? 'text-white border-b-2 border-blue-400'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                Props
              </button>
            )}

            {/* Custom Tabs */}
            {customTabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-white border-b-2 border-blue-400'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-hidden">
            {/* Preview Tab */}
            {activeTab === 'preview' && (
              <div className="h-full p-6 overflow-auto">
                <div className="max-w-4xl mx-auto">
                  {currentExample ? (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">
                          {currentExample.name}
                        </h3>
                        {currentExample.description && (
                          <p className="text-white/70">{currentExample.description}</p>
                        )}
                      </div>

                      {/* Component Preview */}
                      <OptimizedGlass
                        className="p-6 min-h-64 flex items-center justify-center"
                        blur="subtle"
                        elevation={0}
                      >
                        <currentExample.component {...componentProps} />
                      </OptimizedGlass>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-64 text-white/50">
                      Select a component to preview
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Code Tab */}
            {activeTab === 'code' && showCode && (
              <div className="h-full p-6 overflow-auto">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-white">Generated Code</h3>
                    <button
                      onClick={() => navigator.clipboard?.writeText(componentCode)}
                      className="px-3 py-1 text-sm bg-white/10 hover:bg-white/20 rounded transition-colors"
                    >
                      Copy
                    </button>
                  </div>

                  <pre className="p-4 bg-black/20 rounded overflow-x-auto">
                    <code className="text-sm text-white font-mono whitespace-pre-wrap">
                      {componentCode}
                    </code>
                  </pre>
                </div>
              </div>
            )}

            {/* Props Tab */}
            {activeTab === 'props' && showProps && (
              <div className="h-full p-6 overflow-y-auto">
                {renderPropEditor()}
              </div>
            )}

            {/* Custom Tab Content */}
            {customTabs.map(tab =>
              activeTab === tab.id ? (
                <div key={tab.id} className="h-full p-6 overflow-auto">
                  {tab.content}
                </div>
              ) : null
            )}
          </div>
        </div>
      </div>
    </OptimizedGlass>
  );
};

// Utility hook for creating playground examples
export const usePlaygroundExample = (
  component: React.ComponentType<any>,
  defaultProps: Record<string, any> = {}
) => {
  const [props, setProps] = useState(defaultProps);

  const updateProp = useCallback((propName: string, value: any) => {
    setProps(prev => ({
      ...prev,
      [propName]: value,
    }));
  }, []);

  const resetProps = useCallback(() => {
    setProps(defaultProps);
  }, [defaultProps]);

  return {
    props,
    updateProp,
    resetProps,
    component,
  };
};

// Example usage helper
export const createPlaygroundExample = (
  id: string,
  name: string,
  component: React.ComponentType<any>,
  options: {
    category?: string;
    description?: string;
    defaultProps?: Record<string, any>;
  } = {}
): ComponentExample => {
  const { category = 'general', description, defaultProps = {} } = options;

  return {
    id,
    name,
    description,
    category,
    component,
    props: defaultProps,
  };
};
