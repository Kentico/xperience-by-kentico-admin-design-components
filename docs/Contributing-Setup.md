# Contributing Setup

This document covers the steps a maintainer or developer would follow to work on this library in their development environment.

## Required Software

### Node.js Runtime

- [Node.js](https://nodejs.org/en/download) v24 or newer
- [NVM for Windows](https://github.com/coreybutler/nvm-windows) or [nvm](https://github.com/nvm-sh/nvm) to manage multiple installed Node.js versions

### Editor

- [VS Code](https://code.visualstudio.com/) (recommended — workspace settings are included)
- [Cursor](https://www.cursor.com/)
- Any editor with TypeScript support

## Project Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/Kentico/xperience-by-kentico-admin-design-components
   cd xperience-by-kentico-admin-design-components
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start Storybook to browse and develop components:

   ```bash
   npm run storybook
   ```

   Storybook will be available at `http://localhost:6006`.

## Available Scripts

| Script                    | Description                              |
| ------------------------- | ---------------------------------------- |
| `npm run storybook`       | Start Storybook on port 6006             |
| `npm run build-storybook` | Build a static Storybook site            |
| `npm run typecheck`       | Run TypeScript type-checking (no output) |

## Development Workflow

1. Create a new branch with one of the following prefixes:
   - `feat/` — for new components or functionality
   - `refactor/` — for restructuring of existing components
   - `fix/` — for bug fixes
   - `docs/` — for documentation updates

2. Make your changes. Each component lives in `src/components/<ComponentName>/` and should include:
   - `<ComponentName>.tsx` — component source
   - `<ComponentName>.css` — component styles (use tokens, never hardcode colors)
   - `<ComponentName>.types.ts` — exported TypeScript types (if needed)
   - `index.ts` — re-exports
   - `<ComponentName>.stories.tsx` — Storybook stories

3. Update `registry.json` if you add or modify a component — this is the source of truth for agent workflows.

5. Commit changes using [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/#summary) where possible.

6. Once ready, open a PR on GitHub. The PR should:
   - Have a clear description of the scope of changes
   - Include screenshots or video for any visual changes
   - Note any registry changes made

7. This repository stores files with `lf` line endings. On Windows, configure Git to checkout as `crlf` and commit as `lf`:

   ```bash
   git config --global core.autocrlf true
   ```

## CSS Token System

All components must use CSS custom properties from `src/styles/tokens.css`. Never hardcode colors, spacing, or typography values.

