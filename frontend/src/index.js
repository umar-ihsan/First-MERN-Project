import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import WorkoutsContextprovider from './contexts/WorkoutsContext';
import AuthContextprovider from './contexts/AuthContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextprovider>
    <WorkoutsContextprovider>

    
    <App />

    </WorkoutsContextprovider>
    </AuthContextprovider>
  </React.StrictMode>
);

