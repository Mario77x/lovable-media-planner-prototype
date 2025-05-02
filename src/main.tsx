
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
          // Prevent duplicate toasts
          id: (notification) => {
            // Use message content as the unique ID
            return notification.title || notification.description || String(Date.now());
          }
        }}
      />
    </Router>
  </React.StrictMode>
);
