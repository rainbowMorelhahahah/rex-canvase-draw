
import React, { memo, useEffect, useImperativeHandle, useRef, useState } from 'react';
import styled from 'styled-components';
import { Stage, Layer as LayerKonva, Rect, Group, Line, Transformer as TransformerKonva } from 'react-konva';
import { DrawImage } from './Image';
import { Layer } from 'konva/lib/Layer';
import Konva from 'konva';
import { KonvaEventObject } from 'konva/lib/Node';
import { DrawLine, DrawMode } from './types';
import { Transformer } from 'konva/lib/shapes/Transformer';

const CanvasBox = styled.div`
    width: 100%;
    height: 100%; 
`

type RexDrawStateProps = {
    mode: DrawMode
}
export type RexDrawStateRef = {
    layerNode: Layer;
    exportJpeg: () => Promise<string>;
}


const RexDrawEdit = React.forwardRef<RexDrawStateRef, RexDrawStateProps>((props, ref) => {

    const { mode } = props;

    const divRef = useRef<HTMLDivElement>(null);
    const stageRef = useRef<Konva.Stage | null>(null);
    const layerRef = useRef<Layer | null>(null);
    const tfRef = useRef<Transformer>();


    const [stageSize, setStageSize] = useState({
        width: 0,
        height: 0,
    })

    const canvasWidth = stageSize.width || 0;
    const canvasHeight = stageSize.height || 0;



    const [currentImageIdx, setCurrentImageIdx] = useState(1);
    const [selectedImage, setSelectedImage] = useState<any>(null);

    const layerWidth = canvasWidth * 0.7;
    const layerHeight = canvasHeight * 0.7;

    const offsetX = (stageSize.width - layerWidth) / 2;
    const offsetY = (stageSize.height - layerHeight) / 2;

    const [brushSize, _setBrushSize] = useState(5);
    const [brushColor, _setBrushColor] = useState('#333');

    const isDrawing = useRef<boolean>(false);
    const [lines, setLines] = useState<DrawLine[]>([]);

    useImperativeHandle(ref, () => {
        return {
            layerNode: layerRef.current!,
            exportJpeg() {
                const tmpIdx = currentImageIdx;
                setCurrentImageIdx(-1);

                return new Promise((rec, _rej) => {
                    setTimeout(() => {
                        const dataUrl = layerRef.current?.toDataURL({
                            x: offsetX,
                            y: offsetY,
                            width: layerWidth,
                            height: layerHeight,
                        });

                        setCurrentImageIdx(tmpIdx);
                        rec(dataUrl as string)
                    }, 0);
                })

            },
        }
    }, [stageSize, layerHeight, layerWidth])

    useEffect(() => {
        setStageSize({
            width: divRef.current!.getBoundingClientRect().width,
            height: divRef.current!.getBoundingClientRect().height
        })
    }, [])


    function handleMouseDown(e: KonvaEventObject<PointerEvent>) {
        setSelectedImage(e.target)
        tfRef.current?.nodes([e.target]);

        if (mode === DrawMode.BRUSH_MODE) {
            if (selectedImage !== null) {
                isDrawing.current = true;
                setLines((pre) => {
                    const pos = e.target.getStage()?.getPointerPosition()!;
                    return [...pre, { points: [pos.x - offsetX, pos.y - offsetY], brushColor, brushSize }]
                })
            }
        }


    }

    function handleMouseMove(e: KonvaEventObject<PointerEvent>) {
        if (mode === DrawMode.BRUSH_MODE) {
            if (isDrawing.current && selectedImage !== null) {
                const stage = stageRef.current?.getStage()!;
                const point = stage.getPointerPosition();
                const lastLine = lines[lines.length - 1];

                lastLine.points = lastLine.points.concat([point!.x - offsetX, point!.y - offsetY])

                lines.splice(lines.length - 1, 1, lastLine);
                setLines(lines.concat());
            }
        }
    }

    function handleMouseUp() {
        isDrawing.current = false;
    }

    return (
        <CanvasBox
            ref={divRef}
        >
            <Stage
                ref={stageRef}
                draggable={false}
                width={stageSize.width}
                height={stageSize.height}
                style={{
                    backgroundColor: '#e8e8e8'
                }}
                onPointerDown={handleMouseDown}
                onPointerMove={handleMouseMove}
                onPointerUp={handleMouseUp}
            >

                <LayerKonva
                    ref={layerRef}
                >
                    <Group
                        x={(canvasWidth - layerWidth) / 2}
                        y={(canvasHeight - layerHeight) / 2}
                    >
                        <Rect
                            width={layerWidth}
                            height={layerHeight}
                            fill="#fff"
                        />

                        <DrawImage
                            url='https://konvajs.org/assets/yoda.jpg'
                            isSelected={currentImageIdx === 1}
                            onDragEnd={(evt) => setSelectedImage(evt.target)}
                            draggable={mode === DrawMode.SELECT_MODE}
                        />

                        {
                            lines.map((line, idx) => {
                                return (
                                    <Line
                                        draggable={mode === DrawMode.SELECT_MODE}
                                        key={`line-${idx}`}
                                        points={line.points}
                                        strokeWidth={line.brushSize}
                                        stroke={line.brushColor}
                                        lineCap='round'
                                        lineJoin='round'
                                        globalCompositeOperation='source-over'
                                    />
                                )
                            })
                        }
                        < TransformerKonva
                            visible={selectedImage !== null}
                            ref={tfRef as any}
                            boundBoxFunc={(_oldBox, newBox) => {
                                return newBox
                            }}
                        />
                    </Group>
                </LayerKonva>



            </Stage>
        </CanvasBox>
    );
})


export default memo(RexDrawEdit);