/**
 * SANCHARI BHARAT Design System Tokens & Brand Identity
 * Theme: Modern Indian Travel Aesthetic (Royal Navy, Saffron, Emerald, AI Violet)
 */

export const brand = {
  name: "SANCHARI BHARAT",
  subName: "Explore India",
  tagline: "AI-powered discovery → personalised planning → smarter travel",
  mission:
    "One intelligent platform for discovering India, empowering local communities, and planning personalized journeys.",
};

export const colors = {
  // Royal Navy & Deep Space
  navy: {
    DEFAULT: "#0B132B",
    dark: "#070B19",
    deep: "#050811",
    light: "#1C2541",
    surface: "#111C38",
  },
  // Saffron & Golden Sunset
  saffron: {
    DEFAULT: "#F97316",
    light: "#FB923C",
    dark: "#EA580C",
    glow: "rgba(249, 115, 22, 0.35)",
  },
  // Emerald & Forest Green
  emerald: {
    DEFAULT: "#10B981",
    light: "#34D399",
    dark: "#059669",
    glow: "rgba(16, 185, 129, 0.35)",
  },
  // AI Violet & Magic Purple
  violet: {
    DEFAULT: "#8B5CF6",
    light: "#A78BFA",
    dark: "#6D28D9",
    glow: "rgba(139, 92, 246, 0.35)",
  },
  // Sandstone & Warm Neutrals
  neutral: {
    white: "#F8FAFC",
    warmWhite: "#F7F3EC",
    muted: "#94A3B8",
    border: "rgba(255, 255, 255, 0.12)",
    cardBg: "rgba(17, 28, 56, 0.65)",
  },
};

export const animationPresets = {
  fadeIn: {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.35, ease: "easeOut" },
  },
  cardHover: {
    scale: 1.02,
    transition: { duration: 0.25, ease: "easeInOut" },
  },
};
