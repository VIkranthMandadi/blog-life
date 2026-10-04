# blog-life

Personal blog built with React, TypeScript, Vite, and Tailwind CSS. Posts are plain Markdown files with frontmatter — no CMS, no backend.

Live at: https://vikranthmandadi.github.io/blog-life/

## Writing a post

Add a new file to `src/posts/`, e.g. `src/posts/my-new-post.md`:

```md
---
title: My New Post
date: 2026-10-10
tags: life, notes
---

Post content goes here, standard Markdown.
```

It shows up on the home page automatically on the next build — no code changes needed.

## Development

```sh
npm install
npm run dev      # local dev server
npm run build    # typecheck + production build to dist/
npm run preview  # preview the production build locally
```

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the site and publishes `dist/` to GitHub Pages via GitHub Actions. No manual steps needed beyond the one-time repo setting: **Settings → Pages → Source → GitHub Actions**.

## Stack

- [Vite](https://vite.dev/) + React + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com/) (`@tailwindcss/typography` for rendered Markdown)
- [react-router-dom](https://reactrouter.com/) (`HashRouter`, so direct links to posts work on GitHub Pages without server rewrites)
- [react-markdown](https://github.com/remarkjs/react-markdown)
