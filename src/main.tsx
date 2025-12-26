import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './context/auth-context.tsx';
import React from 'react';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <App children={undefined} />
    </AuthProvider>
  </React.StrictMode>
);