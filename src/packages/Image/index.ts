import Konva from "konva";
import { MiniSignal } from "mini-signals";

export enum RexDrawImageEventName {
  PointerDown = "pointerdown",
  PointerUp = "pointerup",
}

type ImageSignalCallBack = (eventName: RexDrawImageEventName) => void;
type RexDrawImageGroup = {
  image: Konva.Image;
  transformer: Konva.Transformer;
};

export default class RexDrawImage {
  #ctx: CanvasRenderingContext2D | null = null;
  #signal!: MiniSignal<[RexDrawImageEventName]>;

  #proxyKonva!: RexDrawImageGroup;

  constructor() {
    this.#signal = new MiniSignal();
  }

  create(width: number, height: number) {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    this.#ctx = canvas.getContext("2d");

    const image = new Konva.Image({
      image: canvas,
      x: 0,
      y: 0,
    });

    const transformer = new Konva.Transformer({
      nodes: [image],
      enabledAnchors: ["top-left", "top-right", "bottom-left", "bottom-right"],
      rotateEnabled: false,
      draggable: true,
      boundBoxFunc(_oldBox, newBox) {
        return newBox;
      },
    });

    image.on("pointerdown", () => {
      this.#signal.dispatch(RexDrawImageEventName.PointerDown);
    });

    image.on("pointerup", () => {
      this.#signal.dispatch(RexDrawImageEventName.PointerUp);
    });
    this.#proxyKonva = {
      image,
      transformer,
    };
    return this;
  }

  getContext() {
    return this.#ctx;
  }

  getKonvaImage() {
    return this.#proxyKonva;
  }

  onSignal(callback: ImageSignalCallBack) {
    this.#signal.add(callback);
  }
}
