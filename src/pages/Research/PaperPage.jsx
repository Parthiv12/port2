import { useEffect } from "react";
import { Link } from "react-router-dom";

const PAGE_COUNT = 10;
const pages = Array.from({ length: PAGE_COUNT }, (_, i) => `/paper/page-${i + 1}.jpg`);

export default function PaperPage() {
  useEffect(() => {
    document.title = "RAG Research Paper · Parthiv Gajula";
  }, []);

  return (
    <div className="w-full max-w-[860px] mx-auto font-sans" style={{ padding: "122px clamp(16px, 4vw, 40px) 80px" }}>
      <div className="flex items-baseline justify-between gap-4 mb-8">
        <h1 className="text-white font-bold tracking-tight text-xl sm:text-2xl m-0">
          Retrieval-Augmented Generation: Improving Output Using External Resources
        </h1>
        <a
          href="/RAG_Research.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-mono text-white/40 hover:text-white transition-colors shrink-0"
        >
          PDF
        </a>
      </div>

      <div className="flex flex-col gap-4">
        {pages.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={`Page ${i + 1} of the RAG research paper`}
            loading={i === 0 ? "eager" : "lazy"}
            className="w-full rounded-lg border border-white/10 bg-white"
          />
        ))}
      </div>

      <p className="text-center text-[0.85rem] text-white/35 mt-8">
        That's the whole paper.{" "}
        <Link to="/blog/what-i-learned-benchmarking-rag" className="text-white/60 hover:text-white underline underline-offset-4 transition-colors">
          The takeaways
        </Link>{" "}
        ·{" "}
        <Link to="/research" className="text-white/60 hover:text-white underline underline-offset-4 transition-colors">
          Back to Research
        </Link>
      </p>
    </div>
  );
}
