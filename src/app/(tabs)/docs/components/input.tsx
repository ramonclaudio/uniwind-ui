import { View } from "react-native";
import { Input } from "@/components/ui/input";
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

export default function InputPage() {
  return (
    <DocsPage>
      <ComponentHeader
        name="Input"
        description="Displays a form input field or a component that looks like an input field."
      />

      <ComponentDemo
        code={`import { View } from "react-native"
import { Input } from "@/components/ui/input"

export function InputDemo() {
  return (
    <View className="w-full max-w-sm">
      <Input placeholder="Email" />
    </View>
  )
}`}
      >
        <View className="w-full max-w-sm">
          <Input placeholder="Email" />
        </View>
      </ComponentDemo>

      <ComponentUsage
        import={`import { Input } from "@/components/ui/input"`}
        usage={`<Input placeholder="Email" />`}
      />

      <ComponentSection title="Examples">
        <ComponentExample
          title="Default"
          code={`import { View } from "react-native"
import { Input } from "@/components/ui/input"

export function InputDefault() {
  return (
    <View className="w-full max-w-sm">
      <Input placeholder="Email" />
    </View>
  )
}`}
        >
          <View className="w-full max-w-sm">
            <Input placeholder="Email" />
          </View>
        </ComponentExample>

        <ComponentExample
          title="Disabled"
          code={`import { View } from "react-native"
import { Input } from "@/components/ui/input"

export function InputDisabled() {
  return (
    <View className="w-full max-w-sm">
      <Input placeholder="Email" editable={false} />
    </View>
  )
}`}
        >
          <View className="w-full max-w-sm">
            <Input placeholder="Email" editable={false} />
          </View>
        </ComponentExample>

        <ComponentExample
          title="With Label"
          code={`import { View } from "react-native"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function InputWithLabel() {
  return (
    <View className="w-full max-w-sm gap-2">
      <Label>Email</Label>
      <Input placeholder="Email" keyboardType="email-address" />
    </View>
  )
}`}
        >
          <View className="w-full max-w-sm gap-2">
            <Label>Email</Label>
            <Input placeholder="Email" keyboardType="email-address" />
          </View>
        </ComponentExample>

        <ComponentExample
          title="With Button"
          code={`import { View } from "react-native"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function InputWithButton() {
  return (
    <View className="w-full max-w-sm flex-row gap-2">
      <Input placeholder="Email" className="flex-1" />
      <Button variant="outline">Subscribe</Button>
    </View>
  )
}`}
        >
          <View className="w-full max-w-sm flex-row gap-2">
            <Input placeholder="Email" className="flex-1" />
            <Button variant="outline">Subscribe</Button>
          </View>
        </ComponentExample>

        <ComponentExample
          title="Password"
          code={`import { View } from "react-native"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function InputPassword() {
  return (
    <View className="w-full max-w-sm gap-2">
      <Label>Password</Label>
      <Input placeholder="Enter password" secureTextEntry />
    </View>
  )
}`}
        >
          <View className="w-full max-w-sm gap-2">
            <Label>Password</Label>
            <Input placeholder="Enter password" secureTextEntry />
          </View>
        </ComponentExample>
      </ComponentSection>

      <ComponentApiReference
        description="Input extends React Native's TextInput with consistent styling."
        props={[
          { name: "editable", type: "boolean", default: "true", description: "Set to false to disable the input" },
        ]}
      />

      <ComponentNote>
        Input extends React Native{"'"}s TextInput with consistent styling. Use editable={"{"}false{"}"} for disabled state and secureTextEntry for password fields.
      </ComponentNote>
    </DocsPage>
  );
}
