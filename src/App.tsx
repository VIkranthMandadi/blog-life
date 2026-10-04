import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Post from './pages/Post'

export default function App() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/:slug" element={<Post />} />
        </Routes>
      </main>
    </div>
  )
}
