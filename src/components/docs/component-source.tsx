import { View, Pressable, ScrollView } from "react-native";
import { Text } from "@/components/ui/text";
import { useState } from "react";
import * as Clipboard from "expo-clipboard";
import { cn } from "@/lib/utils";
import type { RegistryItem } from "@/lib/registry";

interface ComponentSourceProps {
  code: string;
  title?: string;
  className?: string;
  collapsible?: boolean;
  showLineNumbers?: boolean;
  roundedTop?: boolean;
}

export function ComponentSource({
  code,
  title,
  className,
  collapsible = true,
  showLineNumbers = true,
  roundedTop = true,
}: ComponentSourceProps) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(!collapsible);

  const handleCopy = async () => {
    await Clipboard.setStringAsync(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // For collapsible, show only first few lines when collapsed
  const lines = code.split("\n");
  const previewLines = 10;
  const shouldCollapse = collapsible && lines.length > previewLines;
  const displayLines =
    shouldCollapse && !expanded ? lines.slice(0, previewLines) : lines;

  return (
    <View
      className={cn(
        "border border-border overflow-hidden",
        roundedTop ? "rounded-lg" : "rounded-b-lg",
        className
      )}
    >
      {/* Code area */}
      <View className="bg-code">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ minWidth: "100%" }}
        >
          <View className="flex-row py-4">
            {/* Line numbers */}
            {showLineNumbers && (
              <View className="pl-4 pr-6">
                {displayLines.map((_, index) => (
                  <Text
                    key={index}
                    className="text-sm text-code-number leading-6 text-right"
                    style={{ minWidth: 24 }}
                  >
                    {index + 1}
                  </Text>
                ))}
              </View>
            )}
            {/* Code content */}
            <View className="pr-4 flex-1">
              {displayLines.map((line, index) => (
                <Text
                  key={index}
                  className="text-sm text-code-foreground leading-6"
                >
                  {renderSyntaxHighlightedLine(line)}
                </Text>
              ))}
            </View>
          </View>
        </ScrollView>

        {/* Expand/Collapse gradient overlay */}
        {shouldCollapse && !expanded && (
          <View
            className="absolute bottom-0 left-0 right-0 h-20 bg-code"
            style={{ opacity: 0.9 }}
          />
        )}
      </View>

      {/* Expand/Collapse button */}
      {shouldCollapse && (
        <Pressable
          onPress={() => setExpanded(!expanded)}
          className="py-3 bg-code border-t border-border active:opacity-80"
        >
          <Text className="text-sm text-center text-code-number">
            {expanded ? "Collapse" : "Expand"}
          </Text>
        </Pressable>
      )}

      {/* Copy button - floating */}
      <Pressable
        onPress={handleCopy}
        className="absolute top-3 right-3 px-3 py-1.5 rounded-md bg-muted active:opacity-80"
      >
        <Text className="text-xs text-code-foreground">
          {copied ? "Copied!" : "Copy"}
        </Text>
      </Pressable>
    </View>
  );
}

// Simple syntax highlighting for JSX/TSX using theme-aware colors
function renderSyntaxHighlightedLine(line: string): React.ReactNode {
  // Keywords
  const keywords = ["import", "export", "from", "const", "let", "var", "function", "return", "if", "else", "default"];
  // Simple token-based highlighting
  const parts: React.ReactNode[] = [];
  let remaining = line;
  let key = 0;

  // Match patterns in order - colors matched to shadcn/GitHub theme
  const patterns: { regex: RegExp; className: string }[] = [
    // Strings - dark blue in light, teal in dark
    { regex: /^"[^"]*"/, className: "text-syntax-string" },
    // Strings (single quotes)
    { regex: /^'[^']*'/, className: "text-syntax-string" },
    // Strings (backticks)
    { regex: /^`[^`]*`/, className: "text-syntax-string" },
    // Comments
    { regex: /^\/\/.*$/, className: "text-syntax-comment" },
    { regex: /^\/\*[\s\S]*?\*\//, className: "text-syntax-comment" },
    // JSX tags (PascalCase components) - green in light, cyan in dark
    { regex: /^<\/?[A-Z][a-zA-Z]*/, className: "text-syntax-tag" },
    // JSX tags (lowercase HTML elements)
    { regex: /^<\/?[a-z][a-zA-Z]*/, className: "text-syntax-tag" },
    // Closing bracket
    { regex: /^\/>/, className: "text-code-foreground" },
    { regex: /^>/, className: "text-code-foreground" },
    // Props/attributes - blue in light, purple in dark
    { regex: /^[a-zA-Z_][a-zA-Z0-9_]*(?==)/, className: "text-syntax-attr" },
    // Keywords - purple in light, coral in dark
    { regex: new RegExp(`^(${keywords.join("|")})(?![a-zA-Z0-9_])`), className: "text-syntax-keyword" },
    // Numbers
    { regex: /^[0-9]+(\.[0-9]+)?/, className: "text-syntax-number" },
    // Braces and brackets
    { regex: /^[{}[\]()]/, className: "text-code-foreground" },
    // Equals sign - orange/coral
    { regex: /^=/, className: "text-syntax-operator" },
    // Identifiers
    { regex: /^[a-zA-Z_][a-zA-Z0-9_]*/, className: "text-code-foreground" },
    // Other punctuation
    { regex: /^[,;:.]/, className: "text-code-foreground" },
    // Whitespace
    { regex: /^\s+/, className: "text-code-foreground" },
    // Anything else
    { regex: /^./, className: "text-code-foreground" },
  ];

  while (remaining.length > 0) {
    let matched = false;
    for (const { regex, className } of patterns) {
      const match = remaining.match(regex);
      if (match) {
        parts.push(
          <Text key={key++} className={className}>
            {match[0]}
          </Text>
        );
        remaining = remaining.slice(match[0].length);
        matched = true;
        break;
      }
    }
    if (!matched) {
      // Fallback: consume one character
      parts.push(
        <Text key={key++} className="text-code-foreground">
          {remaining[0]}
        </Text>
      );
      remaining = remaining.slice(1);
    }
  }

  return parts.length > 0 ? parts : " ";
}

interface InstallationProps {
  component?: RegistryItem;
  dependencies?: string[];
  className?: string;
}

type PackageManager = "pnpm" | "npm" | "yarn" | "bun";

const packageManagerCommands: Record<PackageManager, string> = {
  pnpm: "pnpm add",
  npm: "npm install",
  yarn: "yarn add",
  bun: "bun add",
};

export function Installation({ component, dependencies, className }: InstallationProps) {
  const deps = dependencies ?? component?.dependencies ?? [];
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"cli" | "manual">("cli");
  const [packageManager, setPackageManager] = useState<PackageManager>("pnpm");

  const command =
    deps.length > 0
      ? `${packageManagerCommands[packageManager]} ${deps.join(" ")}`
      : "# No additional dependencies required";

  const handleCopy = async () => {
    await Clipboard.setStringAsync(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <View className={cn("gap-4 mb-8", className)}>
      <Text bold className="text-2xl text-foreground tracking-tight">
        Installation
      </Text>

      {/* CLI / Manual tabs */}
      <View className="flex-row border-b border-border">
        <Pressable
          onPress={() => setActiveTab("cli")}
          className={cn(
            "pb-2 mr-6",
            activeTab === "cli" && "border-b-2 border-foreground"
          )}
        >
          <Text
            className={cn(
              "text-sm",
              activeTab === "cli" ? "text-foreground" : "text-muted-foreground"
            )}
          >
            CLI
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setActiveTab("manual")}
          className={cn(
            "pb-2",
            activeTab === "manual" && "border-b-2 border-foreground"
          )}
        >
          <Text
            className={cn(
              "text-sm",
              activeTab === "manual" ? "text-foreground" : "text-muted-foreground"
            )}
          >
            Manual
          </Text>
        </Pressable>
      </View>

      {activeTab === "cli" && deps.length > 0 && (
        <View className="rounded-lg border border-border overflow-hidden">
          {/* Package manager selector */}
          <View className="flex-row items-center bg-muted p-1.5 border-b border-border">
            {(["pnpm", "npm", "yarn", "bun"] as PackageManager[]).map((pm) => (
              <Pressable
                key={pm}
                onPress={() => setPackageManager(pm)}
                className={cn(
                  "px-3 py-1.5 rounded-md",
                  packageManager === pm && "bg-background shadow-sm"
                )}
              >
                <Text
                  className={cn(
                    "font-sans text-sm",
                    packageManager === pm
                      ? "text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {pm}
                </Text>
              </Pressable>
            ))}
          </View>

          {/* Command code block */}
          <View className="bg-code p-4 flex-row items-center justify-between">
            <Text className="text-sm text-code-foreground">{command}</Text>
            <Pressable
              onPress={handleCopy}
              className="px-3 py-1.5 rounded-md bg-muted active:opacity-80 ml-4"
            >
              <Text className="text-xs text-muted-foreground">
                {copied ? "Copied!" : "Copy"}
              </Text>
            </Pressable>
          </View>
        </View>
      )}

      {activeTab === "manual" && (
        <View className="gap-4">
          <Text className="text-sm text-muted-foreground">
            Install the following dependencies:
          </Text>
          <View className="rounded-lg border border-border overflow-hidden">
            <View className="bg-code p-4">
              <Text className="text-sm text-code-foreground">{command}</Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}
