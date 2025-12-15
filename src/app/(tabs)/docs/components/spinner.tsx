import { View } from "react-native";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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

export default function SpinnerPage() {
  return (
    <DocsPage>
      <ComponentHeader
        name="Spinner"
        description="Displays a loading spinner indicator."
      />

      <ComponentDemo
        code={`import { Spinner } from "@/components/ui/spinner"

export default function SpinnerBasic() {
  return (
    <View className="flex-col items-center justify-center gap-8">
      <Spinner />
    </View>
  )
}`}
      >
        <View className="flex-col items-center justify-center gap-8">
          <Spinner />
        </View>
      </ComponentDemo>

      <ComponentUsage
        import={`import { Spinner } from "@/components/ui/spinner"`}
        usage={`<Spinner />`}
      />

      <ComponentSection title="Examples">
        <ComponentExample
          title="Size"
          description="Use the size prop to change the size of the spinner."
          code={`import { View } from "react-native"
import { Spinner } from "@/components/ui/spinner"

export default function SpinnerSize() {
  return (
    <View className="flex-row items-center gap-6">
      <Spinner size="small" />
      <Spinner size="large" />
    </View>
  )
}`}
        >
          <View className="flex-row items-center gap-6">
            <Spinner size="small" />
            <Spinner size="large" />
          </View>
        </ComponentExample>

        <ComponentExample
          title="Color"
          description="Use text-* classes to change the color of the spinner."
          code={`import { View } from "react-native"
import { Spinner } from "@/components/ui/spinner"

export default function SpinnerColor() {
  return (
    <View className="flex-row items-center gap-6">
      <Spinner className="text-red-500" />
      <Spinner className="text-green-500" />
      <Spinner className="text-blue-500" />
      <Spinner className="text-yellow-500" />
      <Spinner className="text-purple-500" />
    </View>
  )
}`}
        >
          <View className="flex-row items-center gap-6">
            <Spinner className="text-red-500" />
            <Spinner className="text-green-500" />
            <Spinner className="text-blue-500" />
            <Spinner className="text-yellow-500" />
            <Spinner className="text-purple-500" />
          </View>
        </ComponentExample>

        <ComponentExample
          title="Button"
          description="Add a spinner to a button to indicate a loading state."
          code={`import { View } from "react-native"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"

export default function SpinnerButton() {
  return (
    <View className="flex-col items-center gap-4">
      <Button disabled size="sm">
        <Spinner />
        Loading...
      </Button>
      <Button variant="outline" disabled size="sm">
        <Spinner />
        Please wait
      </Button>
      <Button variant="secondary" disabled size="sm">
        <Spinner />
        Processing
      </Button>
    </View>
  )
}`}
        >
          <View className="flex-col items-center gap-4">
            <Button disabled size="sm">
              <Spinner />
              Loading...
            </Button>
            <Button variant="outline" disabled size="sm">
              <Spinner />
              Please wait
            </Button>
            <Button variant="secondary" disabled size="sm">
              <Spinner />
              Processing
            </Button>
          </View>
        </ComponentExample>

        <ComponentExample
          title="Badge"
          description="You can also use a spinner inside a badge."
          code={`import { View } from "react-native"
import { Badge } from "@/components/ui/badge"
import { Spinner } from "@/components/ui/spinner"

export default function SpinnerBadge() {
  return (
    <View className="flex-row items-center gap-4">
      <Badge>
        <Spinner />
        Syncing
      </Badge>
      <Badge variant="secondary">
        <Spinner />
        Updating
      </Badge>
      <Badge variant="outline">
        <Spinner />
        Processing
      </Badge>
    </View>
  )
}`}
        >
          <View className="flex-row items-center gap-4">
            <Badge>
              <Spinner />
              Syncing
            </Badge>
            <Badge variant="secondary">
              <Spinner />
              Updating
            </Badge>
            <Badge variant="outline">
              <Spinner />
              Processing
            </Badge>
          </View>
        </ComponentExample>
      </ComponentSection>

      <ComponentNote>
        The Spinner component wraps React Native{"'"}s ActivityIndicator with theme-aware defaults. Unlike the web version which uses an SVG icon, this uses the native platform spinner for optimal performance and native feel.
      </ComponentNote>

      <ComponentApiReference
        description="The Spinner component wraps ActivityIndicator with theme-aware defaults. Use text-* classes to set the color."
        props={[
          { name: "size", type: '"small" | "large"', default: '"small"' },
        ]}
      />
    </DocsPage>
  );
}
