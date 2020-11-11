export type CanvasConfig = {
  width: number;
  height: number;
  strokeStyle: string | CanvasGradient | CanvasPattern;
  lineWidth: number;
  lineCap: CanvasLineCap;
};

const canvasConfig: CanvasConfig = {
  height: 600,
  width: 800,
  strokeStyle: 'red',
  lineWidth: 5,
  lineCap: 'round',
};

export default canvasConfig;
