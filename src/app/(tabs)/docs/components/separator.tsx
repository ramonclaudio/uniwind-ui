import { View } from "react-native";
import { Text } from "@/components/ui/text";
import { Separator } from "@/components/ui/separator";
import {
  DocsPage,
  ComponentHeader,
  ComponentDemo,
  ComponentSection,
  ComponentExample,
  ComponentUsage,
  ComponentApiReference,
} from "@/components/docs";

export default function SeparatorPage() {
  return (
    <DocsPage>
      <ComponentHeader
        name="Separator"
        description="Visually or semantically separates content."
      />

      <ComponentDemo
        code={`import { View, Text } from "react-native"
import { Separator } from "@/components/ui/separator"

export function SeparatorDemo() {
  return (
    <View>
      <View className="gap-1">
        <Text className="text-sm font-medium leading-none text-foreground">
          Uniwind Primitives
        </Text>
        <Text className="text-sm text-muted-foreground">
          An open-source UI component library.
        </Text>
      </View>
      <Separator className="my-4" />
      <View className="flex-row h-5 items-center gap-4 text-sm">
        <Text className="text-foreground">Blog</Text>
        <Separator orientation="vertical" />
        <Text className="text-foreground">Docs</Text>
        <Separator orientation="vertical" />
        <Text className="text-foreground">Source</Text>
      </View>
    </View>
  )
}`}
      >
        <View>
          <View className="gap-1">
            <Text className="text-sm leading-none text-foreground" bold>
              Uniwind Primitives
            </Text>
            <Text className="text-sm text-muted-foreground">
              An open-source UI component library.
            </Text>
          </View>
          <Separator className="my-4" />
          <View className="flex-row h-5 items-center gap-4 text-sm">
            <Text className="text-foreground">Blog</Text>
            <Separator orientation="vertical" />
            <Text className="text-foreground">Docs</Text>
            <Separator orientation="vertical" />
            <Text className="text-foreground">Source</Text>
          </View>
        </View>
      </ComponentDemo>

      <ComponentUsage
        import={`import { Separator } from "@/components/ui/separator"`}
        usage={`<Separator />`}
      />

      <ComponentSection title="Examples">
        <ComponentExample
          title="In List"
          code={`import { View } from "react-native"
import { Text } from "@/components/ui/text"
import { Separator } from "@/components/ui/separator"

export function SeparatorInList() {
  return (
    <View className="border border-border rounded-md overflow-hidden">
      <View className="px-3 py-2">
        <Text className="text-sm">Item One</Text>
      </View>
      <Separator />
      <View className="px-3 py-2">
        <Text className="text-sm">Item Two</Text>
      </View>
      <Separator />
      <View className="px-3 py-2">
        <Text className="text-sm">Item Three</Text>
      </View>
    </View>
  )
}`}
        >
          <View className="w-full max-w-sm border border-border rounded-md overflow-hidden">
            <View className="px-3 py-2">
              <Text className="text-sm">Item One</Text>
            </View>
            <Separator />
            <View className="px-3 py-2">
              <Text className="text-sm">Item Two</Text>
            </View>
            <Separator />
            <View className="px-3 py-2">
              <Text className="text-sm">Item Three</Text>
            </View>
          </View>
        </ComponentExample>
      </ComponentSection>

      <ComponentApiReference
        description="A visual divider between content sections."
        props={[
          { name: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"' },
        ]}
      />
    </DocsPage>
  );
}
