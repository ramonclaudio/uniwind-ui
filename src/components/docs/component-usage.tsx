import { View } from "react-native";
import { ComponentSection } from "./component-section";
import { ComponentSource } from "./component-source";

interface ComponentUsageProps {
  import: string;
  usage?: string;
}

export function ComponentUsage({ import: importCode, usage }: ComponentUsageProps) {
  return (
    <ComponentSection title="Usage">
      <ComponentSource code={importCode} collapsible={false} />
      {usage && (
        <View className="mt-4">
          <ComponentSource code={usage} collapsible={false} />
        </View>
      )}
    </ComponentSection>
  );
}
