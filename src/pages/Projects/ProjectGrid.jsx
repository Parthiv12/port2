import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { projectsCatalog } from "../../data/projects.js";
import { Card } from "../../components/ui/card.jsx";
import { Badge } from "../../components/ui/badge.jsx";
import { Tabs, TabsList, TabsTrigger } from "../../components/ui/tabs.jsx";
import { ArrowUpRight, FolderGit2, BookOpen, Cpu, Briefcase, TestTube } from "lucide-react";
import FadeIn from "../../components/ui/FadeIn.jsx";

const getTypeStyles = (type) => {
  switch(type) {
    case "Personal":
      return { icon: <FolderGit2 className="w-3.5 h-3.5" />, badge: "text-blue-300 bg-blue-500/10 border-blue-500/20" };
    case "Course":
      return { icon: <BookOpen className="w-3.5 h-3.5" />, badge: "text-emerald-300 bg-emerald-500/10 border-emerald-500/20" };
    case "Hackathon":
      return { icon: <Cpu className="w-3.5 h-3.5" />, badge: "text-violet-300 bg-violet-500/10 border-violet-500/20" };
    case "Work":
      return { icon: <Briefcase className="w-3.5 h-3.5" />, badge: "text-amber-300 bg-amber-500/10 border-amber-500/20" };
    case "Research":
      return { icon: <TestTube className="w-3.5 h-3.5" />, badge: "text-rose-300 bg-rose-500/10 border-rose-500/20" };
    default:
      return { icon: <FolderGit2 className="w-3.5 h-3.5" />, badge: "text-neutral-300 bg-white/10 border-white/10" };
  }
}

// Filter pills use the same per-type palette as the card badges
const tabActiveStyles = {
  All: "data-active:bg-white/10 data-active:text-white data-active:border-white/20",
  Personal: "data-active:bg-blue-500/15 data-active:text-blue-300 data-active:border-blue-500/30",
  Course: "data-active:bg-emerald-500/15 data-active:text-emerald-300 data-active:border-emerald-500/30",
  Hackathon: "data-active:bg-violet-500/15 data-active:text-violet-300 data-active:border-violet-500/30",
  Work: "data-active:bg-amber-500/15 data-active:text-amber-300 data-active:border-amber-500/30",
  Research: "data-active:bg-rose-500/15 data-active:text-rose-300 data-active:border-rose-500/30",
};

const getGridItemClass = (index) => {
  switch (index) {
    case 0: return "col-span-1 md:col-span-2 md:row-span-2"; // Large feature 2x2
    case 1: return "col-span-1 md:col-span-1 md:row-span-1"; // Small 1x1
    case 2: return "col-span-1 md:col-span-1 md:row-span-1"; // Small 1x1
    case 3: return "col-span-1 md:col-span-3 md:row-span-1"; // Full wide banner 3x1
    case 4: return "col-span-1 md:col-span-1 md:row-span-1"; // Small 1x1
    case 5: return "col-span-1 md:col-span-2 md:row-span-1"; // Medium wide 2x1
    case 6: return "col-span-1 md:col-span-2 md:row-span-1"; // Medium wide 2x1
    case 7: return "col-span-1 md:col-span-1 md:row-span-1"; // Small 1x1
    default: return "col-span-1 md:col-span-1 md:row-span-1";
  }
};

export default function ProjectGrid() {
  const [activeTab, setActiveTab] = useState("All");

  const filteredProjects = projectsCatalog.filter((item) => 
    activeTab === "All" || item.type === activeTab
  );

  return (
    <div className="min-h-screen font-sans w-full max-w-7xl mx-auto" style={{ padding: "140px clamp(16px, 5vw, 64px) 100px" }}>
      <FadeIn>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <h1 className="text-5xl font-bold tracking-tight text-white m-0 mb-3">
              Selected Work
            </h1>
            <p className="text-xl text-white/60 font-light max-w-2xl m-0">
              Personal projects, coursework, and hackathon builds.
            </p>
          </div>

          <Tabs defaultValue="All" value={activeTab} onValueChange={setActiveTab} className="shrink-0">
            <TabsList className="bg-neutral-900/80 border border-neutral-800 flex flex-wrap h-auto w-fit">
              {["All", "Personal", "Course", "Hackathon", "Work", "Research"].map((tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  className={`px-3 py-1 text-white/55 hover:text-white ${tabActiveStyles[tab]}`}
                >
                  {tab}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </FadeIn>

      <motion.div 
        layout 
        className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(280px,auto)]"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((p, index) => {
            const isLarge = index === 0 && activeTab === "All"; // Only apply massive span natively if it's the first unfiltered item
            const spanClass = activeTab === "All" ? getGridItemClass(index) : "col-span-1 md:col-span-1 md:row-span-1";
            const styles = getTypeStyles(p.type);
            
            return (
              <motion.div 
                key={p.slug}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={`${spanClass} h-full`}
              >
                <Link to={`/projects/${p.slug}`} className="block h-full outline-none group">
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="relative h-full flex flex-col bg-neutral-900/40 border border-neutral-800 hover:border-neutral-600 hover:bg-white/[0.02] transition-all duration-300 rounded-[2rem] overflow-hidden cursor-pointer"
                  >
                    <div className="absolute top-6 right-6 z-10 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                      <div className="bg-white text-black p-2 rounded-full shadow-sm">
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </div>

                    {p.media?.[0]?.type === "image" && (
                      <img
                        src={p.media[0].src}
                        alt={p.media[0].caption || p.title}
                        loading="lazy"
                        className={`w-full object-cover border-b border-neutral-800/60 ${isLarge ? 'h-56' : 'h-36'}`}
                        onError={(e) => { e.currentTarget.style.display = "none"; }}
                      />
                    )}

                    <div className={`p-8 lg:p-10 flex flex-col flex-1 ${isLarge ? 'justify-end' : ''}`}>
                      <div className="flex items-center justify-between mb-8">
                        <Badge variant="secondary" className={`font-medium px-2.5 py-1 flex items-center gap-2 ${styles.badge}`}>
                          {styles.icon}
                          {p.type}
                        </Badge>
                        <span className="text-white/30 text-[0.8rem] font-mono tracking-wider">{p.year}</span>
                      </div>

                      <h3 className={`${isLarge ? 'text-4xl' : 'text-2xl'} font-bold text-white mb-4 tracking-tight leading-tight transition-colors duration-300`}>
                        {p.title}
                      </h3>
                      
                      <p className={`text-white/60 ${isLarge ? 'text-lg max-w-md' : 'text-[0.95rem] font-light'} leading-relaxed mb-10 flex-1`}>
                        {p.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mt-auto">
                        {p.tags.slice(0, isLarge ? 5 : 3).map(tag => (
                          <Badge key={tag} variant="outline" className="bg-neutral-800/30 text-neutral-400/80 border-neutral-800 font-mono text-[0.7rem] tracking-wide px-2.5 py-0.5 shadow-none">
                            {tag}
                          </Badge>
                        ))}
                        {p.tags.length > (isLarge ? 5 : 3) && (
                          <Badge variant="outline" className="bg-transparent text-neutral-500/50 border-neutral-800/50 font-mono text-[0.7rem] shadow-none px-2">
                            +{p.tags.length - (isLarge ? 5 : 3)}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </AnimatePresence>
        
        {filteredProjects.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-1 md:col-span-3 py-20 text-center text-white/40 text-lg">
            No projects found for {activeTab}.
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
