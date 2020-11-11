import React from 'react';
import './App.css';
import Canvas from '../Canvas/Canvas';
import { CanvasConfig } from '../../config/canvasConfig';

type AppProps = {
  canvasConfig: CanvasConfig;
};

const App: React.FC<AppProps> = ({ canvasConfig }) => {
  return (
    <div className="App">
      <Canvas canvasConfig={canvasConfig} />
    </div>
  );
};

export default App;
