import React from 'react'
import './App.css'
import resume from './data/resume'
import Header from "./components/Header";
import Hero from "./components/Hero";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div id="app-root">
      <Header contact={resume.contact} />
      <Hero name={resume.name} contact={resume.contact} />
      <main style={{paddingTop: '1rem'}}>
        <Experience items={resume.experience} />
        <Projects projects={resume.projects} />
        <Skills skills={resume.skills} />
        <Contact contact={resume.contact} />
      </main>
      <Footer />
    </div>
  )
}

export default App