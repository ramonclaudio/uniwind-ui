/**
 * Textarea Component
 *
 * Displays a form textarea for multi-line input.
 * Automatically handles multiline behavior and vertical text alignment.
 *
 * ## Dependencies
 *
 * - @/lib/utils (cn function)
 *
 * ## Usage
 *
 * ```tsx
 * import { Textarea } from "@/components/ui/textarea";
 *
 * <Textarea placeholder="Enter your message..." />
 * <Textarea placeholder="Disabled" editable={false} />
 * <Textarea className="min-h-[120px]" placeholder="Larger textarea" />
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

export interface TextareaProps extends TextInputProps {
  className?: string;
}

export const Textarea = forwardRef<TextInput, TextareaProps>(
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
        multiline
        textAlignVertical="top"
        className={cn(
          FONT_CLASS,
          "min-h-16 w-full rounded-md border border-input bg-transparent px-3 py-2 text-base text-foreground shadow-xs dark:bg-input/30 md:text-sm",
          "web:transition-shadow web:outline-none web:focus-visible:border-ring web:focus-visible:ring-[3px] web:focus-visible:ring-ring/50",
          isDisabled && "web:cursor-not-allowed opacity-50",
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

Textarea.displayName = "Textarea";
