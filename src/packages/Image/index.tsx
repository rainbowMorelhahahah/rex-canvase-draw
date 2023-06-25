import React, { FC, memo, useRef } from "react"
import useImage from 'use-image'
import { Image as ImageKonva } from 'react-konva'
import { Image } from "konva/lib/shapes/Image"
import { KonvaEventObject } from "konva/lib/Node"

interface DrawImageProps {
    image?: CanvasImageSource,
    url?: string,
    isSelected?: boolean,
    onClick?: (evt: KonvaEventObject<PointerEvent>) => void,
    onPointerClick?: (evt: KonvaEventObject<PointerEvent>) => void,
    onPointerMove?: (evt
        : KonvaEventObject<PointerEvent>) => void,
    onDragEnd?: (evt: KonvaEventObject<DragEvent>) => void,
    draggable?: boolean
}

export const DrawImage: FC<DrawImageProps> = memo((props) => {

    const { image, url, onClick, onPointerMove, onDragEnd, draggable = false, onPointerClick } = props;

    const imgRef = useRef<Image>(null);

    return (
        <React.Fragment>
            <ImageKonva
                ref={imgRef}
                image={image}
                draggable={draggable}
                onPointerClick={onPointerClick}
                onPointerMove={onPointerMove}
                onDragEnd={onDragEnd}
                onClick={onClick}
            />
        </React.Fragment>
    );

})

