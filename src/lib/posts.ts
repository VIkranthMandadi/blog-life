export interface Post {
  slug: string
  content: string
  title: string
  date: string
  tags: string[]
}

const modules = import.meta.glob('../posts/*.md', { eager: true, query: '?raw', import: 'default' }) as Record<string, string>

function parseFrontmatter(raw: string) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  if (!match) return { meta: {} as Record<string, string>, content: raw }

  const meta: Record<string, string> = {}
  for (const line of match[1].split('\n')) {
    const i = line.indexOf(':')
    if (i === -1) continue
    const key = line.slice(0, i).trim()
    const value = line.slice(i + 1).trim().replace(/^["']|["']$/g, '')
    meta[key] = value
  }

  return { meta, content: match[2] }
}

export const posts: Post[] = Object.entries(modules)
  .map(([path, raw]) => {
    const slug = path.split('/').pop()!.replace(/\.md$/, '')
    const { meta, content } = parseFrontmatter(raw)
    return { slug, content, title: meta.title ?? slug, date: meta.date ?? '', tags: meta.tags ? meta.tags.split(',').map((t) => t.trim()) : [] }
  })
  .sort((a, b) => (a.date < b.date ? 1 : -1))

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug)
}
