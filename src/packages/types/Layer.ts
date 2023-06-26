import { Key } from "react";
import { DrawLine } from ".";

export type Layer = {
  uuid?: Key;
  name?: string;
  visible?: boolean;
  opacity?: number;
  linePost?: DrawLine[];
  imageSrc?: string;
  image?: Blob;
  img?: CanvasImageSource;
};
