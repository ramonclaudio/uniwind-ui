import { View } from "react-native";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";

interface ComponentSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function ComponentSection({
  title,
  children,
  className,
}: ComponentSectionProps) {
  return (
    <View className={cn("mb-6", className)}>
      <Text bold className="text-xl text-foreground mb-4">
        {title}
      </Text>
      {children}
    </View>
  );
}
