/**
 * Label Component
 *
 * Renders an accessible label associated with controls.
 * Non-selectable by default for better form UX.
 *
 * ## Dependencies
 *
 * - @/lib/utils (cn function)
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

import { Text as RNText, type TextProps } from "react-native";
import { forwardRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface LabelProps extends TextProps {
  children?: ReactNode;
  className?: string;
}

export const Label = forwardRef<RNText, LabelProps>(
  ({ children, className = "", ...props }, ref) => {
    return (
      <RNText
        ref={ref}
        selectable={false}
        className={cn(
          "font-sans text-sm leading-none font-medium text-foreground",
          className
        )}
        {...props}
      >
        {children}
      </RNText>
    );
  }
);

Label.displayName = "Label";
