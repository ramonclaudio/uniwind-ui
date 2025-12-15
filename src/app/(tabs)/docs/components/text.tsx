import { View } from "react-native";
import { Text } from "@/components/ui/text";
import {
  DocsPage,
  ComponentHeader,
  ComponentDemo,
  ComponentSection,
  ComponentExample,
  ComponentUsage,
  ComponentApiReference,
  ComponentSourceSection,
  ComponentNote,
  Installation,
} from "@/components/docs";
import { useComponent } from "@/lib/registry";

export default function TextPage() {
  const component = useComponent("text");

  return (
    <DocsPage>
      <ComponentHeader component={component} />

      <ComponentDemo
        code={`import { View } from "react-native"
import { Text } from "@/components/ui/text"

export function TextDemo() {
  return (
    <View className="gap-4">
      <Text variant="h1">Heading One</Text>
      <Text variant="h2">Heading Two</Text>
      <Text variant="lead">This is a lead paragraph that introduces the content.</Text>
      <Text variant="p">Regular paragraph text with standard styling.</Text>
      <Text variant="muted">Muted secondary information.</Text>
    </View>
  )
}`}
      >
        <View className="gap-4">
          <Text variant="h1">Heading One</Text>
          <Text variant="h2">Heading Two</Text>
          <Text variant="lead">This is a lead paragraph that introduces the content.</Text>
          <Text variant="p">Regular paragraph text with standard styling.</Text>
          <Text variant="muted">Muted secondary information.</Text>
        </View>
      </ComponentDemo>

      <Installation component={component} />

      <ComponentUsage
        import={`import { Text } from "@/components/ui/text"`}
        usage={`// Typography variants
<Text variant="h1">Page Title</Text>
<Text variant="lead">Introduction text</Text>
<Text variant="muted">Secondary info</Text>

// Font styles
<Text bold>Bold text</Text>
<Text italic>Italic text</Text>`}
      />

      <ComponentNote>
        This component requires font configuration in `src/lib/fonts.ts` and matching CSS
        variables in `global.css`. Without this, text may not render correctly on native platforms.
      </ComponentNote>

      <ComponentSection title="Examples">
        <ComponentExample
          title="Headings"
          code={`import { View } from "react-native"
import { Text } from "@/components/ui/text"

export function TextHeadings() {
  return (
    <View className="gap-3">
      <Text variant="h1">Heading 1</Text>
      <Text variant="h2">Heading 2</Text>
      <Text variant="h3">Heading 3</Text>
      <Text variant="h4">Heading 4</Text>
    </View>
  )
}`}
        >
          <View className="gap-3">
            <Text variant="h1">Heading 1</Text>
            <Text variant="h2">Heading 2</Text>
            <Text variant="h3">Heading 3</Text>
            <Text variant="h4">Heading 4</Text>
          </View>
        </ComponentExample>

        <ComponentExample
          title="Body Text"
          code={`import { View } from "react-native"
import { Text } from "@/components/ui/text"

export function TextBody() {
  return (
    <View className="gap-3">
      <Text variant="lead">Lead text for introductions</Text>
      <Text variant="p">Paragraph text for body content</Text>
      <Text variant="large">Large emphasized text</Text>
      <Text variant="small">Small text for details</Text>
      <Text variant="muted">Muted text for secondary info</Text>
    </View>
  )
}`}
        >
          <View className="gap-3">
            <Text variant="lead">Lead text for introductions</Text>
            <Text variant="p">Paragraph text for body content</Text>
            <Text variant="large">Large emphasized text</Text>
            <Text variant="small">Small text for details</Text>
            <Text variant="muted">Muted text for secondary info</Text>
          </View>
        </ComponentExample>

        <ComponentExample
          title="Inline Code"
          code={`import { View } from "react-native"
import { Text } from "@/components/ui/text"

export function TextCode() {
  return (
    <Text>
      Run <Text variant="code">npm install</Text> to get started.
    </Text>
  )
}`}
        >
          <Text>
            Run <Text variant="code">npm install</Text> to get started.
          </Text>
        </ComponentExample>

        <ComponentExample
          title="Font Styles"
          code={`import { View } from "react-native"
import { Text } from "@/components/ui/text"

export function TextStyles() {
  return (
    <View className="gap-2">
      <Text>Regular</Text>
      <Text bold>Bold</Text>
      <Text italic>Italic</Text>
      <Text bold italic>Bold Italic</Text>
    </View>
  )
}`}
        >
          <View className="gap-2">
            <Text>Regular</Text>
            <Text bold>Bold</Text>
            <Text italic>Italic</Text>
            <Text bold italic>Bold Italic</Text>
          </View>
        </ComponentExample>

        <ComponentExample
          title="Colors"
          code={`import { View } from "react-native"
import { Text } from "@/components/ui/text"

export function TextColors() {
  return (
    <View className="gap-2">
      <Text className="text-foreground">Foreground</Text>
      <Text className="text-muted-foreground">Muted</Text>
      <Text className="text-primary">Primary</Text>
      <Text className="text-destructive">Destructive</Text>
    </View>
  )
}`}
        >
          <View className="gap-2">
            <Text className="text-foreground">Foreground</Text>
            <Text className="text-muted-foreground">Muted</Text>
            <Text className="text-primary">Primary</Text>
            <Text className="text-destructive">Destructive</Text>
          </View>
        </ComponentExample>
      </ComponentSection>

      <ComponentSection title="Font Configuration">
        <ComponentNote>
          Fonts must be configured in two places to work on all platforms:
        </ComponentNote>
        <ComponentExample
          title="1. src/lib/fonts.ts"
          code={`// Font family names must match your loaded font files
export const FONTS = {
  regular: "YourFont-Regular",
  bold: "YourFont-Bold",
  italic: "YourFont-Italic",
  boldItalic: "YourFont-BoldItalic",
} as const;`}
        >
          <Text variant="muted">Required for native platforms (iOS/Android)</Text>
        </ComponentExample>
        <ComponentExample
          title="2. src/global.css"
          code={`@theme {
  --font-sans: 'YourFont-Regular';
  --font-sans-bold: 'YourFont-Bold';
  --font-sans-italic: 'YourFont-Italic';
  --font-sans-bold-italic: 'YourFont-BoldItalic';
}`}
        >
          <Text variant="muted">Required for web and Tailwind/Uniwind classes</Text>
        </ComponentExample>
      </ComponentSection>

      <ComponentApiReference
        description="The Text component extends React Native's Text with typography variants and font style support."
        props={[
          { name: "variant", type: '"h1" | "h2" | "h3" | "h4" | "p" | "lead" | "large" | "small" | "muted" | "code"', description: "Typography variant for semantic styling" },
          { name: "bold", type: "boolean", default: "false", description: "Apply bold font style" },
          { name: "italic", type: "boolean", default: "false", description: "Apply italic font style" },
          { name: "className", type: "string", default: '""', description: "Tailwind/Uniwind classes for styling" },
        ]}
      />

      <ComponentSourceSection component={component} />
    </DocsPage>
  );
}
