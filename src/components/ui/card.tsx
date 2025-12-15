/**
 * Card Component
 *
 * Displays a card with header, content, and footer.
 * Includes sub-components for header, title, description, content, footer, and actions.
 *
 * ## Dependencies
 *
 * - @/lib/utils (cn function)
 *
 * ## Usage
 *
 * ```tsx
 * import {
 *   Card,
 *   CardHeader,
 *   CardTitle,
 *   CardDescription,
 *   CardContent,
 *   CardFooter,
 * } from "@/components/ui/card";
 *
 * <Card>
 *   <CardHeader>
 *     <CardTitle>Card Title</CardTitle>
 *     <CardDescription>Card description here</CardDescription>
 *   </CardHeader>
 *   <CardContent>
 *     <p>Card content goes here</p>
 *   </CardContent>
 *   <CardFooter>
 *     <Button>Action</Button>
 *   </CardFooter>
 * </Card>
 * ```
 */

import { View, Text as RNText, type ViewProps, type TextProps } from "react-native";
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
          "bg-card text-card-foreground flex-col gap-6 rounded-xl border border-border py-6 shadow-sm",
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
    const childArray = Array.isArray(children) ? children : [children];
    const actionChild = childArray.find(
      (child: any) => child?.type?.displayName === "CardAction"
    );
    const otherChildren = childArray.filter(
      (child: any) => child?.type?.displayName !== "CardAction"
    );

    return (
      <View
        ref={ref}
        className={cn("flex-row items-start gap-2 px-6", className)}
        {...props}
      >
        <View className="flex-1 flex-col gap-2">
          {otherChildren}
        </View>
        {actionChild}
      </View>
    );
  }
);
CardHeader.displayName = "CardHeader";

export interface CardTitleProps extends TextProps {
  children?: ReactNode;
  className?: string;
}

export const CardTitle = forwardRef<RNText, CardTitleProps>(
  ({ children, className = "", ...props }, ref) => {
    return (
      <RNText
        ref={ref}
        className={cn("leading-none font-semibold text-foreground", className)}
        {...props}
      >
        {children}
      </RNText>
    );
  }
);
CardTitle.displayName = "CardTitle";

export interface CardDescriptionProps extends TextProps {
  children?: ReactNode;
  className?: string;
}

export const CardDescription = forwardRef<RNText, CardDescriptionProps>(
  ({ children, className = "", ...props }, ref) => {
    return (
      <RNText
        ref={ref}
        className={cn("text-muted-foreground text-sm", className)}
        {...props}
      >
        {children}
      </RNText>
    );
  }
);
CardDescription.displayName = "CardDescription";

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
        className={cn("px-6", className)}
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
        className={cn("flex-row items-center px-6", className)}
        {...props}
      >
        {children}
      </View>
    );
  }
);
CardFooter.displayName = "CardFooter";
