import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App.jsx';
import './index.css';

/**
 * Entry point for the NeoLabs application.
 *
 * Mounts the React app into the root element and wraps it with a
 * BrowserRouter.  StrictMode helps catch potential issues during
 * development.
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);