import { View, Linking } from "react-native";
import { Text } from "@/components/ui/text";
import { siteConfig } from "@/lib/config";

export function SiteFooter() {
  const openLink = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <View className="native:pb-safe-bottom">
      <View className="container-wrapper px-4 md:px-6">
        <View className="flex-row h-14 items-center justify-center">
          <Text className="text-muted-foreground w-full px-1 text-center text-xs leading-loose">
            Built by{" "}
            <Text
              onPress={() => openLink(siteConfig.links.twitter)}
              className="underline underline-offset-4 text-muted-foreground"
            >
              Ray
            </Text>
            . The source code is available on{" "}
            <Text
              onPress={() => openLink(siteConfig.links.github)}
              className="underline underline-offset-4 text-muted-foreground"
            >
              GitHub
            </Text>
            .
          </Text>
        </View>
      </View>
    </View>
  );
}
