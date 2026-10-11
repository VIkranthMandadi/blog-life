import { Link } from 'react-router-dom'
import type { Post } from '../lib/posts'

function excerpt(content: string) {
  const paragraph = content
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .find((block) => block && !block.startsWith('#') && !block.startsWith('-'))
  if (!paragraph) return ''
  return paragraph
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[*_`]/g, '')
    .replace(/\s+/g, ' ')
}

function formatDate(date: string) {
  const [y, m, d] = date.split('-').map(Number)
  if (!y || !m || !d) return date
  return new Date(y, m - 1, d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default function PostCard({ post }: { post: Post }) {
  return (
    <Link
      to={`/post/${post.slug}`}
      className="block h-full rounded-2xl border border-gray-200 bg-white p-5 shadow-lg shadow-slate-900/10 transition hover:-translate-y-1 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900"
    >
      {post.date && <p className="text-sm text-gray-500 dark:text-gray-400">{formatDate(post.date)}</p>}
      <h2 className="mt-1 text-xl font-semibold text-gray-900 dark:text-white">{post.title}</h2>
      <p className="mt-2 line-clamp-2 text-gray-600 dark:text-gray-300">{excerpt(post.content)}</p>
      {post.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span key={tag} className="rounded-md bg-accent/10 px-2.5 py-0.5 text-xs text-accent">
              {tag}
            </span>
          ))}
        </div>
      )}
    </Link>
  )
}
