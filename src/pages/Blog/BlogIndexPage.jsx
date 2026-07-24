import { useEffect } from "react";
import { Link } from "react-router-dom";
import FadeIn from "../../components/ui/FadeIn.jsx";
import { getAllPosts, formatPostDate } from "../../lib/blog.js";
import "./BlogPage.css";

export default function BlogIndexPage() {
  const posts = getAllPosts();

  useEffect(() => {
    document.title = "Blog · Parthiv Gajula";
  }, []);

  return (
    <div className="w-full max-w-[960px] mx-auto font-sans" style={{ padding: "122px clamp(16px, 4vw, 64px) 100px" }}>
      <FadeIn>
        <h1 className="text-white font-bold tracking-tight mb-4" style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)" }}>
          Blog
        </h1>
        <p className="text-white/70 max-w-[680px] mb-16 leading-relaxed text-[1.15rem]">
          What I learn while building. Mostly what broke.
        </p>
      </FadeIn>

      <div className="flex flex-col">
        {posts.map((post, index) => (
          <FadeIn delay={index * 0.08} key={post.slug}>
            <Link to={`/blog/${post.slug}`} className="post-row">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 mb-2">
                <h3 className="text-[1.25rem] font-semibold text-white/95 transition-colors">
                  {post.title}
                </h3>
                <span className="text-[0.8rem] font-mono text-white/40 shrink-0 sm:ml-6">{formatPostDate(post.date)}</span>
              </div>
              <p className="text-white/65 text-base leading-relaxed m-0 max-w-[680px]">{post.summary}</p>
              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {post.tags.map((tag) => (
                    <span key={tag} className="text-[0.7rem] font-mono tracking-wide text-white/40 border border-white/10 rounded-full px-2.5 py-0.5">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </Link>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
