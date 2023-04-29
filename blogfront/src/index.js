import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ContextPro } from './components/context/Context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ContextPro>
    <App />
    </ContextPro>
  </React.StrictMode>
);

