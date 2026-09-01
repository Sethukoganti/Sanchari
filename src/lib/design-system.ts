/**
 * Explore India - Design System
 * Indian-inspired color palette, typography, spacing, and component tokens
 * Used throughout the application for consistent, premium visual identity
 */

// ============================================
// COLOR PALETTE (Dark Reddish Wine & Royal Heritage)
// ============================================
export const colors = {
  // Primary Wine & Crimson Tones
  primary: {
    wine: "#721226", // Deep royal wine
    wineLight: "#9E1B32", // Vibrant wine / ruby
    wineDark: "#4A0E17", // Dark velvet wine
    wineDeep: "#2A080F", // Deepest vintage burgundy
    wineGlow: "#E63956", // Luminous rose crimson
    white: "#FFFFFF",
  },

  // Accent Colors (Premium & Luxurious)
  accent: {
    gold: "#D4AF37", // Temple gold, royal champagne
    goldLight: "#F7EAC8",
    goldDark: "#A6852A",
    roseGold: "#C97A7E",
    amber: "#E08D3C",
    emerald: "#1F8A70",
    maroon: "#800020",
    burgundy: "#5B0E1E",
  },

  // Neutral & Background
  neutral: {
    darkNight: "#0E0507", // Deepest wine-dark background
    darkVelvet: "#1A070B",
    charcoalWine: "#240A10",
    darkGray: "#3D1A20",
    gray: "#8C6E74",
    lightGray: "#D8C4C8",
    warmGray: "#A89498",
    cream: "#FAF0F2", // Warm rose cream
    ivory: "#FAF5F6", // Warm light background
    beige: "#F2E2E5",
    white: "#FFFFFF",
  },

  // Semantic Colors
  semantic: {
    success: "#10B981",
    warning: "#F59E0B",
    error: "#E63956",
    info: "#3B82F6",
    disabled: "#D1D5DB",
  },

  // Gradients (Preset combinations)
  gradients: {
    wineToVelvet:
      "linear-gradient(135deg, #8B1528 0%, #4A0E17 100%)",
    wineToGold:
      "linear-gradient(135deg, #721226 0%, #D4AF37 100%)",
    crimsonGlow:
      "linear-gradient(135deg, #C41E3A 0%, #721226 50%, #2A080F 100%)",
    deepNightWine:
      "linear-gradient(135deg, #1A070B 0%, #4A0E17 100%)",
    roseToChampagne:
      "linear-gradient(135deg, #C97A7E 0%, #F7EAC8 100%)",
    templeGold:
      "linear-gradient(135deg, #D4AF37 0%, #F7EAC8 100%)",
  },
};

// ============================================
// TYPOGRAPHY
// ============================================
export const typography = {
  // Font families
  fonts: {
    display: "'Playfair Display', serif", // Premium serif for display/hero
    heading: "'Cormorant Garamond', serif", // Elegant serif for headings
    body: "'Inter', sans-serif", // Clean, readable sans-serif for body
    hindi: "'Noto Sans Devanagari', sans-serif", // Proper Hindi rendering
    mono: "'JetBrains Mono', monospace", // Data/stats
  },

  // Font sizes (Tailwind-compatible)
  sizes: {
    xs: "12px",
    sm: "14px",
    base: "16px",
    lg: "18px",
    xl: "20px",
    "2xl": "24px",
    "3xl": "30px",
    "4xl": "36px",
    "5xl": "48px",
    "6xl": "60px",
    "7xl": "72px",
  },

  // Line heights
  lineHeights: {
    tight: "1.2",
    normal: "1.5",
    relaxed: "1.7",
    loose: "1.8",
  },

  // Font weights
  weights: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
};

// ============================================
// SPACING SCALE
// ============================================
export const spacing = {
  0: "0px",
  1: "4px",
  2: "8px",
  3: "12px",
  4: "16px",
  5: "20px",
  6: "24px",
  7: "28px",
  8: "32px",
  10: "40px",
  12: "48px",
  14: "56px",
  16: "64px",
  20: "80px",
  24: "96px",
  28: "112px",
  32: "128px",
  36: "144px",
  40: "160px",
};

// ============================================
// BORDER RADIUS
// ============================================
export const borderRadius = {
  none: "0px",
  sm: "4px",
  base: "6px",
  md: "8px",
  lg: "12px",
  xl: "16px",
  "2xl": "24px",
  "3xl": "32px",
  full: "9999px",
};

// ============================================
// SHADOWS
// ============================================
export const shadows = {
  none: "none",
  sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  base: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
  md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
  // Elevated/Premium wine shadows
  premium:
    "0 20px 50px rgba(0, 0, 0, 0.35), 0 10px 25px rgba(114, 18, 38, 0.25)",
  dramatic:
    "0 30px 60px rgba(14, 5, 7, 0.6), 0 15px 30px rgba(180, 24, 54, 0.2)",
  // Soft inner shadows
  inset: "inset 0 2px 4px rgba(0, 0, 0, 0.06)",
};

// ============================================
// TRANSITIONS & ANIMATIONS
// ============================================
export const transitions = {
  // Timing
  fast: "150ms",
  base: "250ms",
  slow: "350ms",
  verySlow: "500ms",

  // Easing
  easing: {
    linear: "linear",
    in: "cubic-bezier(0.4, 0, 1, 1)",
    out: "cubic-bezier(0, 0, 0.2, 1)",
    inOut: "cubic-bezier(0.4, 0, 0.2, 1)",
    smooth: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    smooth2: "cubic-bezier(0.16, 1, 0.3, 1)",
  },
};

// ============================================
// Z-INDEX SCALE
// ============================================
export const zIndex = {
  base: 1,
  dropdown: 100,
  sticky: 200,
  fixed: 300,
  modal: 1000,
  popover: 1100,
  tooltip: 1200,
  notification: 1300,
};

// ============================================
// BREAKPOINTS (Responsive Design)
// ============================================
export const breakpoints = {
  xs: "320px",
  sm: "480px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1440px",
  "3xl": "1920px",
};

// ============================================
// COMPONENT TOKENS
// ============================================
export const components = {
  button: {
    // Primary button - wine velvet
    primary: {
      bg: colors.primary.wine,
      text: colors.neutral.white,
      hover: colors.primary.wineLight,
      active: colors.primary.wineDark,
      disabled: colors.semantic.disabled,
    },
    // Secondary button - gold / wine outline
    secondary: {
      bg: "transparent",
      text: colors.accent.gold,
      hover: colors.primary.wineDeep,
      active: colors.primary.wineDark,
      disabled: colors.semantic.disabled,
    },
    // Ghost/outline button
    ghost: {
      bg: "transparent",
      border: colors.primary.wineLight,
      text: colors.primary.wineLight,
      hover: colors.neutral.charcoalWine,
      disabled: colors.semantic.disabled,
    },
  },
  card: {
    bg: colors.neutral.darkVelvet,
    border: "rgba(229, 57, 86, 0.15)",
    shadow: shadows.base,
    hover: {
      shadow: shadows.lg,
      transform: "translateY(-4px)",
    },
  },
  input: {
    bg: colors.neutral.white,
    border: colors.neutral.lightGray,
    text: colors.neutral.darkGray,
    placeholder: colors.neutral.warmGray,
    focus: colors.primary.wineLight,
  },
  link: {
    text: colors.primary.wineGlow,
    hover: colors.primary.wineLight,
    underline: "underline",
  },
  badge: {
    primary: {
      bg: colors.accent.gold,
      text: colors.neutral.navy,
    },
    success: {
      bg: colors.semantic.success,
      text: colors.neutral.white,
    },
    warning: {
      bg: colors.semantic.warning,
      text: colors.neutral.white,
    },
    error: {
      bg: colors.semantic.error,
      text: colors.neutral.white,
    },
  },
};

// ============================================
// ANIMATION PRESETS
// ============================================
export const animations = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.3 },
  },
  slideInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
    transition: { duration: 0.3 },
  },
  slideInDown: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3 },
  },
  slideInLeft: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
    transition: { duration: 0.3 },
  },
  slideInRight: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
    transition: { duration: 0.3 },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
    transition: { duration: 0.3 },
  },
  bounce: {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: [0, -10, 0] },
    exit: { opacity: 0 },
    transition: { duration: 1, repeat: Infinity },
  },
  pulse: {
    animate: { opacity: [1, 0.5, 1] },
    transition: { duration: 2, repeat: Infinity },
  },
};

// ============================================
// CONTAINER SIZES
// ============================================
export const containers = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1280px", // Site max-width
  full: "100%",
};

// ============================================
// RESPONSIVE PADDING/MARGIN PRESETS
// ============================================
export const sectionPadding = {
  mobile: "padding: 20px 16px;", // md on mobile
  tablet: "padding: 40px 24px;", // 2xl on tablet
  desktop: "padding: 48px 32px;", // 3xl on desktop
};

// ============================================
// HELPER: Theme Context Type
// ============================================
export type Theme = typeof colors;
export type ColorKey = keyof typeof colors;
export type ComponentKey = keyof typeof components;

// ============================================
// EXPORT ALL FOR TAILWIND CONFIG
// ============================================
export const designSystem = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  transitions,
  zIndex,
  breakpoints,
  components,
  animations,
  containers,
};
