import { useState } from "react";
import { View, Pressable, ScrollView, Modal, type ViewStyle } from "react-native";
import { Text } from "@/components/ui/text";
import { useRouter, type Href } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface NavItem {
  href: Href;
  label: string;
}

interface MobileNavProps {
  items: NavItem[];
  className?: string;
}

const GETTING_STARTED = [
  { name: "Introduction", href: "/docs" },
  { name: "Components", href: "/docs/components" },
];

const COMPONENTS = [
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
];

export function MobileNav({ items, className }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleNavigate = (href: Href) => {
    router.navigate(href);
    setOpen(false);
  };

  return (
    <View className={className}>
      <Pressable
        onPress={() => setOpen(true)}
        className="h-8 flex-row items-center gap-2 active:opacity-60 md:active:opacity-100"
        accessibilityLabel="Open menu"
        accessibilityRole="button"
      >
        <View className="relative h-8 w-4 items-center justify-center">
          <View className="relative h-4 w-4">
            <View className="absolute left-0 top-1 h-0.5 w-4 bg-foreground rounded-full" />
            <View className="absolute left-0 top-2.5 h-0.5 w-4 bg-foreground rounded-full" />
          </View>
        </View>
        <Text className="text-lg text-foreground">Menu</Text>
      </Pressable>

      <Modal
        visible={open}
        animationType="fade"
        transparent={false}
        onRequestClose={() => setOpen(false)}
      >
        <View className="flex-1 bg-background">
          <View style={{ height: insets.top }} />

          <View className="h-14 flex-row items-center px-6 md:px-8 mx-auto w-full max-w-[1400px]">
            <Pressable
              onPress={() => setOpen(false)}
              className="h-8 flex-row items-center gap-2 active:opacity-60"
              accessibilityLabel="Close menu"
              accessibilityRole="button"
            >
              <View className="relative h-8 w-4 items-center justify-center">
                <View className="relative h-4 w-4">
                  <View
                    className="absolute left-0 h-0.5 w-4 bg-foreground rounded-full"
                    style={{ top: 6, transform: [{ rotate: "-45deg" }] } satisfies ViewStyle}
                  />
                  <View
                    className="absolute left-0 h-0.5 w-4 bg-foreground rounded-full"
                    style={{ top: 6, transform: [{ rotate: "45deg" }] } satisfies ViewStyle}
                  />
                </View>
              </View>
              <Text className="text-lg text-foreground">Menu</Text>
            </Pressable>
          </View>

          <View className="flex-1">
            <ScrollView
              className="flex-1"
              contentContainerClassName="px-6 py-6"
              showsVerticalScrollIndicator={false}
            >
              <View className="mb-8">
                <View className="gap-3">
                  {items
                    .filter((item) => item.label !== "Docs" && item.label !== "Components")
                    .map((item, index) => (
                      <Pressable
                        key={index}
                        onPress={() => handleNavigate(item.href)}
                        className="active:opacity-60"
                      >
                        <Text className="text-2xl text-foreground">
                          {item.label}
                        </Text>
                      </Pressable>
                    ))}
                </View>
              </View>

              <View className="mb-8">
                <Text className="text-sm text-muted-foreground mb-4">
                  Getting Started
                </Text>
                <View className="gap-3">
                  {GETTING_STARTED.map(({ name, href }) => (
                    <Pressable
                      key={name}
                      onPress={() => handleNavigate(href)}
                      className="active:opacity-60"
                    >
                      <Text className="text-2xl text-foreground">
                        {name}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </View>

              <View className="mb-8">
                <Text className="text-sm text-muted-foreground mb-4">
                  Components
                </Text>
                <View className="gap-3">
                  {COMPONENTS.map(({ name, href }) => (
                    <Pressable
                      key={name}
                      onPress={() => handleNavigate(href)}
                      className="active:opacity-60"
                    >
                      <Text className="text-2xl text-foreground">
                        {name}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}
