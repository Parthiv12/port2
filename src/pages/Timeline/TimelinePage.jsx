import React from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FolderGit2, BookOpen, Cpu, Briefcase, TestTube, ArrowUpRight } from "lucide-react";
import { Badge } from "../../components/ui/badge.jsx";
import FadeIn from "../../components/ui/FadeIn.jsx";
import { projectsCatalog } from "../../data/projects.js";

// Same palette as ProjectGrid.jsx's getTypeStyles, kept local to match this
// codebase's per-file convention (see tabActiveStyles in ProjectGrid.jsx).
const getTypeStyles = (type) => {
  switch (type) {
    case "Personal":
      return { icon: <FolderGit2 className="w-4 h-4 text-blue-300/80" />, text: "text-blue-300" };
    case "Course":
      return { icon: <BookOpen className="w-4 h-4 text-emerald-300/80" />, text: "text-emerald-300" };
    case "Hackathon":
      return { icon: <Cpu className="w-4 h-4 text-violet-300/80" />, text: "text-violet-300" };
    case "Work":
      return { icon: <Briefcase className="w-4 h-4 text-amber-300/80" />, text: "text-amber-300" };
    case "Research":
      return { icon: <TestTube className="w-4 h-4 text-rose-300/80" />, text: "text-rose-300" };
    default:
      return { icon: <FolderGit2 className="w-4 h-4 text-white/50" />, text: "text-white/40" };
  }
}

export default function TimelinePage() {
  const featuredItems = projectsCatalog.filter(p => p.featured);

  const groupedByYear = featuredItems.reduce((acc, item) => {
    if (!acc[item.year]) acc[item.year] = [];
    acc[item.year].push(item);
    return acc;
  }, {});

  const years = Object.keys(groupedByYear).sort((a, b) => b - a);

  return (
    <div className="min-h-screen font-sans w-full max-w-6xl mx-auto" style={{ padding: "140px clamp(16px, 5vw, 64px) 100px" }}>
      <FadeIn>
        <div className="flex flex-col gap-4 mb-20 md:mb-32">
          <h1 className="text-5xl font-bold tracking-tight text-white m-0">
            Timeline
          </h1>
          <p className="text-xl text-white/60 font-light max-w-xl">
            Selected projects over time.
          </p>
        </div>
      </FadeIn>

      <div className="flex flex-col gap-24">
        {years.map((year) => (
          <div
            key={year}
            className="grid grid-cols-1 md:grid-cols-[120px_1fr] gap-8 md:gap-16 items-start"
          >
            <h2 className="text-4xl font-mono font-medium text-white/20 sticky top-32 tracking-tight m-0">
              {year}
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full">
              {groupedByYear[year].map((item, i) => {
                const typeStyles = getTypeStyles(item.type);
                const cardContent = (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    whileHover={{ y: -4 }}
                    className="flex flex-col h-full bg-transparent border-t border-white/10 hover:bg-neutral-900/30 rounded-xl p-6 transition-all duration-300 cursor-pointer relative group"
                  >
                   <div className="absolute top-6 right-6 opacity-0 translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                      <ArrowUpRight className="w-4 h-4 text-white/30" />
                    </div>
                    
                    <div className="flex items-center gap-3 mb-5">
                      {typeStyles.icon}
                      <Badge variant="secondary" className={`bg-transparent font-medium px-0 py-0 border-none uppercase tracking-widest text-[0.7rem] ${typeStyles.text}`}>
                        {item.type}
                      </Badge>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white/90 mb-3 leading-tight tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-[1.05rem] text-white/50 leading-relaxed mb-8 font-light flex-1">
                      {item.description}
                    </p>
                    
                    <div className="mt-auto flex flex-wrap gap-2 text-[0.75rem] font-mono text-white/30 tracking-wide">
                      {item.tags.slice(0, 4).map((tag, idx) => (
                        <span key={tag}>
                          {tag}{idx < Math.min(item.tags.length, 4) - 1 ? "  ·  " : ""}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                );

                return item.slug ? (
                  <Link key={item.slug} to={`/projects/${item.slug}`} className="block outline-none h-full">
                    {cardContent}
                  </Link>
                ) : (
                  <div key={item.title} className="h-full">
                    {cardContent}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
        
        {years.length === 0 && (
          <div className="py-20 text-center text-white/40 text-lg">
            No featured projects available.
          </div>
        )}
      </div>
    </div>
  );
}
