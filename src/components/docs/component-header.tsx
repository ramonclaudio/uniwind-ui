import { View, Pressable, Linking } from "react-native";
import { Text } from "@/components/ui/text";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface DocLink {
  label: string;
  url: string;
}

interface ComponentHeaderProps {
  name: string;
  description: string;
  links?: DocLink[];
  className?: string;
}

export function ComponentHeader({
  name,
  description,
  links = [],
  className,
}: ComponentHeaderProps) {

  return (
    <View className={cn("mb-[50px]", className)}>
      <Text className="text-3xl tracking-tight text-foreground">
        {name}
      </Text>
      <Text className="text-base text-muted-foreground mt-6 leading-relaxed">
        {description}
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
