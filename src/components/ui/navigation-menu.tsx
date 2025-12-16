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
import { Ionicons } from "@expo/vector-icons";
import { useCSSVariable } from "uniwind";

function getDisplayName(element: ReactElement): string | undefined {
  const type = element.type;
  if (typeof type === "function") {
    return (type as { displayName?: string }).displayName;
  }
  if (typeof type === "object" && type !== null) {
    return (type as { displayName?: string }).displayName;
  }
  return undefined;
}

function isElementWithProps<P>(
  element: ReactNode,
  displayName: string
): element is ReactElement<P> {
  return (
    isValidElement(element) &&
    getDisplayName(element as ReactElement) === displayName
  );
}

type NavigationMenuContextValue = {
  activeItem: string | null;
  setActiveItem: (item: string | null) => void;
};

const NavigationMenuContext = createContext<NavigationMenuContextValue>({
  activeItem: null,
  setActiveItem: () => {},
});

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

function useIconColor(): string {
  const color = useCSSVariable("--color-muted-foreground") as string;
  return color;
}

function usePopoverColors() {
  const [popoverBg, borderColor] = useCSSVariable([
    "--color-popover",
    "--color-border",
  ]) as string[];
  return { popoverBg, borderColor };
}

function calculateVisibleCount(
  itemWidths: Map<number, number>,
  availableWidth: number,
  minVisibleItems: number
): number {
  const sortedWidths = Array.from(itemWidths.entries())
    .sort((a, b) => a[0] - b[0])
    .map(([, width]) => width);

  const overflowMenuWidth = 100;
  const gap = 4;
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
    const [visibleCount, setVisibleCount] = useState<number>(Infinity);
    const [measurementComplete, setMeasurementComplete] = useState(false);
    const [collapsedItems, setCollapsedItems] = useState<ReactNode[]>([]);
    const [expectedItemCount, setExpectedItemCount] = useState<number>(0);
    const containerRef = useRef<View>(null);
    const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const { width: windowWidth } = useWindowDimensions();

    const effectiveWidth = containerWidth > 0 ? containerWidth : windowWidth - 32;

    const registerItemWidth = useCallback((index: number, width: number) => {
      setItemWidths(prev => {
        const newMap = new Map(prev);
        newMap.set(index, width);
        return newMap;
      });
    }, []);

    const registerExpectedCount = useCallback((count: number) => {
      setExpectedItemCount(count);
    }, []);

    useEffect(() => {
      if (!responsive) {
        setVisibleCount(Infinity);
        setMeasurementComplete(true);
        return;
      }

      if (effectiveWidth === 0 || expectedItemCount === 0 || itemWidths.size < expectedItemCount) {
        return;
      }

      const newCount = calculateVisibleCount(itemWidths, effectiveWidth, minVisibleItems);
      setVisibleCount(newCount);
      setMeasurementComplete(true);
    }, [effectiveWidth, itemWidths, responsive, minVisibleItems, expectedItemCount]);

    useEffect(() => {
      if (measurementComplete && responsive && itemWidths.size > 0) {
        setVisibleCount(calculateVisibleCount(itemWidths, effectiveWidth, minVisibleItems));
      }
    }, [effectiveWidth, measurementComplete, responsive, minVisibleItems, itemWidths]);

    const handleLayout = useCallback((event: LayoutChangeEvent) => {
      const { width } = event.nativeEvent.layout;
      setContainerWidth(width);
    }, []);

    useEffect(() => {
      return () => {
        if (closeTimeoutRef.current) {
          clearTimeout(closeTimeoutRef.current);
        }
      };
    }, []);

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

    const handleMouseLeave = () => {
      closeTimeoutRef.current = setTimeout(() => {
        setActiveItem(null);
      }, 100);
    };

    const handleMouseEnter = () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
        closeTimeoutRef.current = null;
      }
    };

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

    const rawFontFamily = useCSSVariable("--font-sans") as string;
    const fontFamily = rawFontFamily?.split(",")[0]?.trim()?.replace(/^["']|["']$/g, "");
    const nativeFontStyle = Platform.OS !== "web" && fontFamily ? { fontFamily } : undefined;

    useEffect(() => {
      registerExpectedCount(childArray.length);
    }, [childArray.length, registerExpectedCount]);

    const visibleItems = visibleCount === Infinity
      ? childArray
      : childArray.slice(0, visibleCount);
    const hiddenItems = visibleCount === Infinity
      ? []
      : childArray.slice(visibleCount);

    useEffect(() => {
      setCollapsedItems(hiddenItems);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hiddenItems.length, setCollapsedItems]);

    const hasOverflow = hiddenItems.length > 0;
    const overflowValue = "__overflow__";
    const isOverflowActive = activeItem === overflowValue;
    const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const closeOverflow = useCallback(() => setActiveItem(null), [setActiveItem]);

    const scheduleClose = useCallback(() => {
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = setTimeout(() => {
        closeOverflow();
      }, 150);
    }, [closeOverflow]);

    const cancelClose = useCallback(() => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
        closeTimeoutRef.current = null;
      }
    }, []);

    const openOverflow = useCallback(() => {
      cancelClose();
      setActiveItem(overflowValue);
    }, [cancelClose, setActiveItem, overflowValue]);

    useEffect(() => {
      return () => {
        if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
      };
    }, []);

    const webHoverProps = Platform.OS === "web" ? {
      onMouseEnter: openOverflow,
      onMouseLeave: scheduleClose,
    } : {};

    const isMeasuring = visibleCount === Infinity && childArray.length > 0 && !measurementComplete;

    return (
      <View
        ref={ref}
        className={cn(
          "flex-row items-center gap-1 flex-1",
          isMeasuring && "overflow-hidden",
          className
        )}
        style={isMeasuring ? { opacity: 0, height: 40 } : undefined}
        {...props}
      >
        {(isMeasuring ? childArray : visibleItems).map((child, index) => {
          if (isValidElement(child)) {
            return cloneElement(child as ReactElement<NavigationMenuItemProps>, {
              key: child.key ?? index,
              __itemIndex: index,
            });
          }
          return child;
        })}

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
                  if (!isValidElement(child)) return null;

                  const itemProps = child.props as NavigationMenuItemProps;
                  const itemChildren = Children.toArray(itemProps.children);

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
                      triggerLabel = (itemChild.props as NavigationMenuLinkProps).children;
                      itemValue = undefined;
                    }
                  });

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

interface OverflowSubmenuProps {
  label: ReactNode;
  value: string;
  children: ReactNode[];
}

const OverflowSubmenu = ({ label, value, children }: OverflowSubmenuProps) => {
  const [expanded, setExpanded] = useState(false);
  const { setActiveItem } = useContext(NavigationMenuContext);

  const rawFontFamily = useCSSVariable("--font-sans") as string;
  const fontFamily = rawFontFamily?.split(",")[0]?.trim()?.replace(/^["']|["']$/g, "");
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

    const handleLayout = useCallback((event: LayoutChangeEvent) => {
      if (__itemIndex !== undefined) {
        const { width } = event.nativeEvent.layout;
        registerItemWidth(__itemIndex, width);
      }
    }, [__itemIndex, registerItemWidth]);

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

export const navigationMenuTriggerStyle =
  "h-9 flex-row items-center justify-center gap-1 rounded-md bg-background px-4 py-2 text-sm font-medium web:transition-shadow web:outline-none web:focus-visible:ring-[3px] web:focus-visible:ring-ring/50 web:hover:bg-accent web:hover:text-accent-foreground active:bg-accent";

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

    const rawFontFamily = useCSSVariable("--font-sans") as string;
    const fontFamily = rawFontFamily?.split(",")[0]?.trim()?.replace(/^["']|["']$/g, "");
    const nativeFontStyle = Platform.OS !== "web" && fontFamily ? { fontFamily } : undefined;

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

    const rawFontFamily = useCSSVariable("--font-sans") as string;
    const fontFamily = rawFontFamily?.split(",")[0]?.trim()?.replace(/^["']|["']$/g, "");
    const nativeFontStyle = Platform.OS !== "web" && fontFamily ? { fontFamily } : undefined;

    const handlePress: PressableProps["onPress"] = (e) => {
      setIsHovered(false);
      setActiveItem(null);
      onPress?.(e);
    };

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

    const styledChildren = (child: ReactNode): ReactNode => {
      if (typeof child === "string") {
        return <RNText className="font-sans text-sm text-popover-foreground" style={nativeFontStyle}>{child}</RNText>;
      }
      return child;
    };

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
