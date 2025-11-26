import React from 'react'

const Contact = ({ contact }) => {
  return (
    <section id="contact" style={{padding: '2rem 0'}}>
      <h2>Contact</h2>
      <div style={{display:'flex', gap: '1rem', alignItems:'center', marginTop: '.75rem'}}>
        <div style={{padding: '.75rem 1rem', borderRadius: 12, background:'rgba(255,255,255,0.02)'}}>
          <div style={{fontWeight:700}}>{contact.email}</div>
          <div style={{fontSize: 12, color:'#9aa4b2'}}>{contact.phone}</div>
          <div style={{fontSize: 12, color:'#9aa4b2'}}>{contact.location}</div>
        </div>
        <div style={{display:'flex', gap: '.5rem'}}>
          <a href={contact.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a href={contact.github} target="_blank" rel="noreferrer">GitHub</a>
        </div>
      </div>
    </section>
  )
}

export default Contact
