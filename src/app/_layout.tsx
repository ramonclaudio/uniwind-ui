import "../global.css";

import { useEffect, useCallback } from "react";
import { Platform, StyleSheet, View, StatusBar, useColorScheme } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { Slot } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Uniwind } from "uniwind";

SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

const THEME_KEY = "user-theme";

export const META_THEME_COLORS = {
  light: "#ffffff",
  dark: "#0a0a0a",
};

const cookies = {
  get: (name: string): string | null => {
    if (Platform.OS !== "web" || typeof document === "undefined") return null;
    const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
    return match ? match[2] : null;
  },
  set: (name: string, value: string, days = 365) => {
    if (Platform.OS !== "web" || typeof document === "undefined") return;
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${value}; expires=${expires}; path=/`;
  },
};

async function loadSavedTheme() {
  try {
    let savedTheme: string | null = null;

    if (Platform.OS === "web") {
      savedTheme = cookies.get(THEME_KEY);
    } else {
      savedTheme = await AsyncStorage.getItem(THEME_KEY);
    }

    if (savedTheme && ["light", "dark", "system"].includes(savedTheme)) {
      Uniwind.setTheme(savedTheme as "light" | "dark" | "system");
    }
  } catch (error) {
    console.warn("Failed to load saved theme:", error);
  }
}

if (Platform.OS === "web" && typeof document !== "undefined") {
  const savedTheme = cookies.get(THEME_KEY);
  if (savedTheme && ["light", "dark", "system"].includes(savedTheme)) {
    Uniwind.setTheme(savedTheme as "light" | "dark" | "system");
  }
}

export async function saveTheme(theme: string) {
  try {
    if (Platform.OS === "web") {
      cookies.set(THEME_KEY, theme);
    } else {
      await AsyncStorage.setItem(THEME_KEY, theme);
    }
  } catch (error) {
    console.warn("Failed to save theme:", error);
  }
}

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [fontsLoaded, fontError] = useFonts({
    "SpaceMono-Regular": require("../../assets/fonts/SpaceMono-Regular.ttf"),
    "SpaceMono-Bold": require("../../assets/fonts/SpaceMono-Bold.ttf"),
    "SpaceMono-Italic": require("../../assets/fonts/SpaceMono-Italic.ttf"),
    "SpaceMono-BoldItalic": require("../../assets/fonts/SpaceMono-BoldItalic.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  useEffect(() => {
    loadSavedTheme();
  }, []);

  useEffect(() => {
    if (fontError) {
      console.error("Font loading error:", fontError);
    }
  }, [fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <View style={styles.container} className="bg-background" onLayout={onLayoutRootView}>
        <StatusBar
          barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
          backgroundColor={colorScheme === "dark" ? META_THEME_COLORS.dark : META_THEME_COLORS.light}
          translucent={false}
        />
        <Slot />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
