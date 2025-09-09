'use client';

import { GlassButton } from '../button/GlassButton';
import { GlassInput } from '../input/GlassInput';

import { cn } from '@/design-system/utilsCore';
import React, { forwardRef, useCallback, useState } from 'react';
import { Motion } from '../../primitives';
import { GlassCard } from '../card/GlassCard';
import { GlassBadge } from '../data-display/GlassBadge';
import { GlassTextArea } from '../input/GlassInput';
import { GlassSelect } from '../input/GlassSelect';

export interface FormField {
  id: string;
  type: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'date' | 'file';
  label: string;
  placeholder?: string;
  description?: string;
  required?: boolean;
  disabled?: boolean;
  options?: { value: string; label: string }[];
  validation?: {
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    custom?: (value: any) => string | null;
  };
  defaultValue?: any;
  conditional?: {
    field: string;
    operator: 'equals' | 'not_equals' | 'contains' | 'greater_than' | 'less_than';
    value: any;
  };
  layout?: {
    width?: 'full' | 'half' | 'third' | 'quarter';
    order?: number;
  };
}

export interface FormSection {
  id: string;
  title: string;
  description?: string;
  fields: FormField[];
  collapsible?: boolean;
  defaultExpanded?: boolean;
}

export interface FormValue {
  [fieldId: string]: any;
}

export interface FormError {
  [fieldId: string]: string;
}

export interface GlassFormBuilderProps {
  /**
   * Form schema
   */
  schema?: FormSection[];
  /**
   * Form values
   */
  values?: FormValue;
  /**
   * Form errors
   */
  errors?: FormError;
  /**
   * Value change handler
   */
  onChange?: (values: FormValue) => void;
  /**
   * Form submit handler
   */
  onSubmit?: (values: FormValue) => void;
  /**
   * Validation handler
   */
  onValidate?: (values: FormValue) => FormError;
  /**
   * Form variant
   */
  variant?: 'default' | 'compact' | 'wizard' | 'inline';
  /**
   * Form size
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Whether form is loading
   */
  loading?: boolean;
  /**
   * Whether form is disabled
   */
  disabled?: boolean;
  /**
   * Form title
   */
  title?: string;
  /**
   * Form description
   */
  description?: string;
  /**
   * Submit button text
   */
  submitText?: string;
  /**
   * Cancel button text
   */
  cancelText?: string;
  /**
   * Show cancel button
   */
  showCancel?: boolean;
  /**
   * Cancel handler
   */
  onCancel?: () => void;
  /**
   * Auto-save functionality
   */
  autoSave?: boolean;
  /**
   * Auto-save delay in ms
   */
  autoSaveDelay?: number;
  /**
   * Show field count
   */
  showProgress?: boolean;
  /**
   * Validate on change
   */
  validateOnChange?: boolean;
  /**
   * Custom field renderer
   */
  renderField?: (field: FormField, value: any, onChange: (value: any) => void, error?: string) => React.ReactNode;
  className?: string;
}

/**
 * GlassFormBuilder component
 * Dynamic form generator with glassmorphism styling
 */
export const GlassFormBuilder = forwardRef<HTMLFormElement, GlassFormBuilderProps>(
  (
    {
      schema = [],
      values = {},
      errors = {},
      onChange,
      onSubmit,
      onValidate,
      variant = 'default',
      size = 'md',
      loading = false,
      disabled = false,
      title,
      description,
      submitText = 'Submit',
      cancelText = 'Cancel',
      showCancel = false,
      onCancel,
      autoSave = false,
      autoSaveDelay = 1000,
      showProgress = false,
      validateOnChange = true,
      renderField,
      className,
      ...props
    },
    ref
  ) => {
    const [internalValues, setInternalValues] = useState<FormValue>(values);
    const [internalErrors, setInternalErrors] = useState<FormError>(errors);
    const [expandedSections, setExpandedSections] = useState<Set<string>>(
      new Set(schema.filter(section => section.defaultExpanded !== false).map(s => s.id))
    );
    const [autoSaveTimer, setAutoSaveTimer] = useState<NodeJS.Timeout>();

    const sizeClasses = {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    };

    const variantClasses = {
      default: 'space-y-6',
      compact: 'space-y-4',
      wizard: 'space-y-8',
      inline: 'space-y-2',
    };

    // Get all fields for progress calculation
    const allFields = schema.flatMap(section => section.fields);
    const filledFields = allFields.filter(field => {
      const value = internalValues[field.id];
      return value !== undefined && value !== '' && value !== null;
    });

    // Handle value change
    const handleValueChange = useCallback((fieldId: string, value: any) => {
      const newValues = { ...internalValues, [fieldId]: value };
      setInternalValues(newValues);
      onChange?.(newValues);

      // Auto-save
      if (autoSave) {
        if (autoSaveTimer) {
          clearTimeout(autoSaveTimer);
        }
        setAutoSaveTimer(setTimeout(() => {
          onSubmit?.(newValues);
        }, autoSaveDelay));
      }

      // Validate on change
      if (validateOnChange && onValidate) {
        const newErrors = onValidate(newValues);
        setInternalErrors(newErrors);
      }
    }, [internalValues, onChange, autoSave, autoSaveTimer, autoSaveDelay, onSubmit, validateOnChange, onValidate]);

    // Check if field should be shown based on conditional logic
    const shouldShowField = useCallback((field: FormField) => {
      if (!field.conditional) return true;

      const { field: conditionField, operator, value: conditionValue } = field.conditional;
      const fieldValue = internalValues[conditionField];

      switch (operator) {
        case 'equals':
          return fieldValue === conditionValue;
        case 'not_equals':
          return fieldValue !== conditionValue;
        case 'contains':
          return String(fieldValue).includes(String(conditionValue));
        case 'greater_than':
          return Number(fieldValue) > Number(conditionValue);
        case 'less_than':
          return Number(fieldValue) < Number(conditionValue);
        default:
          return true;
      }
    }, [internalValues]);

    // Validate field
    const validateField = (field: FormField, value: any): string | null => {
      if (field.required && (!value || value === '')) {
        return `${field.label} is required`;
      }

      if (field.validation) {
        const { min, max, minLength, maxLength, pattern, custom } = field.validation;

        if (min !== undefined && Number(value) < min) {
          return `${field.label} must be at least ${min}`;
        }

        if (max !== undefined && Number(value) > max) {
          return `${field.label} must be at most ${max}`;
        }

        if (minLength !== undefined && String(value).length < minLength) {
          return `${field.label} must be at least ${minLength} characters`;
        }

        if (maxLength !== undefined && String(value).length > maxLength) {
          return `${field.label} must be at most ${maxLength} characters`;
        }

        if (pattern && !new RegExp(pattern).test(String(value))) {
          return `${field.label} format is invalid`;
        }

        if (custom) {
          const customError = custom(value);
          if (customError) return customError;
        }
      }

      return null;
    };

    // Render field based on type
    const renderFieldComponent = (field: FormField) => {
      const value = internalValues[field.id] ?? field.defaultValue ?? '';
      const error = internalErrors[field.id];
      const isDisabled = disabled || field.disabled;

      // Use custom renderer if provided
      if (renderField) {
        return renderField(field, value, (newValue) => handleValueChange(field.id, newValue), error);
      }

      const baseProps = {
        id: field.id,
        label: field.label,
        placeholder: field.placeholder,
        disabled: isDisabled,
        error: error,
        required: field.required,
        size,
        fullWidth: true,
      };

      switch (field.type) {
        case 'text':
        case 'email':
        case 'password':
        case 'number':
        case 'tel':
        case 'url':
        case 'date':
          return (
            <GlassInput
              {...baseProps}
              type={field.type}
              value={value}
              onChange={(e: any) => handleValueChange(field.id, e.target.value)}
            />
          );

        case 'textarea':
          return (
            <GlassTextArea
              {...baseProps}
              value={value}
              onChange={(e: any) => handleValueChange(field.id, e.target.value)}
              rows={4}
            />
          );

        case 'select':
          return (
            <GlassSelect
              {...baseProps}
              value={value}
              onChange={(e: any) => handleValueChange(field.id, e.target.value)}
              options={field.options || []}
            />
          );

        case 'checkbox':
          return (
            <label className="flex items-center gap-3 cursor-pointer">
              <GlassInput type="checkbox"
                id={field.id}
                checked={value}
                onChange={(e) => handleValueChange(field.id, e.target.checked)}
                disabled={isDisabled}
                className="rounded border-border focus:ring-primary"
              />
              <span className={cn('font-medium', sizeClasses[size])}>
                {field.label}
                {field.required && <span className="text-destructive ml-1">*</span>}
              </span>
            </label>
          );

        case 'radio':
          return (
            <div className="space-y-2">
              <label className={cn('font-medium text-foreground', sizeClasses[size])}>
                {field.label}
                {field.required && <span className="text-destructive ml-1">*</span>}
              </label>
              <div className="space-y-2">
                {field.options?.map((option) => (
                  <label key={option.value} className="flex items-center gap-3 cursor-pointer">
                    <GlassInput type="radio"
                      name={field.id}
                      value={option.value}
                      checked={value === option.value}
                      onChange={(e: any) => handleValueChange(field.id, e.target.value)}
                      disabled={isDisabled}
                      className="border-border focus:ring-primary"
                    />
                    <span className="text-sm">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
          );

        default:
          return null;
      }
    };

    // Get field width class
    const getFieldWidthClass = (field: FormField) => {
      switch (field.layout?.width) {
        case 'half':
          return 'md:col-span-6';
        case 'third':
          return 'md:col-span-4';
        case 'quarter':
          return 'md:col-span-3';
        default:
          return 'md:col-span-12';
      }
    };

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();

      // Validate all fields
      const newErrors: FormError = {};
      allFields.forEach(field => {
        if (shouldShowField(field)) {
          const value = internalValues[field.id];
          const error = validateField(field, value);
          if (error) {
            newErrors[field.id] = error;
          }
        }
      });

      setInternalErrors(newErrors);

      // Submit if no errors
      if (Object.keys(newErrors).length === 0) {
        onSubmit?.(internalValues);
      }
    };

    // Toggle section expansion
    const toggleSection = (sectionId: string) => {
      const newExpanded = new Set(expandedSections);
      if (newExpanded.has(sectionId)) {
        newExpanded.delete(sectionId);
      } else {
        newExpanded.add(sectionId);
      }
      setExpandedSections(newExpanded);
    };

    return (
      <form
        ref={ref}
        onSubmit={handleSubmit}
        className={cn('w-full', className)}
        {...props}
      >
        {/* Form header */}
        {(title || description || showProgress) && (
          <div className="mb-6">
            {title && (
              <h2 className={cn('font-semibold text-foreground mb-2', {
                'text-lg': size === 'sm',
                'text-xl': size === 'md',
                'text-2xl': size === 'lg',
              })}>
                {title}
              </h2>
            )}

            {description && (
              <p className="text-muted-foreground mb-4">{description}</p>
            )}

            {showProgress && (
              <div className="flex items-center gap-4">
                <div className="flex-1 bg-muted/30 rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${allFields.length > 0 ? (filledFields.length / allFields.length) * 100 : 0}%`
                    }}
                  />
                </div>
                <span className="text-sm text-muted-foreground">
                  {filledFields.length} / {allFields.length} completed
                </span>
              </div>
            )}
          </div>
        )}

        {/* Form sections */}
        <div className={variantClasses[variant]}>
          {schema.map((section) => (
            <Motion key={section.id} preset="slideDown">
              <GlassCard variant="default" className="p-6">
                {/* Section header */}
                <div
                  className={cn(
                    'flex items-center justify-between mb-4',
                    section.collapsible && 'cursor-pointer'
                  )}
                  onClick={section.collapsible ? () => toggleSection(section.id) : undefined}
                >
                  <div>
                    <h3 className={cn('font-medium text-foreground', {
                      'text-base': size === 'sm',
                      'text-lg': size === 'md',
                      'text-xl': size === 'lg',
                    })}>
                      {section.title}
                    </h3>
                    {section.description && (
                      <p className="text-sm text-muted-foreground mt-1">
                        {section.description}
                      </p>
                    )}
                  </div>

                  {section.collapsible && (
                    <GlassButton
                      leftIcon={expandedSections.has(section.id) ? "−" : "+"}
                      variant="ghost"
                      size="sm"
                      aria-label={expandedSections.has(section.id) ? 'Collapse section' : 'Expand section'}
                    />
                  )}
                </div>

                {/* Section fields */}
                {(!section.collapsible || expandedSections.has(section.id)) && (
                  <div className="grid grid-cols-12 gap-4">
                    {section.fields
                      .filter(shouldShowField)
                      .sort((a, b) => (a.layout?.order || 0) - (b.layout?.order || 0))
                      .map((field) => (
                        <div
                          key={field.id}
                          className={cn('col-span-12', getFieldWidthClass(field))}
                        >
                          {renderFieldComponent(field)}
                          {field.description && (
                            <p className="text-xs text-muted-foreground mt-1">
                              {field.description}
                            </p>
                          )}
                        </div>
                      ))}
                  </div>
                )}
              </GlassCard>
            </Motion>
          ))}
        </div>

        {/* Form actions */}
        <div className="flex items-center justify-end gap-3 mt-8">
          {autoSave && (
            <GlassBadge variant="outline" size="sm">
              Auto-save enabled
            </GlassBadge>
          )}

          {showCancel && (
            <GlassButton
              type="button"
              variant="ghost"
              size={size}
              onClick={onCancel}
              disabled={loading}
            >
              {cancelText}
            </GlassButton>
          )}

          <GlassButton
            type="submit"
            variant="default"
            size={size}
            loading={loading}
            disabled={disabled}
          >
            {submitText}
          </GlassButton>
        </div>
      </form>
    );
  }
);

GlassFormBuilder.displayName = 'GlassFormBuilder';