import { View } from "react-native";
import { Text } from "@/components/ui/text";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import {
  DocsPage,
  ComponentHeader,
  ComponentDemo,
  ComponentSection,
  ComponentExample,
  ComponentUsage,
  ComponentApiReference,
} from "@/components/docs";

export default function BadgePage() {
  return (
    <DocsPage>
      <ComponentHeader
        name="Badge"
        description="Displays a badge or a component that looks like a badge."
      />

      <ComponentDemo
        code={`import { View, Text } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { Badge } from "@/components/ui/badge"

export function BadgeDemo() {
  return (
    <View className="flex-col items-center gap-2">
      <View className="flex-row flex-wrap gap-2">
        <Badge>Badge</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="destructive">Destructive</Badge>
        <Badge variant="outline">Outline</Badge>
      </View>
      <View className="flex-row flex-wrap gap-2">
        <Badge className="bg-info">
          <Ionicons name="checkmark-circle" size={12} className="text-info-foreground" />
          <Text className="text-xs text-info-foreground">Verified</Text>
        </Badge>
        <Badge className="h-5 min-w-5 justify-center rounded-full px-1.5">
          <Text className="text-xs font-mono text-primary-foreground">8</Text>
        </Badge>
        <Badge
          className="h-5 min-w-5 justify-center rounded-full px-1.5"
          variant="destructive"
        >
          <Text className="text-xs font-mono text-destructive-foreground">99</Text>
        </Badge>
        <Badge
          className="h-5 min-w-5 justify-center rounded-full px-1.5"
          variant="outline"
        >
          <Text className="text-xs font-mono text-foreground">20+</Text>
        </Badge>
      </View>
    </View>
  )
}`}
      >
        <View className="flex-col items-center gap-2">
          <View className="flex-row flex-wrap gap-2">
            <Badge>Badge</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="outline">Outline</Badge>
          </View>
          <View className="flex-row flex-wrap gap-2">
            <Badge className="bg-info">
              <Ionicons name="checkmark-circle" size={12} className="text-info-foreground" />
              <Text className="text-xs text-info-foreground">Verified</Text>
            </Badge>
            <Badge className="h-5 min-w-5 justify-center rounded-full px-1.5">
              <Text className="text-xs font-mono text-primary-foreground">8</Text>
            </Badge>
            <Badge
              className="h-5 min-w-5 justify-center rounded-full px-1.5"
              variant="destructive"
            >
              <Text className="text-xs font-mono text-destructive-foreground">99</Text>
            </Badge>
            <Badge
              className="h-5 min-w-5 justify-center rounded-full px-1.5"
              variant="outline"
            >
              <Text className="text-xs font-mono text-foreground">20+</Text>
            </Badge>
          </View>
        </View>
      </ComponentDemo>

      <ComponentUsage
        import={`import { Badge } from "@/components/ui/badge"`}
        usage={`<Badge variant="default | outline | secondary | destructive">Badge</Badge>`}
      />

      <ComponentSection title="Examples">
        <ComponentExample
          title="Secondary"
          code={`import { Badge } from "@/components/ui/badge"

export function BadgeSecondary() {
  return <Badge variant="secondary">Secondary</Badge>
}`}
        >
          <Badge variant="secondary">Secondary</Badge>
        </ComponentExample>

        <ComponentExample
          title="Outline"
          code={`import { Badge } from "@/components/ui/badge"

export function BadgeOutline() {
  return <Badge variant="outline">Outline</Badge>
}`}
        >
          <Badge variant="outline">Outline</Badge>
        </ComponentExample>

        <ComponentExample
          title="Destructive"
          code={`import { Badge } from "@/components/ui/badge"

export function BadgeDestructive() {
  return <Badge variant="destructive">Destructive</Badge>
}`}
        >
          <Badge variant="destructive">Destructive</Badge>
        </ComponentExample>
      </ComponentSection>

      <ComponentSection title="As Child">
        <ComponentExample
          code={`import { Link } from "expo-router"
import { Badge } from "@/components/ui/badge"

export function BadgeAsChild() {
  return (
    <Badge variant="secondary" asChild>
      <Link href="/">Go Home</Link>
    </Badge>
  )
}`}
        >
          <Badge variant="secondary" asChild>
            <Link href="/">Go Home</Link>
          </Badge>
        </ComponentExample>
      </ComponentSection>

      <ComponentSection title="With Spinner">
        <ComponentExample
          code={`import { View } from "react-native"
import { Badge } from "@/components/ui/badge"
import { Spinner } from "@/components/ui/spinner"

export function BadgeWithSpinner() {
  return (
    <View className="flex-row flex-wrap gap-2">
      <Badge className="gap-1.5">
        <Spinner size="small" />
        <Text className="text-xs">Loading</Text>
      </Badge>
      <Badge variant="secondary" className="gap-1.5">
        <Spinner size="small" />
        <Text className="text-xs">Syncing</Text>
      </Badge>
      <Badge variant="outline" className="gap-1.5">
        <Spinner size="small" />
        <Text className="text-xs">Processing</Text>
      </Badge>
    </View>
  )
}`}
        >
          <View className="flex-row flex-wrap gap-2">
            <Badge className="gap-1.5">
              <Spinner size="small" />
              <Text className="text-xs">Loading</Text>
            </Badge>
            <Badge variant="secondary" className="gap-1.5">
              <Spinner size="small" />
              <Text className="text-xs">Syncing</Text>
            </Badge>
            <Badge variant="outline" className="gap-1.5">
              <Spinner size="small" />
              <Text className="text-xs">Processing</Text>
            </Badge>
          </View>
        </ComponentExample>
      </ComponentSection>

      <ComponentApiReference
        description="The Badge component displays a small status indicator."
        props={[
          { name: "variant", type: '"default" | "secondary" | "destructive" | "outline"', default: '"default"' },
          { name: "onPress", type: "() => void", default: "undefined", description: "Makes the badge pressable" },
          { name: "asChild", type: "boolean", default: "false", description: "Render as child element, passing badge styles to it" },
        ]}
      />
    </DocsPage>
  );
}
