import { View, Pressable, Linking } from "react-native";
import { Text } from "@/components/ui/text";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { RegistryItem } from "@/lib/registry";

interface DocLink {
  label: string;
  url: string;
}

interface ComponentHeaderProps {
  component?: RegistryItem;
  name?: string;
  description?: string;
  links?: DocLink[];
  className?: string;
}

export function ComponentHeader({
  component,
  name,
  description,
  links = [],
  className,
}: ComponentHeaderProps) {
  const displayName = name ?? component?.name ?? "";
  const displayDescription = description ?? component?.description ?? "";

  return (
    <View className={cn("mb-[50px]", className)}>
      <Text className="text-3xl tracking-tight text-foreground">
        {displayName}
      </Text>
      <Text className="text-base text-muted-foreground mt-6 leading-relaxed">
        {displayDescription}
      </Text>
      {links.length > 0 && (
        <View className="flex-row gap-2 mt-6">
          {links.map((link, index) => (
            <Pressable
              key={index}
              onPress={() => Linking.openURL(link.url)}
              className="active:opacity-70"
            >
              <Badge variant="secondary" className="rounded-lg">
                <Text className="text-xs text-foreground">
                  {link.label} ↗
                </Text>
              </Badge>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
}
