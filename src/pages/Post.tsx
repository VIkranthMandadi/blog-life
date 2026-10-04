import { Link, useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { getPost } from '../lib/posts'

export default function Post() {
  const { slug } = useParams<{ slug: string }>()
  const post = slug ? getPost(slug) : undefined

  if (!post) {
    return (
      <div>
        <p>Post not found.</p>
        <Link to="/" className="text-accent hover:underline">Back home</Link>
      </div>
    )
  }

  return (
    <article>
      <Link to="/" className="text-sm text-accent hover:underline">← Back</Link>
      <h1 className="mt-2 text-3xl font-bold">{post.title}</h1>
      {post.date && <p className="mt-1 text-sm text-gray-500">{post.date}</p>}
      <div className="prose mt-6 max-w-none">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>
    </article>
  )
}
