export type SinglePixelProps = {
  x: number;
  y: number;
  color: string;
};

export type GridOfPixelsProps = SinglePixelProps & {
  gridSize: number;
};

export type CurrentDrawStroke = Omit<GridOfPixelsProps, "gridSize">;

export type Socket = any | null;

export type CanvasType = {
  [key: string]: GridOfPixelsProps;
};

export type User = {
  name: string;
  color: string;
  gridSize: number;
};
