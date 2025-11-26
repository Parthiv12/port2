import React, { useEffect } from 'react'
import resume from '../data/resume'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Experience from '../components/Experience'
import Projects from '../components/Projects'
import Skills from '../components/Skills'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import NetworkViz from '../components/NetworkViz'
import LightRays from '../backgroundM/LightRays'

const Home = () => {
  useEffect(() => {
    const root = document.getElementById('root')
    document.body.classList.add('home-isolated')
    if (root) root.classList.add('home-isolated')
    return () => {
      document.body.classList.remove('home-isolated')
      if (root) root.classList.remove('home-isolated')
    }
  }, [])

  return (
    <div id="home-root" style={{ position: 'relative', minHeight: '100vh', zIndex: 1 }}>
      {/* LightRays background for home only */}
      <div style={{ position: 'fixed', inset: 0, zIndex: -1, pointerEvents: 'none' }}>
        <LightRays raysOrigin="top-center" raysColor="#58fbdc" raysSpeed={1.2} lightSpread={0.65} rayLength={1.4} followMouse={true} mouseInfluence={0.12} noiseAmount={0.05} distortion={0.02} className="custom-rays" />
      </div>

      <div className="main-panel">
        <Header contact={resume.contact} />
        <Hero name={resume.name} contact={resume.contact} />
        <main style={{ paddingTop: '1rem' }}>
          <NetworkViz resume={resume} />
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

export default Home
