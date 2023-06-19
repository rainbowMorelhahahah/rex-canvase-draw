import Konva from "konva";
import RexDrawImage, { RexDrawImageEventName } from "./Image";
import { DrawMode } from "./types";
export class CanavasControl {
  #stage!: Konva.Stage;

  #pointerDown: boolean = false;

  #lastPointerPosition: Konva.Vector2d | null = null;

  #drawMode: DrawMode = DrawMode.SELECT_MODE;

  constructor(el: HTMLDivElement) {
    const stage = new Konva.Stage({
      container: el,
      width: el.getBoundingClientRect().width,
      height: el.getBoundingClientRect().height,
    });
    this.#stage = stage;
    this.Init();
  }

  Init() {
    const layer = new Konva.Layer();
    this.#stage.add(layer);

    const defaultImage = this.createImage();
    layer.add(defaultImage.getKonvaImage().image);
    layer.add(defaultImage.getKonvaImage().transformer);
    layer.draw();
    this.#stage.on("pointermove", () => {
      console.log(this.#drawMode);
      if (this.#pointerDown === false) return;
      if (this.#drawMode === DrawMode.BRUSH_MODE) {
        const context = defaultImage.getContext();
        context!.strokeStyle = "#333";
        context!.lineJoin = "round";
        context!.lineWidth = 5;
        context!.globalCompositeOperation = "source-over";
        context?.beginPath();

        const localPost = {
          x:
            this.#lastPointerPosition!.x -
            defaultImage.getKonvaImage().image.x(),
          y:
            this.#lastPointerPosition!.y -
            defaultImage.getKonvaImage().image.y(),
        };

        context?.moveTo(localPost.x, localPost.y);
        const pos = this.#stage.getPointerPosition()!;
        const localPos = {
          x: pos.x - defaultImage.getKonvaImage().image.x(),
          y: pos.y - defaultImage.getKonvaImage().image.y(),
        };

        context?.lineTo(localPos.x, localPos.y);
        context?.closePath();
        context?.stroke();

        this.#lastPointerPosition = pos;
        layer.batchDraw();
      }
    });

    this.#stage.on("click", (event) => {
      //   console.log(event.target);
    });
  }

  createImage() {
    const img = new RexDrawImage();
    img.create(this.#stage.width(), this.#stage.height());
    img.onSignal((eventName) => {
      if (eventName === RexDrawImageEventName.PointerDown) {
        this.#pointerDown = true;
        this.#lastPointerPosition = this.#stage.getPointerPosition();
      }
      if (eventName === RexDrawImageEventName.PointerUp) {
        this.#pointerDown = false;
      }
    });

    return img;
  }

  setDrawMode(mode: DrawMode) {
    this.#drawMode = mode;
  }
}
