import { View, ScrollView, Pressable, useWindowDimensions, Platform } from "react-native";
import { Text } from "@/components/ui/text";
import { Slot, Link, usePathname, type Href } from "expo-router";
import { cn } from "@/lib/utils";
import { SiteHeader } from "@/components/site-header";

// Ensure deep links have proper back navigation
export const unstable_settings = {
  initialRouteName: "index",
};

// Component registry for navigation
const components = [
  { name: "Badge", href: "/docs/components/badge" },
  { name: "Button", href: "/docs/components/button" },
  { name: "Card", href: "/docs/components/card" },
  { name: "Checkbox", href: "/docs/components/checkbox" },
  { name: "Input", href: "/docs/components/input" },
  { name: "Label", href: "/docs/components/label" },
  { name: "Navigation Menu", href: "/docs/components/navigation-menu" },
  { name: "Select", href: "/docs/components/select" },
  { name: "Separator", href: "/docs/components/separator" },
  { name: "Spinner", href: "/docs/components/spinner" },
  { name: "Text", href: "/docs/components/text" },
  { name: "Textarea", href: "/docs/components/textarea" },
] as const;

const gettingStarted = [
  { name: "Introduction", href: "/docs" },
  { name: "Components", href: "/docs/components" },
] as const;


function DocsSidebar() {
  const pathname = usePathname();

  return (
    <ScrollView
      className="flex-1 bg-background"
      contentContainerClassName="py-6 px-4"
      showsVerticalScrollIndicator={false}
    >
      {/* Getting Started */}
      <View className="mb-6">
        <Text bold className="text-sm text-foreground mb-2 px-2">
          Getting Started
        </Text>
        {gettingStarted.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href as Href} asChild>
              <Pressable
                className={cn(
                  "px-2 py-1.5 rounded-md",
                  isActive ? "bg-accent" : "active:bg-accent"
                )}
              >
                <Text
                  className={cn(
                    "text-sm",
                    isActive
                      ? "text-accent-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {item.name}
                </Text>
              </Pressable>
            </Link>
          );
        })}
      </View>

      {/* Components */}
      <View>
        <Text bold className="text-sm text-foreground mb-2 px-2">
          Components
        </Text>
        {components.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href as Href} asChild>
              <Pressable
                className={cn(
                  "px-2 py-1.5 rounded-md",
                  isActive ? "bg-accent" : "active:bg-accent"
                )}
              >
                <Text
                  className={cn(
                    "text-sm",
                    isActive
                      ? "text-accent-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {item.name}
                </Text>
              </Pressable>
            </Link>
          );
        })}
      </View>
    </ScrollView>
  );
}

export default function DocsLayout() {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;
  const isWeb = Platform.OS === "web";

  // On mobile native, just use Slot (tabs layout provides header/nav)
  if (!isWeb) {
    return <Slot />;
  }

  // On web, use sidebar layout
  return (
    <View className="flex-1 bg-background">
      <SiteHeader />
      <View className="flex-1 flex-row">
        {/* Desktop Sidebar - only shown on desktop */}
        {isDesktop && (
          <View className="w-64 border-r border-border">
            <DocsSidebar />
          </View>
        )}
        {/* Main Content */}
        <View className="flex-1">
          <Slot />
        </View>
      </View>
    </View>
  );
}
