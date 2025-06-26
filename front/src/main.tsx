import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/styles/output.css'
import App from './routes/App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
