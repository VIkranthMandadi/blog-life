import { Link, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Post from './pages/Post'

export default function App() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <header className="mb-10">
        <Link to="/" className="text-2xl font-bold">blog-life</Link>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/:slug" element={<Post />} />
        </Routes>
      </main>
    </div>
  )
}
