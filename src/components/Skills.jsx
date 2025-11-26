import React from 'react'

const Skills = ({ skills }) => {
  return (
    <section id="skills" style={{padding: '2rem 0'}}>
      <h2>Skills</h2>
      <div style={{display:'flex', gap: '1rem', flexWrap:'wrap', marginTop: '.75rem'}}>
        {skills.languages.map((l, i) => (
          <div key={i} style={{padding: '.5rem 0.75rem', borderRadius: 999, background:'rgba(255,255,255,0.02)'}}>{l}</div>
        ))}
      </div>
      <div style={{marginTop: '0.75rem'}}>
        <strong>Frameworks & Tools</strong>
        <div style={{display:'flex', gap: '1rem', flexWrap:'wrap', marginTop: '.5rem'}}>
          {skills.frameworks.map((f, idx) => (<div key={idx} style={{padding: '.4rem .6rem', borderRadius:8, background:'rgba(255,255,255,0.02)'}}>{f}</div>))}
        </div>
      </div>
    </section>
  )
}

export default Skills
