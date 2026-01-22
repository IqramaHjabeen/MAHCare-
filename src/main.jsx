import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Skincare from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Skincare />
  </StrictMode>,
)
