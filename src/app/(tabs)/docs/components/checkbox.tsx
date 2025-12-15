import { View, Pressable } from "react-native";
import { Text } from "@/components/ui/text";
import { useState } from "react";
import { Checkbox, type CheckedState } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  DocsPage,
  ComponentHeader,
  ComponentDemo,
  ComponentUsage,
  ComponentApiReference,
  ComponentNote,
  ComponentSourceSection,
  Installation,
} from "@/components/docs";
import { useComponent } from "@/lib/registry";

function CheckboxCard() {
  const [checked, setChecked] = useState<CheckedState>(true);

  return (
    <Pressable
      onPress={() => setChecked(checked === true ? false : true)}
      className={`flex-row items-start gap-3 rounded-lg border p-3 ${
        checked === true ? "border-info-border bg-info-muted" : "border-border web:hover:bg-accent/50"
      }`}
    >
      <Checkbox
        checked={checked}
        onCheckedChange={setChecked}
        className={checked === true ? "border-info bg-info text-info-foreground" : ""}
      />
      <View className="flex-1 flex-col gap-1.5">
        <Text className="text-sm leading-none text-foreground">
          Enable notifications
        </Text>
        <Text className="text-sm text-muted-foreground">
          You can enable or disable notifications at any time.
        </Text>
      </View>
    </Pressable>
  );
}

export default function CheckboxPage() {
  const component = useComponent("checkbox");

  return (
    <DocsPage>
      <ComponentHeader component={component} />

      <ComponentDemo
        code={`import { View, Pressable } from "react-native"
import { useState } from "react"
import { Text } from "@/components/ui/text"
import { Checkbox, type CheckedState } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export function CheckboxDemo() {
  const [checked, setChecked] = useState<CheckedState>(true)

  return (
    <View className="flex-col gap-6">
      <View className="flex-row items-center gap-3">
        <Checkbox />
        <Label>Accept terms and conditions</Label>
      </View>
      <View className="flex-row items-start gap-3">
        <Checkbox defaultChecked />
        <View className="flex-1 flex-col gap-2">
          <Label>Accept terms and conditions</Label>
          <Text className="text-sm text-muted-foreground">
            By clicking this checkbox, you agree to the terms and conditions.
          </Text>
        </View>
      </View>
      <View className="flex-row items-center gap-3">
        <Checkbox checked="indeterminate" />
        <Label>Indeterminate state</Label>
      </View>
      <View className="flex-row items-start gap-3 opacity-50">
        <Checkbox disabled />
        <Label>Disabled unchecked</Label>
      </View>
      <View className="flex-row items-start gap-3 opacity-50">
        <Checkbox disabled defaultChecked />
        <Label>Disabled checked</Label>
      </View>
      <Pressable
        onPress={() => setChecked(checked === true ? false : true)}
        className={\`flex-row items-start gap-3 rounded-lg border p-3 \${
          checked === true ? "border-info-border bg-info-muted" : "border-border web:hover:bg-accent/50"
        }\`}
      >
        <Checkbox
          checked={checked}
          onCheckedChange={setChecked}
          className={checked === true ? "border-info bg-info text-info-foreground" : ""}
        />
        <View className="flex-1 flex-col gap-1.5 font-normal">
          <Text className="text-sm font-normal leading-none text-foreground">
            Enable notifications
          </Text>
          <Text className="text-sm text-muted-foreground">
            You can enable or disable notifications at any time.
          </Text>
        </View>
      </Pressable>
    </View>
  )
}`}
      >
        <View className="flex-col gap-6">
          <View className="flex-row items-center gap-3">
            <Checkbox />
            <Label>Accept terms and conditions</Label>
          </View>
          <View className="flex-row items-start gap-3">
            <Checkbox defaultChecked />
            <View className="flex-1 flex-col gap-2">
              <Label>Accept terms and conditions</Label>
              <Text className="text-sm text-muted-foreground">
                By clicking this checkbox, you agree to the terms and conditions.
              </Text>
            </View>
          </View>
          <View className="flex-row items-center gap-3">
            <Checkbox checked="indeterminate" />
            <Label>Indeterminate state</Label>
          </View>
          <View className="flex-row items-start gap-3 opacity-50">
            <Checkbox disabled />
            <Label>Disabled unchecked</Label>
          </View>
          <View className="flex-row items-start gap-3 opacity-50">
            <Checkbox disabled defaultChecked />
            <Label>Disabled checked</Label>
          </View>
          <CheckboxCard />
        </View>
      </ComponentDemo>

      <Installation component={component} />

      <ComponentUsage
        import={`import { Checkbox } from "@/components/ui/checkbox"`}
        usage={`<Checkbox />`}
      />

      <ComponentApiReference
        description="The Checkbox component is a controlled or uncontrolled toggle input with full Radix UI API parity."
        props={[
          { name: "checked", type: 'boolean | "indeterminate"', default: "undefined", description: "Controlled checked state" },
          { name: "defaultChecked", type: "boolean", default: "false", description: "Initial checked state (uncontrolled)" },
          { name: "onCheckedChange", type: '(checked: boolean | "indeterminate") => void', default: "undefined", description: "Callback when checked state changes" },
          { name: "disabled", type: "boolean", default: "false", description: "Whether the checkbox is disabled" },
          { name: "required", type: "boolean", default: "false", description: "Whether the checkbox is required (for form semantics)" },
          { name: "name", type: "string", default: "undefined", description: "Name attribute for form submission" },
          { name: "value", type: "string", default: '"on"', description: "Value attribute for form submission" },
          { name: "checkIcon", type: "ReactNode", default: "undefined", description: "Custom check icon when checked" },
          { name: "indeterminateIcon", type: "ReactNode", default: "undefined", description: "Custom icon when indeterminate" },
          { name: "iconSize", type: "number", default: "14", description: "Size of the default icons" },
          { name: "asChild", type: "boolean", default: "false", description: "Render as child element, passing checkbox styles and behavior to it" },
        ]}
      />

      <ComponentNote>
        The Text component from @/components/ui/text is recommended for consistent styling, but React Native's built-in Text component works as a fallback.
      </ComponentNote>

      <ComponentSourceSection component={component} />
    </DocsPage>
  );
}
