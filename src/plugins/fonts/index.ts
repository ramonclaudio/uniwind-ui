/**
 * Expo Fonts Plugin
 *
 * Provides seamless font handling across Expo Go and Development Builds.
 *
 * ## How it works
 *
 * | Environment    | Font Loading              | Font Application        |
 * |----------------|---------------------------|-------------------------|
 * | Expo Go        | useFonts() in _layout.tsx | Inline fontFamily style |
 * | Dev Build      | expo-font plugin          | Uniwind classes         |
 * | Web            | CSS @theme                | Uniwind classes         |
 *
 * ## Setup
 *
 * 1. Add font files to `assets/fonts/`
 *
 * 2. Configure `app.json` (for dev builds):
 *    ```json
 *    "plugins": [
 *      ["expo-font", {
 *        "fonts": ["./assets/fonts/YourFont-Regular.ttf"]
 *      }]
 *    ]
 *    ```
 *
 * 3. Configure `_layout.tsx` (for Expo Go):
 *    ```tsx
 *    const [fontsLoaded] = useFonts({
 *      "YourFont-Regular": require("../../assets/fonts/YourFont-Regular.ttf"),
 *    });
 *    ```
 *
 * 4. Configure `global.css` (for web/dev builds):
 *    ```css
 *    @theme {
 *      --font-sans: 'YourFont-Regular';
 *    }
 *    ```
 *
 * 5. Update `config.ts` with your font names
 *
 * ## Usage
 *
 * ```tsx
 * import { Text } from "@/plugins/fonts";
 *
 * <Text>Regular text</Text>
 * <Text bold>Bold text</Text>
 * <Text italic>Italic text</Text>
 * <Text className="text-lg text-primary">Styled text</Text>
 * ```
 */

export { Text, type TextProps } from "./Text";
export { FONTS, FONT_CLASSES, type FontVariant } from "./config";
