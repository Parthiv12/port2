import React from 'react'

const Header = ({ contact }) => {
  return (
    <header className="header" style={{display:'flex', justifyContent:'space-between', alignItems:'center', gap: '1rem', padding: '1rem 0'}}>
      <div className="brand" style={{display:'flex', alignItems:'center', gap: '1rem'}}>
        <div style={{width:48, height:48, borderRadius:12, background: 'linear-gradient(135deg,#8b5cf6,#58fbdc)', display:'flex', alignItems:'center', justifyContent:'center', color: 'white', fontWeight:700}}>PC</div>
        <div>
          <div style={{fontWeight:700}}>{'Parthiv'}</div>
          <div style={{fontSize:12,color:'#9aa4b2'}}>{contact.location}</div>
        </div>
      </div>
      <nav style={{display:'flex', gap: '1rem'}}>
        <a href="#projects">Projects</a>
        <a href="#experience">Experience</a>
        <a href="#skills">Skills</a>
        <a href="#contact">Contact</a>
      </nav>
    </header>
  )
}

export default Header
