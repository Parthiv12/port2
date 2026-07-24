# parthivg.com

Personal portfolio. Vite + React 19 SPA, Tailwind v4, react-router 6, deployed on Vercel.

```bash
npm run dev       # local dev server
npm run build     # production build
npm run preview   # serve the production build locally
npm run analyze   # build + open bundle treemap
```

## Where things live

- **Project data** — `src/data/projects.js`. One entry per project; the Projects grid, Timeline, Home, and detail pages all read from it.
- **Blog posts** — `src/content/blog/YYYY-MM-DD-slug.md`. Drop a markdown file in, it appears at `/blog/slug`. Frontmatter:
  ```markdown
  ---
  title: Post title
  date: 2026-07-19
  summary: One or two sentences for the index page.
  tags: comma, separated
  ---
  ```
- **Project images/videos** — put files in `public/projects/<slug>/`, then add to that project's `media` array:
  ```js
  media: [
    { type: "image", src: "/projects/tracelens/1.png", caption: "Trace graph view" },
    { type: "video", src: "/projects/harmonaize/demo.mp4", caption: "Demo at GrizzHacks" },
  ],
  ```
  Detail pages and grid thumbnails pick them up automatically; everything renders fine with `media: []`.
- **Profile photo** — `src/assets/data/p2.jpg`, imported in `src/pages/About/AboutPage.jsx`. To swap: replace the file or change that one import.
- **Resume** — `public/resume.pdf`. Replace the file, no code change needed.
- **Sitemap** — `public/sitemap.xml`. Add a line when adding a project or blog post.

## Before shipping copy changes

Search the repo for `TODO:` — those are spots that need a real number or a decision.
