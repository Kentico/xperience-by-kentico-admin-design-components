---
name: list-components
description: Search and list components in the Xbyk design system registry. Pass a search term to filter, or leave empty to list all.
---

# List components

Search the Xperience by Kentico design system registry.

Read `registry.json` from the repo root. The file has a `components` array with 114 entries.

If the user passed a search term ($ARGUMENTS), filter components where the search term appears in `name`, `description`, `category`, or `useCases` (case-insensitive).

If no argument was passed, list all components grouped by `category`.

## Analyze

For each matching component, show:

- **Name** — component identifier
- **Category** — grouping
- **Description** — one-line summary (truncate at 120 chars if longer)
- **Internal deps** — other components required (`internalDeps`)
- **NPM deps** — external packages required (`npmDeps`)

Format as a clean markdown table or grouped list. End with:

> To copy a component: `/add-component <name>`
