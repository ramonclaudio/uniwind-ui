// Component Registry
// This maps component names to their metadata and source code

export interface RegistryItem {
  name: string;
  description: string;
  dependencies?: string[];
  registryDependencies?: string[];
  files: {
    path: string;
    content: string;
  }[];
}

export const registry: Record<string, RegistryItem> = {
  button: {
    name: "Button",
    description: "Displays a button or a component that looks like a button.",
    dependencies: [],
    registryDependencies: ["utils", "spinner"],
    files: [
      {
        path: "components/ui/button.tsx",
        content: `import {
  Pressable,
  Text,
  type PressableProps,
  type ViewProps,
} from "react-native";
import { forwardRef, isValidElement, cloneElement, type ReactNode, Children } from "react";
import { cn } from "@/lib/utils";
import { Spinner } from "./spinner";

// Variant styles using theme variables
const variants = {
  default: {
    button: "bg-primary active:bg-primary/90",
    text: "text-primary-foreground",
  },
  destructive: {
    button: "bg-destructive active:bg-destructive/90",
    text: "text-destructive-foreground",
  },
  outline: {
    button: "border border-input bg-background active:bg-accent",
    text: "text-foreground",
  },
  secondary: {
    button: "bg-secondary active:bg-secondary/80",
    text: "text-secondary-foreground",
  },
  ghost: {
    button: "bg-transparent active:bg-accent",
    text: "text-foreground",
  },
  link: {
    button: "bg-transparent",
    text: "text-primary underline",
  },
} as const;

// Size styles
const sizes = {
  default: {
    button: "h-10 px-4 py-2",
    text: "text-sm",
    icon: 18,
  },
  sm: {
    button: "h-8 px-3 py-1.5",
    text: "text-xs",
    icon: 16,
  },
  lg: {
    button: "h-12 px-6 py-3",
    text: "text-base",
    icon: 20,
  },
  icon: {
    button: "h-10 w-10",
    text: "text-sm",
    icon: 18,
  },
  "icon-sm": {
    button: "h-8 w-8",
    text: "text-xs",
    icon: 16,
  },
  "icon-lg": {
    button: "h-12 w-12",
    text: "text-base",
    icon: 20,
  },
} as const;

type ButtonVariant = keyof typeof variants;
type ButtonSize = keyof typeof sizes;

export interface ButtonProps extends Omit<PressableProps, "children"> {
  children?: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  textClassName?: string;
}

export const Button = forwardRef<React.ComponentRef<typeof Pressable>, ButtonProps>(
  (
    {
      children,
      variant = "default",
      size = "default",
      disabled = false,
      loading = false,
      className = "",
      textClassName = "",
      ...props
    },
    ref
  ) => {
    const variantStyles = variants[variant];
    const sizeStyles = sizes[size];
    const isDisabled = disabled || loading;

    // Helper to style children with variant colors
    const styledChildren = (child: ReactNode): ReactNode => {
      if (typeof child === "string") {
        return (
          <Text
            className={cn(
              "font-medium",
              sizeStyles.text,
              variantStyles.text,
              textClassName
            )}
          >
            {child}
          </Text>
        );
      }

      if (isValidElement(child)) {
        // Clone element and merge className for Text components
        const childProps = child.props as { className?: string; children?: ReactNode };

        // Check if it's a Spinner component - apply variant text color
        if (child.type === Spinner || (typeof child.type === 'function' && child.type.name === 'Spinner')) {
          return cloneElement(child as React.ReactElement<{ className?: string }>, {
            className: cn(variantStyles.text, childProps.className),
          });
        }

        // Check if it's a Text-like component
        if (child.type === Text || (typeof child.type === 'function' && child.type.name === 'Text')) {
          return cloneElement(child as React.ReactElement<{ className?: string }>, {
            className: cn(variantStyles.text, childProps.className),
          });
        }

        // For other elements, recursively style their children
        if (childProps.children) {
          return cloneElement(child as React.ReactElement<{ children?: ReactNode }>, {
            children: Children.map(childProps.children, styledChildren),
          });
        }
      }

      return child;
    };

    return (
      <Pressable
        ref={ref}
        disabled={isDisabled}
        className={cn(
          "flex-row items-center justify-center rounded-md gap-2",
          sizeStyles.button,
          variantStyles.button,
          isDisabled && "opacity-50",
          className
        )}
        {...props}
      >
        {loading ? (
          <Spinner className={variantStyles.text} />
        ) : null}

        {Children.map(children, styledChildren)}
      </Pressable>
    );
  }
);

Button.displayName = "Button";

export type { ButtonVariant, ButtonSize };`,
      },
    ],
  },

  badge: {
    name: "Badge",
    description: "Displays a badge or a component that looks like a badge.",
    dependencies: [],
    registryDependencies: ["utils", "spinner"],
    files: [
      {
        path: "components/ui/badge.tsx",
        content: `import { View, Text, Pressable, type ViewProps, type PressableProps } from "react-native";
import { forwardRef, isValidElement, cloneElement, Children, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Spinner } from "./spinner";

const variants = {
  default: {
    container: "bg-primary",
    text: "text-primary-foreground",
  },
  secondary: {
    container: "bg-secondary",
    text: "text-secondary-foreground",
  },
  destructive: {
    container: "bg-destructive",
    text: "text-destructive-foreground",
  },
  outline: {
    container: "border border-border bg-transparent",
    text: "text-foreground",
  },
} as const;

type BadgeVariant = keyof typeof variants;

export interface BadgeProps extends ViewProps {
  children?: ReactNode;
  variant?: BadgeVariant;
  className?: string;
  onPress?: PressableProps["onPress"];
}

export const Badge = forwardRef<View, BadgeProps>(
  (
    {
      children,
      variant = "default",
      className = "",
      onPress,
      ...props
    },
    ref
  ) => {
    const variantStyles = variants[variant];

    // Helper to style children with variant colors
    const styledChildren = (child: ReactNode): ReactNode => {
      if (typeof child === "string") {
        return (
          <Text
            className={cn("text-xs", variantStyles.text)}
          >
            {child}
          </Text>
        );
      }

      if (isValidElement(child)) {
        const childProps = child.props as { className?: string; children?: ReactNode };

        // Check if it's a Spinner component - apply variant text color
        if (child.type === Spinner || (typeof child.type === 'function' && child.type.name === 'Spinner')) {
          return cloneElement(child as React.ReactElement<{ className?: string }>, {
            className: cn(variantStyles.text, childProps.className),
          });
        }

        // Check if it's a Text-like component
        if (child.type === Text || (typeof child.type === 'function' && child.type.name === 'Text')) {
          return cloneElement(child as React.ReactElement<{ className?: string }>, {
            className: cn(variantStyles.text, childProps.className),
          });
        }
      }

      return child;
    };

    const content = Children.map(children, styledChildren);

    if (onPress) {
      return (
        <Pressable
          ref={ref as any}
          onPress={onPress}
          className={cn(
            "flex-row items-center rounded-full px-2.5 py-0.5",
            variantStyles.container,
            "active:opacity-80",
            className
          )}
          {...props}
        >
          {content}
        </Pressable>
      );
    }

    return (
      <View
        ref={ref}
        className={cn(
          "flex-row items-center rounded-full px-2.5 py-0.5",
          variantStyles.container,
          className
        )}
        {...props}
      >
        {content}
      </View>
    );
  }
);

Badge.displayName = "Badge";

export type { BadgeVariant };`,
      },
    ],
  },

  checkbox: {
    name: "Checkbox",
    description: "A control that allows the user to toggle between checked and not checked.",
    dependencies: ["@expo/vector-icons"],
    registryDependencies: ["utils"],
    files: [
      {
        path: "components/ui/checkbox.tsx",
        content: `import { Pressable, View, type PressableProps } from "react-native";
import {
  forwardRef,
  useState,
  isValidElement,
  cloneElement,
  Children,
  type ReactNode,
  type ReactElement,
} from "react";
import { cn } from "@/lib/utils";
import { Ionicons } from "@expo/vector-icons";

/** Checkbox can be checked, unchecked, or indeterminate */
export type CheckedState = boolean | "indeterminate";

export interface CheckboxProps extends Omit<PressableProps, "onPress"> {
  /** Controlled checked state - can be true, false, or "indeterminate" */
  checked?: CheckedState;
  /** Default checked state for uncontrolled usage */
  defaultChecked?: boolean;
  /** Callback when checked state changes */
  onCheckedChange?: (checked: CheckedState) => void;
  /** Whether the checkbox is disabled */
  disabled?: boolean;
  /** Whether the checkbox is required (for form semantics) */
  required?: boolean;
  /** Name attribute for form submission */
  name?: string;
  /** Value attribute for form submission */
  value?: string;
  /** Additional className for the checkbox container */
  className?: string;
  /** Custom check icon to display when checked */
  checkIcon?: ReactNode;
  /** Custom icon to display when indeterminate */
  indeterminateIcon?: ReactNode;
  /** Size of the default icons (default: 14) */
  iconSize?: number;
  /** Render as child element, passing checkbox styles and behavior to it */
  asChild?: boolean;
}

export const Checkbox = forwardRef<View, CheckboxProps>(
  (
    {
      checked: controlledChecked,
      defaultChecked = false,
      onCheckedChange,
      disabled = false,
      required = false,
      name,
      value = "on",
      className = "",
      checkIcon,
      indeterminateIcon,
      iconSize = 14,
      asChild = false,
      children,
      ...props
    },
    ref
  ) => {
    const [internalChecked, setInternalChecked] = useState<CheckedState>(defaultChecked);
    const isControlled = controlledChecked !== undefined;
    const checkedState = isControlled ? controlledChecked : internalChecked;

    const isChecked = checkedState === true;
    const isIndeterminate = checkedState === "indeterminate";
    const hasIndicator = isChecked || isIndeterminate;

    const handlePress = () => {
      if (disabled) return;
      const newValue: CheckedState = checkedState === "indeterminate" ? true : !checkedState;
      if (!isControlled) {
        setInternalChecked(newValue);
      }
      onCheckedChange?.(newValue);
    };

    const checkboxClassName = cn(
      "size-4 shrink-0 rounded-[4px] border border-input bg-background shadow-xs",
      "web:outline-none web:transition-shadow web:focus-visible:border-ring web:focus-visible:ring-[3px] web:focus-visible:ring-ring/50",
      hasIndicator && "border-primary bg-primary text-primary-foreground",
      disabled && "web:cursor-not-allowed opacity-50",
      className
    );

    const defaultCheckIcon = (
      <Ionicons name="checkmark" size={iconSize} className="text-primary-foreground" />
    );

    const defaultIndeterminateIcon = (
      <Ionicons name="remove" size={iconSize} className="text-primary-foreground" />
    );

    const indicatorContent = hasIndicator ? (
      <View className="flex-1 items-center justify-center">
        {isIndeterminate
          ? (indeterminateIcon ?? defaultIndeterminateIcon)
          : (checkIcon ?? defaultCheckIcon)}
      </View>
    ) : null;

    const accessibilityProps = {
      role: "checkbox" as const,
      "aria-checked": isIndeterminate ? ("mixed" as const) : isChecked,
      "aria-required": required,
      "aria-disabled": disabled,
      accessibilityRole: "checkbox" as const,
      accessibilityState: {
        checked: isIndeterminate ? "mixed" as const : isChecked,
        disabled,
      },
    };

    if (asChild && isValidElement(children)) {
      const child = children as ReactElement<{
        className?: string;
        disabled?: boolean;
        onPress?: () => void;
        ref?: React.Ref<unknown>;
        children?: ReactNode;
      }>;
      const childProps = child.props;

      const wrappedChildren = (
        <View className="flex-row items-center justify-center flex-1">
          {indicatorContent}
          {childProps.children && Children.map(childProps.children, (c) => c)}
        </View>
      );

      return cloneElement(child, {
        className: cn(checkboxClassName, childProps.className),
        disabled,
        onPress: handlePress,
        ref,
        ...accessibilityProps,
        ...props,
        children: wrappedChildren,
      });
    }

    return (
      <Pressable
        ref={ref}
        disabled={disabled}
        onPress={handlePress}
        className={checkboxClassName}
        {...accessibilityProps}
        {...props}
      >
        {indicatorContent}
      </Pressable>
    );
  }
);

Checkbox.displayName = "Checkbox";

export type { CheckedState as CheckboxCheckedState };`,
      },
    ],
  },

  card: {
    name: "Card",
    description: "Displays a card with header, content, and footer.",
    dependencies: [],
    registryDependencies: ["utils"],
    files: [
      {
        path: "components/ui/card.tsx",
        content: `import { View, Text, type ViewProps, type TextProps } from "react-native";
import { forwardRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends ViewProps {
  children?: ReactNode;
  className?: string;
}

export const Card = forwardRef<View, CardProps>(
  ({ children, className = "", ...props }, ref) => {
    return (
      <View
        ref={ref}
        className={cn(
          "rounded-xl border border-border bg-card shadow-sm",
          className
        )}
        {...props}
      >
        {children}
      </View>
    );
  }
);
Card.displayName = "Card";

export interface CardHeaderProps extends ViewProps {
  children?: ReactNode;
  className?: string;
}

export const CardHeader = forwardRef<View, CardHeaderProps>(
  ({ children, className = "", ...props }, ref) => {
    return (
      <View
        ref={ref}
        className={cn("flex-col gap-1.5 p-6", className)}
        {...props}
      >
        {children}
      </View>
    );
  }
);
CardHeader.displayName = "CardHeader";

export interface CardTitleProps extends TextProps {
  children?: ReactNode;
  className?: string;
}

export const CardTitle = forwardRef<Text, CardTitleProps>(
  ({ children, className = "", ...props }, ref) => {
    return (
      <Text
        ref={ref}
        className={cn(
          "text-xl font-semibold leading-none tracking-tight text-card-foreground",
          className
        )}
        {...props}
      >
        {children}
      </Text>
    );
  }
);
CardTitle.displayName = "CardTitle";

export interface CardDescriptionProps extends TextProps {
  children?: ReactNode;
  className?: string;
}

export const CardDescription = forwardRef<Text, CardDescriptionProps>(
  ({ children, className = "", ...props }, ref) => {
    return (
      <Text
        ref={ref}
        className={cn("text-sm text-muted-foreground", className)}
        {...props}
      >
        {children}
      </Text>
    );
  }
);
CardDescription.displayName = "CardDescription";

// CardAction
export interface CardActionProps extends ViewProps {
  children?: ReactNode;
  className?: string;
}

export const CardAction = forwardRef<View, CardActionProps>(
  ({ children, className = "", ...props }, ref) => {
    return (
      <View
        ref={ref}
        className={cn("self-start", className)}
        {...props}
      >
        {children}
      </View>
    );
  }
);
CardAction.displayName = "CardAction";

export interface CardContentProps extends ViewProps {
  children?: ReactNode;
  className?: string;
}

export const CardContent = forwardRef<View, CardContentProps>(
  ({ children, className = "", ...props }, ref) => {
    return (
      <View
        ref={ref}
        className={cn("p-6 pt-0", className)}
        {...props}
      >
        {children}
      </View>
    );
  }
);
CardContent.displayName = "CardContent";

export interface CardFooterProps extends ViewProps {
  children?: ReactNode;
  className?: string;
}

export const CardFooter = forwardRef<View, CardFooterProps>(
  ({ children, className = "", ...props }, ref) => {
    return (
      <View
        ref={ref}
        className={cn("flex-row items-center p-6 pt-0", className)}
        {...props}
      >
        {children}
      </View>
    );
  }
);
CardFooter.displayName = "CardFooter";`,
      },
    ],
  },

  input: {
    name: "Input",
    description: "Displays a form input field.",
    dependencies: [],
    registryDependencies: ["utils"],
    files: [
      {
        path: "components/ui/input.tsx",
        content: `import { TextInput, type TextInputProps } from "react-native";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends TextInputProps {
  className?: string;
}

export const Input = forwardRef<TextInput, InputProps>(
  ({ className = "", editable = true, ...props }, ref) => {
    const isDisabled = editable === false;

    return (
      <TextInput
        ref={ref}
        editable={editable}
        className={cn(
          "h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base text-foreground",
          isDisabled && "opacity-50",
          className
        )}
        placeholderTextColorClassName="accent-muted-foreground"
        cursorColorClassName="accent-primary"
        selectionColorClassName="accent-ring"
        {...props}
      />
    );
  }
);

Input.displayName = "Input";`,
      },
    ],
  },

  label: {
    name: "Label",
    description: "Renders an accessible label associated with controls.",
    dependencies: [],
    registryDependencies: ["utils"],
    files: [
      {
        path: "components/ui/label.tsx",
        content: `import { Text, type TextProps } from "react-native";
import { forwardRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface LabelProps extends TextProps {
  children?: ReactNode;
  className?: string;
}

export const Label = forwardRef<Text, LabelProps>(
  ({ children, className = "", ...props }, ref) => {
    return (
      <Text
        ref={ref}
        className={cn("text-sm font-medium text-foreground", className)}
        {...props}
      >
        {children}
      </Text>
    );
  }
);

Label.displayName = "Label";`,
      },
    ],
  },

  textarea: {
    name: "Textarea",
    description: "Displays a form textarea for multi-line input.",
    dependencies: [],
    registryDependencies: ["utils"],
    files: [
      {
        path: "components/ui/textarea.tsx",
        content: `import { TextInput, type TextInputProps } from "react-native";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps extends TextInputProps {
  className?: string;
}

export const Textarea = forwardRef<TextInput, TextareaProps>(
  ({ className = "", editable = true, ...props }, ref) => {
    const isDisabled = editable === false;

    return (
      <TextInput
        ref={ref}
        editable={editable}
        multiline
        textAlignVertical="top"
        className={cn(
          "min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base text-foreground",
          isDisabled && "opacity-50",
          className
        )}
        placeholderTextColorClassName="accent-muted-foreground"
        cursorColorClassName="accent-primary"
        selectionColorClassName="accent-ring"
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";`,
      },
    ],
  },

  separator: {
    name: "Separator",
    description: "Visually or semantically separates content.",
    dependencies: [],
    registryDependencies: ["utils"],
    files: [
      {
        path: "components/ui/separator.tsx",
        content: `import { View, type ViewProps } from "react-native";
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
 * \`\`\`tsx
 * <Separator />
 * <Separator orientation="vertical" />
 * \`\`\`
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
            ? "h-hairline w-full"
            : "w-hairline h-full",
          className
        )}
        {...props}
      />
    );
  }
);

Separator.displayName = "Separator";`,
      },
    ],
  },

  spinner: {
    name: "Spinner",
    description: "Displays a loading spinner indicator.",
    dependencies: [],
    registryDependencies: ["utils"],
    files: [
      {
        path: "components/ui/spinner.tsx",
        content: `import { ActivityIndicator, type ActivityIndicatorProps } from "react-native";
import { useResolveClassNames } from "uniwind";
import { cn } from "@/lib/utils";

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
 * \`\`\`tsx
 * <Spinner />
 * <Spinner size="large" />
 * <Spinner className="text-primary" />
 * \`\`\`
 */
function Spinner({
  className,
  size = "small",
  ...props
}: SpinnerProps) {
  // Resolve color from className (text-* classes) reactively based on current theme
  const resolvedStyles = useResolveClassNames(cn("text-foreground", className));
  const resolvedColor = (resolvedStyles.color as string) || "#000";

  return (
    <ActivityIndicator
      role="status"
      aria-label="Loading"
      accessibilityRole="progressbar"
      accessibilityLabel="Loading"
      size={size}
      className={cn(className)}
      color={resolvedColor}
      {...props}
    />
  );
}

Spinner.displayName = "Spinner";

export { Spinner };`,
      },
    ],
  },

  select: {
    name: "Select",
    description: "Displays a list of options for the user to pick from, triggered by a button.",
    dependencies: ["react-native-dropdown-picker"],
    registryDependencies: ["utils"],
    files: [
      {
        path: "components/ui/select.tsx",
        content: `import { View, Text, Pressable, type ViewProps, type TextProps, type StyleProp, type TextStyle } from "react-native";
import DropDownPicker, { type ItemType, type RenderListItemPropsInterface } from "react-native-dropdown-picker";
import {
  createContext,
  useContext,
  useState,
  forwardRef,
  Children,
  isValidElement,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";
import { useCSSVariable, useUniwind } from "uniwind";

// Custom arrow icons for theme support - using chevron style
const ChevronIcon = ({ style }: { style?: StyleProp<TextStyle> }) => (
  <Text style={[{ fontSize: 10 }, style]}>▾</Text>
);
const TickIcon = ({ style }: { style?: StyleProp<TextStyle> }) => (
  <Text style={[{ fontSize: 14 }, style]}>✓</Text>
);

// Types for items
interface SelectItemData {
  value: string;
  label: string;
  disabled?: boolean;
  parent?: string;
  selectable?: boolean;
}

// Context for Select state management
interface SelectContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  value: string | null;
  onValueChange: (value: string | null) => void;
  disabled: boolean;
  items: SelectItemData[];
  registerItem: (item: SelectItemData) => void;
  placeholder: string;
  setPlaceholder: (placeholder: string) => void;
}

const SelectContext = createContext<SelectContextValue | null>(null);

function useSelectContext() {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error("Select components must be used within a Select");
  }
  return context;
}

// Helper to extract items from children
function extractItems(children: ReactNode, parentValue?: string): SelectItemData[] {
  const items: SelectItemData[] = [];
  Children.forEach(children, (child) => {
    if (!isValidElement(child)) return;
    const displayName = (child.type as any).displayName || (child.type as any).name;
    if (displayName === "SelectItem") {
      const props = child.props as SelectItemProps;
      const label = typeof props.children === "string" ? props.children : String(props.value);
      items.push({ value: props.value, label, disabled: props.disabled, parent: parentValue, selectable: true });
    } else if (displayName === "SelectGroup") {
      const groupProps = child.props as SelectGroupProps;
      let groupLabel: string | undefined;
      Children.forEach(groupProps.children, (groupChild) => {
        if (isValidElement(groupChild)) {
          const childDisplayName = (groupChild.type as any).displayName || (groupChild.type as any).name;
          if (childDisplayName === "SelectLabel") {
            const labelProps = groupChild.props as SelectLabelProps;
            groupLabel = typeof labelProps.children === "string" ? labelProps.children : undefined;
          }
        }
      });
      if (groupLabel) {
        const categoryValue = \`__category_\${groupLabel}\`;
        items.push({ value: categoryValue, label: groupLabel, selectable: false });
        const groupItems = extractItems(groupProps.children, categoryValue);
        items.push(...groupItems);
      } else {
        const groupItems = extractItems(groupProps.children, parentValue);
        items.push(...groupItems);
      }
    } else if (displayName === "SelectContent") {
      const contentProps = child.props as SelectContentProps;
      const contentItems = extractItems(contentProps.children);
      items.push(...contentItems);
    }
  });
  return items;
}

// Select Root
export interface SelectProps {
  children: ReactNode;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function Select({
  children,
  value: controlledValue,
  defaultValue = "",
  onValueChange: controlledOnValueChange,
  disabled = false,
  open: controlledOpen,
  onOpenChange,
}: SelectProps) {
  const [internalValue, setInternalValue] = useState<string | null>(defaultValue || null);
  const [internalOpen, setInternalOpen] = useState(false);
  const [items, setItems] = useState<SelectItemData[]>([]);
  const [placeholder, setPlaceholder] = useState("Select...");

  const isControlled = controlledValue !== undefined;
  const isOpenControlled = controlledOpen !== undefined;
  const value = isControlled ? controlledValue || null : internalValue;
  const open = isOpenControlled ? controlledOpen : internalOpen;

  const onValueChange = (newValue: string | null) => {
    if (!isControlled) setInternalValue(newValue);
    if (newValue !== null) controlledOnValueChange?.(newValue);
  };

  const setOpen = (newOpen: boolean) => {
    if (!isOpenControlled) setInternalOpen(newOpen);
    onOpenChange?.(newOpen);
  };

  const registerItem = (item: SelectItemData) => {
    setItems((prev) => {
      const exists = prev.some((i) => i.value === item.value);
      if (exists) return prev;
      return [...prev, item];
    });
  };

  const extractedItems = extractItems(children);

  return (
    <SelectContext.Provider
      value={{ open, setOpen, value, onValueChange, disabled, items: extractedItems, registerItem, placeholder, setPlaceholder }}
    >
      {children}
    </SelectContext.Provider>
  );
}

Select.displayName = "Select";

// SelectTrigger
export interface SelectTriggerProps extends Omit<ViewProps, "children"> {
  children?: ReactNode;
  className?: string;
}

export const SelectTrigger = forwardRef<View, SelectTriggerProps>(
  ({ children, className = "", ...props }, ref) => {
    const { open, setOpen, value, onValueChange, disabled, items, placeholder } = useSelectContext();
    const { theme } = useUniwind();

    // Use array syntax for efficient single subscription (per useCSSVariable docs)
    const [
      background,
      foreground,
      popover,
      popoverForeground,
      border,
      input,
      mutedForeground,
      accent,
      accentForeground,
    ] = useCSSVariable([
      "--color-background",
      "--color-foreground",
      "--color-popover",
      "--color-popover-foreground",
      "--color-border",
      "--color-input",
      "--color-muted-foreground",
      "--color-accent",
      "--color-accent-foreground",
    ]) as string[];

    const pickerItems: ItemType<string>[] = items.map((item) => ({
      label: item.label,
      value: item.value,
      disabled: item.disabled,
      parent: item.parent,
      selectable: item.selectable,
    }));

    const renderListItem = (props: RenderListItemPropsInterface<string>) => {
      const { item, isSelected, onPress, disabled: itemDisabled } = props;
      const isCategory = item.selectable === false;
      if (isCategory) {
        return (
          <View style={{ paddingVertical: 8, paddingHorizontal: 8 }}>
            <Text style={{ color: mutedForeground, fontWeight: "600", fontSize: 13 }}>{item.label}</Text>
          </View>
        );
      }
      return (
        <Pressable
          onPress={() => (onPress as (item: ItemType<string>) => void)(item)}
          disabled={itemDisabled}
          style={(state) => {
            const { pressed } = state;
            const hovered = (state as any).hovered ?? false;
            return {
              flexDirection: "row",
              alignItems: "center",
              paddingVertical: 10,
              paddingHorizontal: 8,
              borderRadius: 4,
              backgroundColor: isSelected ? accent : (pressed || hovered) ? accent + "80" : "transparent",
              opacity: itemDisabled ? 0.5 : 1,
            };
          }}
        >
          <View style={{ width: 24, alignItems: "center" }}>
            {isSelected && <Text style={{ color: accentForeground, fontSize: 14 }}>✓</Text>}
          </View>
          <Text style={{ color: isSelected ? accentForeground : popoverForeground, fontSize: 14, flex: 1 }}>{item.label}</Text>
        </Pressable>
      );
    };

    return (
      <View ref={ref} className={cn("z-50", className)} {...props}>
        <DropDownPicker
          key={theme}
          open={open}
          setOpen={(callback) => {
            const newOpen = typeof callback === "function" ? callback(open) : callback;
            setOpen(newOpen);
          }}
          value={value}
          setValue={(callback) => {
            const newValue = typeof callback === "function" ? callback(value) : callback;
            onValueChange(newValue);
          }}
          items={pickerItems}
          setItems={() => {}}
          disabled={disabled}
          placeholder={placeholder}
          listMode="SCROLLVIEW"
          scrollViewProps={{ nestedScrollEnabled: true }}
          dropDownDirection="AUTO"
          bottomOffset={100}
          categorySelectable={false}
          zIndex={5000}
          zIndexInverse={4000}
          style={{ backgroundColor: background, borderColor: input, borderRadius: 6, minHeight: 40, opacity: disabled ? 0.5 : 1 }}
          dropDownContainerStyle={{ backgroundColor: popover, borderColor: border, borderWidth: 1, borderRadius: 8, marginTop: 4, shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.15, shadowRadius: 8, elevation: 8 }}
          textStyle={{ color: foreground, fontSize: 14, fontWeight: "normal" }}
          placeholderStyle={{ color: mutedForeground, fontWeight: "normal" }}
          labelStyle={{ color: foreground, fontWeight: "normal" }}
          listItemLabelStyle={{ color: popoverForeground, fontWeight: "normal" }}
          listParentLabelStyle={{ color: mutedForeground, fontWeight: "600", fontSize: 13 }}
          listParentContainerStyle={{ paddingVertical: 8, paddingHorizontal: 8 }}
          selectedItemContainerStyle={{ backgroundColor: accent }}
          selectedItemLabelStyle={{ color: accentForeground }}
          disabledItemLabelStyle={{ color: mutedForeground, opacity: 0.5 }}
          listItemContainerStyle={{ paddingVertical: 10, paddingHorizontal: 8 }}
          ArrowDownIconComponent={() => <ChevronIcon style={{ color: mutedForeground }} />}
          ArrowUpIconComponent={() => <ChevronIcon style={{ color: mutedForeground }} />}
          TickIconComponent={() => <TickIcon style={{ color: foreground }} />}
          showArrowIcon={true}
          renderListItem={renderListItem}
        />
      </View>
    );
  }
);

SelectTrigger.displayName = "SelectTrigger";

// SelectValue
export interface SelectValueProps extends Omit<TextProps, "children"> {
  placeholder?: string;
  className?: string;
}

export const SelectValue = forwardRef<Text, SelectValueProps>(
  ({ placeholder = "Select...", className = "", ...props }, ref) => {
    const { setPlaceholder } = useSelectContext();
    useState(() => { setPlaceholder(placeholder); });
    return null;
  }
);

SelectValue.displayName = "SelectValue";

// SelectContent
export interface SelectContentProps extends ViewProps {
  children?: ReactNode;
  className?: string;
  position?: "popper" | "item-aligned";
}

export const SelectContent = forwardRef<View, SelectContentProps>(
  ({ children, className = "", position = "popper", ...props }, ref) => null
);

SelectContent.displayName = "SelectContent";

// SelectItem
export interface SelectItemProps extends ViewProps {
  children: ReactNode;
  value: string;
  disabled?: boolean;
  className?: string;
  textClassName?: string;
}

export const SelectItem = forwardRef<View, SelectItemProps>(
  ({ children, value, disabled = false, className = "", ...props }, ref) => null
);

SelectItem.displayName = "SelectItem";

// SelectGroup
export interface SelectGroupProps extends ViewProps {
  children?: ReactNode;
  className?: string;
}

export const SelectGroup = forwardRef<View, SelectGroupProps>(
  ({ children, className = "", ...props }, ref) => null
);

SelectGroup.displayName = "SelectGroup";

// SelectLabel
export interface SelectLabelProps extends TextProps {
  children?: ReactNode;
  className?: string;
}

export const SelectLabel = forwardRef<Text, SelectLabelProps>(
  ({ children, className = "", ...props }, ref) => null
);

SelectLabel.displayName = "SelectLabel";

// SelectSeparator
export interface SelectSeparatorProps extends ViewProps {
  className?: string;
}

export const SelectSeparator = forwardRef<View, SelectSeparatorProps>(
  ({ className = "", ...props }, ref) => null
);

SelectSeparator.displayName = "SelectSeparator";

// SelectScrollUpButton / SelectScrollDownButton
export interface SelectScrollButtonProps extends ViewProps {
  className?: string;
}

export const SelectScrollUpButton = forwardRef<View, SelectScrollButtonProps>((props, ref) => null);
SelectScrollUpButton.displayName = "SelectScrollUpButton";

export const SelectScrollDownButton = forwardRef<View, SelectScrollButtonProps>((props, ref) => null);
SelectScrollDownButton.displayName = "SelectScrollDownButton";`,
      },
    ],
  },

  "navigation-menu": {
    name: "Navigation Menu",
    description: "A collection of links for navigating websites.",
    dependencies: ["expo-router", "@expo/vector-icons"],
    registryDependencies: ["utils"],
    files: [
      {
        path: "components/ui/navigation-menu.tsx",
        content: `import { View, Text, Pressable, Platform, type ViewProps, type PressableProps } from "react-native";
import { forwardRef, createContext, useContext, useState, useEffect, useRef, cloneElement, isValidElement, type ReactNode, type ReactElement } from "react";
import { cn } from "@/lib/utils";
import { useResolveClassNames } from "uniwind";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

// Context for managing active state
type NavigationMenuContextValue = {
  activeItem: string | null;
  setActiveItem: (item: string | null) => void;
};

const NavigationMenuContext = createContext<NavigationMenuContextValue>({
  activeItem: null,
  setActiveItem: () => {},
});

// NavigationMenu - Root container
export interface NavigationMenuProps extends ViewProps {
  children?: ReactNode;
  className?: string;
}

export const NavigationMenu = forwardRef<View, NavigationMenuProps>(
  ({ children, className = "", ...props }, ref) => {
    const [activeItem, setActiveItem] = useState<string | null>(null);
    const containerRef = useRef<View>(null);

    // Handle click outside for web
    useEffect(() => {
      if (Platform.OS !== "web" || !activeItem) return;

      const handleClickOutside = (event: MouseEvent) => {
        const container = containerRef.current as unknown as HTMLElement;
        if (container && !container.contains(event.target as Node)) {
          setActiveItem(null);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [activeItem]);

    return (
      <NavigationMenuContext.Provider value={{ activeItem, setActiveItem }}>
        <View
          ref={containerRef}
          className={cn("relative z-50", className)}
          {...props}
        >
          {children}
        </View>
      </NavigationMenuContext.Provider>
    );
  }
);
NavigationMenu.displayName = "NavigationMenu";

// NavigationMenuList - Horizontal list of items
export interface NavigationMenuListProps extends ViewProps {
  children?: ReactNode;
  className?: string;
}

export const NavigationMenuList = forwardRef<View, NavigationMenuListProps>(
  ({ children, className = "", ...props }, ref) => {
    return (
      <View
        ref={ref}
        className={cn("flex-row items-center gap-1", className)}
        {...props}
      >
        {children}
      </View>
    );
  }
);
NavigationMenuList.displayName = "NavigationMenuList";

// NavigationMenuItem - Individual menu item wrapper
export interface NavigationMenuItemProps extends ViewProps {
  children?: ReactNode;
  className?: string;
  value?: string;
}

export const NavigationMenuItem = forwardRef<View, NavigationMenuItemProps>(
  ({ children, className = "", ...props }, ref) => {
    return (
      <View
        ref={ref}
        className={cn("relative", className)}
        {...props}
      >
        {children}
      </View>
    );
  }
);
NavigationMenuItem.displayName = "NavigationMenuItem";

// NavigationMenuTrigger - Button that toggles content
export interface NavigationMenuTriggerProps extends PressableProps {
  children?: ReactNode;
  className?: string;
  value?: string;
}

export const NavigationMenuTrigger = forwardRef<View, NavigationMenuTriggerProps>(
  ({ children, className = "", value, onPress, ...props }, ref) => {
    const { activeItem, setActiveItem } = useContext(NavigationMenuContext);
    const isActive = value ? activeItem === value : false;

    // Resolve color for Ionicons (third-party component requires explicit color prop)
    // useResolveClassNames is reactive and automatically updates on theme changes
    const mutedForegroundStyles = useResolveClassNames("text-muted-foreground");
    const mutedForeground = mutedForegroundStyles.color as string;

    const handlePress = (e: any) => {
      if (value) {
        setActiveItem(isActive ? null : value);
      }
      onPress?.(e);
    };

    return (
      <Pressable
        ref={ref}
        onPress={handlePress}
        className={cn(
          "flex-row items-center gap-1 px-4 py-2 rounded-md",
          isActive ? "bg-accent" : "bg-transparent",
          "active:bg-accent",
          className
        )}
        {...props}
      >
        {typeof children === "string" ? (
          <Text className="font-sans text-sm text-foreground">{children}</Text>
        ) : (
          children
        )}
        <Ionicons
          name={isActive ? "chevron-up" : "chevron-down"}
          size={12}
          color={mutedForeground}
        />
      </Pressable>
    );
  }
);
NavigationMenuTrigger.displayName = "NavigationMenuTrigger";

// NavigationMenuContent - Dropdown content
export interface NavigationMenuContentProps extends ViewProps {
  children?: ReactNode;
  className?: string;
  value?: string;
}

export const NavigationMenuContent = forwardRef<View, NavigationMenuContentProps>(
  ({ children, className = "", value, ...props }, ref) => {
    const { activeItem } = useContext(NavigationMenuContext);
    const isVisible = value ? activeItem === value : true;

    if (!isVisible) return null;

    return (
      <View
        ref={ref}
        className={cn(
          "absolute top-full left-0 mt-2 min-w-[220px]",
          "bg-popover border border-border rounded-md p-1.5 z-50",
          "ios:shadow-lg android:elevation-8 web:shadow-lg",
          className
        )}
        {...props}
      >
        {children}
      </View>
    );
  }
);
NavigationMenuContent.displayName = "NavigationMenuContent";

// NavigationMenuLink - Navigation link item
export interface NavigationMenuLinkProps extends Omit<PressableProps, "children"> {
  children?: ReactNode;
  className?: string;
  active?: boolean;
  asChild?: boolean;
  href?: string;
}

export const NavigationMenuLink = forwardRef<View, NavigationMenuLinkProps>(
  ({ children, className = "", active = false, asChild = false, href, onPress, ...props }, ref) => {
    const { setActiveItem } = useContext(NavigationMenuContext);
    const [isHovered, setIsHovered] = useState(false);

    const handlePress = (e: any) => {
      setIsHovered(false); // Reset hover on press
      setActiveItem(null); // Close menu on link press
      onPress?.(e);
    };

    // Web hover props - active: only handles press, not hover on web
    const webHoverProps = Platform.OS === "web" ? {
      onMouseEnter: () => setIsHovered(true),
      onMouseLeave: () => setIsHovered(false),
    } : {};

    const renderContent = () => {
      if (typeof children === "string") {
        return <Text className="font-sans text-sm text-popover-foreground">{children}</Text>;
      }
      return children;
    };

    const linkClassName = cn(
      "px-3 py-2 rounded",
      (active || isHovered) ? "bg-accent" : "bg-transparent",
      "active:bg-accent",
      className
    );

    // If href is provided, use Expo Router's Link
    if (href) {
      return (
        <Link href={href} asChild>
          <Pressable
            ref={ref}
            className={linkClassName}
            onPress={handlePress}
            {...webHoverProps}
            {...props}
          >
            {renderContent()}
          </Pressable>
        </Link>
      );
    }

    // If asChild, clone the child element with className
    if (asChild && isValidElement(children)) {
      return cloneElement(children as ReactElement<any>, {
        className: cn(linkClassName, (children as ReactElement<any>).props.className),
        onPress: handlePress,
        ...webHoverProps,
      });
    }

    return (
      <Pressable
        ref={ref}
        className={linkClassName}
        onPress={handlePress}
        {...webHoverProps}
        {...props}
      >
        {renderContent()}
      </Pressable>
    );
  }
);
NavigationMenuLink.displayName = "NavigationMenuLink";

// NavigationMenuViewport - Container for dropdown content (simplified for RN)
export interface NavigationMenuViewportProps extends ViewProps {
  children?: ReactNode;
  className?: string;
}

export const NavigationMenuViewport = forwardRef<View, NavigationMenuViewportProps>(
  ({ children, className = "", ...props }, ref) => {
    return (
      <View
        ref={ref}
        className={cn("absolute top-full left-0 w-full", className)}
        {...props}
      >
        {children}
      </View>
    );
  }
);
NavigationMenuViewport.displayName = "NavigationMenuViewport";

// NavigationMenuIndicator - Visual indicator (simplified for RN)
export interface NavigationMenuIndicatorProps extends ViewProps {
  className?: string;
}

export const NavigationMenuIndicator = forwardRef<View, NavigationMenuIndicatorProps>(
  ({ className = "", ...props }, ref) => {
    return (
      <View
        ref={ref}
        className={cn("h-0.5 bg-primary", className)}
        {...props}
      />
    );
  }
);
NavigationMenuIndicator.displayName = "NavigationMenuIndicator";`,
      },
    ],
  },

  text: {
    name: "Text",
    description: "A configurable Text component with font variant support.",
    dependencies: [],
    registryDependencies: ["utils"],
    files: [
      {
        path: "components/ui/text.tsx",
        content: `/**
 * Text Component
 *
 * A configurable Text component that works with Uniwind/Tailwind styling.
 * Supports font variants (bold, italic) via props or className.
 *
 * ## Configuration
 *
 * To customize fonts for your project, modify the FONTS and FONT_CLASSES
 * constants below to match your font setup.
 *
 * ## Usage
 *
 * \`\`\`tsx
 * import { Text } from "@/components/ui/text";
 *
 * <Text>Regular text</Text>
 * <Text bold>Bold text</Text>
 * <Text italic>Italic text</Text>
 * <Text bold italic>Bold italic text</Text>
 * <Text className="text-lg text-primary">Styled text</Text>
 * \`\`\`
 */

import {
  Text as RNText,
  Platform,
  type TextProps as RNTextProps,
  type StyleProp,
  type TextStyle,
} from "react-native";
import { forwardRef, useMemo, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Font Configuration
 *
 * Modify these to match your project's fonts:
 * - FONTS: The actual font family names (must match your font files)
 * - FONT_CLASSES: The Tailwind/Uniwind classes for each variant
 *
 * For Expo Go compatibility, fonts are applied via inline styles on native.
 * For web and dev builds, fonts are applied via className.
 */
const FONTS = {
  regular: "SpaceMono-Regular",
  bold: "SpaceMono-Bold",
  italic: "SpaceMono-Italic",
  boldItalic: "SpaceMono-BoldItalic",
} as const;

const FONT_CLASSES = {
  regular: "font-sans",
  bold: "font-sans-bold",
  italic: "font-sans-italic",
  boldItalic: "font-sans-bold-italic",
} as const;

type FontVariant = keyof typeof FONTS;

// Pre-computed platform check - evaluated once at module load
const IS_WEB = Platform.OS === "web";

// Pre-computed font styles for native platforms
const NATIVE_FONT_STYLES: Record<FontVariant, { fontFamily: string }> = {
  regular: { fontFamily: FONTS.regular },
  bold: { fontFamily: FONTS.bold },
  italic: { fontFamily: FONTS.italic },
  boldItalic: { fontFamily: FONTS.boldItalic },
};

export interface TextProps extends RNTextProps {
  children?: ReactNode;
  className?: string;
  /** Apply bold font variant */
  bold?: boolean;
  /** Apply italic font variant */
  italic?: boolean;
}

/**
 * Determines which font variant to use based on props
 */
function getFontVariant(bold?: boolean, italic?: boolean): FontVariant {
  if (bold && italic) return "boldItalic";
  if (bold) return "bold";
  if (italic) return "italic";
  return "regular";
}

export const Text = forwardRef<RNText, TextProps>(
  ({ children, className = "", style, bold, italic, ...props }, ref) => {
    const variant = getFontVariant(bold, italic);
    const fontClass = FONT_CLASSES[variant];

    // On native (iOS/Android), we need inline fontFamily for Expo Go compatibility
    // On web, className is sufficient. Platform check is pre-computed at module level.
    const platformStyle = useMemo((): StyleProp<TextStyle> => {
      if (IS_WEB) return style;
      return [NATIVE_FONT_STYLES[variant], style];
    }, [variant, style]);

    return (
      <RNText
        ref={ref}
        className={cn(fontClass, "text-foreground", className)}
        style={platformStyle}
        {...props}
      >
        {children}
      </RNText>
    );
  }
);

Text.displayName = "Text";`,
      },
    ],
  },

  utils: {
    name: "Utils",
    description: "Utility functions for className merging.",
    dependencies: ["clsx", "tailwind-merge"],
    registryDependencies: [],
    files: [
      {
        path: "lib/utils.ts",
        content: `import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`,
      },
    ],
  },
};

export function getRegistryItem(name: string): RegistryItem | undefined {
  return registry[name];
}

export function getAllComponents(): RegistryItem[] {
  return Object.values(registry).filter(
    (item) => item.name !== "Utils" // Exclude utils from component list
  );
}

// Hook to get a component from the registry
export function useComponent(name: string): RegistryItem {
  const component = registry[name];
  if (!component) {
    throw new Error(`Component "${name}" not found in registry`);
  }
  return component;
}
