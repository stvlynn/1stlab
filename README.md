# FirstLab Landing Page

A modern, international landing page for FirstLab - an international AI enthusiast community primarily serving Chinese, English, and Japanese users.

## Features

- **Multi-language Support**: Automatic language switching based on browser preferences (Chinese, English, Japanese)
- **Modern Design**: Clean, minimal design with glassmorphism effects
- **Responsive Layout**: Works seamlessly on desktop, tablet, and mobile devices
- **Brand Colors**: FirstLab orange (#FF6934) accent color with white background and black text
- **Glassmorphism**: Frosted glass effects on cards, tabs, and navigation elements
- **Rounded Corners**: 32px border radius throughout the design

## Tech Stack

- React 19 with TypeScript
- Tailwind CSS for styling
- Remixicon for icons
- Custom internationalization system

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone or download the project
2. Navigate to the project directory:
   ```bash
   cd firstlab-landing
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm start
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
```

The build artifacts will be stored in the `build/` directory.

## Project Structure

```
src/
├── App.tsx              # Main application component
├── i18n.ts             # Internationalization logic
├── index.tsx           # Application entry point
├── index.css           # Global styles with Tailwind directives
└── ...
```

## Internationalization

The application automatically detects the browser's language preference and switches between:
- **Chinese (zh)**: For Chinese users
- **English (en)**: Default fallback
- **Japanese (ja)**: For Japanese users

All translations are managed in `src/i18n.ts`.

## Community Links

- **Discord**: https://discord.gg/PwZDHH4mv3
- **Hello Dify Guidebook**: https://hellodify.com

## Design Specifications

- **Primary Color**: #FF6934 (FirstLab Orange)
- **Background**: White (#FFFFFF)
- **Text**: Black (#000000)
- **Border Radius**: 32px
- **Glassmorphism**: White backgrounds with 60% opacity and backdrop blur

## Available Scripts

- `npm start` - Starts development server
- `npm run build` - Builds for production
- `npm test` - Runs tests
- `npm run eject` - Ejects from Create React App (⚠️ irreversible)