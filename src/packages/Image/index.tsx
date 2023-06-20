import React, { FC, memo, useEffect, useRef, useState } from "react"
import useImage from 'use-image'
import { Image as ImageKonva, Transformer as TransformerKonva } from 'react-konva'
import { Image } from "konva/lib/shapes/Image"
import { Transformer } from "konva/lib/shapes/Transformer"
import Konva from "konva"
import { setPointerCapture } from "konva/lib/PointerEvents"
import { KonvaEventObject } from "konva/lib/Node"

interface DrawImageProps {
    url: string,
    isSelected?: boolean,
    onClick?: (evt: KonvaEventObject<PointerEvent>) => void
}

export const DrawImage: FC<DrawImageProps> = memo((props) => {

    const { url, isSelected, onClick } = props;

    const imgRef = useRef<Image>(null);
    const tfRef = useRef<Transformer>(null);

    const [image] = useImage(url, "anonymous");
    const [rectOpacity, setRectOpacity] = useState(1);

    useEffect(() => {
        if (isSelected) {
            tfRef.current?.nodes([imgRef.current!]);
            tfRef.current?.getLayer()?.batchDraw();
        }
    }, [isSelected])

    const handleDragMove = (evt: Konva.KonvaEventObject<DragEvent>) => {

    }

    return (
        <React.Fragment>

            <ImageKonva
                ref={imgRef}
                image={image}
                draggable={true}
                opacity={rectOpacity}
                onDragMove={handleDragMove}
                onPointerClick={onClick}
            />

            < TransformerKonva
                visible={isSelected}
                ref={tfRef}
                boundBoxFunc={(_oldBox, newBox) => {
                    return newBox
                }}
            />


        </React.Fragment>
    );

})

