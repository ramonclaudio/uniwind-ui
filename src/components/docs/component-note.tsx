import { View } from "react-native";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";

interface ComponentNoteProps {
  children: React.ReactNode;
  className?: string;
}

export function ComponentNote({ children, className }: ComponentNoteProps) {
  return (
    <View className={cn("p-4 rounded-lg bg-muted mb-6", className)}>
      <Text className="text-sm text-muted-foreground leading-relaxed">
        <Text className="text-foreground">Note:</Text> {children}
      </Text>
    </View>
  );
}
