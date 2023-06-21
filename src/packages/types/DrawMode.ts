import { Color } from "@rc-component/color-picker";
import Konva from "konva";

export enum DrawMode {
  SELECT_MODE,
  BRUSH_MODE,
  ERASER_MODE,
}

export type DrawLine = {
  points: number[];
  brushSize: number;
  brushColor: Color;
  drawMode: GlobalCompositeOperation;
};

export type DrawBrushSize = number;
export type DrawBrushColor = Color;

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
