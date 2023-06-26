import React, { memo } from "react";
import { Layer as KonvaLayer } from 'react-konva';

interface LayerProps extends React.HTMLAttributes<HTMLDivElement> {
}


const LayerImpl = React.forwardRef<any, LayerProps>((props, ref) => {
    const { children, } = props;
    return (
        <KonvaLayer
            ref={ref}
        >
            {children}
        </KonvaLayer>
    )
});

const Layer = memo(LayerImpl);

export {
    Layer
}

