import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import TestPage from './test/TestPage'

const path = window.location.pathname
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {path.startsWith('/test') ? <TestPage /> : <App />}
  </StrictMode>,
)
