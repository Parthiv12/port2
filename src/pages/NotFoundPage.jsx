import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-6">
      <p className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-3">404</p>
      <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
        This page doesn't exist
      </h1>
      <p className="text-white/60 max-w-md mb-8">
        Either the link is old or I moved something. The good stuff is still here:
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link to="/" className="inline-flex items-center text-sm font-medium bg-white text-black px-4 py-2 rounded-lg hover:bg-white/90 transition-colors">
          Home
        </Link>
        <Link to="/projects" className="inline-flex items-center text-sm font-medium bg-white/10 text-white px-4 py-2 rounded-lg hover:bg-white/20 border border-white/5 transition-colors">
          Projects
        </Link>
        <Link to="/blog" className="inline-flex items-center text-sm font-medium bg-white/10 text-white px-4 py-2 rounded-lg hover:bg-white/20 border border-white/5 transition-colors">
          Blog
        </Link>
      </div>
    </div>
  );
}
