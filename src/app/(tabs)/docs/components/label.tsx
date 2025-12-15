import { View } from "react-native";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  DocsPage,
  ComponentHeader,
  ComponentDemo,
  ComponentSection,
  ComponentExample,
  ComponentUsage,
  ComponentSourceSection,
  Installation,
} from "@/components/docs";
import { useComponent } from "@/lib/registry";

export default function LabelPage() {
  const component = useComponent("label");

  return (
    <DocsPage>
      <ComponentHeader component={component} />

      <ComponentDemo
        code={`import { View } from "react-native"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export function LabelDemo() {
  return (
    <View className="flex-row items-center gap-2">
      <Checkbox />
      <Label>Accept terms and conditions</Label>
    </View>
  )
}`}
      >
        <View className="flex-row items-center gap-2">
          <Checkbox />
          <Label>Accept terms and conditions</Label>
        </View>
      </ComponentDemo>

      <Installation component={component} />

      <ComponentUsage
        import={`import { Label } from "@/components/ui/label"`}
        usage={`<Label>Your email address</Label>`}
      />

      <ComponentSection title="Examples">
        <ComponentExample
          title="With Input"
          code={`import { View } from "react-native"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export function LabelWithInput() {
  return (
    <View className="gap-1.5">
      <Label>Email</Label>
      <Input placeholder="email@example.com" keyboardType="email-address" />
    </View>
  )
}`}
        >
          <View className="w-full max-w-sm gap-1.5">
            <Label>Email</Label>
            <Input placeholder="email@example.com" keyboardType="email-address" />
          </View>
        </ComponentExample>

        <ComponentExample
          title="Styled"
          code={`import { View } from "react-native"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export function LabelStyled() {
  return (
    <View className="gap-3">
      <View className="gap-1.5">
        <Label className="text-destructive">Required field *</Label>
        <Input placeholder="This field is required" />
      </View>
      <View className="gap-1.5">
        <Label className="text-muted-foreground">Optional field</Label>
        <Input placeholder="This field is optional" />
      </View>
    </View>
  )
}`}
        >
          <View className="w-full max-w-sm gap-3">
            <View className="gap-1.5">
              <Label className="text-destructive">Required field *</Label>
              <Input placeholder="This field is required" />
            </View>
            <View className="gap-1.5">
              <Label className="text-muted-foreground">Optional field</Label>
              <Input placeholder="This field is optional" />
            </View>
          </View>
        </ComponentExample>
      </ComponentSection>

      <ComponentSourceSection component={component} />
    </DocsPage>
  );
}
