/** Motion tokens (docs/DESIGN.md §4). Springs for position/scale, durations for opacity/colour. */
export const motion = {
  duration: { instant: 100, quick: 150, standard: 250, reveal: 700 },
  spring: {
    standard: { damping: 26, stiffness: 300, mass: 1 },
    gentle: { damping: 22, stiffness: 180, mass: 1 },
    emphasized: { damping: 20, stiffness: 140, mass: 1 },
  },
  pressScale: 0.97,
} as const;
