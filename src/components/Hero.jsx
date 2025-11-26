import React from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Float, Html } from '@react-three/drei'

const ThreeScene = () => {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 45 }} style={{height: '320px'}}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[2, 5, 2]} intensity={0.6} />
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <mesh castShadow>
          <torusKnotGeometry args={[1.2, 0.35, 128, 32]} />
          <meshStandardMaterial color="#8b5cf6" metalness={0.6} roughness={0.1} />
        </mesh>
      </Float>
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.4} />
    </Canvas>
  )
}

const Hero = ({ name, contact }) => {
  return (
    <section style={{display:'flex', alignItems:'center', justifyContent:'space-between', gap: '2rem', padding: '2rem 0'}}>
      <div style={{flex: '1 1 0'}}>
        <h1 style={{fontSize: 'clamp(2rem, 5vw, 3.2rem)', margin: 0}}>{name}</h1>
        <p style={{color: '#9aa4b2', marginTop: '.5rem', maxWidth: 680}}>
          I'm a Computer Science student at Wayne State University focused on AI, systems, and full-stack development.
          I build AI-powered applications and scalable systems. I'm currently working on a gamified job search app and an AI movie recommender.
        </p>
        <div style={{marginTop: '1rem', display:'flex', gap: '0.75rem'}}>
          <a href={contact.linkedin} target="_blank" rel="noreferrer"><button>LinkedIn</button></a>
          <a href={contact.github} target="_blank" rel="noreferrer"><button>GitHub</button></a>
          <a href={`mailto:${contact.email}`}><button>Email</button></a>
        </div>
      </div>
      <div style={{width: '320px', minWidth: 240, borderRadius: 12, overflow: 'hidden', background: 'linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))', boxShadow: '0 6px 20px rgba(12, 12, 12, 0.6)'}}>
        <ThreeScene />
      </div>
    </section>
  )
}

export default Hero
