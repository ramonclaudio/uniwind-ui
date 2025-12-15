import { ScrollView, View } from "react-native";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
}) {
  return (
    <View className="flex-1 min-w-[140px] p-4 rounded-lg border border-border bg-card">
      <View className="w-10 h-10 rounded-md bg-primary/10 items-center justify-center mb-3">
        <Ionicons name={icon} size={20} className="text-primary" />
      </View>
      <Text bold className="text-foreground mb-1">
        {title}
      </Text>
      <Text className="text-sm text-muted-foreground leading-relaxed">
        {description}
      </Text>
    </View>
  );
}

export default function DocsIndex() {
  return (
    <ScrollView
      className="flex-1 bg-background"
      contentContainerClassName="p-6 pb-20 max-w-3xl"
    >
      <View className="mb-10">
        <Text bold className="text-4xl text-foreground mb-4 leading-tight">
          Build your component library
        </Text>

        <Text className="text-lg text-muted-foreground leading-relaxed">
          shadcn/ui components for React Native, built on Uniwind. Copy, paste,
          and own. iOS, Android, Web.
        </Text>
      </View>

      <View className="flex-row gap-3 mb-10">
        <Button asChild>
          <Link href="/docs/components">
            <Text>Browse Components</Text>
            <Ionicons name="arrow-forward" size={16} className="ml-1" />
          </Link>
        </Button>
      </View>

      <Separator className="mb-10" />

      <View className="mb-10">
        <Text bold className="text-xl text-foreground mb-3">
          Not a component library
        </Text>
        <Text className="text-muted-foreground leading-relaxed mb-4">
          Traditional libraries work until you need to customize. Then you are
          wrapping components, fighting styles, and mixing incompatible APIs.
        </Text>
        <Text className="text-muted-foreground leading-relaxed">
          Uniwind UI is different. Copy the code into your project. Own it.
          Modify it however you need. Works with Expo, bare React Native, or
          any framework you prefer.
        </Text>
      </View>

      <View className="flex-row flex-wrap gap-3 mb-10">
        <FeatureCard
          icon="code-slash"
          title="Open Code"
          description="The source is yours. No black boxes."
        />
        <FeatureCard
          icon="git-merge"
          title="Composition"
          description="Consistent APIs. Predictable patterns."
        />
        <FeatureCard
          icon="color-palette"
          title="Beautiful"
          description="Light and dark mode built in."
        />
        <FeatureCard
          icon="phone-portrait"
          title="Cross Platform"
          description="iOS, Android, Web. One codebase."
        />
      </View>

      <Separator className="mb-10" />

      <View className="mb-10">
        <Text bold className="text-xl text-foreground mb-3">
          Why Uniwind?
        </Text>
        <Text className="text-muted-foreground leading-relaxed mb-4">
          Uniwind is the fastest Tailwind CSS implementation for React Native,
          created by the team behind Unistyles.
        </Text>
        <View className="gap-2">
          <Text className="text-muted-foreground leading-relaxed">
            <Text bold className="text-foreground">2.5x faster </Text>
            - styles precomputed at build time, zero runtime cost
          </Text>
          <Text className="text-muted-foreground leading-relaxed">
            <Text bold className="text-foreground">Tailwind 4 </Text>
            - CSS variables, media queries, custom utilities
          </Text>
          <Text className="text-muted-foreground leading-relaxed">
            <Text bold className="text-foreground">TypeScript </Text>
            - full autocomplete for utilities, variants, and tokens
          </Text>
          <Text className="text-muted-foreground leading-relaxed">
            <Text bold className="text-foreground">Platform variants </Text>
            - ios: and android: directly in className
          </Text>
        </View>
      </View>

      <Separator className="mb-10" />

      <View>
        <Text bold className="text-muted-foreground">
          Copy. Paste. Ship.
        </Text>
      </View>
    </ScrollView>
  );
}
