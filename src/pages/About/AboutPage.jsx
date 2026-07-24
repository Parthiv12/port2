import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { GitHubCalendar } from 'react-github-calendar';
import PortraitCard from "../../components/ui/PortraitCard.jsx";
import { Mail, Code2 } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import FadeIn from "../../components/ui/FadeIn.jsx";
import profileImg from "../../assets/data/p2.jpg";

export default function AboutPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="min-h-[90vh] flex flex-col justify-center font-sans w-full max-w-7xl mx-auto" style={{ padding: "100px clamp(16px, 5vw, 64px) 60px" }}>
      <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] lg:grid-cols-[340px_1fr] gap-10 lg:gap-16 items-start">
        {/* Left Column: Portrait */}
        <motion.div
          initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="md:sticky md:top-32"
        >
          <div className="overflow-hidden rounded-2xl border border-neutral-800/80 shadow-2xl bg-neutral-900/50">
            <PortraitCard src={profileImg} alt="Parthiv Gajula" />
          </div>
        </motion.div>

        {/* Right Column: Text Content */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-5 pt-2"
        >
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl font-bold text-white tracking-tight leading-tight mb-1"
          >
            About Me
          </motion.h1>

          <motion.p variants={itemVariants} className="text-[1.15rem] leading-relaxed text-white/90 font-medium max-w-2xl">
            I'm Parthiv — a CS senior at Wayne State University, graduating May 2026.
          </motion.p>

          <motion.p variants={itemVariants} className="text-[1.05rem] leading-relaxed text-white/60 font-light max-w-2xl">
            I build backend and systems things — a tracing platform that's live right now, an encrypted FUSE filesystem, RAG research. Two summers interning at 365 Retail Markets; the second one, I made their slow SQL up to 45% faster.
          </motion.p>

          <motion.p variants={itemVariants} className="text-[1.05rem] leading-relaxed text-white/60 font-light max-w-2xl">
            Currently going deep on training LLMs from scratch. When something breaks in an interesting way, it ends up on{" "}
            <Link to="/blog" className="text-white/85 underline underline-offset-4 decoration-white/25 hover:decoration-white transition-colors">
              the blog
            </Link>
            .
          </motion.p>

          {/* Contact Links */}
          <motion.div variants={itemVariants} className="mt-4 flex flex-wrap gap-4">
            <a href="mailto:parthivg@wayne.edu" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-black font-semibold text-sm hover:bg-neutral-200 transition-colors">
              <Mail className="w-4 h-4" /> Email Me
            </a>
            <a href="https://github.com/Parthiv12" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white font-medium text-sm hover:bg-neutral-800 transition-colors">
              <FaGithub className="w-4 h-4 text-white/70" /> GitHub
            </a>
            <a href="https://devpost.com/Parthiv12" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white font-medium text-sm hover:bg-neutral-800 transition-colors">
              <Code2 className="w-4 h-4 text-white/70" /> Devpost
            </a>
            <a href="https://www.linkedin.com/in/parthiv-gajula-b84a12182/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white font-medium text-sm hover:bg-neutral-800 transition-colors">
              <FaLinkedin className="w-4 h-4 text-white/70" /> LinkedIn
            </a>
          </motion.div>

          {/* Secondary GitHub Activity block */}
          <motion.div variants={itemVariants} className="mt-8 pt-8 border-t border-neutral-800/30 w-full max-w-[800px] opacity-70 hover:opacity-100 transition-opacity">
             <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-4 gap-2">
                 <h2 className="text-[0.95rem] font-semibold text-white/80 tracking-widest uppercase">
                   Ongoing Work
                 </h2>
                 <p className="text-white/40 text-[0.85rem] font-light italic">
                   GitHub activity, live from the source.
                 </p>
             </div>
             
             <div className="w-full overflow-hidden scale-95 origin-left">
               <GitHubCalendar 
                 username="Parthiv12" 
                 colorScheme="dark"
                 theme={{
                   light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
                   dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353']
                 }}
                 blockSize={11}
                 blockMargin={3}
                 fontSize={12}
                 hideTotalCount
                 hideColorLegend
               />
             </div>
          </motion.div>

        </motion.div>
      </div>
    </div>
  );
}
