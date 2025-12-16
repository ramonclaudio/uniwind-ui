import { View } from "react-native";
import { Text } from "@/components/ui/text";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import {
  DocsPage,
  ComponentHeader,
  ComponentSection,
  ComponentNote,
  ComponentSource,
  ComponentPreview,
  ComponentUsage,
  ComponentApiReference,
} from "@/components/docs";

export default function NavigationMenuPage() {
  return (
    <DocsPage>
      <ComponentHeader
        name="Navigation Menu"
        description="A collection of links for navigating websites."
        links={[
          { label: "Docs", url: "https://www.radix-ui.com/docs/primitives/components/navigation-menu" },
          { label: "API Reference", url: "https://www.radix-ui.com/docs/primitives/components/navigation-menu#api-reference" },
        ]}
      />

      <View className="mb-8">
        <ComponentPreview>
          <View className="w-full items-center">
            <NavigationMenu minVisibleItems={1}>
              <NavigationMenuList overflowLabel="More">
                <NavigationMenuItem value="getting-started">
                  <NavigationMenuTrigger value="getting-started">
                    Getting Started
                  </NavigationMenuTrigger>
                  <NavigationMenuContent value="getting-started">
                    <NavigationMenuLink onPress={() => console.log("Introduction")}>
                      <View>
                        <Text className="text-sm text-foreground">
                          Introduction
                        </Text>
                        <Text className="text-xs text-muted-foreground">
                          Re-usable components built with Uniwind
                        </Text>
                      </View>
                    </NavigationMenuLink>
                    <NavigationMenuLink onPress={() => console.log("Installation")}>
                      <View>
                        <Text className="text-sm text-foreground">
                          Installation
                        </Text>
                        <Text className="text-xs text-muted-foreground">
                          How to install and configure
                        </Text>
                      </View>
                    </NavigationMenuLink>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem value="components">
                  <NavigationMenuTrigger value="components">
                    Components
                  </NavigationMenuTrigger>
                  <NavigationMenuContent value="components">
                    <NavigationMenuLink>Button</NavigationMenuLink>
                    <NavigationMenuLink>Card</NavigationMenuLink>
                    <NavigationMenuLink>Input</NavigationMenuLink>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem value="examples">
                  <NavigationMenuTrigger value="examples">
                    Examples
                  </NavigationMenuTrigger>
                  <NavigationMenuContent value="examples">
                    <NavigationMenuLink>Dashboard</NavigationMenuLink>
                    <NavigationMenuLink>Forms</NavigationMenuLink>
                    <NavigationMenuLink>Tables</NavigationMenuLink>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink href="/">
                    Documentation
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink href="/">
                    Support
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </View>
        </ComponentPreview>
        <Text className="text-xs text-muted-foreground mt-2 text-center">
          Resize the window to see items collapse into the {'"'}More{'"'} menu
        </Text>
      </View>

      <ComponentUsage
        import={`import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu"`}
        usage={`<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger value="item">Item</NavigationMenuTrigger>
      <NavigationMenuContent value="item">
        <NavigationMenuLink>Link</NavigationMenuLink>
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>`}
      />

      <ComponentSection title="Example">
        <ComponentSource
          code={`import { View, Text } from "react-native"
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu"

export function NavigationMenuDemo() {
  return (
    // minVisibleItems: minimum items to always show (default: 1)
    // responsive: enable/disable responsive collapse (default: true)
    <NavigationMenu minVisibleItems={1} responsive={true}>
      {/* overflowLabel: customize the "More" menu label */}
      <NavigationMenuList overflowLabel="More">
        <NavigationMenuItem value="getting-started">
          <NavigationMenuTrigger value="getting-started">
            Getting Started
          </NavigationMenuTrigger>
          <NavigationMenuContent value="getting-started">
            <NavigationMenuLink href="/intro">
              <View>
                <Text className="font-sans text-sm">Introduction</Text>
                <Text className="font-sans text-xs text-muted-foreground">
                  Re-usable components
                </Text>
              </View>
            </NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem value="components">
          <NavigationMenuTrigger value="components">
            Components
          </NavigationMenuTrigger>
          <NavigationMenuContent value="components">
            <NavigationMenuLink>Button</NavigationMenuLink>
            <NavigationMenuLink>Card</NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink href="/docs">
            Documentation
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink href="/support">
            Support
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}`}
          collapsible={false}
        />
      </ComponentSection>

      <ComponentApiReference
        description="NavigationMenu is composed of multiple sub-components. Use matching value props to connect triggers with their content."
        props={[
          { name: "minVisibleItems", type: "number", default: "1", description: "Minimum items to always show (NavigationMenu)" },
          { name: "responsive", type: "boolean", default: "true", description: "Enable responsive collapse (NavigationMenu)" },
          { name: "overflowLabel", type: "string", default: '"More"', description: "Label for overflow menu (NavigationMenuList)" },
          { name: "href", type: "string", default: "-", description: "Navigation URL (NavigationMenuLink)" },
          { name: "active", type: "boolean", default: "false", description: "Active state (NavigationMenuLink)" },
        ]}
      />

      <ComponentNote>
        This component includes built-in responsive collapse behavior. As the screen gets smaller, menu items progressively collapse into a {'"'}More{'"'} overflow menu, with a minimum of 1 visible item. Set responsive={"{"}false{"}"} to disable this behavior.
      </ComponentNote>
    </DocsPage>
  );
}
