import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'react-toastify/dist/ReactToastify.css'; // Import the styles
import { ToastContainer } from 'react-toastify';
import { BrowserRouter } from 'react-router-dom';
// Testing
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <App />
    <ToastContainer/>
    </BrowserRouter>
    
  </React.StrictMode>
);


