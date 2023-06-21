
import React, { memo, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { Stage, Layer as LayerKonva, Rect, Group, Line, Transformer as TransformerKonva } from 'react-konva';
import { DrawImage } from './Image';
import { Layer } from 'konva/lib/Layer';
import Konva from 'konva';
import { KonvaEventObject } from 'konva/lib/Node';
import { DrawLine, DrawMode } from './types';
import { Transformer } from 'konva/lib/shapes/Transformer';
import { Color } from '@rc-component/color-picker';
import { LineConfig } from 'konva/lib/shapes/Line';


const CanvasBox = styled.div`
    width: 100%;
    height: 100%; 
`

type RexDrawStateProps = {
    mode: DrawMode;
    brushSize?: number;
    brushColor: Color;
}
export type RexDrawStateRef = {
    layerNode: Layer;
    exportJpeg: () => Promise<string>;
}


const RexDrawEdit = React.forwardRef<RexDrawStateRef, RexDrawStateProps>((props, ref) => {

    const { mode, brushSize = 5, brushColor } = props;

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

    const [selectedImage, setSelectedImage] = useState<any>(null);

    const layerWidth = canvasWidth * 0.7;
    const layerHeight = canvasHeight * 0.7;

    const offsetX = (stageSize.width - layerWidth) / 2;
    const offsetY = (stageSize.height - layerHeight) / 2;

    const isDrawing = useRef<boolean>(false);
    const [lines, setLines] = useState<DrawLine[]>([]);


    useImperativeHandle(ref, () => {
        return {
            layerNode: layerRef.current!,
            exportJpeg() {
                const tmpSelectNode = selectedImage;
                setSelectedImage(null);
                return new Promise((rec, _rej) => {
                    setTimeout(() => {
                        const dataUrl = layerRef.current?.toDataURL({
                            x: offsetX,
                            y: offsetY,
                            width: layerWidth,
                            height: layerHeight,
                        });

                        rec(dataUrl as string)
                        setSelectedImage(tmpSelectNode);
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

    const shouldDrawingMode = useMemo(() => {
        return [DrawMode.BRUSH_MODE, DrawMode.ERASER_MODE].includes(mode);
    }, [mode]);

    const shouldBrushOrEraser = useMemo((): GlobalCompositeOperation => {
        return mode === DrawMode.BRUSH_MODE ? 'source-over' : 'destination-out';
    }, [mode])

    function handleMouseDown(e: KonvaEventObject<PointerEvent>) {


        if (shouldDrawingMode) {
            if (selectedImage !== null) {
                isDrawing.current = true;
                setLines((pre) => {
                    const pos = e.target.getStage()?.getPointerPosition()!;
                    return [
                        ...pre,
                        {
                            points: [pos.x - offsetX, pos.y - offsetY],
                            brushColor,
                            brushSize,
                            drawMode: shouldBrushOrEraser
                        }
                    ]
                })
            }
        }


    }

    function handleMouseMove(e: KonvaEventObject<PointerEvent>) {
        if (shouldDrawingMode) {
            if (isDrawing.current && selectedImage !== null) {
                const stage = stageRef.current?.getStage()!;
                const point = stage.getPointerPosition();
                const lastLine = lines[lines.length - 1];

                lastLine.points = lastLine.points.concat(
                    [point!.x - offsetX, point!.y - offsetY]
                )

                lines.splice(lines.length - 1, 1, lastLine);
                setLines(lines.concat());
            }
        }
    }

    function handleMouseUp() {
        isDrawing.current = false;
        // 鼠标弹起的时候需要合并一直新的图片

    }

    function handleSelectItem(node: Konva.Node) {
        if (mode !== DrawMode.SELECT_MODE) return;

        console.log(node.attrs)
        // 如果是Line 对象需要做点处理, 由于工作量原因,我期望Line 不要做拖拽的功能 
        if (node.className === "Line") {
            return;
            // if ((node.attrs as LineConfig).globalCompositeOperation === 'destination-out') {
            //     return;
            // }
        }

        setSelectedImage(node)
        tfRef.current?.nodes([node]);
        tfRef.current?.getLayer()?.batchDraw();
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
                        x={offsetX}
                        y={offsetY}
                    >
                        <Rect
                            width={layerWidth}
                            height={layerHeight}
                            fill="#fff"
                        />
                    </Group>
                </LayerKonva>

                <LayerKonva
                    ref={layerRef}
                >
                    <Group
                        x={offsetX}
                        y={offsetY}
                    >
                        <DrawImage
                            url='https://konvajs.org/assets/yoda.jpg'
                            onDragEnd={(evt) => setSelectedImage(evt.target)}
                            draggable={mode === DrawMode.SELECT_MODE}
                            onPointerClick={(e: KonvaEventObject<PointerEvent>) => {
                                handleSelectItem(e.target)
                            }}
                        />

                        {
                            lines.map((line, idx) => {
                                return (
                                    <Line
                                        // draggable={mode === DrawMode.SELECT_MODE && line.drawMode === 'source-over'}
                                        draggable={false}
                                        key={`line-${idx}`}
                                        points={line.points}
                                        strokeWidth={line.brushSize}
                                        stroke={line.brushColor.toRgbString()}
                                        lineCap='round'
                                        lineJoin='round'
                                        globalCompositeOperation={line.drawMode}
                                        onPointerClick={(e: KonvaEventObject<PointerEvent>) => {
                                            handleSelectItem(e.target)
                                        }}
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