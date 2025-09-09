import React from 'react';
import { createGlassStyle } from '../../core/mixins/glassMixins';
import styled from 'styled-components';
import { Box } from '../layout/Box';
import { Typography } from '../data-display/Typography';

interface GlassStepLabelProps {
  label?: string;
  active: boolean;
  completed: boolean;
  orientation: 'horizontal' | 'vertical';
}

const StepLabelContainer = styled(Box)<{ $orientation: 'horizontal' | 'vertical' }>`
  margin-left: ${props => props.$orientation === 'horizontal' ? '8px' : '0'};
  margin-top: ${props => props.$orientation === 'vertical' ? '4px' : '0'};
`;

export const GlassStepLabel: React.FC<GlassStepLabelProps> = ({ 
    label, 
    active, 
    completed, 
    orientation 
}) => {
    if (!label) {
        return null;
    }

    return (
        <StepLabelContainer $orientation={orientation}>
            <Typography
                variant={orientation === 'vertical' ? 'span' : 'p'}
                color={active ? 'primary' : completed ? 'textPrimary' : 'textSecondary'}
                style={{ 
                    fontWeight: active ? 'bold' : 'normal',
                    transition: 'color 0.3s ease, font-weight 0.3s ease', // Add transition
                }}
            >
                {label}
            </Typography>
        </StepLabelContainer>
    );
};

GlassStepLabel.displayName = 'GlassStepLabel'; 