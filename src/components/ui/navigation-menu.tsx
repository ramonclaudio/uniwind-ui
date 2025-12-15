/**
 * NavigationMenu Component
 *
 * A collection of links for navigating websites.
 * Responsive with automatic collapse into a "More" menu on smaller screens.
 *
 * ## Dependencies
 *
 * - @/lib/utils (cn function)
 * - @expo/vector-icons (for chevron icons)
 * - expo-router (for Link component)
 * - uniwind (for useCSSVariable)
 *
 * ## Usage
 *
 * ```tsx
 * import {
 *   NavigationMenu,
 *   NavigationMenuList,
 *   NavigationMenuItem,
 *   NavigationMenuTrigger,
 *   NavigationMenuContent,
 *   NavigationMenuLink,
 * } from "@/components/ui/navigation-menu";
 *
 * <NavigationMenu>
 *   <NavigationMenuList>
 *     <NavigationMenuItem value="item1">
 *       <NavigationMenuTrigger value="item1">Menu</NavigationMenuTrigger>
 *       <NavigationMenuContent value="item1">
 *         <NavigationMenuLink href="/page">Link</NavigationMenuLink>
 *       </NavigationMenuContent>
 *     </NavigationMenuItem>
 *   </NavigationMenuList>
 * </NavigationMenu>
 * ```
 */

import { View, Text as RNText, Pressable, Platform, useWindowDimensions, type ViewProps, type PressableProps, type LayoutChangeEvent, type GestureResponderEvent } from "react-native";
import { forwardRef, createContext, useContext, useState, useEffect, useRef, useCallback, cloneElement, isValidElement, Children, type ReactNode, type ReactElement } from "react";
import { cn } from "@/lib/utils";
import { Link, type Href } from "expo-router";
// To use a different icon library, change this import
import { Ionicons } from "@expo/vector-icons";
import { useCSSVariable } from "uniwind";

/**
 * Get the displayName of a React element's type (minification-safe)
 * Returns undefined for non-component types (strings, etc.)
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

/**
 * Type guard to check if a value is a ReactElement with specific props
 */
function isElementWithProps<P>(
  element: ReactNode,
  displayName: string
): element is ReactElement<P> {
  return (
    isValidElement(element) &&
    getDisplayName(element as ReactElement) === displayName
  );
}

// Context for managing active state
type NavigationMenuContextValue = {
  activeItem: string | null;
  setActiveItem: (item: string | null) => void;
};

const NavigationMenuContext = createContext<NavigationMenuContextValue>({
  activeItem: null,
  setActiveItem: () => {},
});

// Context for responsive collapse
type ResponsiveContextValue = {
  visibleCount: number;
  measurementComplete: boolean;
  registerItemWidth: (index: number, width: number) => void;
  registerExpectedCount: (count: number) => void;
  collapsedItems: ReactNode[];
  setCollapsedItems: (items: ReactNode[]) => void;
};

const ResponsiveContext = createContext<ResponsiveContextValue>({
  visibleCount: Infinity,
  measurementComplete: true,
  registerItemWidth: () => {},
  registerExpectedCount: () => {},
  collapsedItems: [],
  setCollapsedItems: () => {},
});

/**
 * Helper hook to get icon color from CSS variable
 * Uses useCSSVariable for efficient single subscription
 */
function useIconColor(): string {
  const color = useCSSVariable("--color-muted-foreground") as string;
  return color || "#888";
}

/**
 * Calculate how many items can fit in the available width
 * @param itemWidths - Map of item index to width
 * @param availableWidth - Total available container width
 * @param minVisibleItems - Minimum items to always show
 * @returns Number of items that can be visible
 */
function calculateVisibleCount(
  itemWidths: Map<number, number>,
  availableWidth: number,
  minVisibleItems: number
): number {
  const sortedWidths = Array.from(itemWidths.entries())
    .sort((a, b) => a[0] - b[0])
    .map(([, width]) => width);

  const overflowMenuWidth = 100; // Reserve space for "More" button
  const gap = 4; // gap-1 = 4px
  let remaining = availableWidth;
  let count = 0;

  for (let i = 0; i < sortedWidths.length; i++) {
    const width = sortedWidths[i];
    const remainingItems = sortedWidths.length - count - 1;
    const needsOverflowMenu = remainingItems > 0;
    const reservedWidth = needsOverflowMenu ? overflowMenuWidth + gap : 0;
    const gapWidth = count > 0 ? gap : 0;

    if (remaining - reservedWidth >= width + gapWidth) {
      remaining -= (width + gapWidth);
      count++;
    } else {
      break;
    }
  }

  return Math.max(count, minVisibleItems);
}

/**
 * ChevronIcon component that works with both web (className) and native (color prop)
 * To use a different icon library, change the Ionicons import at the top of this file
 */
function ChevronIcon({ direction, size = 12 }: { direction: "up" | "down"; size?: number }) {
  const color = useIconColor();
  return (
    <Ionicons
      name={direction === "up" ? "chevron-up" : "chevron-down"}
      size={size}
      color={color}
    />
  );
}

// NavigationMenu - Root container
export interface NavigationMenuProps extends ViewProps {
  children?: ReactNode;
  className?: string;
  /** Minimum number of items to always show (default: 1) */
  minVisibleItems?: number;
  /** Enable responsive collapse behavior (default: true) */
  responsive?: boolean;
}

export const NavigationMenu = forwardRef<View, NavigationMenuProps>(
  ({ children, className = "", minVisibleItems = 1, responsive = true, ...props }, ref) => {
    const [activeItem, setActiveItem] = useState<string | null>(null);
    const [containerWidth, setContainerWidth] = useState<number>(0);
    const [itemWidths, setItemWidths] = useState<Map<number, number>>(new Map());
    const [visibleCount, setVisibleCount] = useState<number>(Infinity); // Start showing all for measurement
    const [measurementComplete, setMeasurementComplete] = useState(false);
    const [collapsedItems, setCollapsedItems] = useState<ReactNode[]>([]);
    const [expectedItemCount, setExpectedItemCount] = useState<number>(0);
    const containerRef = useRef<View>(null);
    const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const { width: windowWidth } = useWindowDimensions();

    // Use window width as fallback if container width not measured
    const effectiveWidth = containerWidth > 0 ? containerWidth : windowWidth - 32; // 32px padding

    // Register item width for responsive calculation
    const registerItemWidth = useCallback((index: number, width: number) => {
      setItemWidths(prev => {
        const newMap = new Map(prev);
        newMap.set(index, width);
        return newMap;
      });
    }, []);

    // Track expected item count from children
    const registerExpectedCount = useCallback((count: number) => {
      setExpectedItemCount(count);
    }, []);

    // Calculate visible items based on container width
    useEffect(() => {
      if (!responsive) {
        setVisibleCount(Infinity);
        setMeasurementComplete(true);
        return;
      }

      // Wait until we have measurements for all expected items
      if (effectiveWidth === 0 || expectedItemCount === 0 || itemWidths.size < expectedItemCount) {
        return;
      }

      const newCount = calculateVisibleCount(itemWidths, effectiveWidth, minVisibleItems);
      setVisibleCount(newCount);
      setMeasurementComplete(true);
    }, [effectiveWidth, itemWidths, responsive, minVisibleItems, expectedItemCount]);

    // Recalculate when window/container size changes
    useEffect(() => {
      if (measurementComplete && responsive && itemWidths.size > 0) {
        setVisibleCount(calculateVisibleCount(itemWidths, effectiveWidth, minVisibleItems));
      }
    }, [effectiveWidth, measurementComplete, responsive, minVisibleItems, itemWidths]);

    // Handle container layout
    const handleLayout = useCallback((event: LayoutChangeEvent) => {
      const { width } = event.nativeEvent.layout;
      setContainerWidth(width);
    }, []);

    // Clear timeout on unmount
    useEffect(() => {
      return () => {
        if (closeTimeoutRef.current) {
          clearTimeout(closeTimeoutRef.current);
        }
      };
    }, []);

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

    // Delayed close to allow moving from trigger to content
    const handleMouseLeave = () => {
      closeTimeoutRef.current = setTimeout(() => {
        setActiveItem(null);
      }, 100);
    };

    // Cancel close when re-entering
    const handleMouseEnter = () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
        closeTimeoutRef.current = null;
      }
    };

    // Web hover props - close menu when mouse leaves the entire nav (with delay)
    const webHoverProps = Platform.OS === "web" ? {
      onMouseLeave: handleMouseLeave,
      onMouseEnter: handleMouseEnter,
    } : {};

    return (
      <NavigationMenuContext.Provider value={{ activeItem, setActiveItem }}>
        <ResponsiveContext.Provider value={{ visibleCount, measurementComplete, registerItemWidth, registerExpectedCount, collapsedItems, setCollapsedItems }}>
          <View
            ref={containerRef}
            className={cn("relative z-50 flex-1 w-full", className)}
            onLayout={handleLayout}
            {...webHoverProps}
            {...props}
          >
            {children}
          </View>
        </ResponsiveContext.Provider>
      </NavigationMenuContext.Provider>
    );
  }
);
NavigationMenu.displayName = "NavigationMenu";

// NavigationMenuList - Horizontal list of items
export interface NavigationMenuListProps extends ViewProps {
  children?: ReactNode;
  className?: string;
  /** Label for the overflow "More" menu (default: "More") */
  overflowLabel?: string;
}

export const NavigationMenuList = forwardRef<View, NavigationMenuListProps>(
  ({ children, className = "", overflowLabel = "More", ...props }, ref) => {
    const { visibleCount, measurementComplete, setCollapsedItems, registerExpectedCount } = useContext(ResponsiveContext);
    const { activeItem, setActiveItem } = useContext(NavigationMenuContext);
    const childArray = Children.toArray(children);

    // Resolve font family from CSS variable for native platforms
    const fontFamily = useCSSVariable("--font-sans") as string;
    const nativeFontStyle = Platform.OS !== "web" && fontFamily ? { fontFamily } : undefined;

    // Register expected item count for measurement
    useEffect(() => {
      registerExpectedCount(childArray.length);
    }, [childArray.length, registerExpectedCount]);

    // Separate visible and collapsed items
    const visibleItems = visibleCount === Infinity
      ? childArray
      : childArray.slice(0, visibleCount);
    const hiddenItems = visibleCount === Infinity
      ? []
      : childArray.slice(visibleCount);

    // Update collapsed items in context for external access
    // Only re-run when the count changes (not when items shuffle with same count)
    useEffect(() => {
      setCollapsedItems(hiddenItems);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hiddenItems.length, setCollapsedItems]);

    const hasOverflow = hiddenItems.length > 0;
    const overflowValue = "__overflow__";
    const isOverflowActive = activeItem === overflowValue;
    const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Close overflow menu with optional delay
    const closeOverflow = useCallback(() => setActiveItem(null), [setActiveItem]);

    // Delayed close for hover - allows moving between trigger and dropdown
    const scheduleClose = useCallback(() => {
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = setTimeout(() => {
        closeOverflow();
      }, 150);
    }, [closeOverflow]);

    // Cancel scheduled close
    const cancelClose = useCallback(() => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
        closeTimeoutRef.current = null;
      }
    }, []);

    // Open overflow and cancel any pending close
    const openOverflow = useCallback(() => {
      cancelClose();
      setActiveItem(overflowValue);
    }, [cancelClose, setActiveItem, overflowValue]);

    // Cleanup timeout on unmount
    useEffect(() => {
      return () => {
        if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
      };
    }, []);

    // Web hover props for overflow menu - uses delayed close
    const webHoverProps = Platform.OS === "web" ? {
      onMouseEnter: openOverflow,
      onMouseLeave: scheduleClose,
    } : {};

    // During measurement phase, render all items invisibly
    // Only measuring if visibleCount is Infinity AND measurement is not complete
    const isMeasuring = visibleCount === Infinity && childArray.length > 0 && !measurementComplete;

    return (
      <View
        ref={ref}
        className={cn(
          "flex-row items-center gap-1 flex-1",
          // Only clip overflow during measurement to prevent flash
          // After measurement, allow dropdowns to overflow
          isMeasuring && "overflow-hidden",
          className
        )}
        style={isMeasuring ? { opacity: 0, height: 40 } : undefined}
        {...props}
      >
        {/* During measurement, render all items; after, render only visible */}
        {(isMeasuring ? childArray : visibleItems).map((child, index) => {
          if (isValidElement(child)) {
            return cloneElement(child as ReactElement<NavigationMenuItemProps>, {
              key: child.key ?? index,
              __itemIndex: index,
            });
          }
          return child;
        })}

        {/* Overflow "More" menu for collapsed items - only show after measurement */}
        {hasOverflow && !isMeasuring && (
          <View className="relative" {...webHoverProps}>
            <Pressable
              onPress={() => setActiveItem(isOverflowActive ? null : overflowValue)}
              className={cn(
                "flex-row items-center gap-1 px-4 py-2 rounded-md",
                isOverflowActive ? "bg-accent" : "bg-transparent",
                "active:bg-accent"
              )}
            >
              <RNText className="font-sans text-sm text-foreground" style={nativeFontStyle}>{overflowLabel}</RNText>
              <ChevronIcon direction={isOverflowActive ? "up" : "down"} size={12} />
            </Pressable>

            {/* Overflow dropdown content */}
            {isOverflowActive && (
              <View
                className={cn(
                  "absolute top-full right-0 mt-1 min-w-[180px]",
                  "bg-popover text-popover-foreground border border-border rounded-md p-2",
                  "ios:shadow-lg android:elevation-8 web:shadow-lg"
                )}
                style={{ zIndex: 51 }}
                onStartShouldSetResponder={() => true}
              >
                {hiddenItems.map((child, index) => {
                  // Extract the content from NavigationMenuItem for the overflow menu
                  if (!isValidElement(child)) return null;

                  const itemProps = child.props as NavigationMenuItemProps;
                  const itemChildren = Children.toArray(itemProps.children);

                  // Find trigger and content in the item
                  let triggerLabel: ReactNode = null;
                  let contentChildren: ReactNode[] = [];
                  let hasSubContent = false;
                  let itemValue = itemProps.value;

                  itemChildren.forEach((itemChild) => {
                    if (!isValidElement(itemChild)) return;

                    const displayName = getDisplayName(itemChild);

                    if (displayName === "NavigationMenuTrigger") {
                      triggerLabel = (itemChild.props as NavigationMenuTriggerProps).children;
                      hasSubContent = true;
                    } else if (displayName === "NavigationMenuContent") {
                      contentChildren = Children.toArray((itemChild.props as NavigationMenuContentProps).children);
                    } else if (displayName === "NavigationMenuLink") {
                      // Direct link without submenu
                      triggerLabel = (itemChild.props as NavigationMenuLinkProps).children;
                      itemValue = undefined; // No submenu
                    }
                  });

                  // Render as expandable submenu or direct link
                  if (hasSubContent && contentChildren.length > 0) {
                    return (
                      <OverflowSubmenu
                        key={index}
                        label={triggerLabel}
                        value={itemValue || `overflow-${index}`}
                      >
                        {contentChildren}
                      </OverflowSubmenu>
                    );
                  } else {
                    // Direct link item
                    const linkChild = itemChildren.find((c): c is ReactElement<NavigationMenuLinkProps> =>
                      isElementWithProps<NavigationMenuLinkProps>(c, "NavigationMenuLink")
                    );

                    if (linkChild) {
                      const originalOnPress = linkChild.props.onPress;
                      return cloneElement(linkChild, {
                        key: index,
                        className: cn("px-3 py-2 rounded", linkChild.props.className),
                        onPress: (e: GestureResponderEvent) => {
                          originalOnPress?.(e);
                          closeOverflow();
                        },
                      });
                    }
                  }
                  return null;
                })}
              </View>
            )}
          </View>
        )}
      </View>
    );
  }
);
NavigationMenuList.displayName = "NavigationMenuList";

// Internal component for overflow submenu items
interface OverflowSubmenuProps {
  label: ReactNode;
  value: string;
  children: ReactNode[];
}

const OverflowSubmenu = ({ label, value, children }: OverflowSubmenuProps) => {
  const [expanded, setExpanded] = useState(false);
  const { setActiveItem } = useContext(NavigationMenuContext);

  // Resolve font family from CSS variable for native platforms
  const fontFamily = useCSSVariable("--font-sans") as string;
  const nativeFontStyle = Platform.OS !== "web" && fontFamily ? { fontFamily } : undefined;

  const handlePress = () => {
    setExpanded(!expanded);
  };

  const handleLinkPress = () => {
    setExpanded(false);
    setActiveItem(null);
  };

  return (
    <View>
      <Pressable
        onPress={handlePress}
        className={cn(
          "flex-row items-center justify-between px-3 py-2 rounded",
          expanded ? "bg-accent" : "bg-transparent",
          "active:bg-accent"
        )}
      >
        {typeof label === "string" ? (
          <RNText className="font-sans text-sm text-popover-foreground" style={nativeFontStyle}>{label}</RNText>
        ) : (
          label
        )}
        <ChevronIcon direction={expanded ? "up" : "down"} size={12} />
      </Pressable>

      {expanded && (
        <View className="pl-3 border-l border-border ml-3 mt-1">
          {children.map((child, idx) => {
            if (isValidElement(child)) {
              const childProps = child.props as { onPress?: (e: unknown) => void };
              return cloneElement(child as ReactElement<{ onPress?: (e: unknown) => void }>, {
                key: idx,
                onPress: (e: unknown) => {
                  childProps.onPress?.(e);
                  handleLinkPress();
                },
              });
            }
            return child;
          })}
        </View>
      )}
    </View>
  );
};

// NavigationMenuItem - Individual menu item wrapper
export interface NavigationMenuItemProps extends ViewProps {
  children?: ReactNode;
  className?: string;
  value?: string;
  /** @internal Used for width measurement */
  __itemIndex?: number;
}

export const NavigationMenuItem = forwardRef<View, NavigationMenuItemProps>(
  ({ children, className = "", value, __itemIndex, ...props }, ref) => {
    const { setActiveItem } = useContext(NavigationMenuContext);
    const { registerItemWidth } = useContext(ResponsiveContext);

    // Measure item width for responsive calculation
    const handleLayout = useCallback((event: LayoutChangeEvent) => {
      if (__itemIndex !== undefined) {
        const { width } = event.nativeEvent.layout;
        registerItemWidth(__itemIndex, width);
      }
    }, [__itemIndex, registerItemWidth]);

    // Web hover props - when hovering this item, set it as active (or close if no value)
    const webHoverProps = Platform.OS === "web" ? {
      onMouseEnter: () => setActiveItem(value || null),
    } : {};

    return (
      <View
        ref={ref}
        className={cn("relative", className)}
        onLayout={handleLayout}
        {...webHoverProps}
        {...props}
      >
        {children}
      </View>
    );
  }
);
NavigationMenuItem.displayName = "NavigationMenuItem";

/**
 * Exported trigger styles for use with custom trigger implementations
 * Matches shadcn's navigationMenuTriggerStyle export
 */
export const navigationMenuTriggerStyle =
  "h-9 flex-row items-center justify-center gap-1 rounded-md bg-background px-4 py-2 text-sm font-medium web:transition-shadow web:outline-none web:focus-visible:ring-[3px] web:focus-visible:ring-ring/50 web:hover:bg-accent web:hover:text-accent-foreground active:bg-accent";

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
    const [iconDirection, setIconDirection] = useState<"up" | "down">("down");

    // Resolve font family from CSS variable for native platforms
    const fontFamily = useCSSVariable("--font-sans") as string;
    const nativeFontStyle = Platform.OS !== "web" && fontFamily ? { fontFamily } : undefined;

    // Delay icon animation after menu state changes
    useEffect(() => {
      const timeout = setTimeout(() => {
        setIconDirection(isActive ? "up" : "down");
      }, 150);
      return () => clearTimeout(timeout);
    }, [isActive]);

    const handlePress = (e: GestureResponderEvent) => {
      if (value) {
        setActiveItem(isActive ? null : value);
      }
      onPress?.(e);
    };

    // Web hover props - open menu on hover
    const webHoverProps = Platform.OS === "web" ? {
      onMouseEnter: () => value && setActiveItem(value),
    } : {};

    return (
      <Pressable
        ref={ref}
        onPress={handlePress}
        className={cn(
          "h-9 flex-row items-center justify-center gap-1 rounded-md bg-background px-4 py-2 text-sm font-medium",
          "web:transition-shadow web:outline-none web:focus-visible:ring-[3px] web:focus-visible:ring-ring/50",
          isActive ? "bg-accent/50" : "web:hover:bg-accent web:hover:text-accent-foreground",
          "active:bg-accent",
          className
        )}
        {...webHoverProps}
        {...props}
      >
        {typeof children === "string" ? (
          <RNText className="font-sans text-sm text-foreground" style={nativeFontStyle}>{children}</RNText>
        ) : (
          children
        )}
        <ChevronIcon direction={iconDirection} size={12} />
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
    const { activeItem, setActiveItem } = useContext(NavigationMenuContext);
    const isVisible = value ? activeItem === value : true;

    if (!isVisible) return null;

    return (
      <>
        {/* Backdrop to close menu on touch outside (mobile only) */}
        {Platform.OS !== "web" && (
          <Pressable
            onPress={() => setActiveItem(null)}
            style={{
              position: "absolute",
              top: -1000,
              left: -1000,
              right: -1000,
              bottom: -1000,
              zIndex: 40,
            }}
          />
        )}
        <View
          ref={ref}
          className={cn(
            "absolute top-full left-0 mt-1.5 min-w-[220px]",
            "bg-popover text-popover-foreground border border-border rounded-md p-2 z-50",
            "ios:shadow-lg android:elevation-8 web:shadow-lg",
            className
          )}
          {...props}
        >
          {children}
        </View>
      </>
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
  href?: Href;
}

export const NavigationMenuLink = forwardRef<View, NavigationMenuLinkProps>(
  ({ children, className = "", active = false, asChild = false, href, onPress, ...props }, ref) => {
    const { setActiveItem } = useContext(NavigationMenuContext);
    const [isHovered, setIsHovered] = useState(false);

    // Resolve font family from CSS variable for native platforms
    const fontFamily = useCSSVariable("--font-sans") as string;
    const nativeFontStyle = Platform.OS !== "web" && fontFamily ? { fontFamily } : undefined;

    const handlePress: PressableProps["onPress"] = (e) => {
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
        return <RNText className="font-sans text-sm text-popover-foreground" style={nativeFontStyle}>{children}</RNText>;
      }
      return children;
    };

    const linkClassName = cn(
      "flex-col gap-1 rounded-sm p-2 text-sm",
      "web:transition-all web:outline-none web:focus-visible:ring-[3px] web:focus-visible:ring-ring/50",
      (active || isHovered) ? "bg-accent text-accent-foreground" : "web:hover:bg-accent web:hover:text-accent-foreground",
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

    // Helper to style children with RNText for fonts
    const styledChildren = (child: ReactNode): ReactNode => {
      if (typeof child === "string") {
        return <RNText className="font-sans text-sm text-popover-foreground" style={nativeFontStyle}>{child}</RNText>;
      }
      return child;
    };

    // If asChild, clone the child element with className
    // Wrap children in a View to ensure flex layout works regardless of the
    // parent element (e.g., Link on web doesn't always support flex properly)
    if (asChild && isValidElement(children)) {
      const childProps = children.props as { className?: string; children?: ReactNode };

      const wrappedChildren = childProps.children ? (
        <View className="flex-row items-center gap-2">
          {Children.map(childProps.children, styledChildren)}
        </View>
      ) : undefined;

      return cloneElement(children as ReactElement<{ className?: string; onPress?: PressableProps["onPress"]; children?: ReactNode }>, {
        className: cn(linkClassName, childProps.className),
        onPress: handlePress,
        ...webHoverProps,
        children: wrappedChildren,
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
NavigationMenuIndicator.displayName = "NavigationMenuIndicator";
