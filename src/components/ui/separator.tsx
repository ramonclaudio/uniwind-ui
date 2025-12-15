/**
 * Separator Component
 *
 * Visually or semantically separates content.
 * Supports horizontal and vertical orientations.
 *
 * ## Dependencies
 *
 * - @/lib/utils (cn function)
 *
 * ## Usage
 *
 * ```tsx
 * import { Separator } from "@/components/ui/separator";
 *
 * <Separator />
 * <Separator orientation="vertical" />
 * <Separator className="my-4" />
 * ```
 */

import { View, type ViewProps } from "react-native";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface SeparatorProps extends ViewProps {
  className?: string;
  orientation?: "horizontal" | "vertical";
  /**
   * Whether the separator is purely decorative.
   * When true, it has no semantic meaning (default behavior).
   * Note: React Native doesn't have a native "separator" role,
   * so this prop is included for API parity with shadcn/ui.
   */
  decorative?: boolean;
}

/**
 * Separator component - visually or semantically separates content.
 * Uses Uniwind's hairlineWidth() CSS function for the thinnest possible line on any device.
 *
 * @example
 * ```tsx
 * <Separator />
 * <Separator orientation="vertical" />
 * ```
 */
export const Separator = forwardRef<View, SeparatorProps>(
  ({ className = "", orientation = "horizontal", decorative = true, ...props }, ref) => {
    return (
      <View
        ref={ref}
        accessibilityRole={decorative ? "none" : undefined}
        className={cn(
          "shrink-0 bg-border",
          orientation === "horizontal"
            ? "h-px w-full"
            : "w-px self-stretch",
          className
        )}
        {...props}
      />
    );
  }
);

Separator.displayName = "Separator";
