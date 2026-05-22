#!/usr/bin/env node
// scripts/generate-previews.cjs
// Screenshots each component's best Storybook story.
// Priority: "Default" story → first story for the title → first story matching component name.
// Usage: node scripts/generate-previews.cjs [--only CommaList] [--skip-existing]

const fs = require('fs')
const path = require('path')
const http = require('http')
const { chromium } = require('playwright')

const ROOT = path.resolve(__dirname, '..')
const STATIC_DIR = path.join(ROOT, 'storybook-static')
const PREVIEWS_DIR = path.join(ROOT, 'previews')
const PORT = 6099

const args = process.argv.slice(2)
const SKIP_EXISTING = args.includes('--skip-existing')
const onlyArg = args.find(a => a.startsWith('--only'))
const ONLY = onlyArg ? onlyArg.split('=')[1]?.split(',').map(s => s.trim()) : null

// ── Static file server ──────────────────────────────────────────────────────

function serveStatic(dir, port) {
  const mime = {
    '.html': 'text/html',
    '.js':   'application/javascript',
    '.css':  'text/css',
    '.json': 'application/json',
    '.png':  'image/png',
    '.svg':  'image/svg+xml',
    '.woff2':'font/woff2',
    '.woff': 'font/woff',
    '.ico':  'image/x-icon',
  }
  const server = http.createServer((req, res) => {
    let urlPath = req.url.split('?')[0]
    if (urlPath === '/') urlPath = '/index.html'
    const filePath = path.join(dir, urlPath)
    const ext = path.extname(filePath)
    fs.readFile(filePath, (err, data) => {
      if (err) { res.writeHead(404); res.end('Not found'); return }
      res.writeHead(200, { 'Content-Type': mime[ext] || 'application/octet-stream' })
      res.end(data)
    })
  })
  return new Promise((resolve) => server.listen(port, () => resolve(server)))
}

// ── Build story list from registry + storybook index ────────────────────────

function buildStoryList() {
  const registry = JSON.parse(fs.readFileSync(path.join(ROOT, 'registry.json'), 'utf8'))
  const sbIndex  = JSON.parse(fs.readFileSync(path.join(STATIC_DIR, 'index.json'), 'utf8'))

  // Group storybook entries by title
  const byTitle = {}
  for (const entry of Object.values(sbIndex.entries)) {
    if (entry.type !== 'story') continue
    if (!byTitle[entry.title]) byTitle[entry.title] = []
    byTitle[entry.title].push(entry)
  }

  // Index ALL story entries by a "name fragment" for fuzzy matching Unknown components
  // e.g. "Navigation/DropDown" → last segment "DropDown"
  const byLastSegment = {}
  for (const [title, entries] of Object.entries(byTitle)) {
    const seg = title.split('/').pop()
    if (!byLastSegment[seg]) byLastSegment[seg] = entries
  }

  function pickBestStory(entries) {
    if (!entries || entries.length === 0) return null
    return entries.find(e => e.name === 'Default') ?? entries[0]
  }

  const stories = []

  for (const comp of registry.components) {
    if (ONLY && !ONLY.includes(comp.name)) continue
    if (SKIP_EXISTING && fs.existsSync(path.join(PREVIEWS_DIR, `${comp.name}.png`))) continue

    let storyEntry = null

    if (comp.storyTitle && !comp.storyTitle.startsWith('Unknown/')) {
      storyEntry = pickBestStory(byTitle[comp.storyTitle])
    }

    // Fallback: search by last path segment of the component name
    if (!storyEntry) {
      storyEntry = pickBestStory(byLastSegment[comp.name])
    }

    // Fallback: partial match — find a title whose last segment is similar
    if (!storyEntry) {
      const nameLower = comp.name.toLowerCase()
      const candidate = Object.entries(byTitle).find(([t]) =>
        t.split('/').pop().toLowerCase() === nameLower
      )
      if (candidate) storyEntry = pickBestStory(candidate[1])
    }

    if (storyEntry) {
      stories.push({ storyId: storyEntry.id, compName: comp.name, storyName: storyEntry.name })
    } else {
      stories.push({ storyId: null, compName: comp.name, storyName: null })
    }
  }

  return stories
}

// ── Main ────────────────────────────────────────────────────────────────────

async function main() {
  if (!fs.existsSync(STATIC_DIR)) {
    console.error('storybook-static not found. Run: npm run build-storybook')
    process.exit(1)
  }

  fs.mkdirSync(PREVIEWS_DIR, { recursive: true })

  const stories = buildStoryList()
  const actionable = stories.filter(s => s.storyId)
  const noStory    = stories.filter(s => !s.storyId)

  console.log(`Components: ${stories.length} total, ${actionable.length} with stories, ${noStory.length} skipped (no story)\n`)
  if (noStory.length) console.log('No story found for: ' + noStory.map(s => s.compName).join(', ') + '\n')

  const server = await serveStatic(STATIC_DIR, PORT)
  console.log(`Serving storybook-static on http://localhost:${PORT}\n`)

  const browser = await chromium.launch()
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    colorScheme: 'light',
  })

  let done = 0, failed = 0

  for (const { storyId, compName, storyName } of actionable) {
    const outPath = path.join(PREVIEWS_DIR, `${compName}.png`)
    const url = `http://localhost:${PORT}/iframe.html?id=${storyId}&viewMode=story`

    const page = await context.newPage()
    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 20000 })
      await page.waitForSelector('#storybook-root', { timeout: 8000 }).catch(() => {})
      await page.waitForTimeout(500)
      await page.screenshot({ path: outPath, fullPage: false })
      done++
      const tag = storyName !== 'Default' ? ` [${storyName}]` : ''
      process.stdout.write(`  ✓ ${compName}${tag}\n`)
    } catch (err) {
      failed++
      process.stdout.write(`  ✗ ${compName}: ${err.message.split('\n')[0]}\n`)
    } finally {
      await page.close()
    }
  }

  await browser.close()
  server.close()

  console.log(`\nDone: ${done} screenshots saved to previews/`)
  if (failed) console.log(`Failed: ${failed}`)
}

main().catch((err) => { console.error(err); process.exit(1) })
