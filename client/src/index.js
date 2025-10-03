import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './i18n/i18n'; // Initialize i18n before App
import App from './App';
import reportWebVitals from './reportWebVitals';

// WordPress-style body class initialization
const initializeBodyClasses = () => {
  const body = document.body;
  
  // Add WordPress-style admin classes
  body.classList.add(
    'wyenfos-admin',
    'wyenfos-core-ui',
    'no-js', // Will be replaced with 'js' by JavaScript
    'locale-en', // Default locale
    'admin-color-fresh', // Default color scheme
    'version-1-0' // App version
  );
  
  // Detect mobile/desktop
  if (window.innerWidth <= 768) {
    body.classList.add('mobile');
  } else {
    body.classList.add('desktop');
  }
  
  // Detect RTL (you can make this dynamic based on user language)
  const isRtl = document.documentElement.dir === 'rtl' || 
                document.documentElement.getAttribute('lang') === 'ar' ||
                document.documentElement.getAttribute('lang') === 'he';
  
  if (isRtl) {
    body.classList.add('rtl');
  } else {
    body.classList.add('ltr');
  }
  
  // Replace no-js with js class (WordPress pattern)
  setTimeout(() => {
    body.classList.remove('no-js');
    body.classList.add('js');
  }, 100);
};

// Initialize body classes before rendering
initializeBodyClasses();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
