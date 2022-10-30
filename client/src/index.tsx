// Core
import React from 'react';
// Packages
import ReactDOM from 'react-dom/client';
// Components
import App from './App';
// styles
import './App.css';

declare global {
  interface Window {
    Telegram: any;
  }
}

// Create root
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
