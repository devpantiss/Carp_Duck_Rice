import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// After a new deploy, old page files no longer exist. Reload to get the new ones.
window.addEventListener('vite:preloadError', () => window.location.reload())

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
