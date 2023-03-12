import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';
import { AuthContextProvider } from './Context/AuthContext';
import { LocalStorageProvider } from './Context/LocalStorageProvider';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <LocalStorageProvider>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </LocalStorageProvider>
    </HashRouter>
  </React.StrictMode>
)
