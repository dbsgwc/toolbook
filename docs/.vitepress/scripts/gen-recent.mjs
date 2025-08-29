import { execSync } from 'node:child_process'
import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

function getLastCommitIso(filepath) {
  try {
    const cmd = `git log -1 --format=%cI -- "${filepath}"`
    const out = execSync(cmd, { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim()
    return out || null
  } catch {
    return null
  }
}

function run() {
  const base = resolve(process.cwd(), 'docs/tools')
  const files = [
    'pm2.md',
    'docker.md',
    'nvm.md',
    'git.md',
    'pnpm.md'
  ]

  const items = files.map(name => {
    const path = resolve(base, name)
    const updatedAt = getLastCommitIso(path)
    const slug = name.replace(/\.md$/, '')
    return {
      title: slug.toUpperCase(),
      link: `/tools/${slug}`,
      updatedAt
    }
  }).filter(x => x.updatedAt)
    .sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1))
    .slice(0, 5)

  const outFile = resolve(process.cwd(), 'docs/.vitepress/recent.json')
  writeFileSync(outFile, JSON.stringify({ items }, null, 2))
  console.log(`[recent] wrote ${outFile}`)
}

run()


