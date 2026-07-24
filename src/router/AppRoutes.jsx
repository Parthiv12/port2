import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PageLayout from "../components/layout/PageLayout.jsx";

// Pages — lazy loaded so each route gets its own chunk
const HomePage = lazy(() => import("../pages/Home/HomePage.jsx"));
const TimelinePage = lazy(() => import("../pages/Timeline/TimelinePage.jsx"));
const ProjectsPage = lazy(() => import("../pages/Projects/ProjectPage.jsx"));
const ProjectsDetailPage = lazy(() => import("../pages/Projects/ProjectsDetailPage.jsx"));
const AboutPage = lazy(() => import("../pages/About/AboutPage.jsx"));
const StackPage = lazy(() => import("../pages/Stack/StackPage.jsx"));
const ResearchPage = lazy(() => import("../pages/Research/ResearchPage.jsx"));
const PaperPage = lazy(() => import("../pages/Research/PaperPage.jsx"));
const BlogIndexPage = lazy(() => import("../pages/Blog/BlogIndexPage.jsx"));
const BlogPostPage = lazy(() => import("../pages/Blog/BlogPostPage.jsx"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage.jsx"));

export default function AppRoutes() {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route element={<PageLayout />}>
          {/* Home */}
          <Route path="/" element={<HomePage />} />

          {/* Projects */}
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:slug" element={<ProjectsDetailPage />} />

          {/* Timeline */}
          <Route path="/timeline" element={<TimelinePage />} />

          {/* About */}
          <Route path="/about" element={<AboutPage />} />

          {/* Tech Stack */}
          <Route path="/stack" element={<StackPage />} />

          {/* Research */}
          <Route path="/research" element={<ResearchPage />} />
          <Route path="/research/paper" element={<PaperPage />} />
          {/* Old paper URL — keep shared links alive */}
          <Route path="/rag" element={<Navigate to="/research" replace />} />

          {/* Blog */}
          <Route path="/blog" element={<BlogIndexPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          {/* Old notes URL — keep shared links alive */}
          <Route path="/notes" element={<Navigate to="/blog" replace />} />

          {/* 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
