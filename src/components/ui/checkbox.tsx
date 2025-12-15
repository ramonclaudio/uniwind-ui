/**
 * Checkbox Component
 *
 * A control that allows the user to toggle between checked and not checked.
 * Supports controlled/uncontrolled modes, indeterminate state, and custom icons.
 *
 * ## API Parity
 *
 * This component mirrors the Radix UI Checkbox API used by shadcn/ui:
 * - checked: boolean | "indeterminate"
 * - defaultChecked: boolean
 * - onCheckedChange: (checked: boolean | "indeterminate") => void
 * - disabled, required, name, value
 * - asChild: passes checkbox behavior to child element
 *
 * ## Dependencies
 *
 * - @/lib/utils (cn function)
 * - @expo/vector-icons (for default check/minus icons)
 *
 * ## Usage
 *
 * ```tsx
 * import { Checkbox } from "@/components/ui/checkbox";
 *
 * // Uncontrolled
 * <Checkbox defaultChecked onCheckedChange={(checked) => console.log(checked)} />
 *
 * // Controlled
 * <Checkbox checked={isChecked} onCheckedChange={setIsChecked} />
 *
 * // Indeterminate state
 * <Checkbox checked="indeterminate" onCheckedChange={handleChange} />
 *
 * // With custom icon
 * <Checkbox checkIcon={<CustomIcon />} />
 *
 * // With form props
 * <Checkbox name="terms" value="accepted" required />
 * ```
 */

import { Pressable, View, type PressableProps } from "react-native";
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
import { useCSSVariable } from "uniwind";
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
  /**
   * Custom check icon to display when checked.
   * Defaults to a checkmark icon.
   */
  checkIcon?: ReactNode;
  /**
   * Custom icon to display when indeterminate.
   * Defaults to a minus/dash icon.
   */
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
      "size-4 shrink-0 rounded-[4px] border border-input shadow-xs dark:bg-input/30",
      "web:outline-none web:transition-shadow web:focus-visible:border-ring web:focus-visible:ring-[3px] web:focus-visible:ring-ring/50",
      hasIndicator && "border-primary bg-primary text-primary-foreground dark:bg-primary",
      disabled && "web:cursor-not-allowed opacity-50",
      className
    );

    const iconColor = useCSSVariable("--color-primary-foreground") as string;

    const defaultCheckIcon = (
      <Ionicons name="checkmark" size={iconSize} color={iconColor} />
    );

    const defaultIndeterminateIcon = (
      <Ionicons name="remove" size={iconSize} color={iconColor} />
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

    const styledChildren = (child: ReactNode): ReactNode => {
      return child;
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
          {childProps.children && Children.map(childProps.children, styledChildren)}
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

export type { CheckedState as CheckboxCheckedState };
