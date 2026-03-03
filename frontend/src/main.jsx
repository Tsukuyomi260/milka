import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import './index.css'
import 'mapbox-gl/dist/mapbox-gl.css'

const root = document.getElementById('root')
if (!root) {
  document.body.innerHTML = '<p style="padding:20px;font-family:sans-serif;">Erreur: élément #root introuvable.</p>'
} else {
  try {
    createRoot(root).render(
      <StrictMode>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </StrictMode>,
    )
  } catch (err) {
    root.innerHTML = `<div style="padding:24px;font-family:sans-serif;"><h1 style="color:#F40009">Erreur au chargement</h1><p>${err.message}</p><pre style="font-size:12px">${err.stack}</pre></div>`
  }
}
