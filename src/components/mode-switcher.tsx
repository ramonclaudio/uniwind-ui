import { Pressable } from "react-native";
import { Uniwind, useUniwind, useCSSVariable } from "uniwind";
import { saveTheme } from "@/app/_layout";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";

export function ModeSwitcher({ className }: { className?: string }) {
  const { theme, hasAdaptiveThemes } = useUniwind();
  const activeTheme = hasAdaptiveThemes ? "system" : theme;
  const foregroundColor = useCSSVariable("--color-foreground") as string;

  const toggleTheme = async () => {
    let newTheme: "light" | "dark" | "system";
    if (activeTheme === "light") {
      newTheme = "dark";
    } else if (activeTheme === "dark") {
      newTheme = "system";
    } else {
      newTheme = "light";
    }
    Uniwind.setTheme(newTheme);
    await saveTheme(newTheme);
  };

  const IconComponent =
    activeTheme === "system"
      ? Icons.monitor
      : activeTheme === "dark"
        ? Icons.moon
        : Icons.sun;

  return (
    <Pressable
      onPress={toggleTheme}
      className={cn(
        "h-8 w-8 items-center justify-center rounded-md",
        "active:bg-accent active:opacity-60 md:active:opacity-100",
        className
      )}
      accessibilityLabel={`Current theme: ${activeTheme}. Tap to change.`}
      accessibilityRole="button"
    >
      <IconComponent width={18} height={18} color={foregroundColor} />
    </Pressable>
  );
}
