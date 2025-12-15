import { ScrollView, View, Pressable } from "react-native";
import { Text } from "@/components/ui/text";
import { Link, type Href } from "expo-router";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { type ReactNode } from "react";

// Text preview component to avoid naming conflict with Text import
function TextPreview() {
  return (
    <View className="gap-1">
      <Text>Regular</Text>
      <Text bold>Bold</Text>
      <Text italic>Italic</Text>
    </View>
  );
}

const components: { name: string; href: string; description: string; preview: ReactNode }[] = [
  {
    name: "Badge",
    href: "/docs/components/badge",
    description: "Displays a badge or a component that looks like a badge.",
    preview: (
      <View className="flex-row gap-2">
        <Badge>Badge</Badge>
        <Badge variant="secondary">New</Badge>
        <Badge variant="outline">Outline</Badge>
      </View>
    ),
  },
  {
    name: "Button",
    href: "/docs/components/button",
    description: "Displays a button or a component that looks like a button.",
    preview: (
      <View className="flex-row gap-2">
        <Button size="sm">
          <Text className="text-primary-foreground">Primary</Text>
        </Button>
        <Button size="sm" variant="secondary">
          <Text className="text-secondary-foreground">Secondary</Text>
        </Button>
        <Button size="sm" variant="outline">
          <Text>Outline</Text>
        </Button>
      </View>
    ),
  },
  {
    name: "Card",
    href: "/docs/components/card",
    description: "Displays a card with header, content, and footer.",
    preview: (
      <Card className="p-4 w-44">
        <Text className="text-sm text-foreground mb-1">Card Title</Text>
        <Text className="text-xs text-muted-foreground">Card content goes here.</Text>
      </Card>
    ),
  },
  {
    name: "Checkbox",
    href: "/docs/components/checkbox",
    description: "A control that allows toggling between checked and unchecked.",
    preview: (
      <View className="flex-row items-center gap-4">
        <View className="flex-row items-center gap-2">
          <Checkbox checked />
          <Text className="text-sm">Checked</Text>
        </View>
        <View className="flex-row items-center gap-2">
          <Checkbox />
          <Text className="text-sm">Unchecked</Text>
        </View>
      </View>
    ),
  },
  {
    name: "Input",
    href: "/docs/components/input",
    description: "Displays a form input field.",
    preview: <Input placeholder="Enter your email..." className="w-48" />,
  },
  {
    name: "Label",
    href: "/docs/components/label",
    description: "Renders an accessible label associated with controls.",
    preview: (
      <View className="gap-2">
        <Label>Email address</Label>
        <Input placeholder="hello@example.com" className="w-48" />
      </View>
    ),
  },
  {
    name: "Navigation Menu",
    href: "/docs/components/navigation-menu",
    description: "A collection of links for navigating websites.",
    preview: (
      <View className="flex-row gap-1 p-1 rounded-lg bg-muted">
        <View className="px-3 py-1.5 rounded-md bg-background">
          <Text className="text-sm">Home</Text>
        </View>
        <View className="px-3 py-1.5 rounded-md">
          <Text className="text-sm text-muted-foreground">Docs</Text>
        </View>
        <View className="px-3 py-1.5 rounded-md">
          <Text className="text-sm text-muted-foreground">About</Text>
        </View>
      </View>
    ),
  },
  {
    name: "Select",
    href: "/docs/components/select",
    description: "Displays a list of options for the user to pick from.",
    preview: (
      <Select>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Select a fruit..." />
        </SelectTrigger>
      </Select>
    ),
  },
  {
    name: "Separator",
    href: "/docs/components/separator",
    description: "Visually or semantically separates content.",
    preview: (
      <View className="items-center gap-3 w-48">
        <View className="flex-row items-center gap-3 w-full">
          <Text className="text-sm">Left</Text>
          <Separator orientation="vertical" className="h-4" />
          <Text className="text-sm">Right</Text>
        </View>
        <Separator className="w-full" />
        <Text className="text-xs text-muted-foreground">Below</Text>
      </View>
    ),
  },
  {
    name: "Spinner",
    href: "/docs/components/spinner",
    description: "Displays a loading spinner indicator.",
    preview: (
      <View className="flex-row items-center gap-4">
        <Spinner size="small" />
        <Spinner size="large" />
      </View>
    ),
  },
  {
    name: "Text",
    href: "/docs/components/text",
    description: "A configurable Text component with font variant support.",
    preview: <TextPreview />,
  },
  {
    name: "Textarea",
    href: "/docs/components/textarea",
    description: "Displays a form textarea for multi-line input.",
    preview: <Textarea placeholder="Write your message here..." className="w-48 h-20" />,
  },
];

export default function ComponentsIndex() {
  return (
    <ScrollView
      className="flex-1 bg-background"
      contentContainerClassName="p-6 pb-20"
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View className="mb-6">
        <Text bold className="text-3xl text-foreground mb-2">
          Components
        </Text>
        <Text className="text-muted-foreground">
          {components.length} components available.
        </Text>
      </View>

      {/* Quick Access List */}
      <View className="flex-row flex-wrap gap-x-4 gap-y-1 mb-8">
        {components.map((component) => (
          <Link key={component.href} href={component.href as Href} asChild>
            <Pressable className="py-1">
              <Text className="text-muted-foreground underline underline-offset-4 active:text-foreground">
                {component.name}
              </Text>
            </Pressable>
          </Link>
        ))}
      </View>

      {/* Components Grid */}
      <View className="flex-row flex-wrap gap-4">
        {components.map((component) => (
          <Link key={component.href} href={component.href as Href} asChild>
            <Pressable className="w-full sm:w-[calc(50%-8px)] rounded-xl border border-border bg-card overflow-hidden active:opacity-80">
              {/* Preview Area */}
              <View
                className="h-40 items-center justify-center bg-muted/50 border-b border-border"
                style={{ pointerEvents: "none" }}
              >
                {component.preview}
              </View>
              {/* Name & Description */}
              <View className="p-4">
                <Text className="text-foreground mb-1">{component.name}</Text>
                <Text className="text-sm text-muted-foreground">{component.description}</Text>
              </View>
            </Pressable>
          </Link>
        ))}
      </View>
    </ScrollView>
  );
}
