import PostCard from '../components/PostCard'
import { posts } from '../lib/posts'

export default function Home() {
  return (
    <ul className="grid gap-5 sm:grid-cols-2">
      {posts.map((post) => (
        <li key={post.slug}>
          <PostCard post={post} />
        </li>
      ))}
    </ul>
  )
}
