import React, { useRef } from 'react';
import styled from 'styled-components';
import { usePhysicsInteraction } from '../hooks/usePhysicsInteraction';

const LinkContainer = styled.div`
  position: relative;
  display: inline-block;
  overflow: hidden;
  border-radius: 12px;
  transition: all 0.3s ease;
`;

export const GlassCardLink = ({
  href,
  children,
  ...props
}) => {
  const linkRef = useRef(null);
  const { style: physicsStyle } = usePhysicsInteraction({
    elementRef: linkRef,
    affectsScale: true,
    scaleAmplitude: 0.02,
    affectsRotation: true,
    rotationAmplitude: 5,
    strength: 0.5, // Adjust strength instead of stiffness/damping
    smooth: true
  });

  return (
    <LinkContainer 
      as="a" 
      href={href} 
      ref={linkRef} 
      style={physicsStyle}
      {...props}
    >
      {children}
    </LinkContainer>
  );
};

export default GlassCardLink;