import React from 'react';
import { createGlassStyle } from '../../../core/mixins/glassMixins';

export interface ScrollButtonsProps {
  onScrollLeft?: () => void;
  onScrollRight?: () => void;
  showLeft?: boolean;
  showRight?: boolean;
}

const ScrollButtons: React.FC<ScrollButtonsProps> = ({
  onScrollLeft,
  onScrollRight,
  showLeft = false,
  showRight = false,
}) => {
  return (
    <>
      {showLeft && (
        <button
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: '32px',
            background: 'rgba(0, 0, 0, 0.5)',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
            zIndex: 10,
          }}
          onClick={onScrollLeft}
        >
          ‹
        </button>
      )}
      {showRight && (
        <button
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0,
            width: '32px',
            background: 'rgba(0, 0, 0, 0.5)',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
            zIndex: 10,
          }}
          onClick={onScrollRight}
        >
          ›
        </button>
      )}
    </>
  );
};

export default ScrollButtons;
