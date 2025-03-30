
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async';
import App from './App.tsx'
import './index.css'

// Create root element and render app
const rootElement = document.getElementById("root");

// Make sure the root element exists
if (!rootElement) {
  console.error("Cannot find root element to mount React application");
  throw new Error("Root element not found");
}

createRoot(rootElement).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);
