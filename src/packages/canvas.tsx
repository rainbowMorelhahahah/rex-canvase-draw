
import { memo, useRef } from 'react';


function RexDrawEdit() {
    
    const canvasRef = useRef<HTMLCanvasElement>(null);

    return (
        <canvas ref={canvasRef}></canvas>
    );
}

export default memo(RexDrawEdit);