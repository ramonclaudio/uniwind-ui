import { View } from "react-native";
import { Text } from "@/components/ui/text";
import { ComponentPreview } from "./component-preview";
import { ComponentSource } from "./component-source";
import { cn } from "@/lib/utils";

export interface ComponentExampleProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  code?: string;
  className?: string;
}

export function ComponentExample({
  title,
  description,
  children,
  code,
  className,
}: ComponentExampleProps) {
  return (
    <View className={cn("mb-6", className)}>
      {title && (
        <Text bold className="text-lg text-foreground mb-2">
          {title}
        </Text>
      )}
      {description && (
        <Text className="text-sm text-muted-foreground mb-3">
          {description}
        </Text>
      )}
      <ComponentPreview roundedBottom={!code}>
        {children}
      </ComponentPreview>
      {code && <ComponentSource roundedTop={false} code={code} />}
    </View>
  );
}
