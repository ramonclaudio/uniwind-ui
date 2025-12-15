import { View } from "react-native";
import { Text } from "@/components/ui/text";
import { ComponentSection } from "./component-section";

export interface ApiProp {
  name: string;
  type: string;
  default?: string;
  description?: string;
}

export interface ComponentApiReferenceProps {
  title?: string;
  description?: string;
  props: ApiProp[];
}

export function ComponentApiReference({
  title = "API Reference",
  description,
  props,
}: ComponentApiReferenceProps) {
  return (
    <ComponentSection title={title}>
      {description && (
        <Text className="text-muted-foreground text-sm mb-4">
          {description}
        </Text>
      )}
      <View className="border border-border rounded-lg overflow-hidden">
        {/* Header */}
        <View className="flex-row bg-muted/50 border-b border-border">
          <View className="flex-1 p-3 border-r border-border">
            <Text className="text-sm text-foreground">Prop</Text>
          </View>
          <View className="flex-[2] p-3 border-r border-border">
            <Text className="text-sm text-foreground">Type</Text>
          </View>
          <View className="flex-1 p-3">
            <Text className="text-sm text-foreground">Default</Text>
          </View>
        </View>
        {/* Rows */}
        {props.map((prop, index) => (
          <View
            key={prop.name}
            className={`flex-row ${index < props.length - 1 ? "border-b border-border" : ""}`}
          >
            <View className="flex-1 p-3 border-r border-border">
              <Text className="text-sm text-foreground">{prop.name}</Text>
            </View>
            <View className="flex-[2] p-3 border-r border-border">
              <Text className="text-xs text-muted-foreground">{prop.type}</Text>
            </View>
            <View className="flex-1 p-3">
              <Text className="text-sm text-muted-foreground">
                {prop.default || "-"}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </ComponentSection>
  );
}
