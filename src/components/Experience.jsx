import React from 'react'

const Experience = ({ items }) => {
  return (
    <section id="experience" style={{padding: '2rem 0'}}>
      <h2>Experience</h2>
      <div style={{display:'grid', gap: '1rem'}}>
        {items.map((job,i) => (
          <div key={i} style={{textAlign:'left', padding:'1rem', borderRadius: 12, background: 'rgba(255,255,255,0.02)'}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <div>
                <div style={{fontWeight:700}}>{job.role} @ {job.company}</div>
                <div style={{fontSize: 12, color:'#9aa4b2'}}>{job.period}</div>
              </div>
            </div>
            <ul style={{marginTop: '.75rem'}}>
              {job.bullets.map((b, idx) => (
                <li key={idx} style={{marginBottom: '.25rem'}}>{b}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Experience
