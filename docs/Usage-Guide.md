# Usage Guide

This guide covers the **copy-on-demand** workflow for copying component source files from this repo directly into your project. This is use case 3 — a customization fallback for when [`@kentico/xperience-admin-components`](https://www.npmjs.com/package/@kentico/xperience-admin-components) doesn't cover your need. See the [README](../README.md) for the full picture.

## Overview

Rather than installing a package, you copy the component source files you need directly into your project. This gives you full ownership of the code but means the copy no longer tracks upstream changes.

The component registry (`registry.json` at the root of this repo) is the source of truth for all component metadata, including file paths, internal dependencies, and npm package requirements.

---

## Step 1 — Discover Components

Browse `registry.json`. Each entry contains:

| Field               | Description                                                                           |
| ------------------- | ------------------------------------------------------------------------------------- |
| `name`              | Component identifier                                                                  |
| `category`          | Grouping: `actions`, `form`, `layout`, `feedback`, `navigation`, `display`, `complex` |
| `description`       | Props, variants, and behavior                                                         |
| `visualDescription` | Appearance description                                                                |
| `useCases`          | When to reach for this component                                                      |
| `files`             | Exact source file paths to copy                                                       |
| `internalDeps`      | Other library components required at runtime                                          |
| `npmDeps`           | External npm packages to install                                                      |
| `preview`           | Path to a PNG screenshot                                                              |

Component screenshots are in the `previews/` directory.

---

## Step 2 — Copy Shared Requirements (once per project)

All components share a common foundation. Copy these files **once** into your target project before adding any component:

| Source                  | Copy to target project                     |
| ----------------------- | ------------------------------------------ |
| `src/lib/cn.ts`         | `src/lib/cn.ts`                            |
| `src/tokens/colors.ts`  | `src/tokens/colors.ts`                     |
| `src/styles/tokens.css` | `src/styles/tokens.css`                    |
| `src/index.css`         | Append contents or import in your root CSS |

Install the required npm dependency:

```bash
npm install classnames
```

Import tokens in your app entry point. Order matters:

```ts
import "./src/styles/tokens.css";
import "./src/index.css";
```

---

## Step 3 — Copy a Component

1. Find the component entry in `registry.json`.
2. Copy each file listed in `files` to `src/components/<ComponentName>/` in your project.
3. Recursively resolve `internalDeps` — repeat Step 3 for each dependency listed.
4. Install any packages listed in `npmDeps`.

---

## Step 4 — Update Imports

After copying, adjust relative import paths in the copied files to match your project's directory structure. Imports inside components reference sibling files using relative paths that may not match your layout.

---

## AI Agent Workflow

For the full agent workflow covering all three use cases (npm package reference, design tokens, and copy-on-demand), see [AGENTS.md](../AGENTS.md).

For copy-on-demand specifically, agents should follow Steps 1–4 above. The `/add-component <name>` Claude Code skill automates this when running inside this repository directory.

---

## Component Categories Reference

| Category     | What's in it                              |
| ------------ | ----------------------------------------- |
| `actions`    | Buttons, menus, triggers                  |
| `form`       | Inputs, selects, date pickers, checkboxes |
| `layout`     | Containers, stacks, grids, panels         |
| `feedback`   | Alerts, toasts, spinners, progress        |
| `navigation` | Breadcrumbs, tabs, pagination             |
| `display`    | Labels, badges, icons, avatars, tables    |
| `complex`    | Composed multi-component patterns         |
