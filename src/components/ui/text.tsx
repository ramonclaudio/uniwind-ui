/**
 * Text Component
 *
 * A configurable Text component that works with Uniwind/Tailwind styling.
 * Supports typography variants and font styles (bold, italic) via props or className.
 *
 * ## Dependencies
 *
 * - @/lib/utils (cn function)
 * - uniwind (for useCSSVariable)
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

import { Text as RNText, Platform, type TextProps as RNTextProps } from "react-native";
import { forwardRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useCSSVariable } from "uniwind";

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

const FONT_CONFIG = {
  regular: { class: "font-sans", cssVar: "--font-sans" },
  bold: { class: "font-sans-bold", cssVar: "--font-sans-bold" },
  italic: { class: "font-sans-italic", cssVar: "--font-sans-italic" },
  boldItalic: { class: "font-sans-bold-italic", cssVar: "--font-sans-bold-italic" },
} as const;

type FontVariant = keyof typeof FONT_CONFIG;

export interface TextProps extends RNTextProps {
  children?: ReactNode;
  className?: string;
  bold?: boolean;
  italic?: boolean;
  variant?: TypographyVariant;
}

function getFontVariant(bold?: boolean, italic?: boolean): FontVariant {
  if (bold && italic) return "boldItalic";
  if (bold) return "bold";
  if (italic) return "italic";
  return "regular";
}

export const Text = forwardRef<RNText, TextProps>(
  ({ children, className = "", style, bold, italic, variant, ...props }, ref) => {
    const fontVariant = getFontVariant(bold, italic);
    const { class: fontClass, cssVar } = FONT_CONFIG[fontVariant];
    const variantClass = variant ? VARIANT_CLASSES[variant] : "";

    const rawFontFamily = useCSSVariable(cssVar) as string;
    const fontFamily = rawFontFamily?.split(",")[0]?.trim()?.replace(/^["']|["']$/g, "");

    const platformStyle = Platform.select({
      web: style,
      default: fontFamily ? [{ fontFamily }, style] : style,
    });

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
