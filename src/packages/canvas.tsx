
import React, { Key, memo, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import {
    Stage,
    Rect,
    Group,
    Line,
    Transformer as TransformerKonva,
    Circle,
    Layer as LayerKonva
} from 'react-konva';
// import { Layer as LayerKonva } from '../components/layer'
import { Layer } from 'konva/lib/Layer';
import Konva from 'konva';
import { KonvaEventObject } from 'konva/lib/Node';
import { DrawLine, DrawMode } from './types';
import throttle from 'lodash/throttle'
import { DrawImage } from './Image';
import { RgbColor } from 'react-colorful';
import { Layer as DrawLayer } from '../packages/types';

const CanvasBox = styled.div`
    width: 100%;
    height: 100%; 
`

type RexDrawStateProps = {
    mode: DrawMode;
    brushSetting: {
        size: number;
        color: RgbColor;
        opacity: number
    };
    eraserSetting: {
        size: number,
        opacity: number
    },
    layers: DrawLayer[],
    currentLayerId?: Key,
    onDrawImage?: (imgSrc: string, imgBlob: Blob, img: CanvasImageSource) => void;
    onPointerDown?: (line: DrawLine, e: KonvaEventObject<PointerEvent>) => void;
    onPointerMove?: (newPos: [number, number], e: KonvaEventObject<PointerEvent>) => void;
    onPointerUp?: (e: KonvaEventObject<PointerEvent>) => void;
}
export type RexDrawStateRef = {
    layerNode: Layer;
    exportJpeg: () => Promise<string>;
}

const throttleFn = throttle((fn) => {
    fn()
}, 375, { trailing: false });


const RexDrawEdit = React.forwardRef<RexDrawStateRef, RexDrawStateProps>((props, ref) => {

    const { mode, brushSetting, eraserSetting, onDrawImage, layers, currentLayerId } = props;
    const { onPointerMove, onPointerDown, onPointerUp } = props;

    const divRef = useRef<HTMLDivElement>(null);
    const stageRef = useRef<Konva.Stage | null>(null);
    const layerRef = useRef<Layer | null | undefined>(null);

    const layerMap = useRef<Map<string, Layer | null>>(new Map())

    const [stageSize, setStageSize] = useState({
        width: 0,
        height: 0,
    })

    const [cursorPos, setCursorPos] = useState({
        x: -100,
        y: -100
    })

    const canvasWidth = stageSize.width || 0;
    const canvasHeight = stageSize.height || 0;

    const [selectedImage, setSelectedImage] = useState<any>(null);

    const layerWidth = canvasWidth * 0.7;
    const layerHeight = canvasHeight * 0.7;

    const offsetX = (stageSize.width - layerWidth) / 2;
    const offsetY = (stageSize.height - layerHeight) / 2;

    const isDrawing = useRef<boolean>(false);


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

    useEffect(() => {
        if (!currentLayerId) return;
        const keys = Array.from(layerMap.current.keys());
        const key = keys.filter(v => v.includes(currentLayerId as string)).shift();
        if (key === undefined) return;
        layerRef.current = layerMap.current.get(key);
    }, [currentLayerId])

    const shouldDrawingMode = useMemo(() => {
        return [DrawMode.BRUSH_MODE, DrawMode.ERASER_MODE].includes(mode);
    }, [mode]);

    const shouldBrushOrEraser = useMemo((): GlobalCompositeOperation => {
        return mode === DrawMode.BRUSH_MODE ? 'source-over' : 'destination-out';
    }, [mode])

    function handleMouseDown(e: KonvaEventObject<PointerEvent>) {
        if (shouldDrawingMode) {
            isDrawing.current = true;

            const isBrush = mode === DrawMode.BRUSH_MODE
            const pos = e.target.getStage()?.getPointerPosition()!;
            const { color, size, opacity } = brushSetting;
            const { size: eSize, opacity: eOpacity } = eraserSetting;

            onPointerDown?.(
                {
                    points: [pos.x - offsetX, pos.y - offsetY],
                    brushColor: color,
                    brushSize: isBrush ? size : eSize,
                    drawMode: shouldBrushOrEraser,
                    opacity: isBrush ? opacity : eOpacity
                },
                e
            )

            // setLines((pre) => {

            //     return [
            //         ...pre,

            //     ]
            // })
        }

    }

    function handleMouseMove(e: KonvaEventObject<PointerEvent>) {
        const stage = stageRef.current?.getStage()!;
        const point = stage.getPointerPosition();

        setCursorPos({
            x: point!.x,
            y: point!.y
        })

        if (shouldDrawingMode) {
            if (isDrawing.current) {

                // const lastLine = lines[lines.length - 1];

                // lastLine.points = lastLine.points.concat(
                //     [point!.x - offsetX, point!.y - offsetY]
                // )

                // lines.splice(lines.length - 1, 1, lastLine);
                // setLines(lines.concat());
                // onPointerMove?.(e);
                onPointerMove?.(
                    [point!.x - offsetX, point!.y - offsetY],
                    e
                )
            }
        }
    }

    const handleMouseUp = (e: KonvaEventObject<PointerEvent>) => {
        isDrawing.current = false;
        // 鼠标弹起的时候需要合并一直新的图片
        throttleFn(() => {
            requestAnimationFrame(() => {
                if (shouldDrawingMode) {
                    layerRef.current?.toBlob(
                        {
                            x: offsetX,
                            y: offsetY,
                            width: layerWidth,
                            height: layerHeight,
                            mimeType: 'image/jpg',
                            quality: 1,
                            callback(blob) {
                                const img = new window.Image();
                                img.onload = () => {
                                    onDrawImage?.(src, blob, img);
                                    layerRef.current?.batchDraw();
                                    setTimeout(() => {
                                        onPointerUp?.(e);
                                    }, 0)
                                }
                                const src = URL.createObjectURL(blob);
                                img.src = src;

                            },
                        }
                    )
                }
            })
        })
    }

    function handleSelectItem(node: Konva.Node) {
        if (mode !== DrawMode.SELECT_MODE) return;
        setSelectedImage(node);
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
                    backgroundColor: '#e8e8e8',
                    cursor: 'none'
                }}
                onPointerDown={handleMouseDown}
                onPointerMove={handleMouseMove}
                onPointerUp={handleMouseUp}
            >

                <LayerKonva>
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
                    <Circle
                        x={cursorPos.x}
                        y={cursorPos.y}
                        radius={(mode === DrawMode.BRUSH_MODE ? brushSetting.size : 10) / 2}
                        fill='transparent'
                        stroke="rgb(0,0,0)"
                        strokeWidth={2}
                    />
                </LayerKonva>

                {
                    layers.map((item) => {
                        console.log(item)
                        return (
                            <LayerKonva
                                opacity={item.opacity !== undefined ? item.opacity / 100 : 1}
                                key={item.uuid}
                                visible={item.visible}
                                ref={(node) => {
                                    if (node === null) return;

                                    const id = node?._id!;
                                    const keys = Array.from(layerMap.current.keys()).map(v => {
                                        const _id = v.substring(v.lastIndexOf('-'), v.length);
                                        return _id;
                                    })
                                    const include = keys.includes(id?.toString());
                                    if (!include) {
                                        layerMap.current.set(`${item.uuid}-${id}`, node);
                                    }
                                }}
                            >
                                <Group
                                    x={offsetX}
                                    y={offsetY}
                                >
                                    <DrawImage
                                        uuid={item.uuid}
                                        image={item.img}
                                        draggable={mode === DrawMode.SELECT_MODE}
                                        onPointerClick={(e: KonvaEventObject<PointerEvent>) => {
                                            handleSelectItem(e.currentTarget)
                                        }}
                                    />
                                    {
                                        item.linePost?.map((line, idx) => {
                                            return (
                                                <Line
                                                    draggable={false}
                                                    key={`line-${idx}`}
                                                    points={line.points}
                                                    strokeWidth={line.brushSize}
                                                    stroke={`rgba(${line.brushColor.r},${line.brushColor.g},${line.brushColor.b},${line.opacity / 100})`}
                                                    lineCap='round'
                                                    lineJoin='round'
                                                    globalCompositeOperation={line.drawMode}
                                                    tension={0.1}
                                                />
                                            )
                                        })
                                    }

                                    {
                                        selectedImage && (
                                            <TransformerKonva
                                                node={selectedImage}
                                                keepRatio={false}
                                                ref={(node) => {
                                                    if (node) {
                                                        node.getLayer()?.batchDraw();
                                                    }
                                                }}
                                                boundBoxFunc={(_oldBox, newBox) => {
                                                    return newBox
                                                }}
                                                onDragEnd={() => {
                                                    layerRef.current?.toBlob(
                                                        {
                                                            x: offsetX,
                                                            y: offsetY,
                                                            width: layerWidth,
                                                            height: layerHeight,
                                                            callback(blob) {
                                                                // setUri(URL.createObjectURL(blob))
                                                            },
                                                        }
                                                    )
                                                }}
                                            />
                                        )
                                    }

                                </Group>
                            </LayerKonva>
                        )
                    })
                }

            </Stage>
        </CanvasBox>
    );
})


export default memo(RexDrawEdit);