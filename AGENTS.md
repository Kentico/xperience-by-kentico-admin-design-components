# Xperience by Kentico Admin Design System

This repo is the **source and reference library** for [`@kentico/xperience-admin-components`](https://www.npmjs.com/package/@kentico/xperience-admin-components) — the React component package for Xperience by Kentico admin UI extensions.

## Use cases

### 1. Use components from @kentico/xperience-admin-components

**When:** Building admin UI extensions using standard components from the Xperience admin framework.

The components in this repo mirror what is published in the npm package. Use this repo for context — to understand what's available, how each component works, and when to reach for it — then use the component from the npm package in the target project.

**Discovery workflow:**

1. Read `registry.json` — each entry has `name`, `category`, `description`, `visualDescription`, `useCases`, `files`, `internalDeps`, and `npmDeps`
2. Read `previews/<ComponentName>.png` to confirm the component's visual appearance
3. Read `src/components/<ComponentName>/` source and `.stories.tsx` for the full props API and usage examples
4. Use the component from `@kentico/xperience-admin-components` in the target project

### 2. Custom layouts with design tokens

**When:** Building custom layouts or UI that must visually match the Xperience admin, but no existing component in the npm package covers the need.

`src/styles/tokens.css` contains every CSS custom property used in the admin UI. Reference these tokens in custom CSS to maintain visual consistency. Never hardcode colors.

Copy `src/styles/tokens.css` and `src/index.css` once into the target project, then import in the app entry point (order matters):

```ts
import "./src/styles/tokens.css";
import "./src/index.css";
```

### 3. Copy and customize (fallback)

**When:** A component needs to be modified beyond what the npm package allows — different behavior, additional props, or structural changes. Be aware: copied components no longer track upstream changes.

This follows the [shadcn/ui](https://ui.shadcn.com/) model: source files are copied directly into the target project and owned by that project.

**Shared requirements — copy once per project:**

| Source                  | Copy to target project                       |
| ----------------------- | -------------------------------------------- |
| `src/lib/cn.ts`         | `src/lib/cn.ts`                              |
| `src/tokens/colors.ts`  | `src/tokens/colors.ts`                       |
| `src/styles/tokens.css` | `src/styles/tokens.css`                      |
| `src/index.css`         | (append contents or import in your root CSS) |

```bash
npm install classnames
```

**Copy a component:**

1. Find the entry in `registry.json`
2. Copy files listed in `files` to `src/components/<ComponentName>/` in the target project
3. Recursively copy any `internalDeps` not already present
4. Install any `npmDeps`
5. Adjust relative import paths to match the target project's structure

## What's here

- `registry.json` — component index (name, category, description, files, deps, preview path)
- `previews/` — PNG screenshots of every component
- `src/components/` — source components (TSX + CSS + types + index)
- `src/tokens/colors.ts` — TypeScript enum of all color token references (type-safe access to `tokens.css` values)
- `src/styles/tokens.css` — all design tokens (CSS custom properties)

## Claude Code skills

Available when running Claude Code **in this repo directory**:

- `/list-components [query]` — search and list components
- `/add-component <name>` — copy a component into the current project (use case 3 above)
