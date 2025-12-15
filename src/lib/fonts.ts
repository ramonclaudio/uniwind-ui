/**
 * Font Configuration
 *
 * Single source of truth for font family names and Tailwind classes.
 * IMPORTANT: These values must match the CSS variables in global.css:
 *
 * @theme {
 *   --font-sans: 'SpaceMono-Regular';
 *   --font-sans-bold: 'SpaceMono-Bold';
 *   --font-sans-italic: 'SpaceMono-Italic';
 *   --font-sans-bold-italic: 'SpaceMono-BoldItalic';
 * }
 *
 * When changing fonts:
 * 1. Update the FONTS object below with new font family names
 * 2. Update global.css @theme block with matching --font-* values
 * 3. Ensure font files are loaded in your app (e.g., via expo-font)
 */

/** Actual font family names - must match loaded font files */
export const FONTS = {
  regular: "SpaceMono-Regular",
  bold: "SpaceMono-Bold",
  italic: "SpaceMono-Italic",
  boldItalic: "SpaceMono-BoldItalic",
} as const;

/** Tailwind/Uniwind classes that reference CSS --font-* variables */
export const FONT_CLASSES = {
  regular: "font-sans",
  bold: "font-sans-bold",
  italic: "font-sans-italic",
  boldItalic: "font-sans-bold-italic",
} as const;

export type FontVariant = keyof typeof FONTS;
