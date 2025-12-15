import { View, Pressable, Linking } from "react-native";
import { Link } from "expo-router";
import { siteConfig } from "@/lib/config";
import { Icons } from "@/components/icons";
import { MainNav } from "@/components/main-nav";
import { MobileNav } from "@/components/mobile-nav";
import { ModeSwitcher } from "@/components/mode-switcher";

export function SiteHeader() {
  const openGitHub = () => {
    Linking.openURL(siteConfig.links.github);
  };

  return (
    <View className="bg-background web:sticky top-0 z-50 w-full">
      <View className="px-6 mx-auto w-full max-w-[1400px] md:max-w-none md:px-6">
        <View className="flex-row h-14 items-center">
          <MobileNav items={siteConfig.navItems} className="flex md:hidden" />

          <Link href="/" asChild>
            <Pressable className="hidden md:flex h-8 w-8 items-center justify-center rounded-md active:bg-accent">
              <Icons.logo width={20} height={20} className="accent-foreground" />
            </Pressable>
          </Link>

          <MainNav items={siteConfig.navItems} className="hidden md:flex" />

          <View className="ml-auto flex-row items-center gap-2 md:flex-1 md:justify-end">
            <Pressable
              onPress={openGitHub}
              className="h-8 w-8 items-center justify-center rounded-md active:bg-accent"
              accessibilityLabel="GitHub"
              accessibilityRole="link"
            >
              <Icons.gitHub width={18} height={18} className="accent-foreground" />
            </Pressable>

            <View className="w-[1px] h-4 bg-border" />

            <ModeSwitcher />
          </View>
        </View>
      </View>
    </View>
  );
}
