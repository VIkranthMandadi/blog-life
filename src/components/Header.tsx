import { Link } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'

export default function Header() {
  return (
    <header className="mb-10 flex items-center justify-between border-b border-gray-200 pb-6 dark:border-gray-800">
      <div>
        <Link to="/" className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white hover:opacity-90 transition-opacity">
          The Awesome Sauce Blog
        </Link>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">by the steppas</p>
      </div>
      <nav className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
        <a
          href="https://github.com/VIkranthMandadi/blog-life"
          className="hover:text-accent transition-colors"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
        <span className="text-gray-300 dark:text-gray-700">|</span>
        <ThemeToggle />
      </nav>
    </header>
  )
}
