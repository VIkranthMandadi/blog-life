import { Link } from 'react-router-dom'
import { posts } from '../lib/posts'

export default function Home() {
  return (
    <ul className="space-y-6">
      {posts.map((post) => (
        <li key={post.slug}>
          <Link to={`/post/${post.slug}`} className="text-xl font-semibold text-accent hover:underline">
            {post.title}
          </Link>
          {post.date && <p className="text-sm text-gray-500 dark:text-gray-400">{post.date}</p>}
        </li>
      ))}
    </ul>
  )
}
