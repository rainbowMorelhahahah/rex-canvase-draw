
import React, { memo, useEffect, useImperativeHandle, useRef, useState } from 'react';
import styled from 'styled-components';
import { Stage, Layer as LayerKonva, Rect, Group } from 'react-konva';
import { DrawImage } from './Image';
import { Layer } from 'konva/lib/Layer';
import Konva from 'konva';
import { DrawImageCanvas } from './Image/Canvas';
import { KonvaEventObject } from 'konva/lib/Node';

const CanvasBox = styled.div`
    width: 100%;
    height: 100%; 
`

type RexDrawStateProps = {

}
export type RexDrawStateRef = {
    layerNode: Layer;
    exportJpeg: () => Promise<string>;
}


const RexDrawEdit = React.forwardRef<RexDrawStateRef, RexDrawStateProps>((props, ref) => {
    const divRef = useRef<HTMLDivElement>(null);
    const stageRef = useRef<Konva.Stage | null>(null);
    const layerRef = useRef<Layer | null>(null);
    const drawLayerRef = useRef<Layer | null>(null);

    const [lines, setLines] = React.useState([]);

    const [stageSize, setStageSize] = useState({
        width: 0,
        height: 0,
    })

    const canvasWidth = stageSize.width || 0;
    const canvasHeight = stageSize.height || 0;

    const [currentImageIdx, setCurrentImageIdx] = useState(1);
    const [selectedImage, setSelectedImage] = useState<any>();


    const layerWidth = canvasWidth * 0.7;
    const layerHeight = canvasHeight * 0.7;

    useImperativeHandle(ref, () => {
        return {
            layerNode: layerRef.current!,
            exportJpeg() {
                const tmpIdx = currentImageIdx;
                setCurrentImageIdx(-1);

                return new Promise((rec, _rej) => {
                    setTimeout(() => {
                        const dataUrl = layerRef.current?.toDataURL({
                            x: (stageSize.width - layerWidth) / 2,
                            y: (stageSize.height - layerHeight) / 2,
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
        drawLayerRef.current?.setZIndex(1);
        layerRef.current?.setZIndex(10);
    }, [])
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
            >

                <LayerKonva
                    ref={drawLayerRef}
                >
                    <Group
                        x={(canvasWidth - layerWidth) / 2}
                        y={(canvasHeight - layerHeight) / 2}
                    >
                        <DrawImageCanvas
                            width={layerWidth}
                            height={layerHeight}
                            brushColor='#333'
                            brushSize={5}
                            selectedImage={
                                selectedImage
                            }
                        />
                    </Group>

                </LayerKonva>

                {/* <LayerKonva
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
                            onClick={(evt: KonvaEventObject<PointerEvent>) => {
                                setSelectedImage(evt.target);
                                layerRef.current?.setZIndex(0);
                                drawLayerRef.current?.setZIndex(10);
                            }}
                        />
                    </Group>
                </LayerKonva> */}


            </Stage>
        </CanvasBox>
    );
})


export default memo(RexDrawEdit);