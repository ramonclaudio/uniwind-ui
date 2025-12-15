import { View } from "react-native";
import { Text } from "@/components/ui/text";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
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
} from "@/components/docs";

export default function TextareaPage() {
  return (
    <DocsPage>
      <ComponentHeader
        name="Textarea"
        description="Displays a form textarea or a component that looks like a textarea."
      />

      <ComponentDemo
        code={`import { Textarea } from "@/components/ui/textarea"

export function TextareaDemo() {
  return <Textarea placeholder="Type your message here." />
}`}
      >
        <Textarea placeholder="Type your message here." />
      </ComponentDemo>

      <ComponentUsage
        import={`import { Textarea } from "@/components/ui/textarea"`}
        usage={`<Textarea />`}
      />

      <ComponentSection title="Examples">
        <ComponentExample
          title="Default"
          code={`import { Textarea } from "@/components/ui/textarea"

export function TextareaDefault() {
  return <Textarea placeholder="Type your message here." />
}`}
        >
          <Textarea placeholder="Type your message here." />
        </ComponentExample>

        <ComponentExample
          title="Disabled"
          code={`import { Textarea } from "@/components/ui/textarea"

export function TextareaDisabled() {
  return <Textarea placeholder="Type your message here." editable={false} />
}`}
        >
          <Textarea placeholder="Type your message here." editable={false} />
        </ComponentExample>

        <ComponentExample
          title="With Label"
          code={`import { View } from "react-native"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export function TextareaWithLabel() {
  return (
    <View className="w-full gap-3">
      <Label nativeID="message">Your message</Label>
      <Textarea
        placeholder="Type your message here."
        accessibilityLabelledBy="message"
      />
    </View>
  )
}`}
        >
          <View className="w-full gap-3">
            <Label nativeID="message">Your message</Label>
            <Textarea
              placeholder="Type your message here."
              accessibilityLabelledBy="message"
            />
          </View>
        </ComponentExample>

        <ComponentExample
          title="With Text"
          code={`import { View, Text } from "react-native"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export function TextareaWithText() {
  return (
    <View className="w-full gap-3">
      <Label nativeID="message-2">Your Message</Label>
      <Textarea
        placeholder="Type your message here."
        accessibilityLabelledBy="message-2"
      />
      <Text className="font-sans text-sm text-muted-foreground">
        Your message will be copied to the support team.
      </Text>
    </View>
  )
}`}
        >
          <View className="w-full gap-3">
            <Label nativeID="message-2">Your Message</Label>
            <Textarea
              placeholder="Type your message here."
              accessibilityLabelledBy="message-2"
            />
            <Text className="text-sm text-muted-foreground">
              Your message will be copied to the support team.
            </Text>
          </View>
        </ComponentExample>

        <ComponentExample
          title="With Button"
          code={`import { View } from "react-native"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export function TextareaWithButton() {
  return (
    <View className="w-full gap-2">
      <Textarea placeholder="Type your message here." />
      <Button>Send message</Button>
    </View>
  )
}`}
        >
          <View className="w-full gap-2">
            <Textarea placeholder="Type your message here." />
            <Button>Send message</Button>
          </View>
        </ComponentExample>
      </ComponentSection>

      <ComponentApiReference
        description="Textarea extends React Native's TextInput with multiline support."
        props={[
          { name: "editable", type: "boolean", default: "true", description: "Set to false to disable the textarea" },
        ]}
      />

      <ComponentNote>
        Textarea extends React Native{"'"}s TextInput with multiline enabled by default and consistent styling. Use the className prop to adjust height (e.g., min-h-[120px]).
      </ComponentNote>
    </DocsPage>
  );
}
