/**
 * Text Component
 *
 * A configurable Text component that works with Uniwind/Tailwind styling.
 * Supports typography variants and font styles (bold, italic) via props or className.
 *
 * ## Requirements
 *
 * This component requires font configuration to display text correctly on native platforms:
 *
 * 1. Configure `@/lib/fonts.ts` with your font family names (must match loaded font files)
 * 2. Update `global.css` @theme block with matching --font-* CSS variables
 * 3. Load your fonts via expo-font or similar
 *
 * Without this configuration, text may not render with the correct fonts on iOS/Android.
 *
 * ## Usage
 *
 * ```tsx
 * import { Text } from "@/components/ui/text";
 *
 * // Basic usage
 * <Text>Regular text</Text>
 * <Text bold>Bold text</Text>
 * <Text italic>Italic text</Text>
 * <Text bold italic>Bold italic text</Text>
 *
 * // Typography variants
 * <Text variant="h1">Page Title</Text>
 * <Text variant="h2">Section Header</Text>
 * <Text variant="lead">Introduction paragraph</Text>
 * <Text variant="muted">Secondary information</Text>
 * <Text variant="code">inline_code</Text>
 *
 * // Custom styling
 * <Text className="text-lg text-primary">Styled text</Text>
 * ```
 */

import {
  Text as RNText,
  Platform,
  type TextProps as RNTextProps,
  type StyleProp,
  type TextStyle,
} from "react-native";
import { forwardRef, useMemo, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { FONTS, FONT_CLASSES, type FontVariant } from "@/lib/fonts";

/**
 * Typography Variants
 *
 * Pre-defined typography styles inspired by shadcn/ui.
 * These provide semantic meaning and consistent styling across your app.
 */
const VARIANT_CLASSES = {
  h1: "text-4xl font-extrabold tracking-tight",
  h2: "text-3xl font-semibold tracking-tight",
  h3: "text-2xl font-semibold tracking-tight",
  h4: "text-xl font-semibold tracking-tight",
  p: "text-base leading-7",
  lead: "text-xl text-muted-foreground",
  large: "text-lg font-semibold",
  small: "text-sm font-medium",
  muted: "text-sm text-muted-foreground",
  code: "font-mono text-sm bg-muted rounded px-1 py-0.5",
} as const;

type TypographyVariant = keyof typeof VARIANT_CLASSES;

// Pre-computed platform check - evaluated once at module load
const IS_WEB = Platform.OS === "web";

// Pre-computed font styles for native platforms
const NATIVE_FONT_STYLES: Record<FontVariant, { fontFamily: string }> = {
  regular: { fontFamily: FONTS.regular },
  bold: { fontFamily: FONTS.bold },
  italic: { fontFamily: FONTS.italic },
  boldItalic: { fontFamily: FONTS.boldItalic },
};

export interface TextProps extends RNTextProps {
  children?: ReactNode;
  className?: string;
  /** Apply bold font variant */
  bold?: boolean;
  /** Apply italic font variant */
  italic?: boolean;
  /** Typography variant for semantic styling */
  variant?: TypographyVariant;
}

/**
 * Determines which font variant to use based on props
 */
function getFontVariant(bold?: boolean, italic?: boolean): FontVariant {
  if (bold && italic) return "boldItalic";
  if (bold) return "bold";
  if (italic) return "italic";
  return "regular";
}

export const Text = forwardRef<RNText, TextProps>(
  ({ children, className = "", style, bold, italic, variant, ...props }, ref) => {
    const fontVariant = getFontVariant(bold, italic);
    const fontClass = FONT_CLASSES[fontVariant];
    const variantClass = variant ? VARIANT_CLASSES[variant] : "";

    // On native (iOS/Android), we need inline fontFamily for Expo Go compatibility
    // On web, className is sufficient. Platform check is pre-computed at module level.
    const platformStyle = useMemo((): StyleProp<TextStyle> => {
      if (IS_WEB) return style;
      return [NATIVE_FONT_STYLES[fontVariant], style];
    }, [fontVariant, style]);

    return (
      <RNText
        ref={ref}
        className={cn(fontClass, "text-foreground", variantClass, className)}
        style={platformStyle}
        {...props}
      >
        {children}
      </RNText>
    );
  }
);

Text.displayName = "Text";
