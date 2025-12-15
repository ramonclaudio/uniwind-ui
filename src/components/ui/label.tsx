/**
 * Label Component
 *
 * Renders an accessible label associated with controls.
 * Non-selectable by default for better form UX.
 *
 * ## Dependencies
 *
 * - @/lib/utils (cn function)
 * - uniwind (for useCSSVariable)
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
import { useCSSVariable } from "uniwind";

export interface LabelProps extends TextProps {
  children?: ReactNode;
  className?: string;
}

export const Label = forwardRef<RNText, LabelProps>(
  ({ children, className = "", style, ...props }, ref) => {
    // Resolve font family from CSS variable for native platforms
    const fontFamily = useCSSVariable("--font-sans") as string;
    const platformStyle = Platform.select({
      web: style,
      default: fontFamily ? [{ fontFamily }, style] : style,
    });

    return (
      <RNText
        ref={ref}
        selectable={false}
        className={cn(
          "font-sans text-sm leading-none font-medium text-foreground",
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
