import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { projectBySlug } from "../../data/projects.js";
import { Badge } from "../../components/ui/badge.jsx";
import { Separator } from "../../components/ui/separator.jsx";
import { ArrowLeft, Globe, FileText } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import FadeIn from "../../components/ui/FadeIn.jsx";

function ExternalOrInternalLink({ href, className, children }) {
  if (href.startsWith("/")) {
    return (
      <Link to={href} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  );
}

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const project = projectBySlug[slug];

  useEffect(() => {
    if (project) document.title = `${project.title} · Parthiv Gajula`;
  }, [project]);

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-white bg-background">
        <h1 className="text-3xl font-bold">Project Not Found</h1>
        <Link to="/projects" className="mt-4 text-white/60 hover:text-white transition-colors">
          ← Back to Projects
        </Link>
      </div>
    );
  }

  const secondaryBtn =
    "inline-flex items-center text-sm font-medium bg-white/10 text-white px-4 py-2 rounded-lg hover:bg-white/20 border border-white/5 transition-colors";

  return (
    <div className="min-h-screen font-sans pb-24" style={{ padding: "100px clamp(16px, 4vw, 40px) 100px", maxWidth: "800px", margin: "0 auto" }}>
      <FadeIn>
        {/* Back link */}
        <Link to="/projects" className="inline-flex items-center text-sm font-medium text-white/50 hover:text-white transition-colors mb-8 group">
          <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
          All projects
        </Link>

        {/* Hero */}
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-3 text-xs font-semibold text-white/40 uppercase tracking-widest">
            <span className="font-mono normal-case tracking-wide">{project.year}</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span>{project.type}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4 leading-tight">
            {project.title}
          </h1>

          <p className="text-[1.1rem] text-white/70 leading-relaxed mb-6 max-w-[650px]">
            {project.long || project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
            {project.tags?.map((tag) => (
              <Badge key={tag} variant="secondary" className="bg-white/5 hover:bg-white/10 text-white/70 border border-white/5 font-mono text-[0.7rem] tracking-wide px-2.5 py-0.5 shadow-none">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            {project.links?.demo && (
              <ExternalOrInternalLink
                href={project.links.demo}
                className="inline-flex items-center text-sm font-medium bg-white text-black px-4 py-2 rounded-lg hover:bg-white/90 transition-colors"
              >
                <Globe className="w-4 h-4 mr-2" /> Live Demo
              </ExternalOrInternalLink>
            )}
            {project.links?.github && (
              <ExternalOrInternalLink href={project.links.github} className={secondaryBtn}>
                <FaGithub className="w-4 h-4 mr-2" /> GitHub Repo
              </ExternalOrInternalLink>
            )}
            {project.links?.docs && (
              <ExternalOrInternalLink href={project.links.docs} className={secondaryBtn}>
                <FileText className="w-4 h-4 mr-2" />
                {project.links.docs.startsWith("/") ? "Read the Paper" : "Documentation"}
              </ExternalOrInternalLink>
            )}
          </div>
        </header>

        <Separator className="bg-white/10 mb-10" />

        {/* Highlights — the facts worth remembering */}
        {project.highlights?.length > 0 && (
          <section className="mb-12">
            <ul className="m-0 p-0 list-none grid gap-2.5">
              {project.highlights.map((point) => (
                <li key={point} className="flex items-start gap-3 text-[1rem] text-white/75 leading-relaxed">
                  <span className="mt-[0.65em] w-1 h-1 rounded-full bg-white/40 shrink-0" />
                  {point}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Media gallery — renders only when files exist */}
        {project.media?.length > 0 && (
          <section className="mb-12 grid gap-6">
            {project.media.map((item) => (
              <figure key={item.src} className="m-0">
                {item.type === "video" ? (
                  <video
                    controls
                    preload="metadata"
                    className="w-full rounded-xl border border-white/10"
                    src={item.src}
                  />
                ) : (
                  <img
                    src={item.src}
                    alt={item.caption || project.title}
                    loading="lazy"
                    className="w-full rounded-xl border border-white/10"
                    onError={(e) => {
                      e.currentTarget.closest("figure").style.display = "none";
                    }}
                  />
                )}
                {item.caption && (
                  <figcaption className="mt-2 text-sm text-white/40">{item.caption}</figcaption>
                )}
              </figure>
            ))}
          </section>
        )}

        {/* Story */}
        <div className="grid gap-10">
          {project.story?.map((section) => (
            <section key={section.heading}>
              <h2 className="text-[1.15rem] font-semibold text-white mb-2 tracking-tight">{section.heading}</h2>
              <p className="text-[1.05rem] text-white/60 leading-relaxed max-w-[650px]">{section.body}</p>
            </section>
          ))}
        </div>
      </FadeIn>
    </div>
  );
}
