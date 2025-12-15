/**
 * Select Component
 *
 * Displays a list of options for the user to pick from.
 * A shadcn/ui API-compatible Select for React Native.
 *
 * ## shadcn API Parity
 *
 * This component mirrors shadcn/ui's Select API exactly:
 * - Select, SelectTrigger, SelectValue, SelectContent
 * - SelectItem, SelectGroup, SelectLabel, SelectSeparator
 *
 * Under the hood, it uses react-native-dropdown-picker for native
 * platform rendering while maintaining the declarative shadcn API.
 *
 * ## Dependencies
 *
 * - @/lib/utils (cn function)
 * - react-native-dropdown-picker
 * - uniwind (for useCSSVariable and useUniwind theme integration)
 *
 * ## Usage
 *
 * ```tsx
 * import {
 *   Select,
 *   SelectTrigger,
 *   SelectValue,
 *   SelectContent,
 *   SelectItem,
 * } from "@/components/ui/select";
 *
 * <Select value={value} onValueChange={setValue}>
 *   <SelectTrigger>
 *     <SelectValue placeholder="Select an option" />
 *   </SelectTrigger>
 *   <SelectContent>
 *     <SelectItem value="1">Option 1</SelectItem>
 *     <SelectItem value="2">Option 2</SelectItem>
 *   </SelectContent>
 * </Select>
 * ```
 */

import { View, Text, Pressable, Platform, type ViewProps, type TextProps } from "react-native";
import DropDownPicker, {
  type ItemType,
  type RenderListItemPropsInterface,
} from "react-native-dropdown-picker";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  forwardRef,
  Children,
  isValidElement,
  type ReactNode,
  type ReactElement,
} from "react";
import { cn } from "@/lib/utils";
import { useCSSVariable, useUniwind } from "uniwind";

const FONT_FAMILY: string | undefined = "SpaceMono-Regular";

interface SelectItemData {
  value: string;
  label: string;
  disabled?: boolean;
  parent?: string;
  selectable?: boolean;
}

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

/**
 * Get the displayName of a React element's type (minification-safe)
 */
function getDisplayName(element: ReactElement): string | undefined {
  const type = element.type;
  // Handle regular function components
  if (typeof type === "function") {
    return (type as { displayName?: string }).displayName;
  }
  // Handle forwardRef components (they're objects with displayName)
  if (typeof type === "object" && type !== null) {
    return (type as { displayName?: string }).displayName;
  }
  return undefined;
}

function extractItems(children: ReactNode, parentValue?: string): SelectItemData[] {
  const items: SelectItemData[] = [];

  Children.forEach(children, (child) => {
    if (!isValidElement(child)) return;

    const displayName = getDisplayName(child);

    if (displayName === "SelectItem") {
      const props = child.props as SelectItemProps;
      const label =
        typeof props.children === "string"
          ? props.children
          : String(props.value);
      items.push({
        value: props.value,
        label,
        disabled: props.disabled,
        parent: parentValue,
        selectable: true,
      });
    } else if (displayName === "SelectGroup") {
      const groupProps = child.props as SelectGroupProps;
      // Find the SelectLabel within the group
      let groupLabel: string | undefined;
      Children.forEach(groupProps.children, (groupChild) => {
        if (isValidElement(groupChild)) {
          const childDisplayName = getDisplayName(groupChild);
          if (childDisplayName === "SelectLabel") {
            const labelProps = groupChild.props as SelectLabelProps;
            groupLabel =
              typeof labelProps.children === "string"
                ? labelProps.children
                : undefined;
          }
        }
      });

      if (groupLabel) {
        const categoryValue = `__category_${groupLabel}`;
        items.push({
          value: categoryValue,
          label: groupLabel,
          selectable: false,
        });
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
  const [internalValue, setInternalValue] = useState<string | null>(
    defaultValue || null
  );
  const [internalOpen, setInternalOpen] = useState(false);
  const [, setItems] = useState<SelectItemData[]>([]);
  const [placeholder, setPlaceholder] = useState("Select...");

  const isControlled = controlledValue !== undefined;
  const isOpenControlled = controlledOpen !== undefined;

  const value = isControlled ? controlledValue || null : internalValue;
  const open = isOpenControlled ? controlledOpen : internalOpen;

  const onValueChange = (newValue: string | null) => {
    if (!isControlled) {
      setInternalValue(newValue);
    }
    if (newValue !== null) {
      controlledOnValueChange?.(newValue);
    }
  };

  const setOpen = (newOpen: boolean) => {
    if (!isOpenControlled) {
      setInternalOpen(newOpen);
    }
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
      value={{
        open,
        setOpen,
        value,
        onValueChange,
        disabled,
        items: extractedItems,
        registerItem,
        placeholder,
        setPlaceholder,
      }}
    >
      {children}
    </SelectContext.Provider>
  );
}

Select.displayName = "Select";

export interface SelectTriggerProps extends Omit<ViewProps, "children"> {
  children?: ReactNode;
  className?: string;
}

export const SelectTrigger = forwardRef<View, SelectTriggerProps>(
  ({ children, className = "", ...props }, ref) => {
    const {
      open,
      setOpen,
      value,
      onValueChange,
      disabled,
      items,
      placeholder,
    } = useSelectContext();

    // Get current theme to force DropDownPicker re-render on theme change
    const { theme } = useUniwind();

    // Use useCSSVariable with array for efficient single subscription
    // This automatically updates when theme changes
    const [
      card,
      foreground,
      popover,
      popoverForeground,
      border,
      inputBorder,
      mutedForeground,
      accent,
      accentForeground,
    ] = useCSSVariable([
      "--color-card",
      "--color-foreground",
      "--color-popover",
      "--color-popover-foreground",
      "--color-border",
      "--color-input",
      "--color-muted-foreground",
      "--color-accent",
      "--color-accent-foreground",
    ]) as string[];

    const fontFamily = FONT_FAMILY;

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
          <View
            style={{
              paddingVertical: 6,
              paddingHorizontal: 8,
            }}
          >
            <Text
              style={{
                color: mutedForeground,
                fontWeight: "400",
                fontSize: 12,
                fontFamily: fontFamily,
              }}
            >
              {item.label}
            </Text>
          </View>
        );
      }

      return (
        <Pressable
          onPress={() => {
            (onPress as (item: ItemType<string>) => void)(item);
            setOpen(false);
          }}
          disabled={itemDisabled}
          style={(state) => {
            const { pressed } = state;
            const hovered = (state as { hovered?: boolean }).hovered ?? false;
            const isHighlighted = pressed || hovered || isSelected;
            return {
              flexDirection: "row",
              alignItems: "center",
              paddingVertical: 6,
              paddingLeft: 8,
              paddingRight: 32,
              marginHorizontal: 4,
              marginVertical: 1,
              borderRadius: 2,
              backgroundColor: isHighlighted ? accent : "transparent",
              opacity: itemDisabled ? 0.5 : 1,
            };
          }}
        >
          <Text
            style={{
              color: popoverForeground,
              fontSize: 14,
              fontWeight: "400",
              fontFamily: fontFamily,
              flex: 1,
            }}
          >
            {item.label}
          </Text>
          {isSelected && (
            <View
              style={{
                position: "absolute",
                right: 8,
                width: 14,
                height: 14,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontSize: 12, color: popoverForeground, fontFamily: fontFamily }}>✓</Text>
            </View>
          )}
        </Pressable>
      );
    };

    const containerRef = useRef<View>(null);

    useEffect(() => {
      if (Platform.OS !== "web" || !open) return;

      const handleClickOutside = (event: MouseEvent) => {
        const container = containerRef.current as unknown as HTMLElement;
        if (container && !container.contains(event.target as Node)) {
          setOpen(false);
        }
      };

      // Add listener with a small delay to avoid immediate close
      const timeoutId = setTimeout(() => {
        document.addEventListener("mousedown", handleClickOutside);
      }, 0);

      return () => {
        clearTimeout(timeoutId);
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [open, setOpen]);

    return (
      <View ref={containerRef} className={cn("z-50", className)} {...props}>
        {children}
        <DropDownPicker
          key={`dropdown-${theme}`}
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
          scrollViewProps={{
            nestedScrollEnabled: true,
            contentContainerStyle: {
              paddingVertical: 4,
            },
          }}
          dropDownDirection="AUTO"
          bottomOffset={100}
          categorySelectable={false}
          zIndex={5000}
          zIndexInverse={4000}
          style={{
            backgroundColor: card,
            borderColor: inputBorder,
            borderWidth: 1,
            borderRadius: 6,
            minHeight: 36,
            paddingHorizontal: 12,
            paddingVertical: 8,
            opacity: disabled ? 0.5 : 1,
          }}
          dropDownContainerStyle={{
            backgroundColor: popover,
            borderColor: border,
            borderWidth: 1,
            borderRadius: 6,
            marginTop: 4,
            overflow: "hidden",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 4,
          }}
          textStyle={{
            color: foreground,
            fontSize: 14,
            fontWeight: "normal",
            fontFamily: fontFamily,
          }}
          placeholderStyle={{
            color: mutedForeground,
            fontWeight: "normal",
            fontFamily: fontFamily,
          }}
          labelStyle={{
            color: foreground,
            fontWeight: "normal",
            fontFamily: fontFamily,
          }}
          listItemLabelStyle={{
            color: popoverForeground,
            fontWeight: "normal",
            fontFamily: fontFamily,
          }}
          listParentLabelStyle={{
            color: mutedForeground,
            fontWeight: "400",
            fontSize: 12,
            fontFamily: fontFamily,
          }}
          listParentContainerStyle={{
            paddingVertical: 8,
            paddingHorizontal: 8,
          }}
          selectedItemContainerStyle={{
            backgroundColor: accent,
          }}
          selectedItemLabelStyle={{
            color: accentForeground,
            fontFamily: fontFamily,
          }}
          disabledItemLabelStyle={{
            color: mutedForeground,
            opacity: 0.5,
            fontFamily: fontFamily,
          }}
          listItemContainerStyle={{
            paddingVertical: 6,
            paddingHorizontal: 8,
          }}
          ArrowDownIconComponent={() => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Text style={{ fontSize: 12, color: mutedForeground, fontFamily: fontFamily, transform: [{ rotate: "180deg" }, { translateY: 1 }] }}>⌃</Text>
            </View>
          )}
          ArrowUpIconComponent={() => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Text style={{ fontSize: 12, color: mutedForeground, fontFamily: fontFamily, transform: [{ rotate: "180deg" }, { translateY: 1 }] }}>⌃</Text>
            </View>
          )}
          showArrowIcon={true}
          renderListItem={renderListItem}
        />
      </View>
    );
  }
);

SelectTrigger.displayName = "SelectTrigger";

export interface SelectValueProps extends Omit<TextProps, "children"> {
  placeholder?: string;
  className?: string;
}

export const SelectValue = forwardRef<Text, SelectValueProps>(
  ({ placeholder = "Select...", className = "", ...props }, ref) => {
    const { setPlaceholder } = useSelectContext();

    useEffect(() => {
      setPlaceholder(placeholder);
    }, [placeholder, setPlaceholder]);

    return null;
  }
);

SelectValue.displayName = "SelectValue";

export interface SelectContentProps extends ViewProps {
  children?: ReactNode;
  className?: string;
  position?: "popper" | "item-aligned";
}

/**
 * SelectContent is a declarative marker component.
 * It doesn't render anything - its children are extracted by the Select
 * parent and passed to DropDownPicker for native rendering.
 * This pattern maintains shadcn/ui API compatibility.
 */
export const SelectContent = forwardRef<View, SelectContentProps>(
  (_props, _ref) => null
);

SelectContent.displayName = "SelectContent";

export interface SelectItemProps extends ViewProps {
  children: ReactNode;
  value: string;
  disabled?: boolean;
  className?: string;
}

/**
 * SelectItem is a declarative marker component.
 * It doesn't render - its value/label are extracted by the Select
 * parent and rendered via DropDownPicker's native list.
 */
export const SelectItem = forwardRef<View, SelectItemProps>(
  (_props, _ref) => null
);

SelectItem.displayName = "SelectItem";

export interface SelectGroupProps extends ViewProps {
  children?: ReactNode;
  className?: string;
}

/**
 * SelectGroup is a declarative marker component for grouping items.
 * Its children are extracted and grouped in the native dropdown.
 */
export const SelectGroup = forwardRef<View, SelectGroupProps>(
  (_props, _ref) => null
);

SelectGroup.displayName = "SelectGroup";

export interface SelectLabelProps extends TextProps {
  children?: ReactNode;
  className?: string;
}

/**
 * SelectLabel is a declarative marker for group labels.
 * The label text is extracted and displayed as a category header.
 */
export const SelectLabel = forwardRef<Text, SelectLabelProps>(
  (_props, _ref) => null
);

SelectLabel.displayName = "SelectLabel";

export interface SelectSeparatorProps extends ViewProps {
  className?: string;
}

/**
 * SelectSeparator is a declarative marker for visual separation.
 * Currently a no-op as DropDownPicker handles its own visual structure.
 */
export const SelectSeparator = forwardRef<View, SelectSeparatorProps>(
  (_props, _ref) => null
);

SelectSeparator.displayName = "SelectSeparator";

export interface SelectScrollButtonProps extends ViewProps {
  className?: string;
}

/**
 * SelectScrollUpButton is a declarative marker (no-op).
 * DropDownPicker handles scroll behavior natively.
 */
export const SelectScrollUpButton = forwardRef<View, SelectScrollButtonProps>(
  (_props, _ref) => null
);

SelectScrollUpButton.displayName = "SelectScrollUpButton";

/**
 * SelectScrollDownButton is a declarative marker (no-op).
 * DropDownPicker handles scroll behavior natively.
 */
export const SelectScrollDownButton = forwardRef<View, SelectScrollButtonProps>(
  (_props, _ref) => null
);

SelectScrollDownButton.displayName = "SelectScrollDownButton";
