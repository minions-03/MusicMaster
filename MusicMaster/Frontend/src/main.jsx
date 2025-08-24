import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './Contexts/AuthContext'; 
import { CartProvider } from './Contexts/CartContext'; 
ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
);
