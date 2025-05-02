
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';

// Force Mapbox to respect absolute positioning
document.head.insertAdjacentHTML(
  'beforeend',
  `<style>
    .mapboxgl-map {
      position: absolute !important;
      top: 0 !important;
      bottom: 0 !important;
      left: 0 !important;
      right: 0 !important;
      height: 100% !important;
      width: 100% !important;
    }
  </style>`
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
