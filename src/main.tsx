
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import { Toaster } from 'sonner';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <App />
      <Toaster 
        position="top-right" 
        richColors 
        closeButton 
        toastOptions={{ 
          duration: 4000,
          // Using the standard Sonner toast options without custom 'id' property
        }}
      />
    </Router>
  </React.StrictMode>
);
