---
name: add-component
description: Copy a component from the Xbyk design system into the current project. Pass the component name as the argument.
---

# Add component

Copy the component named **$ARGUMENTS** from the Xperience by Kentico design system into this project.

## Steps

1. **Find the component** — Read `registry.json`, locate the entry where `name` matches "$ARGUMENTS" (case-insensitive). If not found, list similar names and stop.

2. **Check shared requirements** — If `src/lib/cn.ts`, `src/styles/tokens.css` do not exist in this project, copy them from the design system repo. Tell the user to run `npm install classnames` if not already installed.

3. **Resolve internal deps** — For each name in `internalDeps`, recursively check if that component is already present. If not, copy it first (repeat this workflow for each dep).

4. **Copy component files** — For each path in the `files` array, copy the file to `src/components/<ComponentName>/` in this project. Adjust any relative import paths that break due to the new location.

5. **Report npm deps** — If `npmDeps` is non-empty, tell the user: "Run: `npm install <deps>`"

6. **Confirm** — List each file that was copied and each dep that was resolved. Show the import path the user should use.

## Notes

- Target directory defaults to `src/components/` — if this project uses a different convention, ask the user before copying.
- Do not modify the component logic — copy files as-is, only fix import paths.
- If a component file already exists at the target path, ask before overwriting.
