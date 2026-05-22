#!/usr/bin/env node
// scripts/sync-previews.cjs
// Updates registry.json: sets preview path where screenshot exists, null otherwise.
// Usage: node scripts/sync-previews.cjs

const fs = require('fs')
const path = require('path')

const ROOT = path.resolve(__dirname, '..')
const REGISTRY_PATH = path.join(ROOT, 'registry.json')
const PREVIEWS_DIR = path.join(ROOT, 'previews')

const registry = JSON.parse(fs.readFileSync(REGISTRY_PATH, 'utf8'))

let set = 0, cleared = 0
for (const comp of registry.components) {
  const previewPath = path.join(PREVIEWS_DIR, `${comp.name}.png`)
  if (fs.existsSync(previewPath)) {
    comp.preview = `previews/${comp.name}.png`
    set++
  } else {
    comp.preview = null
    cleared++
    console.log(`  (no preview) ${comp.name}`)
  }
}

fs.writeFileSync(REGISTRY_PATH, JSON.stringify(registry, null, 2))
console.log(`\nRegistry updated: ${set} previews set, ${cleared} cleared`)
