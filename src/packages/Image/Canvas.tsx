import Konva from "konva";
import { KonvaEventObject } from "konva/lib/Node";
import React, { FC, FunctionComponent, useRef, useState } from "react";
import { Group, Layer, Line, Rect, Shape } from "react-konva"

type DrawImageCanvasProps = {
    brushColor: string;
    brushSize: number;
    selectedImage?: Konva.Shape;
    width: number,
    height: number
}

type LineAttr = {
    points: number[],
    color: string,
    size: number
}

function Canvas(props: DrawImageCanvasProps): JSX.Element {

    const { brushColor, brushSize, selectedImage, width, height } = props;

    const [lines, setLines] = useState<LineAttr[]>([]);
    const isDown = useRef<boolean>(false);

    const handleMouseDown = (e: KonvaEventObject<PointerEvent>) => {
        requestAnimationFrame(() => {
            if (selectedImage === null) {
                return;
            }
            isDown.current = true;
            const target = e.target;
            const stage = e.target.getStage();
            const pointerPosition = stage!.getPointerPosition();
            const layer = target?.getLayer();
            const layerRect = layer.getClientRect();
            const newLine = {
                points: [pointerPosition!.x - layerRect.x, pointerPosition!.y - layerRect.y],
                color: brushColor,
                size: brushSize,
            };
            setLines((pre) => {
                console.log(pre)
                return [...pre, newLine]
            });
        })
    };

    const handleMouseMove = (e: KonvaEventObject<PointerEvent>) => {
        requestAnimationFrame(() => {
            if (!isDown.current || selectedImage === null) {
                return
            }
            const target = e.target;
            const stage = e.target.getStage();
            const pointerPosition = stage!.getPointerPosition();
            const layer = target?.getLayer();
            const layerRect = layer.getClientRect();

            setLines((pre) => {
                let lastLine = pre[pre.length - 1];
                lastLine.points = lastLine.points.concat([pointerPosition!.x - layerRect.x, pointerPosition!.y - layerRect.y]);
                pre.splice(pre.length - 1, 1, lastLine);
                return [...pre]
            });

        })
    };

    const handleMouseUp = () => {

        isDown.current = false;
        setLines([]);
    }

    return (
        <React.Fragment>
            <Rect
                width={width}
                height={height}
                onPointerDown={handleMouseDown}
                onPointerMove={handleMouseMove}
                onPointerUp={handleMouseUp}
            >

            </Rect>
            {
                lines.map((line, i) => {
                    return (
                        <Line
                            key={`ling-${i}`}
                            points={line.points}
                            stroke={line.color}
                            strokeWidth={line.size}
                            tension={0.5}
                            lineCap="round"
                            lineJoin="round"
                            globalCompositeOperation="source-out"
                        />
                    )
                })
            }
        </React.Fragment>
    )

}

export const DrawImageCanvas = React.memo(Canvas);