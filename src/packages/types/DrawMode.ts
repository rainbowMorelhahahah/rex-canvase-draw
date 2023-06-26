import Konva from "konva";
import { RgbColor } from "react-colorful";

export enum DrawMode {
  SELECT_MODE,
  BRUSH_MODE,
  ERASER_MODE,
}

export type DrawLine = {
  points: number[];
  brushSize: number;
  brushColor: RgbColor;
  drawMode: GlobalCompositeOperation;
  opacity: number;
};

export type DrawBrushSize = number;
export type DrawBrushColor = RgbColor;

export type DrawImage = {
  image: string; // 存放图片地址,
  widht?: number;
  height?: number;
} & Konva.Vector2d;

export enum AsideTabContent {
  AI_PROMPT,
  LAYER,
}
