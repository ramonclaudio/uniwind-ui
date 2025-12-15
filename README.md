# Uniwind UI

shadcn/ui components for React Native, built on [Uniwind](https://uniwind.dev/).

I use shadcn/ui in every TypeScript project I build. When I started using Uniwind for React Native, I wanted the same experience: well-designed components I could copy, paste, and own. This didn't exist, so I built it.

Copy the code. Modify it. Ship it.

## Components

| Component | Description |
|-----------|-------------|
| Badge | Status indicators and labels |
| Button | 6 variants: default, destructive, outline, secondary, ghost, link |
| Card | Header, content, footer composition |
| Checkbox | Controlled/uncontrolled with indeterminate state |
| Input | Text input with theme integration |
| Label | Form labels |
| Navigation Menu | Responsive collapse on smaller screens |
| Select | Dropdown with groups and search |
| Separator | Horizontal and vertical dividers |
| Spinner | Loading indicator |
| Text | Typography variants and font styles |
| Textarea | Multi-line input |

## Usage

1. Browse [`src/components/ui/`](src/components/ui/)
2. Copy the component into your project
3. Copy [`src/lib/utils.ts`](src/lib/utils.ts) for the `cn` utility
4. Import and use

```tsx
import { Button } from "@/components/ui/button";

<Button variant="destructive" onPress={handleDelete}>
  Delete
</Button>
```

## Requirements

Your project needs:
- React Native 0.76+
- Uniwind 1.0+
- Tailwind CSS 4+
- clsx, tailwind-merge

Additional dependencies:

| Component | Dependency | Swappable |
|-----------|------------|-----------|
| Select | react-native-dropdown-picker | - |
| Checkbox | @expo/vector-icons | Any icon library |
| NavigationMenu | @expo/vector-icons, expo-router | Any icon library, any router |

## Why Uniwind

[Uniwind](https://uniwind.dev/) is from the creators of Unistyles. It's the fastest Tailwind implementation for React Native—2x faster than alternatives. Styles are precomputed at build time. Zero runtime cost.

If you know Tailwind, you know Uniwind. Same classNames, native performance.

## Links

- [Uniwind](https://uniwind.dev/)
- [shadcn/ui](https://ui.shadcn.com/)

## Author

[Ray](https://x.com/ramonclaudio)

## License

MIT
