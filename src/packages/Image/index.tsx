import React, { FC, memo, useRef, useState } from "react"
import useImage from 'use-image'
import { Image as ImageKonva } from 'react-konva'
import { Image } from "konva/lib/shapes/Image"
import Konva from "konva"
import { KonvaEventObject } from "konva/lib/Node"

interface DrawImageProps {
    url: string,
    isSelected?: boolean,
    onClick?: (evt: KonvaEventObject<PointerEvent>) => void,
    onPointerClick?: (evt: KonvaEventObject<PointerEvent>) => void,
    onPointerMove?: (evt
        : KonvaEventObject<PointerEvent>) => void,
    onDragEnd?: (evt: KonvaEventObject<DragEvent>) => void,
    draggable?: boolean
}

export const DrawImage: FC<DrawImageProps> = memo((props) => {

    const { url, onClick, onPointerMove, onDragEnd, draggable, onPointerClick } = props;

    const imgRef = useRef<Image>(null);


    const [image] = useImage(url, "anonymous");
    const [rectOpacity] = useState(1);




    return (
        <React.Fragment>

            <ImageKonva
                ref={imgRef}
                image={image}
                draggable={draggable}
                opacity={rectOpacity}
                onPointerClick={onPointerClick}
                onPointerMove={onPointerMove}
                onDragEnd={onDragEnd}
                onClick={onClick}
            />

        </React.Fragment>
    );

})

