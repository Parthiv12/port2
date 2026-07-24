import { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, useScroll } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { ArrowLeft, Copy, Check } from "lucide-react";
import FadeIn from "../../components/ui/FadeIn.jsx";
import { getPostBySlug, formatPostDate } from "../../lib/blog.js";
import "highlight.js/styles/github-dark-dimmed.css";
import "./BlogPage.css";

function MarkdownLink({ href, children, ...props }) {
  if (href?.startsWith("/")) {
    return (
      <Link to={href} {...props}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  );
}

function CodeBlock({ children, ...props }) {
  const preRef = useRef(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const text = preRef.current?.textContent ?? "";
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="relative group/code">
      <button
        type="button"
        onClick={handleCopy}
        aria-label="Copy code"
        className="absolute top-3 right-3 opacity-0 group-hover/code:opacity-100 focus-visible:opacity-100 transition-opacity inline-flex items-center gap-1.5 text-[0.75rem] text-white/50 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-md px-2 py-1"
      >
        {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
        {copied ? "Copied" : "Copy"}
      </button>
      <pre ref={preRef} {...props}>
        {children}
      </pre>
    </div>
  );
}

export default function BlogPostPage() {
  const { slug } = useParams();
  const post = getPostBySlug(slug);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    if (post) document.title = `${post.title} · Parthiv Gajula`;
  }, [post]);

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-white">
        <h1 className="text-3xl font-bold">Post Not Found</h1>
        <Link to="/blog" className="mt-4 text-white/60 hover:text-white transition-colors">
          ← Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-white/70 origin-left z-[60]"
        style={{ scaleX: scrollYProgress }}
      />
      <div className="w-full max-w-[760px] mx-auto font-sans" style={{ padding: "122px clamp(16px, 4vw, 40px) 100px" }}>
        <FadeIn>
          <Link
            to="/blog"
            className="inline-flex items-center text-sm font-medium text-white/50 hover:text-white transition-colors mb-10 group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
            All posts
          </Link>

          <header className="mb-10">
            <p className="text-xs font-mono text-white/40 tracking-wide mb-3">
              {formatPostDate(post.date)}
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight mb-4">
              {post.title}
            </h1>
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="text-[0.7rem] font-mono tracking-wide text-white/40 border border-white/10 rounded-full px-2.5 py-0.5">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          <article className="prose prose-invert prose-neutral max-w-none prose-headings:tracking-tight prose-a:text-white prose-a:underline-offset-4 prose-code:before:content-none prose-code:after:content-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
              components={{ a: MarkdownLink, pre: CodeBlock }}
            >
              {post.content}
            </ReactMarkdown>
          </article>
        </FadeIn>
      </div>
    </>
  );
}
