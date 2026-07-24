import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaFileAlt, FaCode } from "react-icons/fa";
import "./HomePage.css";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { ease: [0.16, 1, 0.3, 1], duration: 0.9 } },
};

export default function HomePage() {
  return (
    <div className="home-page-wrapper font-sans flex flex-col">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="flex-1 flex flex-col justify-center items-center text-center px-5"
        style={{ minHeight: "100vh" }}
      >
        <motion.h1
          variants={itemVariants}
          className="text-white font-bold m-0 mb-4"
          style={{ fontSize: "clamp(2.8rem, 6vw, 4rem)", letterSpacing: "-0.03em", lineHeight: 1.05 }}
        >
          Parthiv Gajula
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-white font-bold m-0 mb-5"
          style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.4rem, 3vw, 1.9rem)", letterSpacing: "-0.01em" }}
        >
          Building LLMs from scratch.
        </motion.p>

        <motion.p variants={itemVariants} className="text-white/40 text-[0.8rem] font-mono m-0 mb-10 tracking-wide">
          CS senior, Wayne State · May 2026
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-3 mb-12">
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="hero-btn hero-btn-primary">
            <FaFileAlt size={15} /> Resume
          </a>
          <a href="https://github.com/Parthiv12" target="_blank" rel="noopener noreferrer" className="hero-btn hero-btn-outline">
            <FaGithub size={15} /> GitHub
          </a>
          <a href="https://www.linkedin.com/in/parthiv-gajula-b84a12182/" target="_blank" rel="noopener noreferrer" className="hero-btn hero-btn-outline">
            <FaLinkedin size={15} /> LinkedIn
          </a>
          <a href="https://devpost.com/Parthiv12" target="_blank" rel="noopener noreferrer" className="hero-btn hero-btn-outline">
            <FaCode size={15} /> Devpost
          </a>
        </motion.div>

        <motion.p variants={itemVariants} className="text-white/40 text-[0.95rem] m-0">
          <a href="https://tracelens.parthivg.com" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white underline underline-offset-4 decoration-white/20 transition-colors">
            TraceLens is live
          </a>
          <span className="mx-3 text-white/20">·</span>
          <Link to="/blog" className="text-white/60 hover:text-white underline underline-offset-4 decoration-white/20 transition-colors">
            I write about what breaks
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
}
