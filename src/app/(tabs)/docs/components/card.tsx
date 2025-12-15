import { View, Pressable } from "react-native";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  DocsPage,
  ComponentHeader,
  ComponentDemo,
  ComponentSection,
  ComponentExample,
  ComponentUsage,
} from "@/components/docs";

export default function CardPage() {
  return (
    <DocsPage>
      <ComponentHeader
        name="Card"
        description="Displays a card with header, content, and footer."
      />

      <ComponentDemo
        code={`import { View, Pressable } from "react-native"
import { Text } from "@/components/ui/text"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function CardDemo() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
        <CardAction>
          <Button variant="link">Sign Up</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <View className="flex-col gap-6">
          <View className="gap-2">
            <Label>Email</Label>
            <Input placeholder="m@example.com" keyboardType="email-address" />
          </View>
          <View className="gap-2">
            <View className="flex-row items-center">
              <Label>Password</Label>
              <Pressable className="ml-auto">
                <Text className="text-sm text-foreground web:hover:underline">
                  Forgot your password?
                </Text>
              </Pressable>
            </View>
            <Input secureTextEntry />
          </View>
        </View>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button className="w-full">Login</Button>
        <Button variant="outline" className="w-full">
          Login with Google
        </Button>
      </CardFooter>
    </Card>
  )
}`}
      >
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
            <CardAction>
              <Button variant="link">Sign Up</Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <View className="flex-col gap-6">
              <View className="gap-2">
                <Label>Email</Label>
                <Input placeholder="m@example.com" keyboardType="email-address" />
              </View>
              <View className="gap-2">
                <View className="flex-row items-center">
                  <Label>Password</Label>
                  <Pressable className="ml-auto">
                    <Text className="text-sm text-foreground web:hover:underline">
                      Forgot your password?
                    </Text>
                  </Pressable>
                </View>
                <Input secureTextEntry />
              </View>
            </View>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button className="w-full">Login</Button>
            <Button variant="outline" className="w-full">
              Login with Google
            </Button>
          </CardFooter>
        </Card>
      </ComponentDemo>

      <ComponentUsage
        import={`import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from "@/components/ui/card"`}
        usage={`<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card Description</CardDescription>
    <CardAction>Card Action</CardAction>
  </CardHeader>
  <CardContent>
    <Text>Card Content</Text>
  </CardContent>
  <CardFooter>
    <Text>Card Footer</Text>
  </CardFooter>
</Card>`}
      />

      <ComponentSection title="Examples">
        <ComponentExample
          title="Notification Card"
          code={`import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Text } from "@/components/ui/text"

export function NotificationCard() {
  return (
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
        <Button size="sm">View All</Button>
        <Button variant="outline" size="sm">Dismiss</Button>
      </CardFooter>
    </Card>
  )
}`}
        >
          <Card className="w-full max-w-sm">
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
              <Button size="sm">View All</Button>
              <Button variant="outline" size="sm">Dismiss</Button>
            </CardFooter>
          </Card>
        </ComponentExample>

        <ComponentExample
          title="Subscribe Card"
          code={`import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function SubscribeCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Subscribe</CardTitle>
        <CardDescription>Get updates in your inbox.</CardDescription>
      </CardHeader>
      <CardContent className="gap-3">
        <Input placeholder="Enter your email" keyboardType="email-address" />
      </CardContent>
      <CardFooter>
        <Button className="flex-1">Subscribe</Button>
      </CardFooter>
    </Card>
  )
}`}
        >
          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle>Subscribe</CardTitle>
              <CardDescription>Get updates in your inbox.</CardDescription>
            </CardHeader>
            <CardContent className="gap-3">
              <Input placeholder="Enter your email" keyboardType="email-address" />
            </CardContent>
            <CardFooter>
              <Button className="flex-1">Subscribe</Button>
            </CardFooter>
          </Card>
        </ComponentExample>
      </ComponentSection>
    </DocsPage>
  );
}
