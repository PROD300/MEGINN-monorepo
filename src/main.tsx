import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './tokens/primitives.css'
import './tokens/semantics.css'
import './tokens/typography.css'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
