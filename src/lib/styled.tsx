/**
 * Styled third-party components wrapped with withUniwind
 *
 * This file contains all third-party components wrapped with withUniwind
 * to add className support. Following the docs' best practice:
 * "Create reusable styled components in a separate file and export them"
 *
 * Important: Components are wrapped at module level (not inside component functions)
 * to avoid recreating the wrapper on every render.
 *
 * SVG components use a wrapper pattern to filter custom props (strokeClassName,
 * fillClassName) before they reach the DOM, preventing React warnings.
 */

import { forwardRef } from "react";
import { withUniwind, useResolveClassNames } from "uniwind";
import { Ionicons as BaseIonicons } from "@expo/vector-icons";
import {
  Path as BasePath,
  Rect as BaseRect,
  Circle as BaseCircle,
  Line as BaseLine,
  type PathProps,
  type RectProps,
  type CircleProps,
  type LineProps,
} from "react-native-svg";

/**
 * Styled Ionicons with automatic className support
 *
 * @example
 * <StyledIonicons name="home" size={24} className="text-primary" />
 * <StyledIonicons name="settings" size={20} className="text-muted-foreground" />
 */
export const StyledIonicons = withUniwind(BaseIonicons);

type StyledPathProps = Omit<PathProps, "stroke" | "fill"> & {
  strokeClassName?: string;
  fillClassName?: string;
};

type StyledRectProps = Omit<RectProps, "stroke" | "fill"> & {
  strokeClassName?: string;
  fillClassName?: string;
};

type StyledCircleProps = Omit<CircleProps, "stroke" | "fill"> & {
  strokeClassName?: string;
  fillClassName?: string;
};

type StyledLineProps = Omit<LineProps, "stroke"> & {
  strokeClassName?: string;
};

/**
 * Styled SVG Path with stroke/fill className support
 *
 * @example
 * <StyledPath d="M10 10" strokeClassName="accent-foreground" />
 * <StyledPath d="M10 10" fillClassName="accent-primary" />
 */
export const StyledPath = forwardRef<BasePath, StyledPathProps>(
  ({ strokeClassName, fillClassName, ...props }, ref) => {
    const strokeStyles = useResolveClassNames(strokeClassName ?? "");
    const fillStyles = useResolveClassNames(fillClassName ?? "");

    return (
      <BasePath
        ref={ref}
        stroke={strokeStyles.accentColor as string | undefined}
        fill={fillStyles.accentColor as string | undefined}
        {...props}
      />
    );
  }
);
StyledPath.displayName = "StyledPath";

export const StyledRect = forwardRef<BaseRect, StyledRectProps>(
  ({ strokeClassName, fillClassName, ...props }, ref) => {
    const strokeStyles = useResolveClassNames(strokeClassName ?? "");
    const fillStyles = useResolveClassNames(fillClassName ?? "");

    return (
      <BaseRect
        ref={ref}
        stroke={strokeStyles.accentColor as string | undefined}
        fill={fillStyles.accentColor as string | undefined}
        {...props}
      />
    );
  }
);
StyledRect.displayName = "StyledRect";

export const StyledCircle = forwardRef<BaseCircle, StyledCircleProps>(
  ({ strokeClassName, fillClassName, ...props }, ref) => {
    const strokeStyles = useResolveClassNames(strokeClassName ?? "");
    const fillStyles = useResolveClassNames(fillClassName ?? "");

    return (
      <BaseCircle
        ref={ref}
        stroke={strokeStyles.accentColor as string | undefined}
        fill={fillStyles.accentColor as string | undefined}
        {...props}
      />
    );
  }
);
StyledCircle.displayName = "StyledCircle";

export const StyledLine = forwardRef<BaseLine, StyledLineProps>(
  ({ strokeClassName, ...props }, ref) => {
    const strokeStyles = useResolveClassNames(strokeClassName ?? "");

    return (
      <BaseLine
        ref={ref}
        stroke={strokeStyles.accentColor as string | undefined}
        {...props}
      />
    );
  }
);
StyledLine.displayName = "StyledLine";
