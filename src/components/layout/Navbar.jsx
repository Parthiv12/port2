import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const { pathname } = useLocation();
  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const links = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "Blog", href: "/blog" },
    { name: "Research", href: "/research" },
    { name: "Timeline", href: "/timeline" },
    { name: "Stack", href: "/stack" },
    { name: "About", href: "/about" }
  ];

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-2 rounded-2xl border border-white/5 bg-black/40 backdrop-blur-xl shadow-sm">
      {links.map(link => (
        <Link 
          key={link.name}
          to={link.href} 
          className={cn(
            "px-3 py-1.5 text-sm font-medium transition-colors rounded-lg",
            isActive(link.href) 
              ? "text-white bg-white/10" 
              : "text-white/50 hover:text-white/80 hover:bg-white/5"
          )}
        >
          {link.name}
        </Link>
      ))}
    </nav>
  );
}
