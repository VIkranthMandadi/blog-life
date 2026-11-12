import PostCard from '../components/PostCard'
import { posts } from '../lib/posts'
import Intro from '../components/intro'

export default function Home() {
  return (
    <div>
      <Intro />
      <ul className="grid gap-5 sm:grid-cols-2">
        {posts.map((post) => (
          <li key={post.slug}>
            <PostCard post={post} />
          </li>
        ))}
      </ul>
    </div>
  );
}
