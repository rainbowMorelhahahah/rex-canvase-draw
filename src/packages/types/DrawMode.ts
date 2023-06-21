export enum DrawMode {
  SELECT_MODE,
  BRUSH_MODE,
  ERASER_MODE,
}

export type DrawLine = {
  points: number[];
  brushSize: number;
  brushColor: string;
};
