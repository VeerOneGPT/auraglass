import React, { useRef } from 'react';
import styled from 'styled-components';
import { usePhysicsInteraction } from '../../hooks/usePhysicsInteraction';

const LinkContainer = styled.div`
  position: relative;
  display: inline-block;
  overflow: hidden;
  border-radius: 12px;
  transition: all 0.3s ease;
`;

interface GlassCardLinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  href: string;
  children: React.ReactNode;
}

export const GlassCardLink: React.FC<GlassCardLinkProps> = ({
  href,
  children,
  ...props
}) => {
  const linkRef = useRef(null);
  const { ref: physicsRef, physicsState, isInteracting } = usePhysicsInteraction({
    scale: 1.02,
    duration: 200,
    enableHover: true,
    enableClick: true,
    damping: 0.8,
    stiffness: 100,
    mass: 1
  });

  // Extract only CSS-compatible properties from physics state
  const cssPhysicsState = {
    transform: `scale(${physicsState.scale}) rotate(${physicsState.rotation}deg)`,
  };

  return (
    <LinkContainer
      as="a"
      href={href}
      ref={linkRef}
      style={{ ...cssPhysicsState, ...props?.style }}
      {...props}
    >
      {children}
    </LinkContainer>
  );
};

export default GlassCardLink;