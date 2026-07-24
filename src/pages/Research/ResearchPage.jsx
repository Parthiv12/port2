import { useEffect } from "react";
import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";
import FadeIn from "../../components/ui/FadeIn.jsx";

export default function ResearchPage() {
  useEffect(() => {
    document.title = "Research · Parthiv Gajula";
  }, []);

  return (
    <div className="w-full max-w-[960px] mx-auto font-sans" style={{ padding: "122px clamp(16px, 4vw, 64px) 100px" }}>
      <FadeIn>
        <h1 className="text-white font-bold tracking-tight mb-16" style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)" }}>
          Research
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_280px] gap-10 md:gap-14 items-start">
          {/* Study */}
          <div>
            <p className="text-xs font-mono text-white/40 tracking-wide mb-3 m-0">
              Jan – May 2025
            </p>

            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-4 leading-tight">
              Retrieval-Augmented Generation: Improving Output Using External Resources
            </h2>

            <p className="text-[1.05rem] text-white/60 leading-relaxed mb-8">
              A semester benchmarking DPR, ColBERT, and SELF-RAG on MS MARCO.
              Short version: retrieval quality decides everything.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="/research/paper"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm font-medium bg-white text-black px-4 py-2 rounded-lg hover:bg-white/90 transition-colors"
              >
                <BookOpen className="w-4 h-4 mr-2" /> Read the paper
              </a>
              <Link
                to="/blog/what-i-learned-benchmarking-rag"
                className="inline-flex items-center text-sm font-medium bg-white/10 text-white px-4 py-2 rounded-lg hover:bg-white/20 border border-white/5 transition-colors"
              >
                What I learned
              </Link>
              <a
                href="/RAG_Research.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/40 hover:text-white transition-colors ml-1"
              >
                PDF
              </a>
            </div>
          </div>

          {/* Page-one preview — opens the reader in a new tab */}
          <a
            href="/research/paper"
            target="_blank"
            rel="noopener noreferrer"
            className="block group"
            aria-label="Read the paper in a new tab"
          >
            <img
              src="/paper/page-1.jpg"
              alt="First page of the RAG research paper"
              loading="lazy"
              className="w-full rounded-lg border border-white/10 bg-white group-hover:border-white/30 transition-all group-hover:-translate-y-1"
            />
            <p className="text-center text-[0.8rem] text-white/35 mt-3 m-0">
              Page 1 of 10 · opens in a new tab
            </p>
          </a>
        </div>
      </FadeIn>
    </div>
  );
}
