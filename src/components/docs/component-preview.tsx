import { View, Pressable, ScrollView, Platform } from "react-native";
import { Text } from "@/components/ui/text";
import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ComponentPreviewProps {
  children: ReactNode;
  className?: string;
  roundedBottom?: boolean;
}

export function ComponentPreview({ children, className, roundedBottom = true }: ComponentPreviewProps) {
  return (
    <View
      className={cn(
        "border border-border bg-background",
        roundedBottom ? "rounded-lg" : "rounded-t-lg border-b-0",
        className
      )}
    >
      <View
        className="items-center justify-center"
        style={{
          minHeight: Platform.OS === "web" ? 550 : 450,
          paddingVertical: 80,
          paddingHorizontal: 40,
        }}
      >
        {/* Wrapper ensures children have width constraints for proper flex behavior on native */}
        <View className="w-full max-w-md">
          {children}
        </View>
      </View>
    </View>
  );
}

interface ComponentPreviewTabsProps {
  preview: ReactNode;
  code: string;
  className?: string;
}

export function ComponentPreviewTabs({
  preview,
  code,
  className,
}: ComponentPreviewTabsProps) {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");

  return (
    <View
      className={cn(
        "rounded-lg border border-border bg-card",
        className
      )}
    >
      <View className="flex-row border-b border-border">
        <Pressable
          onPress={() => setActiveTab("preview")}
          className={cn(
            "px-4 py-2",
            activeTab === "preview"
              ? "border-b-2 border-primary"
              : "opacity-60"
          )}
        >
          <Text
            className={cn(
              "text-sm",
              activeTab === "preview" ? "text-foreground" : "text-muted-foreground"
            )}
          >
            Preview
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setActiveTab("code")}
          className={cn(
            "px-4 py-2",
            activeTab === "code" ? "border-b-2 border-primary" : "opacity-60"
          )}
        >
          <Text
            className={cn(
              "text-sm",
              activeTab === "code" ? "text-foreground" : "text-muted-foreground"
            )}
          >
            Code
          </Text>
        </Pressable>
      </View>

      {activeTab === "preview" ? (
        <View
          className="items-center justify-center"
          style={{
            minHeight: Platform.OS === "web" ? 550 : 450,
            paddingVertical: 80,
            paddingHorizontal: 40,
          }}
        >
          {/* Wrapper ensures children have width constraints for proper flex behavior on native */}
          <View className="w-full max-w-md">
            {preview}
          </View>
        </View>
      ) : (
        <ScrollView
          horizontal
          className="bg-muted"
          contentContainerClassName="p-4"
        >
          <Text className="text-sm text-foreground">{code}</Text>
        </ScrollView>
      )}
    </View>
  );
}
