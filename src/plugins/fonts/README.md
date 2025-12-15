# Expo Fonts Plugin

Seamless font handling across Expo Go and Development Builds.

## The Problem

- **Expo Go**: Requires `useFonts()` hook + inline `fontFamily` styles
- **Dev Builds**: Uses `expo-font` plugin + Uniwind/Tailwind classes
- **Web**: Uses CSS `@theme` variables

This plugin automatically detects the environment and applies fonts correctly.

## How It Works

| Environment | Font Loading | Font Application |
|-------------|--------------|------------------|
| Expo Go | `useFonts()` in `_layout.tsx` | Inline `fontFamily` style |
| Dev Build | `expo-font` plugin in `app.json` | Uniwind classes |
| Web | CSS in `global.css` | Uniwind classes |

## Usage

```tsx
import { Text } from "@/plugins/fonts";
// or via the re-export:
import { Text } from "@/components/ui/text";

<Text>Regular text</Text>
<Text bold>Bold text</Text>
<Text italic>Italic text</Text>
<Text bold italic>Bold italic text</Text>
<Text className="text-lg text-primary">Styled text</Text>
```

## Configuration

### 1. Add Font Files

Place your font files in `assets/fonts/`:
```
assets/
  fonts/
    YourFont-Regular.ttf
    YourFont-Bold.ttf
    YourFont-Italic.ttf
    YourFont-BoldItalic.ttf
```

### 2. Update Plugin Config

Edit `src/plugins/fonts/config.ts`:
```ts
export const FONTS = {
  regular: "YourFont-Regular",
  bold: "YourFont-Bold",
  italic: "YourFont-Italic",
  boldItalic: "YourFont-BoldItalic",
} as const;
```

### 3. Configure app.json (for Dev Builds)

```json
{
  "expo": {
    "plugins": [
      ["expo-font", {
        "fonts": [
          "./assets/fonts/YourFont-Regular.ttf",
          "./assets/fonts/YourFont-Bold.ttf",
          "./assets/fonts/YourFont-Italic.ttf",
          "./assets/fonts/YourFont-BoldItalic.ttf"
        ]
      }]
    ]
  }
}
```

### 4. Configure _layout.tsx (for Expo Go)

```tsx
import { useFonts } from "expo-font";

const [fontsLoaded] = useFonts({
  "YourFont-Regular": require("../../assets/fonts/YourFont-Regular.ttf"),
  "YourFont-Bold": require("../../assets/fonts/YourFont-Bold.ttf"),
  "YourFont-Italic": require("../../assets/fonts/YourFont-Italic.ttf"),
  "YourFont-BoldItalic": require("../../assets/fonts/YourFont-BoldItalic.ttf"),
});
```

### 5. Configure global.css (for Web/Dev Builds)

```css
@theme {
  --font-sans: 'YourFont-Regular';
  --font-sans-bold: 'YourFont-Bold';
  --font-sans-italic: 'YourFont-Italic';
  --font-sans-bold-italic: 'YourFont-BoldItalic';
}
```

## Files

- `config.ts` - Font names and class mappings
- `Text.tsx` - Font-aware Text component
- `index.ts` - Public exports
