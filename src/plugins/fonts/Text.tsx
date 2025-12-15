import { Text as RNText, type TextProps as RNTextProps, Platform } from "react-native";
import { forwardRef, type ReactNode } from "react";
import Constants from "expo-constants";
import { cn } from "@/lib/utils";
import { FONTS, FONT_CLASSES } from "./config";

export interface TextProps extends RNTextProps {
  children?: ReactNode;
  className?: string;
  bold?: boolean;
  italic?: boolean;
}

/**
 * Detect if running in Expo Go vs Development Build
 *
 * - Expo Go (appOwnership === 'expo'): Fonts loaded via useFonts() hook
 *   → Requires inline fontFamily styles
 *
 * - Development Build (appOwnership === null/'standalone'): Fonts embedded via expo-font plugin
 *   → Can use Uniwind className approach
 */
const isExpoGo = Constants.appOwnership === "expo";

/**
 * Font-aware Text component
 *
 * Automatically handles font application across different environments:
 * - Expo Go: Applies fontFamily via inline styles
 * - Development Build: Uses Uniwind font classes
 * - Web: Uses Uniwind font classes (CSS)
 *
 * @example
 * ```tsx
 * import { Text } from "@/plugins/fonts";
 *
 * <Text>Regular text</Text>
 * <Text bold>Bold text</Text>
 * <Text italic>Italic text</Text>
 * <Text bold italic>Bold italic text</Text>
 * ```
 */
export const Text = forwardRef<RNText, TextProps>(
  ({ children, className = "", bold = false, italic = false, style, ...props }, ref) => {
    const isWeb = Platform.OS === "web";

    // Determine font variant based on props
    let fontFamily: (typeof FONTS)[keyof typeof FONTS] = FONTS.regular;
    let fontClass: (typeof FONT_CLASSES)[keyof typeof FONT_CLASSES] = FONT_CLASSES.regular;

    if (bold && italic) {
      fontFamily = FONTS.boldItalic;
      fontClass = FONT_CLASSES.boldItalic;
    } else if (bold) {
      fontFamily = FONTS.bold;
      fontClass = FONT_CLASSES.bold;
    } else if (italic) {
      fontFamily = FONTS.italic;
      fontClass = FONT_CLASSES.italic;
    }

    // Web or Development Build: Use Uniwind classes
    if (isWeb || !isExpoGo) {
      return (
        <RNText
          ref={ref}
          className={cn(fontClass, className)}
          {...props}
        >
          {children}
        </RNText>
      );
    }

    // Expo Go: Apply fontFamily directly via inline styles
    return (
      <RNText
        ref={ref}
        className={className}
        style={[{ fontFamily }, style]}
        {...props}
      >
        {children}
      </RNText>
    );
  }
);

Text.displayName = "Text";
