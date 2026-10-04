import { useState, useEffect } from 'react'

interface Comment {
  id: string
  author: string
  content: string
  createdAt: string
  isUserAdded?: boolean
}

interface CommentsProps {
  postSlug: string
}

export default function Comments({ postSlug }: CommentsProps) {
  const [isOpen, setIsOpen] = useState(true)
  const [comments, setComments] = useState<Comment[]>([])
  const [author, setAuthor] = useState(() => {
    return localStorage.getItem('blog_commenter_name') || ''
  })
  const [content, setContent] = useState('')

  const storageKey = `blog_comments_${postSlug}`

  // Load comments on mount or post change
  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey)
      if (stored) {
        const parsed: Comment[] = JSON.parse(stored)
        // Strip out any legacy seed comments
        const realComments = parsed.filter((c) => !c.id.startsWith('seed-'))
        setComments(realComments)
        if (realComments.length !== parsed.length) {
          localStorage.setItem(storageKey, JSON.stringify(realComments))
        }
      } else {
        setComments([])
      }
    } catch {
      setComments([])
    }
  }, [postSlug, storageKey])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmedAuthor = author.trim() || 'Anonymous'
    const trimmedContent = content.trim()
    if (!trimmedContent) return

    const newComment: Comment = {
      id: Date.now().toString(),
      author: trimmedAuthor,
      content: trimmedContent,
      createdAt: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }),
      isUserAdded: true
    }

    const updated = [...comments, newComment]
    setComments(updated)
    localStorage.setItem(storageKey, JSON.stringify(updated))
    localStorage.setItem('blog_commenter_name', trimmedAuthor)
    setContent('')
  }

  const handleDelete = (id: string) => {
    const updated = comments.filter((c) => c.id !== id)
    setComments(updated)
    localStorage.setItem(storageKey, JSON.stringify(updated))
  }

  // Generate pleasant avatar background from author initials
  const getAvatarColor = (name: string) => {
    const colors = [
      'bg-blue-500',
      'bg-emerald-500',
      'bg-indigo-500',
      'bg-amber-500',
      'bg-rose-500',
      'bg-purple-500'
    ]
    let hash = 0
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash)
    }
    return colors[Math.abs(hash) % colors.length]
  }

  return (
    <section className="mt-12 border-t border-gray-200 pt-8 dark:border-gray-800">
      {/* Header with Toggle */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
          <span>Comments</span>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300">
            {comments.length}
          </span>
        </h2>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-xs font-medium text-accent hover:underline flex items-center gap-1 cursor-pointer"
        >
          {isOpen ? 'Hide comments ▴' : 'Show comments ▾'}
        </button>
      </div>

      {isOpen && (
        <div className="mt-6 space-y-6">
          {/* New Comment Form */}
          <form onSubmit={handleSubmit} className="space-y-3 rounded-xl border border-gray-200 bg-gray-50/50 p-4 dark:border-gray-800 dark:bg-gray-900/50">
            <div>
              <input
                type="text"
                placeholder="Your name (e.g. Vikranth, Shyam)"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-900 placeholder-gray-400 focus:border-accent focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <textarea
                placeholder="Leave a comment..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={3}
                required
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-accent focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 resize-none"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={!content.trim()}
                className="rounded-lg bg-accent px-4 py-1.5 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
              >
                Post Comment
              </button>
            </div>
          </form>

          {/* Comment List */}
          {comments.length === 0 ? (
            <p className="text-center py-6 text-sm text-gray-400 dark:text-gray-500">
              No comments yet. Be the first to start the conversation!
            </p>
          ) : (
            <div className="space-y-4">
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className="group flex gap-3 rounded-xl border border-gray-100 bg-white p-4 shadow-xs dark:border-gray-800/80 dark:bg-gray-900"
                >
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${getAvatarColor(
                      comment.author
                    )}`}
                  >
                    {comment.author.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                          {comment.author}
                        </span>
                        <span className="text-xs text-gray-400 dark:text-gray-500">
                          • {comment.createdAt}
                        </span>
                      </div>
                      {comment.isUserAdded && (
                        <button
                          onClick={() => handleDelete(comment.id)}
                          className="opacity-0 group-hover:opacity-100 text-xs text-red-500 hover:underline transition-opacity cursor-pointer"
                          title="Delete comment"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                      {comment.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  )
}
