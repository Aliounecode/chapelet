import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Polices embarquées (fonctionnent aussi hors ligne)
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/cormorant-garamond/500.css';
import '@fontsource/cormorant-garamond/600.css';
import '@fontsource/cormorant-garamond/700.css';
import '@fontsource/scheherazade-new/arabic-400.css';
import '@fontsource/scheherazade-new/arabic-500.css';

import App from './App.jsx';
import './styles/global.css';
import './styles/arabe.css';
import './styles/quizz.css';

createRoot(document.getElementById('racine')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
