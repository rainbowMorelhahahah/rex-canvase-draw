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

export type DrawLayer = {
  visible?: boolean;
  lines?: DrawLine[]; // 存放线条，和橡皮擦除的轨迹 也是做UNDO / REDO的关键,
  images?: DrawImage[]; // 插入图片的用来存放图片的信息
};
