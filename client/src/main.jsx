import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

// Context Providers
import { AuthProvider } from './components/AuthContext';
import { MentorsProvider } from './components/MentorsContext';
import { DarkModeProvider } from './components/DarkModeContext'; // 👈 Import it

const root = createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <MentorsProvider>
          <DarkModeProvider> {/* 👈 Wrap App */}
            <App />
          </DarkModeProvider>
        </MentorsProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
