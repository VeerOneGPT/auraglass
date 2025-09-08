import React from 'react';

export interface CollapsedMenuProps {
  items: any[];
  onItemClick?: (item: any) => void;
}

const CollapsedMenu: React.FC<CollapsedMenuProps> = ({
  items,
  onItemClick,
}) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: '100%',
        right: 0,
        background: 'rgba(0, 0, 0, 0.9)',
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '8px',
        padding: '8px 0',
        minWidth: '200px',
        zIndex: 1000,
      }}
    >
      {items.map((item, index) => (
        <button
          key={item.id || index}
          style={{
            display: 'block',
            width: '100%',
            padding: '8px 16px',
            background: 'transparent',
            border: 'none',
            color: 'rgba(255, 255, 255, 0.8)',
            textAlign: 'left',
            cursor: 'pointer',
            fontSize: '14px',
          }}
          onClick={() => onItemClick?.(item)}
        >
          {item.icon && <span style={{ marginRight: '8px' }}>{item.icon}</span>}
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default CollapsedMenu;
