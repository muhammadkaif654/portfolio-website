import { createRoot } from 'react-dom/client'
import App from './App'
import { initLoop } from './lib/loop'
import './styles/global.css'

if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
window.scrollTo(0, 0)
initLoop()

createRoot(document.getElementById('root')).render(<App />)
