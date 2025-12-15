/**
 * Badge Component
 *
 * Displays a badge or a component that looks like a badge.
 * Supports multiple variants, icons, spinners, and press interactions.
 *
 * ## Dependencies
 *
 * - @/lib/utils (cn function)
 * - @/lib/fonts (font configuration)
 *
 * ## Usage
 *
 * ```tsx
 * import { Badge } from "@/components/ui/badge";
 *
 * <Badge>Default</Badge>
 * <Badge variant="secondary">Secondary</Badge>
 * <Badge variant="destructive">Error</Badge>
 * <Badge variant="outline">Outline</Badge>
 * <Badge onPress={() => {}}>Clickable</Badge>
 * ```
 *
 * ## asChild Pattern
 *
 * The `asChild` prop works in both directions:
 * - `<Link asChild><Badge>...</Badge></Link>` - Link wraps Badge
 * - `<Badge asChild><Link>...</Link></Badge>` - Badge wraps Link
 */

import {
  View,
  Text as RNText,
  Pressable,
  Platform,
  ActivityIndicator,
  type ViewProps,
  type PressableProps,
} from "react-native";
import { forwardRef, isValidElement, cloneElement, Children, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { FONTS, FONT_CLASSES } from "@/lib/fonts";

export const badgeVariants = {
  default: {
    container: "border-transparent bg-primary",
    text: "text-primary-foreground font-medium",
  },
  secondary: {
    container: "border-transparent bg-secondary",
    text: "text-secondary-foreground font-medium",
  },
  destructive: {
    container: "border-transparent bg-destructive",
    text: "text-white font-medium",
  },
  outline: {
    container: "border-border",
    text: "text-foreground font-medium",
  },
} as const;

type BadgeVariant = keyof typeof badgeVariants;

export interface BadgeProps extends ViewProps {
  children?: ReactNode;
  variant?: BadgeVariant;
  className?: string;
  onPress?: PressableProps["onPress"];
  /** Render as child element, passing badge styles to it */
  asChild?: boolean;
}

export const Badge = forwardRef<View, BadgeProps>(
  (
    {
      children,
      variant = "default",
      className = "",
      onPress,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const variantStyles = badgeVariants[variant];

    const badgeClassName = cn(
      "flex-row items-center justify-center gap-1 rounded-full border px-2 py-0.5",
      variantStyles.container,
      onPress && "active:opacity-80",
      className
    );

    // On native (iOS/Android), we need inline fontFamily for Expo Go compatibility
    const platformTextStyle = Platform.select({
      web: undefined,
      default: { fontFamily: FONTS.regular },
    });

    const styledChildren = (child: ReactNode): ReactNode => {
      if (typeof child === "string") {
        return (
          <RNText
            className={cn(FONT_CLASSES.regular, "text-xs", variantStyles.text)}
            style={platformTextStyle}
          >
            {child}
          </RNText>
        );
      }

      if (isValidElement(child)) {
        const childProps = child.props as { className?: string; children?: ReactNode };

        if (child.type === ActivityIndicator) {
          return cloneElement(child as React.ReactElement<{ className?: string }>, {
            className: cn(variantStyles.text, childProps.className),
          });
        }

        if (child.type === RNText) {
          return cloneElement(child as React.ReactElement<{ className?: string }>, {
            className: cn(variantStyles.text, childProps.className),
          });
        }
      }

      return child;
    };

    if (asChild && isValidElement(children)) {
      const child = children as React.ReactElement<{
        className?: string;
        ref?: React.Ref<unknown>;
        children?: ReactNode;
      }>;
      const childProps = child.props;

      // Wrap children in a View to ensure flex layout works regardless of the
      // parent element (e.g., Link on web doesn't always support flex properly)
      const wrappedChildren = childProps.children ? (
        <View className="flex-row items-center gap-1">
          {Children.map(childProps.children, styledChildren)}
        </View>
      ) : undefined;

      return cloneElement(child, {
        className: cn(badgeClassName, childProps.className),
        ref,
        ...props,
        children: wrappedChildren,
      });
    }

    const content = Children.map(children, styledChildren);

    if (onPress) {
      return (
        <Pressable
          ref={ref}
          onPress={onPress}
          className={badgeClassName}
          {...props}
        >
          {content}
        </Pressable>
      );
    }

    return (
      <View
        ref={ref}
        className={badgeClassName}
        {...props}
      >
        {content}
      </View>
    );
  }
);

Badge.displayName = "Badge";

export type { BadgeVariant };
