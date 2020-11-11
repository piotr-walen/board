import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import initializeFirebase from './firebase/initialize';
import canvasConfig from './config/canvasConfig';

initializeFirebase();

ReactDOM.render(
  <React.StrictMode>
    <App canvasConfig={canvasConfig} />
  </React.StrictMode>,
  document.getElementById('root'),
);
