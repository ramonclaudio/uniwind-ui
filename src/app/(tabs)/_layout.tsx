import { Platform, View, StyleSheet } from "react-native";
import { Slot } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { MobileTabBar } from "@/components/mobile-tab-bar";
import { SiteHeader } from "@/components/site-header";

export const unstable_settings = {
  initialRouteName: "index",
};

export default function TabsLayout() {
  if (Platform.OS === "web") {
    return <Slot />;
  }

  return (
    <View style={styles.container} className="bg-background">
      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        <SiteHeader />
        <View style={styles.content}>
          <Slot />
        </View>
        <MobileTabBar />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});
