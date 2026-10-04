import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="mb-10 flex items-center justify-between border-b border-gray-200 pb-6 dark:border-gray-800">
      <div>
        <Link to="/" className="text-2xl font-bold">
          The Awesome Sauce Blog
        </Link>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">by Vikranth</p>
      </div>
      <nav className="text-sm text-gray-500 dark:text-gray-400">
        <a href="https://github.com/VIkranthMandadi/blog-life" className="hover:text-accent" target="_blank" rel="noreferrer">
          GitHub
        </a>
      </nav>
    </header>
  )
}
