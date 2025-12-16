/**
 * Button Component
 *
 * Displays a button or a component that looks like a button.
 * Supports multiple variants, sizes, loading states, and icons.
 *
 * ## Dependencies
 *
 * - @/lib/utils (cn function)
 * - uniwind (for useCSSVariable)
 *
 * ## Usage
 *
 * ```tsx
 * import { Button } from "@/components/ui/button";
 *
 * <Button>Click me</Button>
 * <Button variant="destructive">Delete</Button>
 * <Button variant="outline" size="sm">Small</Button>
 * <Button loading>Loading...</Button>
 * <Button disabled>Disabled</Button>
 * ```
 *
 * ## asChild Pattern
 *
 * The `asChild` prop works in both directions:
 * - `<Link asChild><Button>...</Button></Link>` - Link wraps Button
 * - `<Button asChild><Link>...</Link></Button>` - Button wraps Link
 *
 * Both patterns work correctly with icons and text.
 */

import {
  Pressable,
  Text as RNText,
  View as RNView,
  Platform,
  ActivityIndicator,
  type PressableProps,
  type View,
} from "react-native";
import {
  forwardRef,
  isValidElement,
  cloneElement,
  type ReactNode,
  type ReactElement,
  Children,
} from "react";
import { cn } from "@/lib/utils";
import { useCSSVariable, useResolveClassNames } from "uniwind";

const variantColorMap = {
  default: "--color-primary-foreground",
  destructive: "--color-primary-foreground",
  outline: "--color-foreground",
  secondary: "--color-secondary-foreground",
  ghost: "--color-foreground",
  link: "--color-primary",
} as const;

export const buttonVariants = {
  default: {
    button: "bg-primary active:bg-primary/90 web:hover:bg-primary/90",
    text: "text-primary-foreground font-medium",
  },
  destructive: {
    button: "bg-destructive active:bg-destructive/90 web:hover:bg-destructive/90",
    text: "text-primary-foreground font-medium",
  },
  outline: {
    button: "border border-border bg-background shadow-xs active:bg-accent web:hover:bg-accent web:hover:text-accent-foreground",
    text: "text-foreground font-medium",
  },
  secondary: {
    button: "bg-secondary active:bg-secondary/80 web:hover:bg-secondary/80",
    text: "text-secondary-foreground font-medium",
  },
  ghost: {
    button: "bg-transparent active:bg-accent web:hover:bg-accent web:hover:text-accent-foreground",
    text: "text-foreground font-medium",
  },
  link: {
    button: "bg-transparent web:hover:underline",
    text: "text-primary font-medium",
  },
} as const;

export const buttonSizes = {
  default: {
    button: "h-9 px-4 py-2",
    text: "text-sm",
    icon: 16,
  },
  sm: {
    button: "h-8 rounded-md gap-1.5 px-3",
    text: "text-sm",
    icon: 16,
  },
  lg: {
    button: "h-10 rounded-md px-6",
    text: "text-sm",
    icon: 16,
  },
  icon: {
    button: "size-9",
    text: "text-sm",
    icon: 16,
  },
  "icon-sm": {
    button: "size-8",
    text: "text-sm",
    icon: 16,
  },
  "icon-lg": {
    button: "size-10",
    text: "text-sm",
    icon: 16,
  },
} as const;

type ButtonVariant = keyof typeof buttonVariants;
type ButtonSize = keyof typeof buttonSizes;

export interface ButtonProps extends Omit<PressableProps, "children"> {
  children?: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  /** Render as child element, passing button styles to it */
  asChild?: boolean;
}

export const Button = forwardRef<View, ButtonProps>(
  (
    {
      children,
      variant = "default",
      size = "default",
      disabled = false,
      loading = false,
      className = "",
      asChild = false,
      ...props
    },
    ref
  ) => {
    const variantStyles = buttonVariants[variant];
    const sizeStyles = buttonSizes[size];
    const isDisabled = disabled || loading;

    const buttonClassName = cn(
      "flex-row items-center justify-center rounded-md gap-2",
      sizeStyles.button,
      variantStyles.button,
      isDisabled && "opacity-50",
      className
    );

    const cssVarName = variantColorMap[variant];
    const iconColor = useCSSVariable(cssVarName) as string;

    const rawFontFamily = useCSSVariable("--font-sans") as string;
    const fontFamily = rawFontFamily?.split(",")[0]?.trim()?.replace(/^["']|["']$/g, "");
    const nativeFontStyle = Platform.OS !== "web" && fontFamily ? { fontFamily } : undefined;

    const ButtonSpinner = ({ className: spinnerClassName }: { className?: string }) => {
      const defaultColor = useCSSVariable("--color-foreground") as string;
      const customStyles = useResolveClassNames(spinnerClassName || "");
      const resolvedColor = (customStyles.color as string) || defaultColor;
      return (
        <ActivityIndicator
          size="small"
          className={spinnerClassName}
          color={resolvedColor}
        />
      );
    };

    const styledChildren = (child: ReactNode): ReactNode => {
      if (typeof child === "string") {
        return (
          <RNText
            className={cn(
              "font-sans",
              sizeStyles.text,
              variantStyles.text
            )}
            style={nativeFontStyle}
          >
            {child}
          </RNText>
        );
      }

      if (isValidElement(child)) {
        const childProps = child.props as { className?: string; children?: ReactNode; color?: string };

        if (child.type === ActivityIndicator) {
          return cloneElement(child as ReactElement<{ className?: string }>, {
            className: cn(variantStyles.text, childProps.className),
          });
        }

        if (child.type === RNText) {
          return cloneElement(child as ReactElement<{ className?: string }>, {
            className: cn(variantStyles.text, childProps.className),
          });
        }

        const iconProps = child.props as {
          name?: string;
          size?: number;
          className?: string;
          color?: string;
        };
        if (
          !childProps.children &&
          (iconProps.name !== undefined || iconProps.size !== undefined)
        ) {
          return cloneElement(child as ReactElement<{ className?: string; color?: string }>, {
            className: cn(variantStyles.text, iconProps.className),
            color: iconProps.color ?? iconColor,
          });
        }

        if (childProps.children) {
          return cloneElement(child as ReactElement<{ children?: ReactNode }>, {
            children: Children.map(childProps.children, styledChildren),
          });
        }
      }

      return child;
    };

    if (asChild && isValidElement(children)) {
      const child = children as ReactElement<{
        className?: string;
        disabled?: boolean;
        ref?: React.Ref<View>;
        children?: ReactNode;
      }>;
      const childProps = child.props;

      const wrappedChildren = childProps.children ? (
        <RNView className="flex-1 h-full flex-row items-center justify-center gap-2">
          {loading && <ButtonSpinner className={variantStyles.text} />}
          {Children.map(childProps.children, styledChildren)}
        </RNView>
      ) : undefined;

      return cloneElement(child, {
        className: cn(buttonClassName, childProps.className),
        disabled: isDisabled,
        ref,
        ...props,
        children: wrappedChildren,
      });
    }

    return (
      <Pressable
        ref={ref}
        disabled={isDisabled}
        className={buttonClassName}
        {...props}
      >
        {loading && <ButtonSpinner className={variantStyles.text} />}
        {children != null && Children.map(children, styledChildren)}
      </Pressable>
    );
  }
);

Button.displayName = "Button";

export type { ButtonVariant, ButtonSize };
