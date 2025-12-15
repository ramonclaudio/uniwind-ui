import { ComponentSection } from "./component-section";
import { ComponentSource } from "./component-source";
import type { RegistryItem } from "@/lib/registry";

interface ComponentSourceSectionProps {
  component: RegistryItem;
}

export function ComponentSourceSection({ component }: ComponentSourceSectionProps) {
  return (
    <ComponentSection title="Source">
      <ComponentSource
        title={component.files[0].path}
        code={component.files[0].content}
      />
    </ComponentSection>
  );
}
