import React, { useEffect, useState } from 'react';
import './App.css';
import Canvas from '../Canvas/Canvas';
import { CanvasConfig } from '../../config/canvasConfig';
import initializeFirebase from '../../firebase/initialize';

type AppProps = {
  canvasConfig: CanvasConfig;
};

const App: React.FC<AppProps> = ({ canvasConfig }) => {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    initializeFirebase();
    setLoading(false);
  }, []);

  return (
    <div className="App">
      {isLoading ? <div>Loading</div> : <Canvas canvasConfig={canvasConfig} />}
    </div>
  );
};

export default App;
