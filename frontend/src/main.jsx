import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import { BooksContextProvider } from './contexts/BooksContext.jsx';
import { UserContextProvider } from './contexts/UserContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <UserContextProvider>
      <BooksContextProvider>
        <App />
      </BooksContextProvider>
      </UserContextProvider>
    </BrowserRouter>
  </StrictMode>
);
