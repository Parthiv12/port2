import React, { useEffect } from 'react'
import './App.css'
import resume from './data/resume'
import Header from "./components/Header";
import Hero from "./components/Hero";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import NetworkViz from './components/NetworkViz';
import LightRays from './backgroundM/LightRays';

const App = () => {
  useEffect(() => {
    const path = window.location.pathname || '/'
    const root = document.getElementById('root')
    if (path === '/' || path === '/index.html') {
      document.body.classList.add('home-isolated')
      if (root) root.classList.add('home-isolated')
    } else {
      document.body.classList.remove('home-isolated')
      if (root) root.classList.remove('home-isolated')
    }
    const popHandler = () => {
      const p = window.location.pathname || '/'
      if (p === '/' || p === '/index.html') {
        document.body.classList.add('home-isolated')
        if (root) root.classList.add('home-isolated')
      } else {
        document.body.classList.remove('home-isolated')
        if (root) root.classList.remove('home-isolated')
      }
    }
    window.addEventListener('popstate', popHandler)
    return () => window.removeEventListener('popstate', popHandler)
  }, [])

  return (
    <div id="app-root">

      {/* 🔥 GLOBAL BACKGROUND — always behind everything */}
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

      <div className="main-panel">
        <Header contact={resume.contact} />
        <Hero name={resume.name} contact={resume.contact} />
        <main style={{paddingTop: '1rem'}}>
        {/* still implementing this */}
        { /* <NetworkViz resume={resume} /> */ }
        <Experience items={resume.experience} />
        <Projects projects={resume.projects} />
        <Skills skills={resume.skills} />
        <Contact contact={resume.contact} />
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default App