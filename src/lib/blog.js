// Blog content pipeline.
//
// Posts are plain markdown files in src/content/blog/, named YYYY-MM-DD-slug.md.
// Frontmatter (all fields expected):
//
//   ---
//   title: Post title
//   date: 2026-07-19
//   summary: One or two sentences shown on the index page.
//   tags: comma, separated, tags
//   ---
//
// The URL slug is the filename with the date prefix stripped,
// e.g. 2026-07-19-my-post.md -> /blog/my-post

const modules = import.meta.glob("/src/content/blog/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) return { data: {}, content: raw };

  const data = {};
  for (const line of match[1].split(/\r?\n/)) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    const value = line.slice(idx + 1).trim();
    if (key) data[key] = value;
  }
  return { data, content: raw.slice(match[0].length) };
}

const posts = Object.entries(modules)
  .map(([path, raw]) => {
    const filename = path.split("/").pop().replace(/\.md$/, "");
    const slug = filename.replace(/^\d{4}-\d{2}-\d{2}-/, "");
    const { data, content } = parseFrontmatter(raw);
    return {
      slug,
      title: data.title || slug,
      date: data.date || filename.slice(0, 10),
      summary: data.summary || "",
      tags: data.tags ? data.tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
      content,
    };
  })
  .sort((a, b) => b.date.localeCompare(a.date));

export function getAllPosts() {
  return posts;
}

export function getPostBySlug(slug) {
  return posts.find((p) => p.slug === slug);
}

export function formatPostDate(date) {
  const parsed = new Date(`${date}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}
