import React from 'react';

export interface TabItemProps {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: string | number;
  disabled?: boolean;
  active?: boolean;
  onClick?: () => void;
}

const TabItemComponent: React.FC<TabItemProps> = ({
  label,
  icon,
  badge,
  disabled = false,
  active = false,
  onClick,
}) => {
  return (
    <button
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        padding: '8px 16px',
        background: active ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
        border: 'none',
        borderRadius: '6px',
        color: active ? '#ffffff' : 'rgba(255, 255, 255, 0.7)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        fontSize: '14px',
        fontWeight: active ? 600 : 400,
        transition: 'all 0.2s ease',
      }}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <span>{icon}</span>}
      <span>{label}</span>
      {badge && (
        <span
          style={{
            background: '#ef4444',
            color: 'white',
            borderRadius: '10px',
            padding: '2px 6px',
            fontSize: '10px',
            fontWeight: 'bold',
          }}
        >
          {badge}
        </span>
      )}
    </button>
  );
};

export default TabItemComponent;
