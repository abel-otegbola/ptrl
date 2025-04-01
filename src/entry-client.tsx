import './index.css'
import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import App from './App'

const rootElement = document.getElementById('root') as HTMLElement; // <-- Type assertion

hydrateRoot(
  rootElement,
  <StrictMode>
    <App />
  </StrictMode>
);