
import React from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from 'next-themes';
import App from './App.tsx';
import './index.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found!');
}

const root = createRoot(rootElement);
root.render(
  <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
    <App />
  </ThemeProvider>
);
