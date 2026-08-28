import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { StoreProvider } from './state/StoreContext'
import { NotifyProvider } from './state/NotifyContext'
import App from './App'
import './index.css'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StoreProvider>
      <NotifyProvider>
        <App />
      </NotifyProvider>
    </StoreProvider>
  </BrowserRouter>
)
