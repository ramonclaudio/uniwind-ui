/**
 * Input Component
 *
 * Displays a form input field.
 * Supports all standard TextInput props plus custom styling.
 *
 * ## Dependencies
 *
 * - @/lib/utils (cn function)
 *
 * ## Usage
 *
 * ```tsx
 * import { Input } from "@/components/ui/input";
 *
 * <Input placeholder="Enter text..." />
 * <Input placeholder="Disabled" editable={false} />
 * <Input secureTextEntry placeholder="Password" />
 * ```
 */

import { TextInput, Platform, type TextInputProps } from "react-native";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Font Configuration
 * Must match the font setup in your project (see text.tsx for reference)
 */
const FONT_FAMILY = "SpaceMono-Regular";
const FONT_CLASS = "font-sans";

export interface InputProps extends TextInputProps {
  className?: string;
}

// shadcn v4: "h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs dark:bg-input/30 md:text-sm"
export const Input = forwardRef<TextInput, InputProps>(
  ({ className = "", editable = true, style, ...props }, ref) => {
    const isDisabled = editable === false;

    // On native (iOS/Android), we need inline fontFamily for Expo Go compatibility
    // On web, className is sufficient
    const platformStyle = Platform.select({
      web: style,
      default: [{ fontFamily: FONT_FAMILY }, style],
    });

    return (
      <TextInput
        ref={ref}
        editable={editable}
        className={cn(
          FONT_CLASS,
          "h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base text-foreground shadow-xs dark:bg-input/30 md:text-sm",
          "web:transition-shadow web:outline-none web:focus-visible:border-ring web:focus-visible:ring-[3px] web:focus-visible:ring-ring/50",
          isDisabled && "web:pointer-events-none web:cursor-not-allowed opacity-50",
          className
        )}
        style={platformStyle}
        placeholderTextColorClassName="accent-muted-foreground"
        cursorColorClassName="accent-primary"
        selectionColorClassName="accent-primary"
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
