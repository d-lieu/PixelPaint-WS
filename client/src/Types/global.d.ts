export type fillGridOfPixelsProps = {
  x: number;
  y: number;
  color: string;
  gridSize: number;
};

export type fillSinglePixelProps = {
  x: number;
  y: number;
  color: string;
};

export type CurrentDrawStroke = Omit<fillGridOfPixelsProps, "gridSize">;

export type Socket = any | null;

export type CanvasType = {
  [key: string]: fillGridOfPixelsProps;
};

export type User = {
  name: string;
  color: string;
  gridSize: number;
};
