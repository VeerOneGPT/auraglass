/**
 * GlassMultiSelect Component
 * 
 * A glass-styled multi-select component with physics-based animations,
 * token-based selected items, advanced filtering, and virtualization.
 */

import React, { useState, useRef, useEffect, useCallback, useMemo, forwardRef } from 'react';
import { createPortal } from 'react-dom';
import styled, { css, keyframes } from 'styled-components';

// Physics-related imports
import { useGalileoStateSpring } from '../../hooks/useGalileoStateSpring';
import { SpringPresets, SpringConfig } from '../../animations/physics/springPhysics';

// Add snappy preset if not available
const extendedSpringPresets = {
  ...SpringPresets,
  snappy: { stiffness: 300, damping: 20, mass: 1 },
};

// Core styling imports
import { glassSurface } from '../../core/mixins/glassSurface';
import { useAnimationContext } from '../../contexts/AnimationContext';

import { createThemeContext } from '../../core/themeUtils';
import { useAccessibilitySettings } from '../../hooks/useAccessibilitySettings';

// Add missing type definitions
interface StaggerAnimationStage {
  id: string;
  type: 'stagger';
  targets: string;
  from: Record<string, any>;
  properties: Record<string, any>;
  duration: number;
  staggerDelay: number;
  easing: string;
}

interface AnimationSequenceConfig {
  id: string;
  stages: StaggerAnimationStage[];
  autoplay: boolean;
}

interface SequenceControls {
  play: () => void;
}

// Hooks and utilities
import ClearIcon from '../icons/ClearIcon';

// Types
import {
  MultiSelectOption,
  OptionGroup,
  MultiSelectProps,
} from './types';
import { AnimationProps } from '../../types/animations';

// Animation keyframes
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Styled components
const MultiSelectRoot = styled.div<{
  $fullWidth: boolean;
  $width?: string | number;
  $animate: boolean;
  $reducedMotion: boolean;
}>`
  display: flex;
  flex-direction: column;
  width: ${props => props.$fullWidth 
    ? '100%' 
    : props.$width 
      ? (typeof props.$width === 'number' ? `${props.$width}px` : props.$width) 
      : '300px'
  };
  position: relative;
  font-family: inherit;
  
  /* Animation on mount */
  ${props => props.$animate && !props.$reducedMotion && css`
    animation: ${fadeIn} 0.4s ease-out;
  `}
`;

const InputContainer = styled.div<{
  $size: 'small' | 'medium' | 'large';
  $focused: boolean;
  $disabled: boolean;
  $hasError: boolean;
}>`
  position: relative;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  gap: 6px;
  cursor: ${props => props.$disabled ? 'not-allowed' : 'text'};
  
  /* Size variations */
  ${props => {
    switch (props.$size) {
      case 'small':
        return `
          min-height: 36px;
          padding: 4px 8px;
        `;
      case 'large':
        return `
          min-height: 48px;
          padding: 8px 16px;
        `;
      default:
        return `
          min-height: 40px;
          padding: 6px 12px;
        `;
    }
  }}
  
  /* Enhanced glass styling */
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  
  border-radius: 8px;
  border: 1px solid ${props => 
    props.$hasError 
      ? 'rgba(240, 82, 82, 0.8)' 
      : props.$focused 
        ? 'rgba(99, 102, 241, 0.8)' 
        : 'rgba(255, 255, 255, 0.12)'
  };
  background-color: rgba(255, 255, 255, 0.03);
  transition: all 0.2s ease;
  
  /* Focused state */
  ${props => props.$focused && css`
    border-color: rgba(99, 102, 241, 0.8);
    box-shadow: 0 0 0 1px rgba(99, 102, 241, 0.3);
  `}
  
  /* Error state */
  ${props => props.$hasError && css`
    border-color: rgba(240, 82, 82, 0.8);
    box-shadow: 0 0 0 1px rgba(240, 82, 82, 0.3);
  `}
  
  /* Disabled state */
  ${props => props.$disabled && css`
    opacity: 0.6;
    cursor: not-allowed;
    background-color: rgba(255, 255, 255, 0.01);
  `}
`;

const TokensContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  flex: 1;
`;

const Token = styled.div<{
  $isDisabled: boolean;
  $translateX: number;
  $translateY: number;
  $scale: number;
  $isDragging: boolean;
  $initialOpacity?: number;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px 8px;
  border-radius: 16px;
  font-size: 0.85rem;
  gap: 6px;
  max-width: 200px;
  background: rgba(99, 102, 241, 0.2);
  backdrop-filter: blur(4px);
  border: 1px solid rgba(99, 102, 241, 0.3);
  color: rgba(255, 255, 255, 0.95);
  transition: background-color 0.2s ease;
  user-select: none;
  transform: translate(${props => props.$translateX}px, ${props => props.$translateY}px)
             scale(${props => props.$scale});
  will-change: transform, opacity;
  opacity: ${props => props.$initialOpacity ?? 1};
  
  /* Dragging state */
  ${props => props.$isDragging && css`
    opacity: 0.8;
    z-index: 10;
    cursor: grabbing;
  `}
  
  /* Hover styles */
  &:hover {
    background: rgba(99, 102, 241, 0.3);
    
    /* Only show the remove button hover effect when not disabled */
    ${props => !props.$isDisabled && css`
      .remove-button {
        background-color: rgba(255, 255, 255, 0.2);
        
        &:hover {
          background-color: rgba(255, 255, 255, 0.3);
        }
      }
    `}
  }
  
  /* Disabled state */
  ${props => props.$isDisabled && css`
    opacity: 0.5;
    cursor: not-allowed;
  `}
`;

const TokenLabel = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const RemoveButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: none;
  padding: 0;
  background-color: transparent;
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.5);
  }
  
  /* Icon sizing */
  svg {
    width: 12px;
    height: 12px;
  }
  
  /* Disabled state inherited from parent */
`;

const Input = styled.input<{ $size: 'small' | 'medium' | 'large' }>`
  flex: 1;
  min-width: 50px;
  border: none;
  outline: none;
  background: transparent;
  color: rgba(255, 255, 255, 0.9);
  font-size: ${props => 
    props.$size === 'small' 
      ? '0.85rem' 
      : props.$size === 'large' 
        ? '1.05rem' 
        : '0.95rem'
  };
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
  
  &:disabled {
    cursor: not-allowed;
  }
`;

const DropdownContainer = styled.div<{
  $width: number;
  $maxHeight: string | number;
  $openUp: boolean;
  $popperWidth?: string;
}>`
  position: absolute;
  width: ${props => props.$popperWidth || `${props.$width}px`};
  max-height: ${props => 
    typeof props.$maxHeight === 'number' 
      ? `${props.$maxHeight}px` 
      : props.$maxHeight
  };
  overflow-y: auto;
  z-index: 1000;
  ${props => props.$openUp ? 'bottom: 100%;' : 'top: 100%;'}
  left: 0;
  margin-top: ${props => props.$openUp ? '0' : '4px'};
  margin-bottom: ${props => props.$openUp ? '4px' : '0'};
  
  /* Enhanced glass styling */
  background-color: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  will-change: transform, opacity;
  transform-origin: ${props => props.$openUp ? 'bottom center' : 'top center'};
`;

const OptionsList = styled.ul`
  margin: 0;
  padding: 6px 0;
  list-style: none;
`;

const OptionItem = styled.li<{ 
  $isSelected: boolean; 
  $isFocused: boolean; 
  $isDisabled: boolean;
  $size: 'small' | 'medium' | 'large';
}>`
  padding: ${props => 
    props.$size === 'small' 
      ? '6px 10px' 
      : props.$size === 'large' 
        ? '10px 16px' 
        : '8px 12px'
  };
  cursor: ${props => (props.$isDisabled ? 'not-allowed' : 'pointer')};
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background-color 0.15s ease;
  position: relative;
  
  /* Text styling */
  color: rgba(255, 255, 255, ${props => props.$isDisabled ? '0.5' : '0.9'});
  
  /* Selected state */
  ${props => props.$isSelected && css`
    background-color: rgba(99, 102, 241, 0.15);
    font-weight: 500;
    
    &::after {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 3px;
      background-color: rgba(99, 102, 241, 0.8);
    }
  `}
  
  /* Focus state */
  ${props => props.$isFocused && !props.$isDisabled && css`
    background-color: rgba(255, 255, 255, 0.08);
  `}
  
  /* Hover state - only when not disabled */
  ${props => !props.$isDisabled && css`
    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
  `}
  
  /* Disabled state */
  ${props => props.$isDisabled && css`
    opacity: 0.6;
  `}
`;

const GroupHeader = styled.div<{ $size: 'small' | 'medium' | 'large' }>`
  padding: ${props => 
    props.$size === 'small' 
      ? '6px 10px' 
      : props.$size === 'large' 
        ? '10px 16px' 
        : '8px 12px'
  };
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.6);
  background-color: rgba(0, 0, 0, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  letter-spacing: 0.5px;
`;

const NoOptions = styled.div`
  padding: 12px;
  color: rgba(255, 255, 255, 0.5);
  text-align: center;
  font-style: italic;
`;

const ClearButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  padding: 4px;
  margin-left: 4px;
  color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: color 0.2s ease;
  
  &:hover {
    color: rgba(255, 255, 255, 0.8);
  }
  
  &:focus {
    outline: none;
    color: rgba(255, 255, 255, 0.8);
  }
  
  /* Icon sizing */
  svg {
    width: 16px;
    height: 16px;
  }
`;

const LoadingIndicator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
  color: rgba(255, 255, 255, 0.7);
  
  /* Simple loading spinner */
  .spinner {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 2px solid rgba(99, 102, 241, 0.3);
    border-top-color: rgba(99, 102, 241, 0.8);
    animation: spin 0.8s linear infinite;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const ErrorMessage = styled.div`
  color: rgba(240, 82, 82, 0.9);
  font-size: 0.8rem;
  margin-top: 4px;
  padding-left: 4px;
`;

const HelperText = styled.div`
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.8rem;
  margin-top: 4px;
  padding-left: 4px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 6px;
  font-size: 0.9rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.8);
`;

// Interface for the wrapper props
interface AnimatedTokenWrapperProps<T extends string | number> {
  option: MultiSelectOption<T>;
  onRemove: (id: string | number) => void; // Callback to actually remove from state
  removeConfig: Partial<SpringConfig>;
  isDisabled?: boolean;
  reducedMotion?: boolean;
  // Add renderToken prop if custom rendering needs animation applied
  renderToken?: (option: MultiSelectOption<T>, onRemove: (value: T) => void) => React.ReactNode;
  // Need original remove handler for custom renderToken
  originalOnRemoveHandler: (e: React.MouseEvent, option: MultiSelectOption<T>) => void;
}

// Internal component to handle exit animation for each token
function AnimatedTokenWrapper<T extends string | number = string | number>({ 
  option, 
  onRemove, 
  removeConfig, 
  isDisabled, 
  reducedMotion,
  renderToken,
  originalOnRemoveHandler
}: AnimatedTokenWrapperProps<T>) {
  const [isExiting, setIsExiting] = useState(false);

  // Animation for opacity and scale
  const { value: animProgress } = useGalileoStateSpring(isExiting ? 0 : 1, {
    ...removeConfig,
    immediate: reducedMotion
  });

  // Handle animation completion
  useEffect(() => {
    if (isExiting) {
      // Trigger actual removal after animation
      const timeout = setTimeout(() => {
        onRemove(option.value);
      }, 300); // Match animation duration
      return () => clearTimeout(timeout);
    }
  }, [isExiting, onRemove, option.value]);

  // Trigger exit (called by the remove button click)
  const triggerExit = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isDisabled) {
      setIsExiting(true);
    }
  };

  // Apply animated styles
  const animatedStyle = {
    opacity: animProgress,
    transform: `scale(${0.8 + animProgress * 0.2})`, // Scale from 1 down to 0.8
  };

  // If using custom renderer, wrap it
  if (renderToken) {
      const handleRemove = () => onRemove(option.value);
      return (
          <div style={animatedStyle} className="galileo-multiselect-token-wrapper">
              {renderToken(option, handleRemove)}
          </div>
      );
  }

  // Default rendering using original Token component
  return (
    <div style={animatedStyle} className="galileo-multiselect-token-wrapper">
      <Token
        className="galileo-multiselect-token" // Keep class for entrance animation targetting
        $isDisabled={!!isDisabled} // Pass disabled state
        // Static transform props, animation is handled by wrapper style
        $translateX={0}
        $translateY={0}
        $scale={1} 
        $isDragging={false}
        // $initialOpacity={1} // Opacity handled by wrapper
      >
        <TokenLabel>{option.label}</TokenLabel>
        {!(isDisabled) && (
          <RemoveButton
            className="remove-button"
            onClick={triggerExit} // Call triggerExit here
            aria-label={`Remove ${option.label}`}
          >
            <ClearIcon />
          </RemoveButton>
        )}
      </Token>
    </div>
  );
}

// Helper function for deep equality comparison of options arrays
const areOptionsEqual = <T,>(a: MultiSelectOption<T>[], b: MultiSelectOption<T>[]): boolean => {
  if (a.length !== b.length) return false;
  
  for (let i = 0; i < a.length; i++) {
    const aOption = a[i];
    const bOption = b[i];
    if (aOption.id !== bOption.id || aOption.label !== bOption.label) {
      return false;
    }
  }
  
  return true;
};

// Define the actual component function that accepts props and ref
const GlassMultiSelectInternal = <T extends string | number = string>(
  props: MultiSelectProps<T> & AnimationProps,
  ref: React.ForwardedRef<HTMLDivElement>
) => {
  const {
    options,
    value: controlledValue,
    onChange,
    placeholder = 'Select...',
    label,
    id,
    className,
    fullWidth = false,
    width,
    size = 'medium',
    disabled = false,
    error = false,
    errorMessage,
    helperText,
    searchable = true,
    clearable = true,
    creatable = false,
    closeOnSelect = true,
    clearInputOnSelect = true,
    keyboardNavigation = true,
    withGroups = false,
    groups = [],
    filterFunction,
    onCreateOption,
    onInputChange,
    onSelect,
    onRemove,
    autoFocus,
    ariaLabel,
    maxHeight = '300px',
    openUp = false,
    animate = true,
    physics = {},
    onOpen,
    onClose,
    maxSelections,
    renderToken,
    renderOption,
    renderGroup,
    async: asyncProps,
    dataTestId = 'glass-multi-select',
    itemRemoveAnimation,
    ...rest
  } = props;

  // Destructure only available props from physics object
  const { animationPreset } = physics || {};

  // Defined loading, loadingMessage, defaultNoOptionsMessage constants
  const loading = asyncProps?.loading ?? false;
  const loadingMessage = asyncProps?.loadingIndicator ?? 'Loading...';
  const defaultNoOptionsMessage = 'No options';

  const { settings: accessibilitySettings } = useAccessibilitySettings();
  const isReducedMotion = accessibilitySettings.reducedMotion;

  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const dropdownContainerRef = useRef<HTMLDivElement>(null);

  // Combine external ref with internal rootRef
  const combinedRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (rootRef.current !== node && rootRef) {
        (rootRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }
      if (ref) {
        if (typeof ref === 'function') {
          ref(node);
        } else {
          (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }
      }
    },
    [ref]
  );

  // State
  const [internalValue, setInternalValue] = useState<MultiSelectOption<T>[]>(() => {
    if (controlledValue && Array.isArray(controlledValue)) {
      // Convert T[] to MultiSelectOption<T>[] by finding matching options
      return (controlledValue || []).map(value =>
        options.find(option => option.value === value) || { value, label: String(value) }
      );
    }
    return [];
  });
  const [inputValue, setInputValue] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const [focusedOptionIndex, setFocusedOptionIndex] = useState(-1);
  const [isRendered, setIsRendered] = useState(isDropdownOpen);

  // Animation Context & Settings
  const {
    defaultSpring: contextDefaultSpring,
  } = useAnimationContext();

  // Calculate final disable state again using isReducedMotion
  const finalDisableAnimation = animate && !isReducedMotion;

  // Dropdown immediate flag using isReducedMotion
  const dropdownImmediate = !animate || isReducedMotion;

  // Resolve final spring config for dropdown (using nested physics prop)
  const contextModalSpringConfig = animationPreset; // Use animationPreset as context config
  const finalDropdownSpringConfig = useMemo<Partial<SpringConfig>>(() => {
    const baseConfig = SpringPresets.default;
    let resolvedContextConfig = {};
    if (typeof contextModalSpringConfig === 'string' && contextModalSpringConfig in SpringPresets) {
      resolvedContextConfig = SpringPresets[contextModalSpringConfig as keyof typeof SpringPresets];
    } else if (typeof contextModalSpringConfig === 'object') {
      resolvedContextConfig = contextModalSpringConfig ?? {};
    }
    // Merge config from the nested physics prop
    // Use physics.tension/friction directly if animationPreset isn't a standard string
    const propPhysicsConfig = animationPreset === 'gentle' ? extendedSpringPresets.gentle :
                             animationPreset === 'snappy' ? extendedSpringPresets.snappy :
                             animationPreset === 'bouncy' ? extendedSpringPresets.bouncy :
                             (typeof physics?.tension === 'number' && typeof physics?.friction === 'number' ? { tension: physics.tension, friction: physics.friction } : {}); 
                             
    return { ...baseConfig, ...resolvedContextConfig, ...propPhysicsConfig };
  }, [contextModalSpringConfig, animationPreset, physics?.tension, physics?.friction]);

  // Resolve final spring config for item removal
  const finalItemRemoveSpringConfig = useMemo<Partial<SpringConfig>>(() => {
    const baseConfig = SpringPresets.default;
    let resolvedContextConfig = {};
    if (typeof contextDefaultSpring === 'string' && contextDefaultSpring in SpringPresets) {
      resolvedContextConfig = SpringPresets[contextDefaultSpring as keyof typeof SpringPresets];
    } else if (typeof contextDefaultSpring === 'object') {
      resolvedContextConfig = contextDefaultSpring ?? {};
    }
    let propConfig = {};
    if (typeof itemRemoveAnimation === 'string' && itemRemoveAnimation in SpringPresets) {
      propConfig = SpringPresets[itemRemoveAnimation as keyof typeof SpringPresets];
    } else if (typeof itemRemoveAnimation === 'object') {
      propConfig = itemRemoveAnimation ?? {};
    }

    return { ...baseConfig, ...resolvedContextConfig, ...propConfig };
  }, [contextDefaultSpring, itemRemoveAnimation]);

  // Use Galileo Spring for dropdown entrance/exit
  const dropdownAnimation = useGalileoStateSpring(
      isDropdownOpen ? 1 : 0,
      {
          ...finalDropdownSpringConfig,
          immediate: dropdownImmediate
      }
  );

  // Handle dropdown animation completion
  useEffect(() => {
    if (!isDropdownOpen && dropdownAnimation.value === 0) {
      setIsRendered(false);
    }
  }, [isDropdownOpen, dropdownAnimation.value]);

  const shouldRenderDropdown = isRendered;

  // Effects (value control, portal rendering)
  useEffect(() => {
    if (controlledValue !== undefined) {
      const controlledArray = Array.isArray(controlledValue) ? controlledValue : [];
      const controlledOptions = (controlledArray || []).map(value =>
        options.find(option => option.value === value) || { value, label: String(value) }
      );
      if (!areOptionsEqual(controlledOptions, internalValue)) {
        setInternalValue(controlledOptions);
      }
    }
  }, [controlledValue, internalValue, options]);

  useEffect(() => {
      if (isDropdownOpen) {
          setIsRendered(true);
          if (onOpen) onOpen();
      } else {
          if (onClose) onClose();
      }
  }, [isDropdownOpen, onOpen, onClose]);

  // Filtered options computation
  const filteredOptions = useMemo(() => {
    let result = options;
    if (searchable && inputValue) {
        if (filterFunction) {
            result = filterFunction(options, inputValue);
        } else {
            // Default filtering logic
            result = options.filter((option: MultiSelectOption<T>) =>
                option.label.toLowerCase().includes(inputValue.toLowerCase())
            );
        }
    }
    if (creatable && inputValue && !options.some(opt => opt.label === inputValue)) {
        const creatableOption: any = {
             label: `Create "${inputValue}"`,
             value: inputValue, 
             id: `__creatable__${inputValue}`,
             __isCreatable__: true
        };
        result = [creatableOption as MultiSelectOption<any>, ...result];
    }
    return result;
  }, [options, inputValue, searchable, creatable, filterFunction, internalValue]);

  // Grouped options computation
  const groupedOptions = useMemo(() => {
    if (!withGroups) {
      return [{ group: null, options: filteredOptions }];
    }
    const groupMap: Record<string, MultiSelectOption<T>[]> = {};
    groups.forEach(g => {
      if (g.id) groupMap[g.id] = [];
    });
    
    filteredOptions.forEach(option => {
      const groupId = option.group || '__no_group__';
      if (!groupMap[groupId]) groupMap[groupId] = [];
      groupMap[groupId].push(option);
    });
    
    const orderedGroups: { group: OptionGroup<T> | null; options: MultiSelectOption<T>[] }[] = [];
    groups.forEach(g => {
        if (g.id && groupMap[g.id]?.length > 0) orderedGroups.push({ group: g, options: groupMap[g.id]! });
    });
    if (groupMap['__no_group__']?.length > 0) orderedGroups.push({ group: null, options: groupMap['__no_group__']! });
    Object.keys(groupMap).forEach(groupId => {
        if (groupId !== '__no_group__' && !groups.some(g => g.id === groupId) && groupMap[groupId]!.length > 0) {
            orderedGroups.push({ group: { id: groupId, label: groupId } as OptionGroup<T>, options: groupMap[groupId]! });
        }
    });
    return orderedGroups;
  }, [filteredOptions, withGroups, groups]);

  const flatOptions = useMemo(() => groupedOptions.flatMap(g => g.options), [groupedOptions]);

  // Click outside handler
  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        rootRef.current && !rootRef.current.contains(event.target as Node) &&
        dropdownContainerRef.current && !dropdownContainerRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
        setFocused(false);
      }
    },
    []
  );

  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isDropdownOpen, handleClickOutside]);

  // Event Handlers
  const handleInputFocus = () => {
    if (!disabled) {
      setFocused(true);
    }
  };

  const handleInputBlur = () => {
    setTimeout(() => {
        if (rootRef.current && !rootRef.current.contains(document.activeElement) && 
            dropdownContainerRef.current && !dropdownContainerRef.current.contains(document.activeElement)) {
            setFocused(false);
            setIsDropdownOpen(false);
        }
    }, 150);
  };

  const handleContainerClick = () => {
      if (!disabled) {
          inputRef.current?.focus();
          if (!isDropdownOpen) {
              setIsDropdownOpen(true);
          }
      }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    if (!isDropdownOpen) setIsDropdownOpen(true);
    setFocusedOptionIndex(0);
    if (onInputChange) onInputChange(newValue);
  };

  const handleOptionClick = (option: MultiSelectOption<T>) => {
    if (disabled) return;

    handleOptionSelectInternal(option);
    setInputValue('');
    
    // If needed, focus can be handled differently, e.g., on the container
    // inputRef.current?.focus();
  };

  const handleOptionSelectInternal = (option: MultiSelectOption<T>) => {
    let newValue: MultiSelectOption<T>[];
    const isSelected = internalValue.some(v => v.id === option.id);

    if (isSelected) {
      newValue = internalValue.filter(v => v.id !== option.id);
      if (onRemove) onRemove(option.value);
    } else {
      if (maxSelections && internalValue.length >= maxSelections) return;
      newValue = [...internalValue, option];
      if (onSelect) onSelect(option);
    }
    if (controlledValue === undefined) setInternalValue(newValue);
    if (onChange) onChange((newValue || []).map(opt => opt.value));
    if (clearInputOnSelect) setInputValue('');
    if (!closeOnSelect) inputRef.current?.focus();
    else setIsDropdownOpen(false);
  };

  // NEW: Callback to perform the actual state update AFTER animation
  const handleRemoveTokenActual = useCallback((idToRemove: string | number) => {
    const newValue = internalValue.filter(v => v.id !== idToRemove);
    if (controlledValue === undefined) setInternalValue(newValue);
    if (onChange) onChange((newValue || []).map(opt => opt.value));
    // Find the original option for the onRemove callback
    const removedOption = internalValue.find(v => v.id === idToRemove);
    if (removedOption && onRemove) onRemove(removedOption.value);
  }, [internalValue, controlledValue, onChange, onRemove]);

   // MODIFIED: Original remove handler (now just triggers animation via wrapper)
   // This function is passed down to the wrapper IF a custom renderToken is used,
   // otherwise the wrapper's internal triggerExit is used directly.
   const handleTokenRemoveTrigger = useCallback((e: React.MouseEvent, option: MultiSelectOption<T>) => {
     // This is now just a placeholder for compatibility with renderToken
     // The actual token removal is managed by the AnimatedTokenWrapper
     e.stopPropagation();
   }, []);

  // ADD BACK: handleClearAll
  const handleClearAll = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (controlledValue === undefined) setInternalValue([]);
    if (onChange) onChange([]);
    setInputValue('');
    inputRef.current?.focus();
  }, [controlledValue, onChange]);

  // ADD BACK: handleKeyDown
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!keyboardNavigation || disabled) return;
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (!isDropdownOpen) {
            setIsDropdownOpen(true);
            setFocusedOptionIndex(0);
        } else {
            setFocusedOptionIndex(prev => Math.min(prev + 1, flatOptions.length - 1));
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (isDropdownOpen) {
            setFocusedOptionIndex(prev => Math.max(prev - 1, 0));
        }
        break;
      case 'Enter':
        if (isDropdownOpen && focusedOptionIndex >= 0 && focusedOptionIndex < flatOptions.length) {
          e.preventDefault();
          const selectedOption = flatOptions[focusedOptionIndex];
          if (!selectedOption.disabled && !(selectedOption as any).__isDisabled__) {
            handleOptionClick(selectedOption);
          }
        }
        break;
      case 'Escape':
        if (isDropdownOpen) {
          e.preventDefault();
          setIsDropdownOpen(false);
        }
        break;
      case 'Backspace':
        if (!inputValue && internalValue.length > 0) {
          e.preventDefault();
          const lastOption = internalValue[internalValue.length - 1];
          
          // Find the token wrapper element for the last option
          const tokenWrappers = rootRef.current?.querySelectorAll('.galileo-multiselect-token-wrapper');
          if (tokenWrappers && tokenWrappers.length > 0) {
            // Get the last wrapper
            const lastWrapper = tokenWrappers[tokenWrappers.length - 1];
            // Find the remove button within it
            const removeButton = lastWrapper.querySelector('.remove-button');
            if (removeButton && removeButton instanceof HTMLElement) {
              // Simulate a click on the remove button
              removeButton.click();
              return;
            }
          }
          
          // Fallback: direct removal if simulation fails
          if (lastOption.id !== undefined) {
            handleRemoveTokenActual(lastOption.id);
          }
        }
        break;
      default: break;
    }
  }, [
    keyboardNavigation, 
    disabled, 
    isDropdownOpen, 
    flatOptions, 
    focusedOptionIndex, 
    inputValue, 
    internalValue, 
    handleOptionClick, 
    handleRemoveTokenActual,
    setIsDropdownOpen,
    setFocusedOptionIndex
  ]);

  // Scroll into view logic
  useEffect(() => {
      if (isDropdownOpen && focusedOptionIndex >= 0 && listRef.current) {
          const optionElement = listRef.current.querySelector(`[data-option-index="${focusedOptionIndex}"]`) as HTMLLIElement;
           if (optionElement) optionElement.scrollIntoView({ block: 'nearest' });
      }
  }, [isDropdownOpen, focusedOptionIndex]);

  // --- Token Entrance Animation Implementation ---

  // Animation trigger function
  const playEntranceAnimation = useCallback(() => {
    // Animation logic would go here
    // For now, we'll use a simple timeout-based animation
    const tokens = document.querySelectorAll('.galileo-multiselect-token');
    tokens.forEach((token, index) => {
      const element = token as HTMLElement;
      if (element) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(5px) scale(0.95)';
        setTimeout(() => {
          element.style.transition = 'all 0.3s ease-out';
          element.style.opacity = '1';
          element.style.transform = 'translateY(0px) scale(1)';
        }, index * 30);
      }
    });
  }, []);

  // Ref to track if initial animation has run
  const initialAnimationPlayed = useRef(false);

  // Trigger the entrance animation on mount/value change if enabled
  useEffect(() => {
    if (animate && !finalDisableAnimation && internalValue.length > 0 && !initialAnimationPlayed.current) {
      // Small delay to ensure elements are rendered before targeting
      const timer = setTimeout(() => {
        playEntranceAnimation();
        initialAnimationPlayed.current = true; // Mark as played
      }, 50); // Adjust delay if needed
      return () => clearTimeout(timer);
    }
    // Reset flag if value becomes empty (optional, for re-animation)
    if (internalValue.length === 0) {
        initialAnimationPlayed.current = false;
    }
  // Dependency: only run when animation state or value length changes
  }, [animate, finalDisableAnimation, internalValue.length, playEntranceAnimation]);

  // --- End Token Entrance Animation Implementation ---

  // --- Token Add/Remove Animation ---
  // REMOVE the useTransition block entirely
  // const tokenTransitions = useTransition(...) 
  // --- End Token Add/Remove Animation ---

  // Add state for dropdown positioning
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });

  // Calculate dropdown position when it opens or container resizes
  useEffect(() => {
    if (isDropdownOpen && rootRef.current) {
      const updatePosition = () => {
        const rect = rootRef.current?.getBoundingClientRect();
        if (rect) {
          const { top, left, bottom, width } = rect;
          const viewportHeight = window.innerHeight;
          const spaceBelow = viewportHeight - bottom;
          const spaceAbove = top;
          
          // Determine if we should open upward based on available space
          const actualOpenUp = openUp || (spaceBelow < 300 && spaceAbove > spaceBelow);
          
          setDropdownPosition({
            top: actualOpenUp ? top - 4 : bottom + 4,
            left,
            width
          });
        }
      };
      
      // Initial position calculation
      updatePosition();
      
      // Recalculate on scroll or resize
      window.addEventListener('scroll', updatePosition, true);
      window.addEventListener('resize', updatePosition);
      
      return () => {
        window.removeEventListener('scroll', updatePosition, true);
        window.removeEventListener('resize', updatePosition);
      };
    }
  }, [isDropdownOpen, openUp]);

  // Render function for dropdown content
  const renderDropdown = () => {
    const content = (
        <> 
            {loading && <LoadingIndicator>{loadingMessage}</LoadingIndicator>}
            {!loading && flatOptions.length === 0 && <NoOptions>{defaultNoOptionsMessage}</NoOptions>}
            {!loading && flatOptions.length > 0 && (
                <OptionsList ref={listRef} role="listbox" id={`listbox-${id || 'gms'}`}>
                    {(groupedOptions || []).map((groupInfo, groupIndex) => (
                        <React.Fragment key={groupInfo.group?.id || `group-${groupIndex}`}>
                            {groupInfo.group && (
                                renderGroup ? renderGroup(groupInfo.group as OptionGroup<T>) :
                                <GroupHeader $size={size}>{groupInfo.group.label}</GroupHeader>
                            )}
                            {(groupInfo.options || []).map(option => {
                                const isSelected = internalValue.some(v => v.id === option.id);
                                const isDisabled = option.disabled || disabled;
                                const currentIndex = (flatOptions || []).findIndex(opt => opt.id === option.id);
                                const isFocused = currentIndex === focusedOptionIndex;
                                const optionContent = renderOption ? renderOption(option, isSelected) :
                                    <>{option.label} {isSelected && <span>✓</span>}</>; 
                                return (
                                    <OptionItem
                                        key={option.id}
                                        $isSelected={isSelected}
                                        $isFocused={isFocused}
                                        $isDisabled={!!isDisabled}
                                        $size={size}
                                        onClick={() => !isDisabled && handleOptionClick(option)}
                                        onMouseEnter={() => !isDisabled && setFocusedOptionIndex(currentIndex)}
                                        role="option"
                                        aria-selected={isFocused}
                                        aria-disabled={isDisabled}
                                        data-option-index={currentIndex}
                                    >
                                        {optionContent}
                                    </OptionItem>
                                );
                            })}
                        </React.Fragment>
                    ))}
                </OptionsList>
            )}
        </>
    );

    if (typeof document === 'undefined') return null;

    return createPortal(
      <DropdownContainer
        ref={dropdownContainerRef}
        $width={dropdownPosition.width}
        $maxHeight={maxHeight}
        $openUp={openUp}
        style={{
          opacity: dropdownAnimation.value,
          transform: `scaleY(${dropdownAnimation.value})`,
          pointerEvents: isDropdownOpen ? 'auto' : 'none',
          visibility: shouldRenderDropdown ? 'visible' : 'hidden',
          position: 'fixed',
          top: `${dropdownPosition.top}px`,
          left: `${dropdownPosition.left}px`,
          zIndex: 1300
        }}
        onMouseDown={(e) => e.preventDefault()}
      >
        {content}
      </DropdownContainer>,
      document.body
    );
  };

  // Component Return
  return (
    <MultiSelectRoot
      ref={combinedRef}
      className={`glass-multi-select ${className || ''}`}
      $fullWidth={fullWidth}
      $width={width}
      $animate={animate}
      $reducedMotion={isReducedMotion}
      data-testid={dataTestId || 'glass-multi-select'}
      style={rest.style}
      id={id}
      aria-label={ariaLabel}
    >
      {label && <Label htmlFor={id || 'gms-input'}>{label}</Label>}
      <InputContainer
        $size={size}
        $focused={focused}
        $disabled={disabled}
        $hasError={!!error}
        onClick={handleContainerClick}
        aria-disabled={disabled}
      >
        <TokensContainer>
          {/* Render with AnimatedTokenWrapper */}
          {(internalValue || []).map((option) => (
            <AnimatedTokenWrapper<T>
              key={option.id} // Key must be here for React list diffing
              option={option}
              onRemove={handleRemoveTokenActual} // Pass the actual remove callback
              removeConfig={finalItemRemoveSpringConfig}
              isDisabled={disabled || !!option.disabled}
              reducedMotion={finalDisableAnimation}
              renderToken={renderToken} // Pass custom renderer down
              originalOnRemoveHandler={handleTokenRemoveTrigger} // Pass original handler signature if needed by custom renderer
            />
          ))}
          {searchable && (
            <Input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              onKeyDown={handleKeyDown}
              placeholder={internalValue.length === 0 ? placeholder : ''}
              disabled={disabled}
              $size={size}
              id={id || 'gms-input'}
              autoFocus={autoFocus}
              aria-haspopup="listbox"
              aria-expanded={isDropdownOpen}
              aria-controls={isDropdownOpen ? `listbox-${id || 'gms'}` : undefined}
              aria-label={ariaLabel || label}
              autoComplete="off"
            />
          )}
        </TokensContainer>
        {clearable && internalValue.length > 0 && !disabled && (
          <ClearButton onClick={handleClearAll} aria-label="Clear all selected">
            <ClearIcon />
          </ClearButton>
        )}
      </InputContainer>
      {helperText && !error && <HelperText>{helperText}</HelperText>}
      {error && errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      
      {shouldRenderDropdown && renderDropdown()}

    </MultiSelectRoot>
  );
}

// Forward Ref and Export with proper typing
export const GlassMultiSelect = forwardRef(GlassMultiSelectInternal) as <T extends string | number = string | number>(
  props: MultiSelectProps<T> & AnimationProps & { ref?: React.ForwardedRef<HTMLDivElement> }
) => React.ReactElement;

// Add display name
(GlassMultiSelect as any).displayName = 'GlassMultiSelect';

export default GlassMultiSelect;