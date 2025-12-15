/**
 * Label Component
 *
 * Renders an accessible label associated with controls.
 * Non-selectable by default for better form UX.
 *
 * ## Dependencies
 *
 * - @/lib/utils (cn function)
 * - @/lib/fonts (font configuration)
 *
 * ## Usage
 *
 * ```tsx
 * import { Label } from "@/components/ui/label";
 *
 * <Label>Email</Label>
 * <Label className="text-destructive">Required field</Label>
 * ```
 */

import { Text as RNText, Platform, type TextProps } from "react-native";
import { forwardRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { FONTS, FONT_CLASSES } from "@/lib/fonts";

export interface LabelProps extends TextProps {
  children?: ReactNode;
  className?: string;
}

export const Label = forwardRef<RNText, LabelProps>(
  ({ children, className = "", style, ...props }, ref) => {
    // On native (iOS/Android), we need inline fontFamily for Expo Go compatibility
    // On web, className is sufficient
    const platformStyle = Platform.select({
      web: style,
      default: [{ fontFamily: FONTS.regular }, style],
    });

    return (
      <RNText
        ref={ref}
        selectable={false}
        className={cn(
          FONT_CLASSES.regular,
          "text-sm leading-none font-medium text-foreground",
          className
        )}
        style={platformStyle}
        {...props}
      >
        {children}
      </RNText>
    );
  }
);

Label.displayName = "Label";
