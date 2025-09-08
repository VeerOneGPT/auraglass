// Basic glass border mixin
export const glassBorder = {
  border: '1px solid rgba(255, 255, 255, 0.2)',
  borderRadius: '8px',
};

export const glassBorderHover = {
  ...glassBorder,
  border: '1px solid rgba(255, 255, 255, 0.3)',
};
