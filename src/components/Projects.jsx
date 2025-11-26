import React from 'react'

const Projects = ({ projects }) => {
  return (
    <section id="projects" style={{padding: '2rem 0'}}>
      <h2>Projects</h2>
      <div style={{display:'grid', gap: '1rem'}}>
        {projects.map((p, i) => (
          <div key={i} style={{textAlign:'left', padding:'1rem', borderRadius: 12, background: 'rgba(255,255,255,0.02)'}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <div style={{fontWeight:700}}>{p.name}</div>
              <div style={{fontSize: 12, color:'#9aa4b2'}}>{p.tech?.slice(0,3).join(', ')}</div>
            </div>
            <ul style={{marginTop: '.5rem', fontSize: 14}}>
              {p.bullets.map((b, idx) => (<li key={idx}>{b}</li>))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Projects
