import { View, Pressable, StyleSheet } from "react-native";
import { Text } from "@/components/ui/text";
import { usePathname, useRouter, type Href } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { cn } from "@/lib/utils";
import { useResolveClassNames } from "uniwind";

type OutlineableIcon = "home" | "book";

interface TabItem {
  name: string;
  href: Href;
  icon: OutlineableIcon;
}

const tabs: TabItem[] = [
  { name: "Home", href: "/", icon: "home" },
  { name: "Docs", href: "/docs", icon: "book" },
];

export function MobileTabBar() {
  const pathname = usePathname();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const foregroundStyles = useResolveClassNames("text-foreground");
  const mutedStyles = useResolveClassNames("text-muted-foreground");
  const foregroundColor = foregroundStyles.color as string;
  const mutedColor = mutedStyles.color as string;

  const isActive = (href: Href) => {
    const hrefString = String(href);
    if (hrefString === "/") {
      return pathname === "/" || pathname === "";
    }
    return pathname.startsWith(hrefString);
  };

  return (
    <View
      style={[styles.container, { paddingBottom: insets.bottom }]}
      className="bg-background border-t border-border"
    >
      {tabs.map((tab) => {
        const active = isActive(tab.href);
        return (
          <Pressable
            key={String(tab.href)}
            onPress={() => router.navigate(tab.href)}
            style={styles.tab}
          >
            <Ionicons
              name={active ? tab.icon : `${tab.icon}-outline`}
              size={24}
              color={active ? foregroundColor : mutedColor}
            />
            <Text
              className={cn(
                "text-xs mt-1",
                active ? "text-foreground" : "text-muted-foreground"
              )}
            >
              {tab.name}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 8,
  },
});
