# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm start` - Start development server on localhost:3000
- `npm run build` - Build for production (artifacts in `build/` directory)
- `npm test` - Run tests with Jest and React Testing Library
- `npm install` - Install dependencies

## Project Architecture

This is a React 19 + TypeScript landing page for FirstLab, an international AI enthusiast community. The application uses:

- **React 19** with TypeScript for the UI framework
- **Tailwind CSS** for styling with custom FirstLab branding
- **Custom i18n system** (`src/i18n.ts`) for multi-language support (Chinese, English, Japanese)
- **Remixicon** for icons

### Key Components

- **App.tsx** - Main application component with all sections in a single file
- **i18n.ts** - Translation system with automatic language detection based on browser locale
- **index.css** - Global styles with Tailwind directives

### Design System

- **Primary Color**: `#FF6934` (FirstLab Orange) - defined as `firstlab-orange` in Tailwind config
- **Border Radius**: `32px` throughout (custom `rounded-32` class)
- **Glassmorphism**: Consistent use of `bg-white/60 backdrop-blur-md` for frosted glass effects
- **Navigation**: Fixed header with smooth scrolling and active section tracking

### Internationalization

Language detection occurs automatically via `detectLanguage()` function checking `navigator.language`. All text content is managed through the `t()` function with keys in `translations` object. The app supports:

- Chinese (zh) - Primary language
- English (en) - Default fallback
- Japanese (ja) - Secondary language

### Advanced UI Features

#### Animated Transparent Mask System
The application now features a sophisticated animated transparent mask system with **non-linear easing** and **linear return animations**:

- **Smooth Animations**: Non-linear cubic-bezier easing for hover transitions, linear animation for return to active state
- **Perfect Alignment**: Mask size precisely matches button borders with 2px padding compensation
- **Reusable Component**: `TransparentMaskNavigation` component for consistent implementation across the app
- **Dual Animations**: Different easing curves for hover (ease-out) vs return (linear)

**Key Features:**
- **Non-linear hover animation**: `cubic-bezier(0.4, 0, 0.2, 1)` for natural movement
- **Linear return animation**: Smooth linear transition when returning to active item
- **Precise positioning**: Uses `getBoundingClientRect()` with border compensation
- **State management**: Tracks hover state vs active state separately
- **Reusable architecture**: Self-contained component with clean API

**Component API:**
```typescript
interface TransparentMaskNavigationProps {
  items: {
    id: string;
    label: string;
    href: string;
    isActive: boolean;
    onClick: (e: React.MouseEvent) => void;
  }[];
  className?: string;
}
```

### Architecture Notes

- Single-page application with smooth scrolling navigation
- All content sections are in the main App component
- Responsive design with mobile-first approach
- External links: Discord community and Hello Dify guidebook
- No complex state management - uses React hooks for local state
- **Reusable animated transparent mask navigation component** for consistent UI patterns