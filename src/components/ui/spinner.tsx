/**
 * Spinner Component
 *
 * Displays a loading spinner indicator.
 * Supports theme-aware colors via Uniwind.
 *
 * ## Dependencies
 *
 * - @/lib/utils (cn function)
 * - uniwind (for useCSSVariable, useResolveClassNames)
 *
 * ## Usage
 *
 * ```tsx
 * import { Spinner } from "@/components/ui/spinner";
 *
 * <Spinner />
 * <Spinner size="large" />
 * <Spinner className="text-primary" />
 * <Spinner className="text-red-500" />
 * ```
 */

import { ActivityIndicator, type ActivityIndicatorProps } from "react-native";
import { useCSSVariable, useResolveClassNames } from "uniwind";

export interface SpinnerProps extends Omit<ActivityIndicatorProps, "color"> {
  className?: string;
}

/**
 * Spinner component - displays a circular loading indicator.
 *
 * Uses React Native's ActivityIndicator with Uniwind theme support.
 * Unlike the web version which uses an SVG icon, this uses the native
 * platform spinner for optimal performance and native feel.
 *
 * @example
 * ```tsx
 * <Spinner />
 * <Spinner size="large" />
 * <Spinner className="text-primary" />
 * ```
 */
function Spinner({
  className,
  size = "small",
  ...props
}: SpinnerProps) {
  // Use useCSSVariable for default foreground color (more efficient)
  const defaultColor = useCSSVariable("--color-foreground") as string;
  // Use useResolveClassNames only when custom className is provided
  const customStyles = useResolveClassNames(className || "");
  const resolvedColor = (customStyles.color as string) || defaultColor || "#000";

  return (
    <ActivityIndicator
      role="status"
      aria-label="Loading"
      accessibilityRole="progressbar"
      accessibilityLabel="Loading"
      size={size}
      className={className}
      color={resolvedColor}
      {...props}
    />
  );
}

Spinner.displayName = "Spinner";

export { Spinner };
