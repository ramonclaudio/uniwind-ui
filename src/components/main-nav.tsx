import { View, Pressable } from "react-native";
import { Text } from "@/components/ui/text";
import { Link, usePathname, type Href } from "expo-router";
import { cn } from "@/lib/utils";

interface NavItem {
  href: Href;
  label: string;
}

interface MainNavProps {
  items: NavItem[];
  className?: string;
}

export function MainNav({ items, className }: MainNavProps) {
  const pathname = usePathname();

  return (
    <View className={cn("flex-row items-center", className)}>
      {items.map((item) => {
        const hrefString = String(item.href);
        const isActive = pathname === hrefString || pathname.startsWith(hrefString + "/");
        return (
          <Link key={hrefString} href={item.href} asChild>
            <Pressable
              className={cn(
                "h-8 px-3 items-center justify-center rounded-md",
                "active:bg-accent"
              )}
            >
              <Text
                className={cn(
                  "text-sm",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
              >
                {item.label}
              </Text>
            </Pressable>
          </Link>
        );
      })}
    </View>
  );
}
