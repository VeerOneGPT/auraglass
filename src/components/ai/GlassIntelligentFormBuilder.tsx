'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Glass } from '../../primitives';
import { cn } from '../../lib/utilsComprehensive';
import { useAccessibility } from '../../hooks/useAccessibility';
import { usePerformance } from '../../hooks/usePerformance';

export interface FormField {
  id: string;
  type: 'text' | 'email' | 'password' | 'number' | 'select' | 'textarea' | 'checkbox' | 'radio' | 'date' | 'file' | 'tel' | 'url';
  label: string;
  placeholder?: string;
  required?: boolean;
  validation?: {
    pattern?: string;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
    custom?: (value: any) => string | null;
  };
  options?: Array<{ value: string; label: string }>;
  aiSuggestions?: {
    fieldType: string[];
    validationRules: string[];
    accessibilityTips: string[];
    uxOptimizations: string[];
  };
  conditional?: {
    dependsOn: string;
    condition: (value: any) => boolean;
  };
}

export interface FormSchema {
  id: string;
  title: string;
  description: string;
  fields: FormField[];
  aiAnalysis?: {
    purpose: string;
    conversionOptimizations: string[];
    performanceScore: number;
    accessibilityScore: number;
    recommendations: string[];
  };
}

export interface IntelligentFormBuilderProps {
  onSchemaChange?: (schema: FormSchema) => void;
  initialSchema?: Partial<FormSchema>;
  enableAIAssistance?: boolean;
  enableRealTimeOptimization?: boolean;
}

// AI-powered field type detection
const analyzeFieldPurpose = (label: string, context: string): FormField['aiSuggestions'] => {
  const lowerLabel = label.toLowerCase();
  const lowerContext = context.toLowerCase();
  
  const suggestions: FormField['aiSuggestions'] = {
    fieldType: [],
    validationRules: [],
    accessibilityTips: [],
    uxOptimizations: []
  };

  // Smart field type detection
  if (lowerLabel.includes('email')) {
    suggestions.fieldType.push('email');
    suggestions.validationRules.push('Email format validation');
    suggestions.accessibilityTips.push('Use autocomplete="email" for better UX');
  } else if (lowerLabel.includes('password')) {
    suggestions.fieldType.push('password');
    suggestions.validationRules.push('Minimum 8 characters, include numbers and symbols');
    suggestions.uxOptimizations.push('Add password strength indicator');
  } else if (lowerLabel.includes('phone') || lowerLabel.includes('tel')) {
    suggestions.fieldType.push('tel');
    suggestions.validationRules.push('Phone number format validation');
    suggestions.accessibilityTips.push('Use autocomplete="tel" for mobile optimization');
  } else if (lowerLabel.includes('date') || lowerLabel.includes('birth')) {
    suggestions.fieldType.push('date');
    suggestions.validationRules.push('Date range validation');
    suggestions.uxOptimizations.push('Consider date picker for better UX');
  } else if (lowerLabel.includes('age') || lowerLabel.includes('count') || lowerLabel.includes('number')) {
    suggestions.fieldType.push('number');
    suggestions.validationRules.push('Numeric range validation');
  } else if (lowerLabel.includes('description') || lowerLabel.includes('comment') || lowerLabel.includes('message')) {
    suggestions.fieldType.push('textarea');
    suggestions.validationRules.push('Character limit (recommended: 500-2000)');
    suggestions.uxOptimizations.push('Add character counter');
  } else if (lowerLabel.includes('website') || lowerLabel.includes('url') || lowerLabel.includes('link')) {
    suggestions.fieldType.push('url');
    suggestions.validationRules.push('URL format validation');
  }

  // Context-based suggestions
  if (lowerContext.includes('registration') || lowerContext.includes('signup')) {
    suggestions.uxOptimizations.push('Consider social login options');
    suggestions.accessibilityTips.push('Provide clear password requirements');
  } else if (lowerContext.includes('payment') || lowerContext.includes('billing')) {
    suggestions.validationRules.push('Real-time validation for payment fields');
    suggestions.uxOptimizations.push('Add secure payment indicators');
  } else if (lowerContext.includes('contact') || lowerContext.includes('support')) {
    suggestions.uxOptimizations.push('Add expected response time');
    suggestions.accessibilityTips.push('Provide alternative contact methods');
  }

  // Universal accessibility tips
  suggestions.accessibilityTips.push('Ensure sufficient color contrast');
  suggestions.accessibilityTips.push('Add proper ARIA labels');
  suggestions.uxOptimizations.push('Add real-time validation feedback');

  return suggestions;
};

// AI form optimization engine
const optimizeFormFlow = (fields: FormField[]): string[] => {
  const optimizations = [];

  // Check field order
  const hasPersonalInfo = fields.some(f => 
    f.type === 'text' && (f.label.toLowerCase().includes('name') || f.label.toLowerCase().includes('first'))
  );
  const hasContactInfo = fields.some(f => f.type === 'email' || f.type === 'tel');
  
  if (hasPersonalInfo && hasContactInfo) {
    optimizations.push('Consider grouping personal information first, then contact details');
  }

  // Check for long forms
  if (fields.length > 8) {
    optimizations.push('Consider breaking this into multiple steps or sections');
    optimizations.push('Implement progress indicator for better UX');
  }

  // Check for required field balance
  const requiredFields = fields.filter(f => f.required).length;
  if (requiredFields / fields.length > 0.7) {
    optimizations.push('Consider reducing required fields to improve completion rates');
  }

  // Check for conditional logic opportunities
  const independentFields = fields.filter(f => !f.conditional).length;
  if (independentFields === fields.length && fields.length > 5) {
    optimizations.push('Consider adding conditional logic to reduce cognitive load');
  }

  return optimizations;
};

export const GlassIntelligentFormBuilder: React.FC<IntelligentFormBuilderProps> = ({
  onSchemaChange,
  initialSchema,
  enableAIAssistance = true,
  enableRealTimeOptimization = true
}) => {
  const [schema, setSchema] = useState<FormSchema>({
    id: initialSchema?.id || `form-${Date.now()}`,
    title: initialSchema?.title || 'New Form',
    description: initialSchema?.description || '',
    fields: initialSchema?.fields || [],
    aiAnalysis: initialSchema?.aiAnalysis
  });

  const [selectedFieldIndex, setSelectedFieldIndex] = useState<number | null>(null);
  const [aiRecommendations, setAIRecommendations] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  
  const accessibility = useAccessibility();
  const performance = usePerformance();
  const analysisTimeoutRef = useRef<NodeJS.Timeout>();

  // Real-time AI analysis
  useEffect(() => {
    if (!enableAIAssistance || schema.fields.length === 0) return;

    clearTimeout(analysisTimeoutRef.current);
    analysisTimeoutRef.current = setTimeout(() => {
      setIsAnalyzing(true);
      
      // Simulate AI analysis delay
      setTimeout(() => {
        const optimizations = optimizeFormFlow(schema.fields);
        const accessibilityScore = calculateAccessibilityScore(schema.fields);
        const performanceScore = performance.getPerformanceScore();
        
        const updatedSchema = {
          ...schema,
          aiAnalysis: {
            purpose: detectFormPurpose(schema.title, schema.description),
            conversionOptimizations: optimizations,
            performanceScore,
            accessibilityScore,
            recommendations: [
              ...optimizations,
              ...(accessibilityScore < 90 ? ['Improve accessibility compliance'] : []),
              ...(performanceScore < 80 ? ['Optimize form performance'] : [])
            ]
          }
        };

        setSchema(updatedSchema);
        setAIRecommendations(updatedSchema.aiAnalysis!.recommendations);
        setIsAnalyzing(false);
        onSchemaChange?.(updatedSchema);
      }, 1000);
    }, 500);

    return () => clearTimeout(analysisTimeoutRef.current);
  }, [schema.fields, enableAIAssistance]);

  const detectFormPurpose = (title: string, description: string): string => {
    const combined = (title + ' ' + description).toLowerCase();
    
    if (combined.includes('contact') || combined.includes('support')) return 'Contact/Support Form';
    if (combined.includes('registration') || combined.includes('signup')) return 'Registration Form';
    if (combined.includes('login') || combined.includes('signin')) return 'Authentication Form';
    if (combined.includes('payment') || combined.includes('billing')) return 'Payment Form';
    if (combined.includes('feedback') || combined.includes('survey')) return 'Feedback/Survey Form';
    if (combined.includes('application') || combined.includes('apply')) return 'Application Form';
    
    return 'General Purpose Form';
  };

  const calculateAccessibilityScore = (fields: FormField[]): number => {
    let score = 100;
    
    fields.forEach(field => {
      if (!field.label || field.label.trim() === '') score -= 10;
      if (field.required && !field.validation) score -= 5;
      if (field.type === 'select' && (!field.options || field.options.length === 0)) score -= 10;
    });

    return Math.max(0, score);
  };

  const addField = useCallback(() => {
    const newField: FormField = {
      id: `field-${Date.now()}`,
      type: 'text',
      label: 'New Field',
      required: false
    };

    setSchema(prev => ({
      ...prev,
      fields: [...prev.fields, newField]
    }));
  }, []);

  const updateField = useCallback((index: number, updates: Partial<FormField>) => {
    setSchema(prev => ({
      ...prev,
      fields: prev.fields.map((field, i) => {
        if (i === index) {
          const updatedField = { ...field, ...updates };
          
          // AI-powered field analysis
          if (enableAIAssistance && (updates.label || updates.type)) {
            updatedField.aiSuggestions = analyzeFieldPurpose(
              updatedField.label,
              prev.title + ' ' + prev.description
            );
          }
          
          return updatedField;
        }
        return field;
      })
    }));
  }, [enableAIAssistance]);

  const removeField = useCallback((index: number) => {
    setSchema(prev => ({
      ...prev,
      fields: prev.fields.filter((_, i) => i !== index)
    }));
    if (selectedFieldIndex === index) {
      setSelectedFieldIndex(null);
    }
  }, [selectedFieldIndex]);

  const validateForm = useCallback((): boolean => {
    const errors: Record<string, string> = {};
    
    if (!schema.title.trim()) {
      errors.title = 'Form title is required';
    }
    
    schema.fields.forEach((field, index) => {
      if (!field.label.trim()) {
        errors[`field-${index}-label`] = 'Field label is required';
      }
      
      if (field.type === 'select' && (!field.options || field.options.length === 0)) {
        errors[`field-${index}-options`] = 'Select fields must have options';
      }
    });

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  }, [schema]);

  const exportSchema = useCallback(() => {
    if (!validateForm()) return;
    
    const exportData = {
      ...schema,
      exportedAt: new Date().toISOString(),
      version: '1.0.0'
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${schema.title.replace(/\s+/g, '-').toLowerCase()}-schema.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [schema, validateForm]);

  return (
    <div className="glass-glass-w-full max-w-6xl mx-auto glass-glass-p-6 space-y-8">
      {/* Form Builder Header */}
      <Glass className="glass-glass-p-6">
        <div className="glass-glass-flex glass-glass-items-center glass-glass-justify-between mb-6">
          <div>
            <h1 className="glass-glass-text-2xl font-bold glass-text-secondary">🤖 Intelligent Form Builder</h1>
            <p className="glass-text-secondary mt-1">AI-powered form creation with real-time optimization</p>
          </div>
          <div className="glass-glass-flex glass-glass-gap-3">
            <button
              onClick={exportSchema}
              className="glass-glass-px-4 glass-glass-py-2 glass-surface-blue glass-glass-text-primary glass-radius-lg hover:glass-surface-blue transition-colors"
            >
              Export Schema
            </button>
            <button
              onClick={addField}
              className="glass-glass-px-4 glass-glass-py-2 glass-surface-green glass-glass-text-primary glass-radius-lg hover:glass-surface-green transition-colors"
            >
              + Add Field
            </button>
          </div>
        </div>

        {/* Form Basic Info */}
        <div className="glass-glass-grid glass-glass-glass-grid-cols-1 lg:glass-glass-glass-grid-cols-2 glass-glass-gap-6 mb-6">
          <div>
            <label className="glass-glass-block glass-glass-text-sm glass-glass-font-medium glass-text-secondary glass-glass-mb-2">
              Form Title *
            </label>
            <input
              type="text"
              value={schema.title}
              onChange={(e) => setSchema(prev => ({ ...prev, title: e.target.value }))}
              className={cn(
                "w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
                validationErrors.title ? "border-red-500" : "border-gray-300"
              )}
              placeholder="Enter form title..."
            />
            {validationErrors.title && (
              <p className="glass-glass-text-primary glass-glass-text-sm mt-1">{validationErrors.title}</p>
            )}
          </div>
          <div>
            <label className="glass-glass-block glass-glass-text-sm glass-glass-font-medium glass-text-secondary glass-glass-mb-2">
              Description
            </label>
            <input
              type="text"
              value={schema.description}
              onChange={(e) => setSchema(prev => ({ ...prev, description: e.target.value }))}
              className="glass-glass-w-full glass-glass-px-3 glass-glass-py-2 glass-glass-border glass-glass-border-subtle glass-radius-lg focus:ring-2 focus:ring-blue-500 focus:glass-glass-border-blue"
              placeholder="Describe the purpose of this form..."
            />
          </div>
        </div>

        {/* AI Analysis Panel */}
        {enableAIAssistance && schema.aiAnalysis && (
          <div className="glass-gradient-primary from-blue-50 to-indigo-50 glass-radius-xl glass-glass-p-6">
            <div className="glass-glass-flex glass-glass-items-center glass-glass-gap-3 glass-glass-mb-4">
              <div className="glass-glass-w-8 glass-glass-h-8 glass-surface-blue glass-radius-full glass-glass-flex glass-glass-items-center glass-glass-justify-center">
                <span className="glass-glass-text-primary glass-glass-text-sm">🤖</span>
              </div>
              <div>
                <h3 className="glass-glass-font-semibold glass-text-secondary">AI Analysis</h3>
                <p className="glass-glass-text-sm glass-text-secondary">
                  Detected Purpose: {schema.aiAnalysis.purpose}
                </p>
              </div>
              {isAnalyzing && (
                <div className="ml-auto">
                  <div className="animate-spin glass-glass-w-5 glass-glass-h-5 glass-glass-border-2 glass-glass-border-blue glass-glass-border-t-transparent glass-radius-full"></div>
                </div>
              )}
            </div>

            <div className="glass-glass-grid glass-glass-glass-grid-cols-1 lg:glass-glass-glass-grid-cols-3 glass-glass-gap-4 glass-glass-mb-4">
              <div className="glass-glass-text-center">
                <div className="glass-glass-text-2xl font-bold glass-glass-text-primary">
                  {schema.aiAnalysis.accessibilityScore}%
                </div>
                <div className="glass-glass-text-sm glass-text-secondary">Accessibility Score</div>
              </div>
              <div className="glass-glass-text-center">
                <div className="glass-glass-text-2xl font-bold glass-glass-text-primary">
                  {schema.aiAnalysis.performanceScore}/100
                </div>
                <div className="glass-glass-text-sm glass-text-secondary">Performance Score</div>
              </div>
              <div className="glass-glass-text-center">
                <div className="glass-glass-text-2xl font-bold text-purple-600">
                  {schema.fields.length}
                </div>
                <div className="glass-glass-text-sm glass-text-secondary">Total Fields</div>
              </div>
            </div>

            {schema.aiAnalysis.recommendations.length > 0 && (
              <div>
                <h4 className="glass-glass-font-medium glass-text-secondary glass-glass-mb-2">🎯 AI Recommendations:</h4>
                <ul className="space-y-1">
                  {schema.aiAnalysis.recommendations.slice(0, 3).map((rec, index) => (
                    <li key={index} className="glass-glass-text-sm glass-text-secondary glass-glass-flex glass-glass-items-center glass-glass-gap-2">
                      <span className="w-1.5 h-1.5 glass-surface-blue glass-radius-full"></span>
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </Glass>

      {/* Form Fields Builder */}
      <div className="glass-glass-grid glass-glass-glass-grid-cols-1 lg:glass-glass-glass-grid-cols-2 glass-glass-gap-8">
        {/* Fields List */}
        <Glass className="glass-glass-p-6">
          <h2 className="glass-glass-text-lg glass-glass-font-semibold glass-text-secondary glass-glass-mb-4">Form Fields</h2>
          <div className="glass-glass-space-y-4 max-h-96 glass-glass-overflow-y-auto">
            {schema.fields.map((field, index) => (
              <div
                key={field.id}
                className={cn(
                  "p-4 border rounded-lg cursor-pointer transition-all",
                  selectedFieldIndex === index 
                    ? "border-blue-500 bg-blue-50" 
                    : "border-gray-200 hover:border-gray-300"
                )}
                onClick={() => setSelectedFieldIndex(index)}
              >
                <div className="glass-glass-flex glass-glass-items-center glass-glass-justify-between">
                  <div className="glass-glass-flex-1">
                    <div className="glass-glass-font-medium glass-text-secondary">{field.label}</div>
                    <div className="glass-glass-text-sm glass-text-secondary glass-glass-capitalize">
                      {field.type} {field.required && "• Required"}
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeField(index);
                    }}
                    className="glass-glass-text-primary hover:glass-glass-text-primary glass-glass-p-1"
                  >
                    ✕
                  </button>
                </div>
                
                {enableAIAssistance && field.aiSuggestions && field.aiSuggestions.fieldType.length > 0 && (
                  <div className="mt-2 glass-glass-flex glass-glass-flex-wrap glass-glass-gap-1">
                    {field.aiSuggestions.fieldType.slice(0, 2).map((suggestion, i) => (
                      <span key={i} className="glass-glass-px-2 glass-glass-py-1 glass-glass-text-xs bg-yellow-100 glass-glass-text-primary glass-radius">
                        💡 {suggestion}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            {schema.fields.length === 0 && (
              <div className="glass-glass-text-center glass-glass-py-8 glass-text-secondary">
                <div className="glass-glass-text-4xl glass-glass-mb-2">📝</div>
                <p>No fields yet. Click "Add Field" to get started.</p>
              </div>
            )}
          </div>
        </Glass>

        {/* Field Editor */}
        <Glass className="glass-glass-p-6">
          <h2 className="glass-glass-text-lg glass-glass-font-semibold glass-text-secondary glass-glass-mb-4">Field Editor</h2>
          
          {selectedFieldIndex !== null && schema.fields[selectedFieldIndex] ? (
            <div className="glass-glass-space-y-4">
              {(() => {
                const field = schema.fields[selectedFieldIndex];
                return (
                  <>
                    {/* Basic Field Properties */}
                    <div>
                      <label className="glass-glass-block glass-glass-text-sm glass-glass-font-medium glass-text-secondary glass-glass-mb-2">
                        Field Label *
                      </label>
                      <input
                        type="text"
                        value={field.label}
                        onChange={(e) => updateField(selectedFieldIndex, { label: e.target.value })}
                        className={cn(
                          "w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
                          validationErrors[`field-${selectedFieldIndex}-label`] ? "border-red-500" : "border-gray-300"
                        )}
                        placeholder="Enter field label..."
                      />
                      {validationErrors[`field-${selectedFieldIndex}-label`] && (
                        <p className="glass-glass-text-primary glass-glass-text-sm mt-1">
                          {validationErrors[`field-${selectedFieldIndex}-label`]}
                        </p>
                      )}
                    </div>

                    <div className="glass-glass-grid glass-glass-glass-grid-cols-2 glass-glass-gap-4">
                      <div>
                        <label className="glass-glass-block glass-glass-text-sm glass-glass-font-medium glass-text-secondary glass-glass-mb-2">
                          Field Type
                        </label>
                        <select
                          value={field.type}
                          onChange={(e) => updateField(selectedFieldIndex, { type: e.target.value as FormField['type'] })}
                          className="glass-glass-w-full glass-glass-px-3 glass-glass-py-2 glass-glass-border glass-glass-border-subtle glass-radius-lg focus:ring-2 focus:ring-blue-500 focus:glass-glass-border-blue"
                        >
                          <option value="text">Text</option>
                          <option value="email">Email</option>
                          <option value="password">Password</option>
                          <option value="tel">Phone</option>
                          <option value="number">Number</option>
                          <option value="date">Date</option>
                          <option value="url">URL</option>
                          <option value="textarea">Textarea</option>
                          <option value="select">Select</option>
                          <option value="checkbox">Checkbox</option>
                          <option value="radio">Radio</option>
                          <option value="file">File Upload</option>
                        </select>
                      </div>

                      <div className="glass-glass-flex glass-glass-items-center">
                        <label className="glass-glass-flex glass-glass-items-center glass-glass-gap-2 glass-glass-text-sm glass-glass-font-medium glass-text-secondary">
                          <input
                            type="checkbox"
                            checked={field.required || false}
                            onChange={(e) => updateField(selectedFieldIndex, { required: e.target.checked })}
                            className="glass-radius glass-glass-border-subtle glass-glass-text-primary focus:ring-blue-500"
                          />
                          Required Field
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="glass-glass-block glass-glass-text-sm glass-glass-font-medium glass-text-secondary glass-glass-mb-2">
                        Placeholder Text
                      </label>
                      <input
                        type="text"
                        value={field.placeholder || ''}
                        onChange={(e) => updateField(selectedFieldIndex, { placeholder: e.target.value })}
                        className="glass-glass-w-full glass-glass-px-3 glass-glass-py-2 glass-glass-border glass-glass-border-subtle glass-radius-lg focus:ring-2 focus:ring-blue-500 focus:glass-glass-border-blue"
                        placeholder="Enter placeholder text..."
                      />
                    </div>

                    {/* Options for Select/Radio fields */}
                    {(field.type === 'select' || field.type === 'radio') && (
                      <div>
                        <label className="glass-glass-block glass-glass-text-sm glass-glass-font-medium glass-text-secondary glass-glass-mb-2">
                          Options
                        </label>
                        <div className="glass-glass-space-y-2">
                          {(field.options || []).map((option, optionIndex) => (
                            <div key={optionIndex} className="glass-glass-flex glass-glass-gap-2">
                              <input
                                type="text"
                                value={option.value}
                                onChange={(e) => {
                                  const newOptions = [...(field.options || [])];
                                  newOptions[optionIndex] = { ...option, value: e.target.value };
                                  updateField(selectedFieldIndex, { options: newOptions });
                                }}
                                placeholder="Value"
                                className="glass-glass-flex-1 glass-glass-px-3 glass-glass-py-2 glass-glass-border glass-glass-border-subtle glass-radius-lg focus:ring-2 focus:ring-blue-500 focus:glass-glass-border-blue"
                              />
                              <input
                                type="text"
                                value={option.label}
                                onChange={(e) => {
                                  const newOptions = [...(field.options || [])];
                                  newOptions[optionIndex] = { ...option, label: e.target.value };
                                  updateField(selectedFieldIndex, { options: newOptions });
                                }}
                                placeholder="Label"
                                className="glass-glass-flex-1 glass-glass-px-3 glass-glass-py-2 glass-glass-border glass-glass-border-subtle glass-radius-lg focus:ring-2 focus:ring-blue-500 focus:glass-glass-border-blue"
                              />
                              <button
                                onClick={() => {
                                  const newOptions = (field.options || []).filter((_, i) => i !== optionIndex);
                                  updateField(selectedFieldIndex, { options: newOptions });
                                }}
                                className="glass-glass-px-3 glass-glass-py-2 glass-glass-text-primary hover:glass-glass-text-primary"
                              >
                                ✕
                              </button>
                            </div>
                          ))}
                          <button
                            onClick={() => {
                              const newOptions = [...(field.options || []), { value: '', label: '' }];
                              updateField(selectedFieldIndex, { options: newOptions });
                            }}
                            className="glass-glass-w-full glass-glass-px-3 glass-glass-py-2 glass-glass-border glass-glass-border-dashed glass-glass-border-subtle glass-radius-lg glass-text-secondary hover:glass-glass-border-subtle transition-colors"
                          >
                            + Add Option
                          </button>
                        </div>
                        {validationErrors[`field-${selectedFieldIndex}-options`] && (
                          <p className="glass-glass-text-primary glass-glass-text-sm mt-1">
                            {validationErrors[`field-${selectedFieldIndex}-options`]}
                          </p>
                        )}
                      </div>
                    )}

                    {/* AI Suggestions */}
                    {enableAIAssistance && field.aiSuggestions && (
                      <div className="bg-yellow-50 glass-radius-lg glass-glass-p-4">
                        <h4 className="glass-glass-font-medium glass-text-secondary glass-glass-mb-2">🤖 AI Suggestions</h4>
                        
                        {field.aiSuggestions.fieldType.length > 0 && (
                          <div className="glass-glass-mb-3">
                            <h5 className="glass-glass-text-sm glass-glass-font-medium glass-text-secondary">Recommended Field Types:</h5>
                            <div className="glass-glass-flex glass-glass-flex-wrap glass-glass-gap-1 mt-1">
                              {field.aiSuggestions.fieldType.map((type, i) => (
                                <button
                                  key={i}
                                  onClick={() => updateField(selectedFieldIndex, { type: type as FormField['type'] })}
                                  className="glass-glass-px-2 glass-glass-py-1 glass-glass-text-xs bg-blue-100 glass-glass-text-primary glass-radius hover:bg-blue-200 transition-colors"
                                >
                                  {type}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {field.aiSuggestions.validationRules.length > 0 && (
                          <div className="glass-glass-mb-3">
                            <h5 className="glass-glass-text-sm glass-glass-font-medium glass-text-secondary">Validation Suggestions:</h5>
                            <ul className="glass-glass-text-xs glass-text-secondary mt-1 space-y-1">
                              {field.aiSuggestions.validationRules.slice(0, 2).map((rule, i) => (
                                <li key={i} className="glass-glass-flex glass-glass-items-center glass-glass-gap-1">
                                  <span className="w-1 h-1 glass-surface-green glass-radius-full"></span>
                                  {rule}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {field.aiSuggestions.uxOptimizations.length > 0 && (
                          <div>
                            <h5 className="glass-glass-text-sm glass-glass-font-medium glass-text-secondary">UX Optimizations:</h5>
                            <ul className="glass-glass-text-xs glass-text-secondary mt-1 space-y-1">
                              {field.aiSuggestions.uxOptimizations.slice(0, 2).map((opt, i) => (
                                <li key={i} className="glass-glass-flex glass-glass-items-center glass-glass-gap-1">
                                  <span className="w-1 h-1 bg-purple-500 glass-radius-full"></span>
                                  {opt}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </>
                );
              })()}
            </div>
          ) : (
            <div className="glass-glass-text-center glass-glass-py-8 glass-text-secondary">
              <div className="glass-glass-text-4xl glass-glass-mb-2">⚙️</div>
              <p>Select a field from the left to edit its properties</p>
            </div>
          )}
        </Glass>
      </div>

      {/* Form Preview */}
      <Glass className="glass-glass-p-6">
        <h2 className="glass-glass-text-lg glass-glass-font-semibold glass-text-secondary glass-glass-mb-4">Live Preview</h2>
        <div className="glass-surface-subtle glass-radius-lg glass-glass-p-6">
          <form className="max-w-2xl mx-auto space-y-6">
            <div className="glass-glass-text-center mb-8">
              <h2 className="glass-glass-text-2xl font-bold glass-text-secondary">{schema.title}</h2>
              {schema.description && (
                <p className="glass-text-secondary mt-2">{schema.description}</p>
              )}
            </div>

            {schema.fields.map((field, index) => (
              <div key={field.id}>
                <label className="glass-glass-block glass-glass-text-sm glass-glass-font-medium glass-text-secondary glass-glass-mb-2">
                  {field.label}
                  {field.required && <span className="glass-glass-text-primary ml-1">*</span>}
                </label>
                
                {field.type === 'textarea' ? (
                  <textarea
                    placeholder={field.placeholder}
                    required={field.required}
                    className="glass-glass-w-full glass-glass-px-3 glass-glass-py-2 glass-glass-border glass-glass-border-subtle glass-radius-lg focus:ring-2 focus:ring-blue-500 focus:glass-glass-border-blue"
                    rows={3}
                  />
                ) : field.type === 'select' ? (
                  <select
                    required={field.required}
                    className="glass-glass-w-full glass-glass-px-3 glass-glass-py-2 glass-glass-border glass-glass-border-subtle glass-radius-lg focus:ring-2 focus:ring-blue-500 focus:glass-glass-border-blue"
                  >
                    <option value="">Choose an option...</option>
                    {(field.options || []).map((option, i) => (
                      <option key={i} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : field.type === 'checkbox' ? (
                  <label className="glass-glass-flex glass-glass-items-center glass-glass-gap-2">
                    <input
                      type="checkbox"
                      required={field.required}
                      className="glass-radius glass-glass-border-subtle glass-glass-text-primary focus:ring-blue-500"
                    />
                    <span className="glass-glass-text-sm glass-text-secondary">{field.placeholder || 'Check this option'}</span>
                  </label>
                ) : field.type === 'radio' ? (
                  <div className="glass-glass-space-y-2">
                    {(field.options || []).map((option, i) => (
                      <label key={i} className="glass-glass-flex glass-glass-items-center glass-glass-gap-2">
                        <input
                          type="radio"
                          name={field.id}
                          value={option.value}
                          required={field.required}
                          className="glass-glass-border-subtle glass-glass-text-primary focus:ring-blue-500"
                        />
                        <span className="glass-glass-text-sm glass-text-secondary">{option.label}</span>
                      </label>
                    ))}
                  </div>
                ) : (
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    required={field.required}
                    className="glass-glass-w-full glass-glass-px-3 glass-glass-py-2 glass-glass-border glass-glass-border-subtle glass-radius-lg focus:ring-2 focus:ring-blue-500 focus:glass-glass-border-blue"
                  />
                )}
              </div>
            ))}

            {schema.fields.length > 0 && (
              <div className="pt-6 glass-glass-border-t">
                <button
                  type="button"
                  className="glass-glass-w-full glass-glass-px-6 glass-glass-py-3 glass-surface-blue glass-glass-text-primary glass-radius-lg hover:glass-surface-blue transition-colors glass-glass-font-medium"
                >
                  Submit Form
                </button>
              </div>
            )}
          </form>
        </div>
      </Glass>
    </div>
  );
};

export default GlassIntelligentFormBuilder;
