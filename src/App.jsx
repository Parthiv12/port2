import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import resume from "./data/resume";

// Portfolio components
import Header from "./components/Header";
import Hero from "./components/Hero";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

// Background
import LightRays from "./backgroundM/LightRays";

// Test Page
import TestPage from "./test/TestPage";

const HomePage = () => {
  return (
    <div className="main-panel">
      <Header contact={resume.contact} />
      <Hero name={resume.name} contact={resume.contact} />

      <main style={{ paddingTop: "1rem" }}>
        <Experience items={resume.experience} />
        <Projects projects={resume.projects} />
        <Skills skills={resume.skills} />
        <Contact contact={resume.contact} />
      </main>

      <Footer />
    </div>
  );
};

const App = () => {
  useEffect(() => {
    const root = document.getElementById("root");

    const applyClass = () => {
      const p = window.location.pathname || "/";
      const shouldIsolate = p === "/" || p === "/index.html";

      document.body.classList.toggle("home-isolated", shouldIsolate);
      if (root) root.classList.toggle("home-isolated", shouldIsolate);
    };

    applyClass();
    window.addEventListener("popstate", applyClass);
    return () => window.removeEventListener("popstate", applyClass);
  }, []);

  return (
    <BrowserRouter>
      {/* Background stays globally, behind all routes */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: -1,
          pointerEvents: "none",
        }}
      >
        <LightRays />
      </div>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
