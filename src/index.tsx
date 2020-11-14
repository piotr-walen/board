import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import canvasConfig from './config/canvasConfig';

ReactDOM.render(
  <React.StrictMode>
    <App canvasConfig={canvasConfig} />
  </React.StrictMode>,
  document.getElementById('root'),
);
