'use client';

import { OptimizedGlass } from '@/design-system/primitives/glass/OptimizedGlass';
import { cn } from "@/lib/utils";
import * as LabelPrimitive from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";
import { AlertCircle } from "lucide-react";
import * as React from "react";
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
  FormProvider,
  useFormContext,
} from "react-hook-form";
import { GlassLabel } from "./GlassLabel";

// Form root is just the FormProvider
const GlassForm = FormProvider;

// Form field context types
type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName;
};

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
);

// Glass Form Field
const GlassFormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

// Form item context types
type FormItemContextValue = {
  id: string;
};

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
);

// Glass Form Item
export interface GlassFormItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Item spacing variant */
  spacing?: 'sm' | 'md' | 'lg';
  /** Whether to show glass background */
  glass?: boolean;
}

const GlassFormItem = React.forwardRef<HTMLDivElement, GlassFormItemProps>(
  ({ className, spacing = 'md', glass = false, ...props }, ref) => {
    const id = React.useId();

    const spacingConfig = {
      sm: 'space-y-1',
      md: 'space-y-2',
      lg: 'space-y-3',
    };

    return (
      <FormItemContext.Provider value={{ id }}>
        {glass ? (
          <OptimizedGlass
            variant="frosted"
            elevation={1}
            intensity="medium"
            depth={2}
            tint="neutral"
            border="subtle"
            animation="none"
            performanceMode="medium"
            ref={ref}
            className={cn(
              'glass-form-item',
              spacingConfig[spacing],
              className
            )}
            {...props}
          />
        ) : (
          <div
            ref={ref}
            className={cn(
              'glass-form-item',
              spacingConfig[spacing],
              className
            )}
            {...props}
          />
        )}
      </FormItemContext.Provider>
    );
  }
);
GlassFormItem.displayName = "GlassFormItem";

// Glass Form Label
export interface GlassFormLabelProps extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> {
  /** Label size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Whether to show required indicator */
  required?: boolean;
}

const GlassFormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  GlassFormLabelProps
>(({ className, size = 'md', required = false, ...props }, ref) => {
  const { error, formItemId } = useFormField();

  return (
    <GlassLabel
      ref={ref}
      size={size}
      required={required}
      className={cn(
        'glass-form-label',
        error && "text-red-400",
        className
      )}
      htmlFor={formItemId}
      {...props}
    />
  );
});
GlassFormLabel.displayName = "GlassFormLabel";

// Glass Form Control
export interface GlassFormControlProps extends React.ComponentPropsWithoutRef<typeof Slot> {
  /** Whether to add glass styling to the control */
  glass?: boolean;
}

const GlassFormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  GlassFormControlProps
>(({ className, glass = false, ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField();

  return (
    <Slot
      ref={ref}
      id={formItemId}
      className={cn(
        'glass-form-control',
        glass && [
          'backdrop-blur-md bg-background/50',
          'border border-border/20 rounded-lg'
        ],
        className
      )}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  );
});
GlassFormControl.displayName = "GlassFormControl";

// Glass Form Description
export interface GlassFormDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  /** Description size variant */
  size?: 'xs' | 'sm' | 'md';
  /** Description variant */
  variant?: 'default' | 'muted' | 'accent';
}

const GlassFormDescription = React.forwardRef<
  HTMLParagraphElement,
  GlassFormDescriptionProps
>(({ className, size = 'sm', variant = 'muted', ...props }, ref) => {
  const { formDescriptionId } = useFormField();

  const sizeConfig = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
  };

  const variantConfig = {
    default: 'text-foreground',
    muted: 'text-muted-foreground',
    accent: 'text-primary',
  };

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn(
        'glass-form-description',
        sizeConfig[size],
        variantConfig[variant],
        className
      )}
      {...props}
    />
  );
});
GlassFormDescription.displayName = "GlassFormDescription";

// Glass Form Message
export interface GlassFormMessageProps extends React.HTMLAttributes<HTMLParagraphElement> {
  /** Message size variant */
  size?: 'xs' | 'sm' | 'md';
  /** Message variant */
  variant?: 'error' | 'warning' | 'success' | 'info';
  /** Whether to show icon */
  showIcon?: boolean;
}

const GlassFormMessage = React.forwardRef<
  HTMLParagraphElement,
  GlassFormMessageProps
>(({
  className,
  children,
  size = 'sm',
  variant = 'error',
  showIcon = true,
  ...props
}, ref) => {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message) : children;

  if (!body) {
    return null;
  }

  const sizeConfig = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
  };

  const variantConfig = {
    error: 'text-red-400',
    warning: 'text-amber-400',
    success: 'text-green-400',
    info: 'text-blue-400',
  };

  const iconSize = {
    xs: 'h-3 w-3',
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
  };

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn(
        'glass-form-message font-medium flex items-center gap-1.5',
        sizeConfig[size],
        variantConfig[variant],
        className
      )}
      {...props}
    >
      {showIcon && variant === 'error' && (
        <AlertCircle className={iconSize[size]} />
      )}
      {body}
    </p>
  );
});
GlassFormMessage.displayName = "GlassFormMessage";

// Custom hook for form field state
const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error("useFormField should be used within <GlassFormField>");
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

// Export all components
export {
  GlassForm, GlassFormControl,
  GlassFormDescription, GlassFormField, GlassFormItem,
  GlassFormLabel, GlassFormMessage, useFormField
};

// Re-export with shorter names for easier usage
export {
  GlassForm as Form, GlassFormControl as FormControl,
  GlassFormDescription as FormDescription, GlassFormField as FormField, GlassFormItem as FormItem,
  GlassFormLabel as FormLabel, GlassFormMessage as FormMessage, useFormField as useGlassFormField
};

export default GlassForm;
