import { View } from "react-native";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "@/components/ui/button";
import {
  DocsPage,
  ComponentHeader,
  ComponentDemo,
  ComponentSection,
  ComponentExample,
  ComponentNote,
  ComponentUsage,
  ComponentApiReference,
  ComponentSourceSection,
  Installation,
} from "@/components/docs";
import { useComponent } from "@/lib/registry";

export default function ButtonPage() {
  const component = useComponent("button");

  return (
    <DocsPage>
      <ComponentHeader component={component} />

      <ComponentDemo
        code={`import { View } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { Button } from "@/components/ui/button"

export function ButtonDemo() {
  return (
    <View className="flex-row flex-wrap items-center gap-2">
      <Button variant="outline">Button</Button>
      <Button variant="outline" size="icon">
        <Ionicons name="arrow-up" size={16} className="text-foreground" />
      </Button>
    </View>
  )
}`}
      >
        <View className="flex-row flex-wrap items-center gap-2">
          <Button variant="outline">Button</Button>
          <Button variant="outline" size="icon">
            <Ionicons name="arrow-up" size={16} className="text-foreground" />
          </Button>
        </View>
      </ComponentDemo>

      <Installation component={component} />

      <ComponentUsage
        import={`import { Button } from "@/components/ui/button"`}
        usage={`<Button variant="outline">Button</Button>`}
      />

      <ComponentSection title="Examples">
        <ComponentExample
          title="Size"
          code={`import { View } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { Button } from "@/components/ui/button"

export function ButtonSize() {
  return (
    <View className="flex-col items-start gap-8">
      <View className="flex-row items-start gap-2">
        <Button size="sm" variant="outline">Small</Button>
        <Button size="icon-sm" variant="outline">
          <Ionicons name="arrow-forward" size={16} className="text-foreground" />
        </Button>
      </View>
      <View className="flex-row items-start gap-2">
        <Button variant="outline">Default</Button>
        <Button size="icon" variant="outline">
          <Ionicons name="arrow-forward" size={16} className="text-foreground" />
        </Button>
      </View>
      <View className="flex-row items-start gap-2">
        <Button size="lg" variant="outline">Large</Button>
        <Button size="icon-lg" variant="outline">
          <Ionicons name="arrow-forward" size={16} className="text-foreground" />
        </Button>
      </View>
    </View>
  )
}`}
        >
          <View className="flex-col items-start gap-8">
            <View className="flex-row items-start gap-2">
              <Button size="sm" variant="outline">Small</Button>
              <Button size="icon-sm" variant="outline">
                <Ionicons name="arrow-forward" size={16} className="text-foreground" />
              </Button>
            </View>
            <View className="flex-row items-start gap-2">
              <Button variant="outline">Default</Button>
              <Button size="icon" variant="outline">
                <Ionicons name="arrow-forward" size={16} className="text-foreground" />
              </Button>
            </View>
            <View className="flex-row items-start gap-2">
              <Button size="lg" variant="outline">Large</Button>
              <Button size="icon-lg" variant="outline">
                <Ionicons name="arrow-forward" size={16} className="text-foreground" />
              </Button>
            </View>
          </View>
        </ComponentExample>

        <ComponentExample
          title="Default"
          code={`import { Button } from "@/components/ui/button"

export function ButtonDefault() {
  return <Button>Button</Button>
}`}
        >
          <Button>Button</Button>
        </ComponentExample>

        <ComponentExample
          title="Outline"
          code={`import { Button } from "@/components/ui/button"

export function ButtonOutline() {
  return <Button variant="outline">Outline</Button>
}`}
        >
          <Button variant="outline">Outline</Button>
        </ComponentExample>

        <ComponentExample
          title="Secondary"
          code={`import { Button } from "@/components/ui/button"

export function ButtonSecondary() {
  return <Button variant="secondary">Secondary</Button>
}`}
        >
          <Button variant="secondary">Secondary</Button>
        </ComponentExample>

        <ComponentExample
          title="Ghost"
          code={`import { Button } from "@/components/ui/button"

export function ButtonGhost() {
  return <Button variant="ghost">Ghost</Button>
}`}
        >
          <Button variant="ghost">Ghost</Button>
        </ComponentExample>

        <ComponentExample
          title="Destructive"
          code={`import { Button } from "@/components/ui/button"

export function ButtonDestructive() {
  return <Button variant="destructive">Destructive</Button>
}`}
        >
          <Button variant="destructive">Destructive</Button>
        </ComponentExample>

        <ComponentExample
          title="Link"
          code={`import { Button } from "@/components/ui/button"

export function ButtonLink() {
  return <Button variant="link">Link</Button>
}`}
        >
          <Button variant="link">Link</Button>
        </ComponentExample>

        <ComponentExample
          title="Icon"
          code={`import { Ionicons } from "@expo/vector-icons"
import { Button } from "@/components/ui/button"

export function ButtonIcon() {
  return (
    <Button variant="outline" size="icon">
      <Ionicons name="cloud-upload" size={16} className="text-foreground" />
    </Button>
  )
}`}
        >
          <Button variant="outline" size="icon">
            <Ionicons name="cloud-upload" size={16} className="text-foreground" />
          </Button>
        </ComponentExample>

        <ComponentExample
          title="With Icon"
          code={`import { Ionicons } from "@expo/vector-icons"
import { Button } from "@/components/ui/button"

export function ButtonWithIcon() {
  return (
    <Button variant="outline" size="sm">
      <Ionicons name="git-branch" size={16} className="text-foreground" />
      New Branch
    </Button>
  )
}`}
        >
          <Button variant="outline" size="sm">
            <Ionicons name="git-branch" size={16} className="text-foreground" />
            New Branch
          </Button>
        </ComponentExample>

        <ComponentExample
          title="Rounded"
          code={`import { Ionicons } from "@expo/vector-icons"
import { Button } from "@/components/ui/button"

export function ButtonRounded() {
  return (
    <Button variant="outline" size="icon" className="rounded-full">
      <Ionicons name="arrow-up" size={16} />
    </Button>
  )
}`}
        >
          <Button variant="outline" size="icon" className="rounded-full">
            <Ionicons name="arrow-up" size={16} />
          </Button>
        </ComponentExample>

        <ComponentExample
          title="Disabled"
          code={`import { Button } from "@/components/ui/button"

export function ButtonDisabled() {
  return <Button disabled>Disabled</Button>
}`}
        >
          <Button disabled>Disabled</Button>
        </ComponentExample>

        <ComponentExample
          title="Spinner"
          code={`import { Button } from "@/components/ui/button"

export function ButtonLoading() {
  return (
    <Button size="sm" variant="outline" loading>
      Submit
    </Button>
  )
}`}
        >
          <Button size="sm" variant="outline" loading>
            Submit
          </Button>
        </ComponentExample>

        <ComponentExample
          title="As Child"
          code={`import { Link } from "expo-router"
import { Button } from "@/components/ui/button"

export function ButtonAsChild() {
  return (
    <Button variant="outline" asChild>
      <Link href="/docs">Go to Docs</Link>
    </Button>
  )
}`}
        >
          <Button variant="outline" asChild>
            <Link href="/docs">Go to Docs</Link>
          </Button>
        </ComponentExample>
      </ComponentSection>

      <ComponentApiReference
        description="The Button component extends Pressable with additional styling and functionality."
        props={[
          { name: "variant", type: '"default" | "destructive" | "outline" | "secondary" | "ghost" | "link"', default: '"default"' },
          { name: "size", type: '"default" | "sm" | "lg" | "icon" | "icon-sm" | "icon-lg"', default: '"default"' },
          { name: "disabled", type: "boolean", default: "false" },
          { name: "loading", type: "boolean", default: "false" },
          { name: "asChild", type: "boolean", default: "false", description: "Render as child element, passing button styles to it" },
        ]}
      />

      <ComponentNote>
        The Button component uses Pressable under the hood with built-in press feedback. It supports a loading prop that displays an ActivityIndicator and disables interaction.
      </ComponentNote>

      <ComponentSourceSection component={component} />
    </DocsPage>
  );
}
