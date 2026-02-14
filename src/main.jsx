import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import GameScene from './scenes/gamescene.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GameScene />
  </StrictMode>,
)
