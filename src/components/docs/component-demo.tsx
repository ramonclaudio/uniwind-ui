import { View } from "react-native";
import { ComponentPreview } from "./component-preview";
import { ComponentSource } from "./component-source";
import { cn } from "@/lib/utils";

interface ComponentDemoProps {
  children: React.ReactNode;
  code: string;
  className?: string;
}

export function ComponentDemo({ children, code, className }: ComponentDemoProps) {
  return (
    <View className={cn("mb-8", className)}>
      <ComponentPreview roundedBottom={false}>
        {children}
      </ComponentPreview>
      <ComponentSource roundedTop={false} code={code} />
    </View>
  );
}
