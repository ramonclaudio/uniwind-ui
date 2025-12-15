/**
 * Font Configuration
 *
 * Define your app's fonts here. These names must match:
 * 1. The font file names (without extension) in assets/fonts/
 * 2. The keys used in useFonts() in _layout.tsx (for Expo Go)
 * 3. The paths in app.json expo-font plugin (for dev builds)
 * 4. The values in global.css @theme (for web)
 */
export const FONTS = {
  regular: "SpaceMono-Regular",
  bold: "SpaceMono-Bold",
  italic: "SpaceMono-Italic",
  boldItalic: "SpaceMono-BoldItalic",
} as const;

/**
 * Font class mappings for Uniwind/Tailwind
 * These correspond to the CSS variables in global.css @theme
 */
export const FONT_CLASSES = {
  regular: "font-sans",
  bold: "font-sans-bold",
  italic: "font-sans-italic",
  boldItalic: "font-sans-bold-italic",
} as const;

export type FontVariant = keyof typeof FONTS;
