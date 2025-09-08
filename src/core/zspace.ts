// Basic z-space utilities
export const zSpaceLayers = {
  background: -1,
  content: 0,
  overlay: 100,
  modal: 1000,
  tooltip: 1100,
};

export const getZSpaceLayer = (layer: keyof typeof zSpaceLayers) => zSpaceLayers[layer];
