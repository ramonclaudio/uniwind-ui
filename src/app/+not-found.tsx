import { View } from "react-native";
import { Text } from "@/components/ui/text";
import { Link } from "expo-router";
import { Button } from "@/components/ui/button";

export default function NotFoundScreen() {
  return (
    <View className="flex-1 bg-background items-center justify-center px-6">
      <Text bold className="text-6xl text-foreground mb-2">404</Text>
      <Text className="text-xl text-muted-foreground mb-8">
        Page not found
      </Text>
      <Link href="/" asChild>
        <Button>
          <Text className="text-primary-foreground">
            Go to Home
          </Text>
        </Button>
      </Link>
    </View>
  );
}
