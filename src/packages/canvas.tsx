
import { memo, useEffect, useRef } from 'react';

function RexDrawEdit() {

    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const ctx = canvasRef.current?.getContext('2d');
        ctx!.imageSmoothingEnabled = true;

        let isMouseDown = false;
        let lastMousePos = { x: 0, y: 0 };

        if (canvasRef.current) {
            canvasRef.current.width = window.innerWidth;
            canvasRef.current.height = 500;
        }

        canvasRef.current?.addEventListener('pointerdown', function (event) {
            isMouseDown = true;
            lastMousePos.x = event.clientX;
            lastMousePos.y = event.clientY;
        })

        canvasRef.current?.addEventListener('pointermove', function (event) {
            if (isMouseDown) {

                let controlPoint1 = {
                    x: lastMousePos.x + (event.clientX - lastMousePos.x) / 3,
                    y: lastMousePos.y + (event.clientY - lastMousePos.y) / 3
                };

                let controlPoint2 = {
                    x: lastMousePos.x + 2 * (event.clientX - lastMousePos.x) / 3,
                    y: lastMousePos.y + 2 * (event.clientY - lastMousePos.y) / 3
                };



                ctx?.beginPath();
                ctx?.moveTo(lastMousePos.x, lastMousePos.y);

                ctx!.lineWidth = 5;

                ctx!.bezierCurveTo(
                    controlPoint1.x,
                    controlPoint1.y,
                    controlPoint2.x,
                    controlPoint2.y,
                    event.clientX,
                    event.clientY
                );

                ctx?.stroke();
                lastMousePos.x = event.clientX;
                lastMousePos.y = event.clientY;
            }
        })

        canvasRef.current?.addEventListener('pointerup', function (event) {
            isMouseDown = false;
        })

    }, [])

    return (
        <canvas ref={canvasRef} />
    );
}

export default memo(RexDrawEdit);