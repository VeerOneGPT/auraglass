'use client';

import React, { forwardRef } from 'react';
import { Motion } from '../../../primitives/motion/Motion';
import { GlassProgress } from '../../../components/data-display/GlassProgress';
import { VStack, HStack } from '../../../components/layout/GlassStack';
import { cn } from '@/lib/utils';

export interface StepIndicatorProps {
  step: {
    id: string;
    title: string;
    description?: string;
    optional?: boolean;
  };
  index: number;
  isActive: boolean;
  isCompleted: boolean;
  isClickable: boolean;
  onClick?: () => void;
  layout?: 'default' | 'compact' | 'vertical';
}

export interface GlassFormWizardStepsProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Wizard steps
   */
  steps: Array<{
    id: string;
    title: string;
    description?: string;
    optional?: boolean;
  }>;
  /**
   * Current active step index
   */
  currentStep: number;
  /**
   * Set of completed step indices
   */
  completedSteps: Set<number>;
  /**
   * Step click handler
   */
  onStepClick?: (stepIndex: number) => void;
  /**
   * Layout variant
   */
  layout?: 'default' | 'compact' | 'vertical';
  /**
   * Show progress bar
   */
  showProgress?: boolean;
  /**
   * Show step numbers
   */
  showNumbers?: boolean;
  /**
   * Allow clicking on steps
   */
  clickable?: boolean;
}

/**
 * StepIndicator component
 * Individual step indicator for wizard navigation
 */
const StepIndicator = forwardRef<HTMLDivElement, StepIndicatorProps>(
  ({ step, index, isActive, isCompleted, isClickable, onClick, layout = 'default' }, ref) => {
    const handleClick = () => {
      if (isClickable && onClick) {
        onClick();
      }
    };

    const renderStepIcon = () => {
      if (isCompleted) {
        return (
          <div className="w-8 h-8 rounded-full bg-success flex items-center justify-center">
            <svg className="w-4 h-4 text-success-foreground" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        );
      }

      return (
        <div className={cn(
          'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium border-2 transition-colors',
          isActive
            ? 'bg-primary border-primary text-primary-foreground'
            : 'bg-background border-border text-muted-foreground'
        )}>
          {index + 1}
        </div>
      );
    };

    const renderStepContent = () => {
      if (layout === 'compact') {
        return renderStepIcon();
      }

      return (
        <VStack space="xs" align="center">
          {renderStepIcon()}
          <VStack space="xs" align="center">
            <span className={cn(
              'text-sm font-medium transition-colors',
              isActive ? 'text-primary' : isCompleted ? 'text-success' : 'text-muted-foreground'
            )}>
              {step.title}
            </span>
            {step.optional && (
              <span className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                Optional
              </span>
            )}
          </VStack>
        </VStack>
      );
    };

    if (layout === 'vertical') {
      return (
        <div ref={ref} className="flex items-start space-x-4">
          <div className="flex flex-col items-center">
            {renderStepIcon()}
            {index < step.title.length - 1 && (
              <div className={cn(
                'w-0.5 h-8 mt-2 transition-colors',
                isCompleted ? 'bg-success' : 'bg-border'
              )} />
            )}
          </div>
          <VStack space="xs" className="flex-1">
            <span className={cn(
              'font-medium transition-colors',
              isActive ? 'text-primary' : isCompleted ? 'text-success' : 'text-muted-foreground'
            )}>
              {step.title}
            </span>
            {step.description && (
              <p className="text-sm text-muted-foreground">
                {step.description}
              </p>
            )}
            {step.optional && (
              <span className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded w-fit">
                Optional
              </span>
            )}
          </VStack>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col items-center transition-opacity',
          isClickable && 'cursor-pointer hover:opacity-80',
          !isClickable && 'cursor-default'
        )}
        onClick={handleClick}
      >
        {renderStepContent()}
      </div>
    );
  }
);

StepIndicator.displayName = 'StepIndicator';

/**
 * GlassFormWizardSteps component
 * Step indicator and navigation for wizard forms
 */
export const GlassFormWizardSteps = forwardRef<HTMLDivElement, GlassFormWizardStepsProps>(
  (
    {
      steps,
      currentStep,
      completedSteps,
      onStepClick,
      layout = 'default',
      showProgress = true,
      showNumbers = true,
      clickable = true,
      className,
      ...props
    },
    ref
  ) => {
    const totalSteps = steps.length;
    const progressValue = ((currentStep + 1) / totalSteps) * 100;

    const handleStepClick = (stepIndex: number) => {
      if (clickable && onStepClick) {
        onStepClick(stepIndex);
      }
    };

    const isStepClickable = (stepIndex: number) => {
      if (!clickable) return false;
      // Allow clicking on current step, completed steps, and next step if previous is completed
      return stepIndex === currentStep || 
             completedSteps.has(stepIndex) || 
             (stepIndex === currentStep + 1 && completedSteps.has(stepIndex - 1));
    };

    const renderProgressBar = () => {
      if (!showProgress) return null;

      return (
        <VStack space="sm">
          <HStack space="sm" align="center" justify="between">
            <span className="text-sm font-medium text-foreground">
              Step {currentStep + 1} of {totalSteps}
            </span>
            <span className="text-sm text-muted-foreground">
              {Math.round(progressValue)}% Complete
            </span>
          </HStack>
          
          <GlassProgress
            value={progressValue}
            size="sm"
            variant="default"
            showValue={false}
          />
        </VStack>
      );
    };

    const renderSteps = () => {
      if (layout === 'vertical') {
        return (
          <VStack space="md">
            {steps.map((step, index) => (
              <Motion key={step.id} preset="slideLeft" delay={index * 100}>
                <StepIndicator
                  step={step}
                  index={index}
                  isActive={index === currentStep}
                  isCompleted={completedSteps.has(index)}
                  isClickable={isStepClickable(index)}
                  onClick={() => handleStepClick(index)}
                  layout={layout}
                />
              </Motion>
            ))}
          </VStack>
        );
      }

      return (
        <div className={cn(
          'flex items-center',
          layout === 'compact' ? 'justify-center space-x-2' : 'justify-between'
        )}>
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <Motion preset="slideUp" delay={index * 100}>
                <StepIndicator
                  step={step}
                  index={index}
                  isActive={index === currentStep}
                  isCompleted={completedSteps.has(index)}
                  isClickable={isStepClickable(index)}
                  onClick={() => handleStepClick(index)}
                  layout={layout}
                />
              </Motion>
              
              {/* Connector line */}
              {index < totalSteps - 1 && layout !== 'compact' && (
                <div className={cn(
                  'flex-1 h-0.5 mx-4 transition-colors',
                  completedSteps.has(index) ? 'bg-success' : 'bg-border'
                )} />
              )}
            </React.Fragment>
          ))}
        </div>
      );
    };

    return (
      <div ref={ref} className={cn('w-full', className)} {...props}>
        <VStack space="lg">
          {renderProgressBar()}
          {renderSteps()}
        </VStack>
      </div>
    );
  }
);

GlassFormWizardSteps.displayName = 'GlassFormWizardSteps';