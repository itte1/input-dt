import { createRoot } from 'react-dom/client'
import { App } from './app.jsx'

import '../../../input-dt.js'
import 'input-dt/input-dt.css'

const root = createRoot(document.getElementById('root'))
root.render(<App />)