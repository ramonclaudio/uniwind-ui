import { useState } from "react";
import { Platform, Pressable, ScrollView, View, StyleSheet, useWindowDimensions } from "react-native";
import { Text } from "@/components/ui/text";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useUniwind } from "uniwind";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox, type CheckedState } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel as SelectGroupLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { DotGrid } from "@/components/dot-grid";
import { AnimatedHeroBg } from "@/components/animated-hero-bg";

function SectionLabel({ children }: { children: string }) {
  return (
    <Text className="text-xs text-muted-foreground uppercase tracking-wide">
      {children}
    </Text>
  );
}

function TextDemo() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Text</CardTitle>
        <CardDescription>
          A configurable Text component with font variant support.
        </CardDescription>
      </CardHeader>
      <CardContent className="gap-4">
        <View className="gap-2">
          <SectionLabel>Font Variants</SectionLabel>
          <View className="gap-1">
            <Text>Regular text</Text>
            <Text bold>Bold text</Text>
            <Text italic>Italic text</Text>
            <Text bold italic>Bold italic text</Text>
          </View>
        </View>

        <Separator />

        <View className="gap-2">
          <SectionLabel>Sizes</SectionLabel>
          <View className="gap-1">
            <Text className="text-xs">Extra small text</Text>
            <Text className="text-sm">Small text</Text>
            <Text className="text-base">Base text</Text>
            <Text className="text-lg">Large text</Text>
            <Text className="text-xl">Extra large text</Text>
            <Text className="text-2xl">2XL text</Text>
          </View>
        </View>

        <Separator />

        <View className="gap-2">
          <SectionLabel>Colors</SectionLabel>
          <View className="gap-1">
            <Text className="text-foreground">Foreground</Text>
            <Text className="text-muted-foreground">Muted foreground</Text>
            <Text className="text-primary">Primary</Text>
            <Text className="text-destructive">Destructive</Text>
          </View>
        </View>
      </CardContent>
    </Card>
  );
}

function CardDemo() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Card</CardTitle>
        <CardDescription>
          Displays a card with header, content, and footer sections.
        </CardDescription>
      </CardHeader>
      <CardContent className="gap-4">
        <View className="gap-2">
          <SectionLabel>Login Form</SectionLabel>
          <Card>
            <CardHeader>
              <CardTitle>Login to your account</CardTitle>
              <CardDescription>
                Enter your email below to login to your account
              </CardDescription>
              <CardAction>
                <Button variant="link" size="sm">
                  <Text>Sign Up</Text>
                </Button>
              </CardAction>
            </CardHeader>
            <CardContent>
              <View className="flex-col gap-4">
                <View className="gap-2">
                  <Label>Email</Label>
                  <Input placeholder="m@example.com" keyboardType="email-address" />
                </View>
                <View className="gap-2">
                  <View className="flex-row items-center">
                    <Label>Password</Label>
                    <Pressable className="ml-auto">
                      <Text className="text-sm text-foreground">
                        Forgot your password?
                      </Text>
                    </Pressable>
                  </View>
                  <Input secureTextEntry placeholder="••••••••" />
                </View>
              </View>
            </CardContent>
            <CardFooter className="flex-col gap-2">
              <Button className="w-full">
                <Text>Login</Text>
              </Button>
              <Button variant="outline" className="w-full">
                <Text>Login with Google</Text>
              </Button>
            </CardFooter>
          </Card>
        </View>

        <Separator />

        <View className="gap-2">
          <SectionLabel>Notification Card</SectionLabel>
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>You have 3 unread messages.</CardDescription>
            </CardHeader>
            <CardContent>
              <Text className="text-sm text-muted-foreground">
                Your recent notifications will appear here.
              </Text>
            </CardContent>
            <CardFooter className="gap-2">
              <Button size="sm">
                <Text>View All</Text>
              </Button>
              <Button variant="outline" size="sm">
                <Text>Dismiss</Text>
              </Button>
            </CardFooter>
          </Card>
        </View>

        <Separator />

        <View className="gap-2">
          <SectionLabel>Subscribe Card</SectionLabel>
          <Card>
            <CardHeader>
              <CardTitle>Subscribe</CardTitle>
              <CardDescription>Get updates in your inbox.</CardDescription>
            </CardHeader>
            <CardContent className="gap-3">
              <Input placeholder="Enter your email" keyboardType="email-address" />
            </CardContent>
            <CardFooter>
              <Button className="flex-1">
                <Text>Subscribe</Text>
              </Button>
            </CardFooter>
          </Card>
        </View>
      </CardContent>
    </Card>
  );
}

function ButtonsDemo() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Button</CardTitle>
        <CardDescription>
          Displays a button or a component that looks like a button.
        </CardDescription>
      </CardHeader>
      <CardContent className="gap-4">
        <View className="gap-2">
          <SectionLabel>Variants</SectionLabel>
          <View className="flex-row flex-wrap gap-2">
            <Button>
              <Text>Default</Text>
            </Button>
            <Button variant="secondary">
              <Text>Secondary</Text>
            </Button>
            <Button variant="destructive">
              <Text>Destructive</Text>
            </Button>
            <Button variant="outline">
              <Text>Outline</Text>
            </Button>
            <Button variant="ghost">
              <Text>Ghost</Text>
            </Button>
            <Button variant="link">
              <Text>Link</Text>
            </Button>
          </View>
        </View>

        <Separator />

        <View className="gap-2">
          <SectionLabel>Sizes</SectionLabel>
          <View className="flex-row flex-wrap gap-2 items-center">
            <Button size="sm">
              <Text>Small</Text>
            </Button>
            <Button size="default">
              <Text>Default</Text>
            </Button>
            <Button size="lg">
              <Text>Large</Text>
            </Button>
          </View>
        </View>

        <Separator />

        <View className="gap-2">
          <SectionLabel>Icon Sizes</SectionLabel>
          <View className="flex-row flex-wrap gap-2 items-center">
            <Button size="icon-sm" variant="outline">
              <Ionicons name="arrow-forward" size={16} className="text-foreground" />
            </Button>
            <Button size="icon" variant="outline">
              <Ionicons name="arrow-forward" size={16} className="text-foreground" />
            </Button>
            <Button size="icon-lg" variant="outline">
              <Ionicons name="arrow-forward" size={20} className="text-foreground" />
            </Button>
          </View>
        </View>

        <Separator />

        <View className="gap-2">
          <SectionLabel>With Icon</SectionLabel>
          <View className="flex-row flex-wrap gap-2 items-center">
            <Button variant="outline" size="sm">
              <Ionicons name="git-branch" size={16} className="text-foreground" />
              <Text>New Branch</Text>
            </Button>
            <Button variant="outline" size="icon" className="rounded-full">
              <Ionicons name="arrow-up" size={16} className="text-foreground" />
            </Button>
          </View>
        </View>

        <Separator />

        <View className="gap-2">
          <SectionLabel>States</SectionLabel>
          <View className="flex-row flex-wrap gap-2 items-center">
            <Button disabled>
              <Text>Disabled</Text>
            </Button>
            <Button loading>
              <Text>Loading</Text>
            </Button>
          </View>
        </View>

        <Separator />

        <View className="gap-2">
          <SectionLabel>As Child</SectionLabel>
          <View className="flex-row">
            <Button variant="outline" asChild>
              <Link href="/docs">Go to Docs</Link>
            </Button>
          </View>
        </View>
      </CardContent>
    </Card>
  );
}

function BadgesDemo() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Badge</CardTitle>
        <CardDescription>
          Displays a badge or a component that looks like a badge.
        </CardDescription>
      </CardHeader>
      <CardContent className="gap-4">
        <View className="gap-2">
          <SectionLabel>Variants</SectionLabel>
          <View className="flex-row flex-wrap gap-2">
            <Badge>
              <Text className="text-xs">Default</Text>
            </Badge>
            <Badge variant="secondary">
              <Text className="text-xs">Secondary</Text>
            </Badge>
            <Badge variant="destructive">
              <Text className="text-xs">Destructive</Text>
            </Badge>
            <Badge variant="outline">
              <Text className="text-xs">Outline</Text>
            </Badge>
          </View>
        </View>

        <Separator />

        <View className="gap-2">
          <SectionLabel>With Icon</SectionLabel>
          <View className="flex-row flex-wrap gap-2 items-center">
            <Badge className="bg-info gap-1">
              <Ionicons name="checkmark-circle" size={12} className="text-info-foreground" />
              <Text className="text-xs text-info-foreground">Verified</Text>
            </Badge>
            <Badge className="gap-1">
              <Ionicons name="checkmark-circle" size={12} color="white" />
              <Text className="text-xs">Success</Text>
            </Badge>
            <Badge variant="destructive" className="gap-1">
              <Ionicons name="alert-circle" size={12} color="white" />
              <Text className="text-xs">Error</Text>
            </Badge>
            <Badge variant="secondary" className="gap-1">
              <Ionicons name="star" size={12} />
              <Text className="text-xs">Featured</Text>
            </Badge>
            <Badge variant="outline" className="gap-1">
              <Ionicons name="time-outline" size={12} />
              <Text className="text-xs">Pending</Text>
            </Badge>
          </View>
        </View>

        <Separator />

        <View className="gap-2">
          <SectionLabel>Number Badges</SectionLabel>
          <View className="flex-row flex-wrap gap-2 items-center">
            <Badge className="h-5 min-w-5 justify-center rounded-full px-1.5">
              <Text className="text-xs font-mono text-primary-foreground">8</Text>
            </Badge>
            <Badge className="h-5 min-w-5 justify-center rounded-full px-1.5" variant="destructive">
              <Text className="text-xs font-mono text-destructive-foreground">99</Text>
            </Badge>
            <Badge className="h-5 min-w-5 justify-center rounded-full px-1.5" variant="outline">
              <Text className="text-xs font-mono text-foreground">20+</Text>
            </Badge>
          </View>
        </View>

        <Separator />

        <View className="gap-2">
          <SectionLabel>With Spinner</SectionLabel>
          <View className="flex-row flex-wrap gap-2 items-center">
            <Badge className="gap-1.5">
              <Spinner size="small" />
              <Text className="text-xs">Loading</Text>
            </Badge>
            <Badge variant="secondary" className="gap-1.5">
              <Spinner size="small" />
              <Text className="text-xs">Syncing</Text>
            </Badge>
            <Badge variant="outline" className="gap-1.5">
              <Spinner size="small" />
              <Text className="text-xs">Processing</Text>
            </Badge>
          </View>
        </View>

        <Separator />

        <View className="gap-2">
          <SectionLabel>As Child</SectionLabel>
          <View className="flex-row">
            <Badge variant="secondary" asChild>
              <Link href="/">Go Home</Link>
            </Badge>
          </View>
        </View>
      </CardContent>
    </Card>
  );
}

function InputsDemo() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Input</CardTitle>
        <CardDescription>
          Displays a form input field or a component that looks like an input.
        </CardDescription>
      </CardHeader>
      <CardContent className="gap-4">
        <View className="gap-2">
          <SectionLabel>Default</SectionLabel>
          <Input placeholder="Enter text..." />
        </View>

        <Separator />

        <View className="gap-2">
          <SectionLabel>With Label</SectionLabel>
          <View className="gap-1.5">
            <Label>Email</Label>
            <Input placeholder="email@example.com" keyboardType="email-address" />
          </View>
        </View>

        <Separator />

        <View className="gap-2">
          <SectionLabel>Password</SectionLabel>
          <View className="gap-1.5">
            <Label>Password</Label>
            <Input placeholder="Enter password" secureTextEntry />
          </View>
        </View>

        <Separator />

        <View className="gap-2">
          <SectionLabel>With Button</SectionLabel>
          <View className="flex-row gap-2">
            <Input placeholder="Email" className="flex-1" />
            <Button variant="outline">
              <Text>Subscribe</Text>
            </Button>
          </View>
        </View>

        <Separator />

        <View className="gap-2">
          <SectionLabel>Disabled</SectionLabel>
          <Input placeholder="Disabled input" editable={false} />
        </View>
      </CardContent>
    </Card>
  );
}

function TextareaDemo() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Textarea</CardTitle>
        <CardDescription>
          Displays a form textarea or a component that looks like a textarea.
        </CardDescription>
      </CardHeader>
      <CardContent className="gap-4">
        <View className="gap-2">
          <SectionLabel>Default</SectionLabel>
          <Textarea placeholder="Type your message here..." />
        </View>

        <Separator />

        <View className="gap-2">
          <SectionLabel>With Label</SectionLabel>
          <View className="gap-1.5">
            <Label>Bio</Label>
            <Textarea placeholder="Tell us about yourself..." />
          </View>
        </View>

        <Separator />

        <View className="gap-2">
          <SectionLabel>With Text</SectionLabel>
          <View className="gap-1.5">
            <Label>Your Message</Label>
            <Textarea placeholder="Type your message here..." />
            <Text className="text-sm text-muted-foreground">
              Your message will be copied to the support team.
            </Text>
          </View>
        </View>

        <Separator />

        <View className="gap-2">
          <SectionLabel>With Button</SectionLabel>
          <View className="gap-2">
            <Textarea placeholder="Type your message here..." />
            <Button>
              <Text>Send message</Text>
            </Button>
          </View>
        </View>

        <Separator />

        <View className="gap-2">
          <SectionLabel>Disabled</SectionLabel>
          <Textarea placeholder="Disabled textarea" editable={false} />
        </View>
      </CardContent>
    </Card>
  );
}

function CheckboxDemo() {
  const [checked1, setChecked1] = useState<CheckedState>(false);
  const [checked2, setChecked2] = useState<CheckedState>(true);
  const [cardChecked, setCardChecked] = useState<CheckedState>(true);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Checkbox</CardTitle>
        <CardDescription>
          A control that allows the user to toggle between checked and not checked.
        </CardDescription>
      </CardHeader>
      <CardContent className="gap-4">
        <View className="gap-2">
          <SectionLabel>States</SectionLabel>
          <View className="gap-3">
            <View className="flex-row items-center gap-3">
              <Checkbox checked={checked1} onCheckedChange={setChecked1} />
              <Label>Unchecked (click to toggle)</Label>
            </View>
            <View className="flex-row items-center gap-3">
              <Checkbox checked={checked2} onCheckedChange={setChecked2} />
              <Label>Checked (click to toggle)</Label>
            </View>
            <View className="flex-row items-center gap-3">
              <Checkbox checked="indeterminate" />
              <Label>Indeterminate</Label>
            </View>
          </View>
        </View>

        <Separator />

        <View className="gap-2">
          <SectionLabel>Disabled</SectionLabel>
          <View className="gap-3">
            <View className="flex-row items-center gap-3">
              <Checkbox disabled />
              <Label className="opacity-50">Disabled unchecked</Label>
            </View>
            <View className="flex-row items-center gap-3">
              <Checkbox disabled defaultChecked />
              <Label className="opacity-50">Disabled checked</Label>
            </View>
          </View>
        </View>

        <Separator />

        <View className="gap-2">
          <SectionLabel>With Description</SectionLabel>
          <View className="flex-row items-start gap-3">
            <Checkbox defaultChecked className="mt-0.5" />
            <View className="flex-1 gap-1">
              <Label>Accept terms and conditions</Label>
              <Text className="text-xs text-muted-foreground">
                You agree to our Terms of Service and Privacy Policy.
              </Text>
            </View>
          </View>
        </View>

        <Separator />

        <View className="gap-2">
          <SectionLabel>Checkbox Card</SectionLabel>
          <Pressable
            onPress={() => setCardChecked(cardChecked === true ? false : true)}
            className={`flex-row items-start gap-3 rounded-lg border p-3 ${
              cardChecked === true ? "border-info-border bg-info-muted" : "border-border"
            }`}
          >
            <Checkbox
              checked={cardChecked}
              onCheckedChange={setCardChecked}
              className={cardChecked === true ? "border-info bg-info text-info-foreground" : ""}
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
        </View>
      </CardContent>
    </Card>
  );
}

function SpinnerDemo() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Spinner</CardTitle>
        <CardDescription>
          Displays a loading indicator to show that content is being loaded.
        </CardDescription>
      </CardHeader>
      <CardContent className="gap-4">
        <View className="gap-2">
          <SectionLabel>Sizes</SectionLabel>
          <View className="flex-row items-end gap-6">
            <View className="items-center gap-2">
              <Spinner size="small" />
              <Text className="text-xs text-muted-foreground">Small</Text>
            </View>
            <View className="items-center gap-2">
              <Spinner size="large" />
              <Text className="text-xs text-muted-foreground">Large</Text>
            </View>
          </View>
        </View>

        <Separator />

        <View className="gap-2">
          <SectionLabel>Colors</SectionLabel>
          <View className="flex-row items-center gap-6">
            <View className="items-center gap-2">
              <Spinner className="text-foreground" />
              <Text className="text-xs text-muted-foreground">Default</Text>
            </View>
            <View className="items-center gap-2">
              <Spinner className="text-primary" />
              <Text className="text-xs text-muted-foreground">Primary</Text>
            </View>
            <View className="items-center gap-2">
              <Spinner className="text-destructive" />
              <Text className="text-xs text-muted-foreground">Destructive</Text>
            </View>
          </View>
        </View>

        <Separator />

        <View className="gap-2">
          <SectionLabel>In Button</SectionLabel>
          <View className="flex-row gap-2">
            <Button loading>
              <Text>Loading</Text>
            </Button>
            <Button variant="outline" loading>
              <Text>Please wait</Text>
            </Button>
          </View>
        </View>

        <Separator />

        <View className="gap-2">
          <SectionLabel>In Badge</SectionLabel>
          <View className="flex-row flex-wrap gap-2">
            <Badge className="gap-1.5">
              <Spinner size="small" />
              <Text className="text-xs">Syncing</Text>
            </Badge>
            <Badge variant="secondary" className="gap-1.5">
              <Spinner size="small" />
              <Text className="text-xs">Updating</Text>
            </Badge>
            <Badge variant="outline" className="gap-1.5">
              <Spinner size="small" />
              <Text className="text-xs">Processing</Text>
            </Badge>
          </View>
        </View>
      </CardContent>
    </Card>
  );
}

function SeparatorDemo() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Separator</CardTitle>
        <CardDescription>
          Visually or semantically separates content.
        </CardDescription>
      </CardHeader>
      <CardContent className="gap-4">
        <View className="gap-2">
          <SectionLabel>Title + Navigation</SectionLabel>
          <View>
            <View className="gap-1">
              <Text className="text-sm leading-none text-foreground" bold>
                Uniwind Primitives
              </Text>
              <Text className="text-sm text-muted-foreground">
                An open-source UI component library.
              </Text>
            </View>
            <Separator className="my-4" />
            <View className="flex-row h-5 items-center gap-4">
              <Text className="text-sm text-foreground">Blog</Text>
              <Separator orientation="vertical" />
              <Text className="text-sm text-foreground">Docs</Text>
              <Separator orientation="vertical" />
              <Text className="text-sm text-foreground">Source</Text>
            </View>
          </View>
        </View>

        <Separator />

        <View className="gap-2">
          <SectionLabel>Horizontal</SectionLabel>
          <View className="border border-border rounded-md p-3 gap-3">
            <Text className="text-sm">Content above</Text>
            <Separator />
            <Text className="text-sm">Content below</Text>
          </View>
        </View>

        <Separator />

        <View className="gap-2">
          <SectionLabel>Vertical</SectionLabel>
          <View className="flex-row items-center gap-3 h-6">
            <Text className="text-sm">Left</Text>
            <Separator orientation="vertical" />
            <Text className="text-sm">Center</Text>
            <Separator orientation="vertical" />
            <Text className="text-sm">Right</Text>
          </View>
        </View>

        <Separator />

        <View className="gap-2">
          <SectionLabel>In List</SectionLabel>
          <View className="gap-0 border border-border rounded-md overflow-hidden">
            <View className="px-3 py-2">
              <Text className="text-sm">Item One</Text>
            </View>
            <Separator />
            <View className="px-3 py-2">
              <Text className="text-sm">Item Two</Text>
            </View>
            <Separator />
            <View className="px-3 py-2">
              <Text className="text-sm">Item Three</Text>
            </View>
          </View>
        </View>
      </CardContent>
    </Card>
  );
}

function LabelDemo() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Label</CardTitle>
        <CardDescription>
          Renders an accessible label associated with controls.
        </CardDescription>
      </CardHeader>
      <CardContent className="gap-4">
        <View className="gap-2">
          <SectionLabel>With Input</SectionLabel>
          <View className="gap-1.5">
            <Label>Email</Label>
            <Input placeholder="email@example.com" keyboardType="email-address" />
          </View>
        </View>

        <Separator />

        <View className="gap-2">
          <SectionLabel>With Checkbox</SectionLabel>
          <View className="flex-row items-center gap-3">
            <Checkbox defaultChecked />
            <Label>Accept terms and conditions</Label>
          </View>
        </View>

        <Separator />

        <View className="gap-2">
          <SectionLabel>Styled</SectionLabel>
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
        </View>
      </CardContent>
    </Card>
  );
}

function SelectDemo() {
  const [value, setValue] = useState("");
  const [fruit, setFruit] = useState("");
  const [timezone, setTimezone] = useState("");

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Select</CardTitle>
        <CardDescription>
          Displays a list of options for the user to pick from.
        </CardDescription>
      </CardHeader>
      <CardContent className="gap-4">
        <View className="gap-2">
          <SectionLabel>Default</SectionLabel>
          <Select value={value} onValueChange={setValue}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectGroupLabel>Fruits</SelectGroupLabel>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="blueberry">Blueberry</SelectItem>
                <SelectItem value="grapes">Grapes</SelectItem>
                <SelectItem value="pineapple">Pineapple</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </View>

        <Separator />

        <View className="gap-2">
          <SectionLabel>With Label</SectionLabel>
          <View className="gap-1.5">
            <Label>Favorite Fruit</Label>
            <Select value={fruit} onValueChange={setFruit}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a fruit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="orange">Orange</SelectItem>
                <SelectItem value="grape">Grape</SelectItem>
                <SelectItem value="mango">Mango</SelectItem>
              </SelectContent>
            </Select>
          </View>
        </View>

        <Separator />

        <View className="gap-2">
          <SectionLabel>Scrollable (Multiple Groups)</SectionLabel>
          <Select value={timezone} onValueChange={setTimezone}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a timezone" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectGroupLabel>North America</SelectGroupLabel>
                <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
                <SelectItem value="cst">Central Standard Time (CST)</SelectItem>
                <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectGroupLabel>Europe</SelectGroupLabel>
                <SelectItem value="gmt">Greenwich Mean Time (GMT)</SelectItem>
                <SelectItem value="cet">Central European Time (CET)</SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectGroupLabel>Asia</SelectGroupLabel>
                <SelectItem value="ist">India Standard Time (IST)</SelectItem>
                <SelectItem value="jst">Japan Standard Time (JST)</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </View>

        <Separator />

        <View className="gap-2">
          <SectionLabel>Disabled</SectionLabel>
          <Select disabled defaultValue="apple">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectGroupLabel>Fruits</SelectGroupLabel>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </View>
      </CardContent>
    </Card>
  );
}

function MasonryGrid({ children }: { children: React.ReactNode[] }) {
  const { width } = useWindowDimensions();
  const columnCount = width >= 1024 ? 3 : width >= 768 ? 2 : 1;
  const columns: React.ReactNode[][] = Array.from({ length: columnCount }, () => []);
  children.forEach((child, index) => {
    columns[index % columnCount].push(child);
  });

  return (
    <View className="flex-row gap-4">
      {columns.map((column, columnIndex) => (
        <View key={columnIndex} className="flex-1 gap-4">
          {column}
        </View>
      ))}
    </View>
  );
}

export default function HomePage() {
  const { theme } = useUniwind();
  const isWeb = Platform.OS === "web";

  return (
    <View style={styles.container} className="bg-background">
      {/* Dot grid texture for full page */}
      <DotGrid spacing={24} dotSize={1} opacity={0.04} />

      {isWeb && <SiteHeader />}

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View className="relative overflow-hidden">
          {/* Animated floating orbs for hero */}
          <AnimatedHeroBg />

          <View className="px-6 py-16 md:py-24 lg:py-32 relative z-10">
            <View className="items-center max-w-4xl mx-auto">
              <Badge variant="outline" className="mb-6">
                <Text className="text-xs">Copy. Paste. Ship.</Text>
              </Badge>

              <Text
                bold
                className="text-5xl md:text-7xl lg:text-8xl text-foreground text-center mb-4 tracking-tight"
              >
                Uniwind UI
              </Text>

              <Text className="text-xl md:text-2xl text-muted-foreground text-center mb-4">
                shadcn/ui for React Native
              </Text>

              <Text className="text-sm md:text-base text-muted-foreground/60 text-center mb-10 max-w-xl">
                Built on Uniwind. Styles precomputed at build time, 2.5x faster than alternatives.
                iOS, Android, Web.
              </Text>

              <Button size="lg" asChild>
                <Link href="/docs/components">
                  <Text className="text-primary-foreground">Browse Components</Text>
                  <Ionicons name="arrow-forward" size={16} className="text-primary-foreground ml-1" />
                </Link>
              </Button>
            </View>
          </View>
        </View>

        <View className="px-4 pb-8 md:px-8 lg:px-12">
          <View className="max-w-6xl w-full mx-auto">
            <MasonryGrid>
              <BadgesDemo />
              <ButtonsDemo />
              <CardDemo />
              <CheckboxDemo />
              <InputsDemo />
              <LabelDemo />
              <SelectDemo />
              <SeparatorDemo />
              <SpinnerDemo />
              <TextDemo />
              <TextareaDemo />
            </MasonryGrid>
          </View>
        </View>

        <SiteFooter />
      </ScrollView>

      <StatusBar style={theme === "dark" ? "light" : "dark"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
});
