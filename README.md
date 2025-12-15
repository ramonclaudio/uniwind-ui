# Uniwind UI

A 1:1 port of [shadcn/ui](https://ui.shadcn.com/) for React Native, built on [Uniwind](https://uniwind.dev/).

Copy and paste into your apps. Open Source. MIT License.

## Components

| Component | Description |
|-----------|-------------|
| Badge | Status indicators and labels |
| Button | Pressable with variants (default, destructive, outline, secondary, ghost, link) |
| Card | Container with header, content, footer composition |
| Checkbox | Controlled/uncontrolled boolean input |
| Input | Text input with theme integration |
| Label | Form labels |
| Navigation Menu | App navigation with responsive collapse |
| Select | Dropdown picker with groups |
| Separator | Visual dividers |
| Spinner | Loading indicator |
| Text | Theme-aware text with font variants |
| Textarea | Multi-line text input |

## Usage

1. Browse components at [`src/components/ui/`](src/components/ui/)
2. Copy the component file into your project
3. Copy [`src/lib/utils.ts`](src/lib/utils.ts) (provides the `cn` utility)
4. Import and use

```tsx
import { Button } from "@/components/ui/button";

<Button variant="default" onPress={() => {}}>
  Press me
</Button>
```

## Requirements

Your project needs:
- React Native 0.76+
- Uniwind 1.0+
- Tailwind CSS 4+
- clsx
- tailwind-merge

Some components have additional dependencies you can customize:

| Component | Default | Swap for |
|-----------|---------|----------|
| Select | react-native-dropdown-picker | - |
| Checkbox | @expo/vector-icons | Any icon library |
| NavigationMenu | @expo/vector-icons, expo-router | Any icon library, any router |

## Why Uniwind?

[Uniwind](https://uniwind.dev/) is the fastest Tailwind CSS implementation for React Native.

- 2.5x faster than alternatives
- Full Tailwind 4 support
- TypeScript autocomplete
- Platform variants (`ios:`, `android:`)
- Zero runtime cost

## Philosophy

Inspired by [shadcn/ui](https://ui.shadcn.com/): copy the code, own it, modify it. No black-box dependencies.

This is not an npm package. Not a framework. Just components you copy into your project.

## Links

- [Uniwind](https://uniwind.dev/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)

## Author

[Ray](https://x.com/ramonclaudio)

## License

MIT
