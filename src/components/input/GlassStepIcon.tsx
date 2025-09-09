import React from 'react';
import { createGlassStyle } from '../../core/mixins/glassMixins';
import styled, { useTheme } from 'styled-components';
import { Box } from '../layout/Box';
import { Check } from 'lucide-react';
// Import animation hook (assuming useSpring or similar exists)
// If not, we might need to implement a basic spring or use CSS transitions
// For now, let's use CSS transitions as a placeholder for simplicity
// import { useSpring, animated } from '@react-spring/web'; // Example if using react-spring

interface GlassStepIconProps {
  index: number;
  active: boolean;
  completed: boolean;
  icon?: React.ReactNode | string;
}

// Extend Box props for animated component if using react-spring
// const AnimatedIconContainer = styled(animated(Box))<{ $active: boolean, $completed: boolean }>`
const StepIconContainer = styled(Box)<{ $active: boolean, $completed: boolean }>`
  width: 24px;
  height: 24px;
  min-width: 24px; // Ensure size doesn't shrink
  border-radius: 50%;
  background-color: ${props =>
    props.$active ? '#3b82f6' :
    props.$completed ? '#10b981' :
    '#e5e7eb'
  };
  color: ${props =>
    props.$active || props.$completed ? '#ffffff' :
    '#6b7280'
  };
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1; // Ensure icon is above connector
  transition: background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease; // Add box-shadow transition
  font-size: 0.8rem; // Size for step number
  font-weight: bold;
  flex-shrink: 0;
  border: 1px solid ${props =>
    props.$active || props.$completed ? 'rgba(59, 130, 246, 0.3)' :
    'rgba(0, 0, 0, 0.1)'
  };
  position: relative; // Needed for potential pseudo-element animations

  // Add shadow based on active state (placeholder for animated version)
  box-shadow: ${props =>
      props.$active
          ? '0 0 12px 3px rgba(59, 130, 246, 0.5)'
          : 'none'
  };
`;

export const GlassStepIcon: React.FC<GlassStepIconProps> = ({ 
    index, 
    active, 
    completed, 
    icon 
}) => {
    const getIconContent = () => {
        if (icon) {
          // If icon is a React element, render it directly
          return typeof icon === 'string' ? icon : icon;
        }
        if (completed) {
          return <Check size={16} />;
        }
        return index + 1; // Display step number
    };

    // Placeholder for spring animation - replace with actual hook if available
    /*
    const springProps = useSpring({
        shadowOpacity: active ? 1 : 0,
        shadowBlur: active ? 12 : 0,
        shadowSpread: active ? 3 : 0,
        config: { tension: 200, friction: 20 } 
    });
    */

    return (
        // Use AnimatedIconContainer if using react-spring
        <StepIconContainer 
            $active={active} 
            $completed={completed}
            // Apply animated styles if using spring
            /*
            style={{
                boxShadow: springProps.shadowOpacity.to(o => 
                    `0 0 ${springProps.shadowBlur.get()}px ${springProps.shadowSpread.get()}px rgba(primaryColorRgb, ${o * 0.5})`
                ) 
            }}
            */
        >
            {getIconContent()}
        </StepIconContainer>
    );
};

GlassStepIcon.displayName = 'GlassStepIcon'; 