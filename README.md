# Uniwind UI

A 1:1 port of [shadcn/ui](https://ui.shadcn.com/) for React Native, built on [Uniwind](https://uniwind.dev/).

Copy and paste into your apps. Open Source. MIT License.

## Why Uniwind?

[Uniwind](https://uniwind.dev/) is the fastest Tailwind CSS implementation for React Native, created by the team behind Unistyles.

- **2.5x faster** than alternatives — styles are precomputed at build time
- **Full Tailwind 4** support with CSS variables, media queries, and custom utilities
- **TypeScript autocomplete** for all utilities, variants, and theme tokens
- **Platform variants** (`ios:`, `android:`) directly in className strings
- **Zero runtime cost** — no style computation on the device

## What This Is

**The problem:** [shadcn/ui](https://ui.shadcn.com/) provides beautifully designed components for React, but not for React Native.

**The solution:** This repository provides the same shadcn/ui components, ported 1:1 for React Native using Uniwind's full API:

- `className` prop for all styling
- `useResolveClassNames()` for dynamic style resolution
- `useCSSVariable()` for theme-aware colors
- Uniwind-specific props like `placeholderTextColorClassName`

## What This Is NOT

- Not an npm package you install
- Not affiliated with Uniwind or shadcn
- Not a framework

## Philosophy

Inspired by [shadcn/ui](https://ui.shadcn.com/): copy the code, own it, modify it. No black-box dependencies.

Works with any React Native framework — Expo, bare React Native, or whatever you prefer.

## Components

| Component | Description |
|-----------|-------------|
| Badge | Status indicators and labels |
| Button | Pressable with variants (default, destructive, outline, secondary, ghost, link) |
| Card | Container with header, content, footer composition |
| Checkbox | Controlled/uncontrolled boolean input |
| Input | Text input with theme integration |
| Label | Form labels |
| Navigation Menu | App navigation |
| Select | Dropdown picker with groups |
| Separator | Visual dividers |
| Spinner | Loading indicator |
| Text | Theme-aware text with font variants |
| Textarea | Multi-line text input |

## Getting Started

```sh
# Clone the repo
git clone https://github.com/ramonclaudio/uniwind-ui.git

# Install dependencies
npm install

# Start the app
npm start
```

## Requirements

**Core (all components):**
- React Native 0.76+
- Uniwind 1.0+
- Tailwind CSS 4+
- clsx
- tailwind-merge

**Per-component optional dependencies:**
| Component | Additional Dependencies |
|-----------|------------------------|
| Select | react-native-dropdown-picker |
| Checkbox | Any icon library (default: @expo/vector-icons) |
| NavigationMenu | Any icon library + router (default: @expo/vector-icons, expo-router) |

Expo is **not required**. The documentation site uses Expo, but the components work with any React Native setup.

## Using Components in Your Project

1. Copy the component file from `src/components/ui/`
2. Copy the `cn` utility from `src/lib/utils.ts`
3. Ensure your project has Uniwind configured
4. Import and use

Example:

```tsx
import { Button } from "@/components/ui/button";

<Button variant="default" onPress={() => {}}>
  Press me
</Button>
```

## Project Structure

```
src/
├── components/
│   ├── ui/           # The components (copy these)
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── checkbox.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── navigation-menu.tsx
│   │   ├── select.tsx
│   │   ├── separator.tsx
│   │   ├── spinner.tsx
│   │   ├── text.tsx
│   │   └── textarea.tsx
│   └── ...           # Demo app components
├── lib/
│   ├── utils.ts      # cn() utility function
│   └── ...
└── app/              # Demo app (this documentation site)
```

## How Components Use Uniwind

| Component | Uniwind API Used |
|-----------|-----------------|
| Button | `useResolveClassNames()` for icon colors |
| Select | `useCSSVariable()` for 12+ theme colors |
| Input | `placeholderTextColorClassName`, `cursorColorClassName` |
| All | `className` prop throughout |

## Links

- [Uniwind Documentation](https://uniwind.dev/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)

## Author

Created by [Ray](https://x.com/ramonclaudio)

## License

MIT
