#!/usr/bin/env node
// scripts/generate-registry.cjs
// Generates registry.json from component source files.
// Run: node scripts/generate-registry.cjs

const fs = require('fs')
const path = require('path')

const ROOT = path.resolve(__dirname, '..')
const COMPONENTS_DIR = path.join(ROOT, 'src', 'components')
const OUTPUT = path.join(ROOT, 'registry.json')

// All known component directory names — used to filter internalDeps
const COMPONENT_DIRS = new Set(
  fs.readdirSync(COMPONENTS_DIR, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
)

// These are assumed to exist in any Xperience-extending project (or listed in registry requires)
const EXCLUDED_DEPS = new Set([
  'classnames', // listed in registry requires.npm
  'react',
  'react-dom',
  'react/jsx-runtime',
  'react-aria-components',
  '@react-aria/utils',
  '@react-aria/focus',
  '@react-aria/interactions',
  '@react-aria/overlays',
  '@react-aria/visually-hidden',
  '@internationalized/date',
  '@internationalized/number',
  // storybook — never a runtime dep
  'storybook/test',
  '@storybook/react',
  '@storybook/react-vite',
])

// Map storyTitle prefix → category
function categoryFromTitle(storyTitle) {
  if (!storyTitle) return 'display'
  const prefix = storyTitle.split('/')[0].toLowerCase().trim()
  const map = {
    actions: 'actions',
    action: 'actions',
    form: 'form',
    forms: 'form',
    inputs: 'form',
    layout: 'layout',
    feedback: 'feedback',
    notification: 'feedback',
    notifications: 'feedback',
    navigation: 'navigation',
    nav: 'navigation',
    display: 'display',
    data: 'display',
    complex: 'complex',
    overlay: 'feedback',
    overlays: 'feedback',
    dialogs: 'complex',
    dialog: 'complex',
    'digital marketing': 'complex',
    marketing: 'complex',
    builders: 'complex',
    builder: 'complex',
    tiles: 'display',
    tile: 'display',
    tables: 'display',
    table: 'display',
    content: 'display',
  }
  return map[prefix] || 'display'
}

// Extract the JSDoc comment immediately before the main exported component.
// Uses a line-by-line approach to avoid regex greedy/multiline pitfalls.
function extractJsDoc(content, compName) {
  const lines = content.split('\n')

  // Find the line index of the main export for this component
  const exportPattern = new RegExp(`^export (?:const|function|class|default) ${compName}`)
  let exportIdx = lines.findIndex((l) => exportPattern.test(l.trim()))

  // Fallback: any export const/function line
  if (exportIdx === -1) {
    exportIdx = lines.findIndex((l) => /^export (?:const|function)/.test(l.trim()))
  }
  if (exportIdx === -1) return null

  // Walk backwards from exportIdx to find `*/` (allowing up to 1 blank line gap)
  let closeIdx = -1
  for (let i = exportIdx - 1; i >= 0 && i >= exportIdx - 2; i--) {
    const trimmed = lines[i].trim()
    if (trimmed === '*/') { closeIdx = i; break }
    if (trimmed !== '') break // non-blank, non-*/ line — no adjacent JSDoc
  }
  if (closeIdx === -1) return null

  // Walk backwards from closeIdx to find `/**`
  let openIdx = -1
  for (let i = closeIdx - 1; i >= 0; i--) {
    if (lines[i].trim().startsWith('/**')) { openIdx = i; break }
    // If we hit a line that isn't a JSDoc line, stop
    if (!lines[i].trim().startsWith('*') && lines[i].trim() !== '') break
  }
  if (openIdx === -1) return null

  // Extract comment body between /** and */
  const commentLines = lines.slice(openIdx + 1, closeIdx)
    .map((l) => l.replace(/^\s*\*\s?/, '').trim())
    .filter((l) => l && !l.startsWith('@'))
  return commentLines.join(' ').trim() || null
}

// Extract meta.title from a stories file
function extractStoryTitle(content) {
  const match = content.match(/title:\s*['"`]([^'"`]+)['"`]/)
  return match ? match[1] : null
}

// Extract named story exports (excluding Default) as use-case hints
function extractStoryNames(content) {
  const matches = [...content.matchAll(/^export const (\w+):\s*Story/gm)]
  return matches.map((m) => m[1]).filter((n) => n !== 'Default')
}

// Extract internal component deps from import statements (../ComponentName)
// Only considers imports in the MAIN component file (ComponentName.tsx) to avoid
// sub-component sibling imports being mistaken for external deps.
// Filters against the known set of component directory names.
function extractInternalDeps(mainContent) {
  const deps = new Set()
  for (const m of mainContent.matchAll(/from\s+['"`]\.\.\/(\w+)[/'"`]/g)) {
    const name = m[1]
    if (COMPONENT_DIRS.has(name)) deps.add(name)
  }
  return [...deps].sort()
}

// Strip JSDoc and line comments to avoid matching backtick text in comments
function stripComments(content) {
  return content
    .replace(/\/\*[\s\S]*?\*\//g, '') // block comments
    .replace(/\/\/[^\n]*/g, '')         // line comments
}

// Extract external npm package names from imports
function extractNpmDeps(content) {
  const stripped = stripComments(content)
  const deps = new Set()
  for (const m of stripped.matchAll(/from\s+['"`]((?!\.\.?\/|@\/)[\w@][^'"`\s]+)['"`]/g)) {
    const pkg = m[1]
    const parts = pkg.split('/')
    const name = pkg.startsWith('@') ? `${parts[0]}/${parts[1]}` : parts[0]
    // npm package names are lowercase (or @scope/name) — skip CamelCase local refs
    if (/^[A-Z]/.test(name)) continue
    // Skip things that look like DOM properties or code fragments
    if (/^document\./.test(pkg) || /^window\./.test(pkg)) continue
    if (!EXCLUDED_DEPS.has(name) && !EXCLUDED_DEPS.has(pkg)) {
      deps.add(name)
    }
  }
  return [...deps].sort()
}

// Extract named const objects (e.g. ButtonColor = { Primary: 'primary', ... })
// Returns { ButtonColor: ['primary', 'secondary', ...], ... }
function extractTypeConstants(content) {
  const constants = {}
  for (const m of content.matchAll(/export const (\w+)\s*=\s*\{([^}]+)\}/g)) {
    const values = [...m[2].matchAll(/:\s*['"`]([^'"`]+)['"`]/g)].map((v) => v[1])
    if (values.length > 0) constants[m[1]] = values
  }
  return constants
}

// Extract key documented prop names and their inline JSDoc from an interface definition
// Returns a short summary string like "value: string. disabled: boolean. onChange callback."
function extractPropsInfo(content) {
  // Find first exported interface block
  const ifaceMatch = content.match(/export interface \w+Props[\s\S]*?\{([\s\S]*?)^}/m)
  if (!ifaceMatch) return null

  const body = ifaceMatch[1]
  // Extract prop names that have a JSDoc line immediately above them
  const propPattern = /\/\*\*\s*\n\s*\*\s+([^\n]+)\s*\n\s*\*\/\s*\n\s*(?:readonly\s+)?(\w+)\??:/g
  const props = []
  for (const m of body.matchAll(propPattern)) {
    props.push(`${m[2]}: ${m[1].trim()}`)
    if (props.length >= 5) break
  }
  if (props.length === 0) {
    // Fallback: just grab prop names (readonly or not)
    const names = [...body.matchAll(/^\s*(?:readonly\s+)?(\w+)\??\s*:/gm)].map((m) => m[1])
    if (names.length > 0) return `Props: ${names.slice(0, 6).join(', ')}.`
    return null
  }
  return props.join('. ') + '.'
}

// Build a prose description from extracted data
function buildDescription(jsDoc, typeConstants, propsInfo) {
  const parts = []
  if (jsDoc) parts.push(jsDoc)
  const entries = Object.entries(typeConstants)
  if (entries.length > 0) {
    const variants = entries
      .map(([name, values]) => `${name}: ${values.map((v) => `'${v}'`).join(' | ')}`)
      .join('. ')
    parts.push(variants + '.')
  }
  if (!jsDoc && entries.length === 0 && propsInfo) parts.push(propsInfo)
  return parts.join(' ') || null
}

// Build a visual description based on type constants and story names
function buildVisualDescription(compName, typeConstants, storyNames) {
  const parts = []

  // Color/size variant hints
  const colorKey = Object.keys(typeConstants).find((k) => /color|type|variant|style/i.test(k))
  const sizeKey = Object.keys(typeConstants).find((k) => /size/i.test(k))

  if (colorKey) parts.push(`Variants: ${typeConstants[colorKey].join(', ')}.`)
  if (sizeKey) parts.push(`Sizes: ${typeConstants[sizeKey].join(', ')}.`)
  if (storyNames.length > 0) parts.push(`Stories: ${storyNames.slice(0, 6).join(', ')}.`)

  return parts.join(' ') || `${compName} UI component.`
}

// Collect all source files for a component directory (recursive, no stories/tests)
function getComponentFiles(compDir, compName) {
  const files = []

  function walk(dir, relBase) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const rel = `${relBase}/${entry.name}`
      if (entry.isDirectory()) {
        walk(path.join(dir, entry.name), rel)
      } else if (/\.(tsx?|css)$/.test(entry.name) && !/\.(stories|test|spec)\.(tsx?|jsx?)$/.test(entry.name) && !entry.name.endsWith('.snap')) {
        files.push(`src/components/${compName}${rel}`)
      }
    }
  }

  for (const entry of fs.readdirSync(compDir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      walk(path.join(compDir, entry.name), `/${entry.name}`)
    } else if (/\.(tsx?|css)$/.test(entry.name) && !/\.(stories|test|spec)\.(tsx?|jsx?)$/.test(entry.name) && !entry.name.endsWith('.snap')) {
      files.push(`src/components/${compName}/${entry.name}`)
    }
  }

  return files.sort()
}

// Read all non-story TS/TSX content from a component for dep extraction
function readAllSource(compDir, compName) {
  const files = getComponentFiles(compDir, compName)
  return files
    .filter((f) => /\.(tsx?|ts)$/.test(f))
    .map((f) => {
      try { return fs.readFileSync(path.join(ROOT, f), 'utf8') } catch { return '' }
    })
    .join('\n')
}

function main() {
  // Directories that are not real components
  const EXCLUDE_DIRS = new Set(['types'])

  // Manual descriptions for components where auto-extraction fails (folder components / no JSDoc)
  const MANUAL_DESCRIPTIONS = {
    Charts: 'AmCharts 5 chart wrappers with Xperience design-system theme. Includes FunnelChart and ColumnChart with typed data/props.',
    CustomerJourneys: 'Visual customer journey map editor. Includes stage builder, stage side panel, data processor, detail table, and label-with-tooltip sub-components.',
    Forms: 'Form utility components for admin UI: FormDeleteComponent and FormDeleteDialog for confirming item deletion with configurable callout and texts.',
    InfoCard: 'Small metric card displaying caption, tooltip icon, primary value text, and detail text. Wraps Paper and Tooltip.',
    Placeholders: 'Loading/empty-state placeholder components: LanguageSelectorPlaceholder, WorkspaceSelectorPlaceholder, RoutingContentPlaceholder.',
    ToggleButtons: 'Segmented toggle button groups for mutually exclusive selection. NameToggleButtons for text labels, IconToggleButtons for icon variants.',
    VerticalMenu: 'Vertical navigation menu family. Includes ActionMenu (clickable items), SelectMenu (selectable items), and their DropDown variants with headline support.',
    ViewMenu: 'Sticky view-level action/navigation bar. Wraps Shelf with Box and Stack layout. Extends ShelfProps.',
    Window: 'Floating window manager with portal rendering. WindowManager renders multiple windows; WindowPortal renders into a DOM portal; WindowContext provides context.',
  }

  const compNames = fs
    .readdirSync(COMPONENTS_DIR, { withFileTypes: true })
    .filter((e) => e.isDirectory() && !EXCLUDE_DIRS.has(e.name))
    .map((e) => e.name)
    .sort()

  const components = []

  for (const compName of compNames) {
    const compDir = path.join(COMPONENTS_DIR, compName)

    const mainTsx = path.join(compDir, `${compName}.tsx`)
    const typesTsPath = path.join(compDir, `${compName}.types.ts`)
    const storiesPath = path.join(compDir, `${compName}.stories.tsx`)

    const mainContent = fs.existsSync(mainTsx) ? fs.readFileSync(mainTsx, 'utf8') : ''
    const typesContent = fs.existsSync(typesTsPath) ? fs.readFileSync(typesTsPath, 'utf8') : ''
    const storiesContent = fs.existsSync(storiesPath) ? fs.readFileSync(storiesPath, 'utf8') : ''

    const allSource = readAllSource(compDir, compName)

    const storyTitle = extractStoryTitle(storiesContent)
    const storyNames = extractStoryNames(storiesContent)
    const jsDoc = extractJsDoc(mainContent, compName)
    const typeConstants = extractTypeConstants(typesContent || mainContent)
    const propsInfo = extractPropsInfo(typesContent || mainContent)
    const internalDeps = extractInternalDeps(mainContent)
    const npmDeps = extractNpmDeps(allSource)
    const description = buildDescription(jsDoc, typeConstants, propsInfo)
    const visualDescription = buildVisualDescription(compName, typeConstants, storyNames)

    components.push({
      name: compName,
      category: categoryFromTitle(storyTitle),
      storyTitle: storyTitle ?? `Unknown/${compName}`,
      description: description ?? MANUAL_DESCRIPTIONS[compName] ?? `${compName} component.`,
      visualDescription,
      useCases: storyNames.slice(0, 6),
      files: getComponentFiles(compDir, compName),
      internalDeps,
      npmDeps,
      preview: `previews/${compName}.png`,
    })

    console.log(`✓ ${compName}`)
  }

  const registry = {
    version: '1.0.0',
    description: 'Xperience by Kentico admin UI component registry. Copy components directly into your project (shadcn model). All components require the shared files listed in "requires".',
    requires: {
      copy: [
        'src/lib/cn.ts',
        'src/styles/tokens.css',
        'src/index.css',
      ],
      npm: ['classnames'],
    },
    components,
  }

  fs.writeFileSync(OUTPUT, JSON.stringify(registry, null, 2))
  console.log(`\nWrote ${components.length} components → registry.json`)
}

main()
