import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Platform } from "react-native";
import { useState, useEffect, useMemo } from "react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Hook to read CSS variable values on web.
 * Useful for third-party libraries that need actual color values.
 * Returns undefined on native platforms.
 */
export function useCSSVariable(variableName: string): string | undefined {
  const [value, setValue] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (Platform.OS !== "web") return;

    const getCSSVariable = () => {
      if (typeof document !== "undefined") {
        const computed = getComputedStyle(document.documentElement);
        return computed.getPropertyValue(variableName).trim() || undefined;
      }
      return undefined;
    };

    setValue(getCSSVariable());

    // Listen for theme changes via a MutationObserver on the root element
    if (typeof MutationObserver !== "undefined" && typeof document !== "undefined") {
      const observer = new MutationObserver(() => {
        setValue(getCSSVariable());
      });
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class", "style", "data-theme"],
      });
      return () => observer.disconnect();
    }
  }, [variableName]);

  return value;
}

/**
 * Hook to get multiple CSS variable values at once.
 * More efficient than calling useCSSVariable multiple times.
 */
export function useCSSVariables<T extends Record<string, string>>(
  variables: T
): Record<keyof T, string | undefined> {
  // Memoize the stringified variables for stable dependency
  const variablesKey = useMemo(() => JSON.stringify(variables), [variables]);

  const [values, setValues] = useState<Record<keyof T, string | undefined>>(
    () => Object.fromEntries(Object.keys(variables).map((k) => [k, undefined])) as Record<keyof T, string | undefined>
  );

  useEffect(() => {
    if (Platform.OS !== "web") return;

    const getCSSVariables = () => {
      if (typeof document !== "undefined") {
        const computed = getComputedStyle(document.documentElement);
        return Object.fromEntries(
          Object.entries(variables).map(([key, varName]) => [
            key,
            computed.getPropertyValue(varName).trim() || undefined,
          ])
        ) as Record<keyof T, string | undefined>;
      }
      return Object.fromEntries(Object.keys(variables).map((k) => [k, undefined])) as Record<keyof T, string | undefined>;
    };

    setValues(getCSSVariables());

    if (typeof MutationObserver !== "undefined" && typeof document !== "undefined") {
      const observer = new MutationObserver(() => {
        setValues(getCSSVariables());
      });
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class", "style", "data-theme"],
      });
      return () => observer.disconnect();
    }
  }, [variables, variablesKey]);

  return values;
}
