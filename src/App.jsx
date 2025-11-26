import React, { useEffect } from "react";
import "./App.css";

import resume from "./data/resume";

import Header from "./components/Header";
import Hero from "./components/Hero";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
// import NetworkViz from "./components/NetworkViz";

import LightRays from "./backgroundM/LightRays";

const App = () => {
  useEffect(() => {
    const path = window.location.pathname || "/";
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
    <div id="app-root">

      {/* 🌟 GLOBAL BACKGROUND — stays behind ALL content */}
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

      {/* 🌟 MAIN CONTENT */}
      <div className="main-panel">
        <Header contact={resume.contact} />
        <Hero name={resume.name} contact={resume.contact} />

        <main style={{ paddingTop: "1rem" }}>
          {/* <NetworkViz resume={resume} /> */}
          <Experience items={resume.experience} />
          <Projects projects={resume.projects} />
          <Skills skills={resume.skills} />
          <Contact contact={resume.contact} />
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default App;
