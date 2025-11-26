import React, { useEffect } from 'react'
import LightRays from '../backgroundM/LightRays'
import '../backgroundM/LightRays.css'
import './TestPage.css'

const TestPage = () => {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        window.location.pathname = '/'
      }
    }
    window.addEventListener('keydown', onKey)

    // Add body and root test-isolated class to override global styles
    document.body.classList.add('test-isolated')
    const root = document.getElementById('root')
    if (root) root.classList.add('test-isolated')

    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.classList.remove('test-isolated')
      if (root) root.classList.remove('test-isolated')
    }
  }, [])

  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
      <LightRays raysOrigin="bottom-center" raysColor="#58fbdc" raysSpeed={1.2} lightSpread={0.65} rayLength={3} followMouse={true} mouseInfluence={1.11} noiseAmount={1.1} distortion={0.02} className="custom-rays" />
      <div className="test-message">LightRays — press Esc to return</div>
    </div>
  )
}

export default TestPage
