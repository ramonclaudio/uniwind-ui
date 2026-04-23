# Uniwind UI

[Docs](https://uniwind-ui.vercel.app/) · [Components](https://uniwind-ui.vercel.app/docs/components)

I use shadcn/ui in every TypeScript project I build. When I started using Uniwind for React Native, I wanted the same experience: well-designed components I could copy, paste, and own. Nothing like that existed, so I built it.

shadcn/ui components for React Native, built on [Uniwind](https://uniwind.dev/). Copy the code, modify it, ship it.

## Components

| Component | Description |
| --- | --- |
| [Badge](src/components/ui/badge.tsx) | Status indicators and labels |
| [Button](src/components/ui/button.tsx) | 6 variants: default, destructive, outline, secondary, ghost, link |
| [Card](src/components/ui/card.tsx) | Header, content, footer composition |
| [Checkbox](src/components/ui/checkbox.tsx) | Controlled/uncontrolled with indeterminate state |
| [Input](src/components/ui/input.tsx) | Text input with theme integration |
| [Label](src/components/ui/label.tsx) | Form labels |
| [Navigation Menu](src/components/ui/navigation-menu.tsx) | Responsive collapse on smaller screens |
| [Select](src/components/ui/select.tsx) | Dropdown with groups and search |
| [Separator](src/components/ui/separator.tsx) | Horizontal and vertical dividers |
| [Spinner](src/components/ui/spinner.tsx) | Loading indicator |
| [Text](src/components/ui/text.tsx) | Typography variants and font styles |
| [Textarea](src/components/ui/textarea.tsx) | Multi-line input |

## Usage

1. Copy the component from [`src/components/ui/`](src/components/ui/)
2. Copy [`src/lib/utils.ts`](src/lib/utils.ts) (required for the `cn` utility)
3. Import and use

## Requirements

- React Native 0.76+
- Uniwind 1.0+
- Tailwind CSS 4+
- `clsx`, `tailwind-merge`

Per-component dependencies:

| Component | Dependency | Swappable |
| --- | --- | --- |
| Select | `react-native-dropdown-picker` | no |
| Checkbox | `@expo/vector-icons` | any icon library |
| NavigationMenu | `@expo/vector-icons`, `expo-router` | any icon library, any router |

## Why Uniwind

[Uniwind](https://uniwind.dev/) is from the creators of Unistyles. Fastest Tailwind implementation for React Native, 2.5x faster than alternatives. Styles are precomputed at build time, zero runtime cost. Same classNames as Tailwind, native performance.

## License

MIT
