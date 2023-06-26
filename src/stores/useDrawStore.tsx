import { create } from 'zustand';
import { DrawMode } from '../packages/types';
import { RgbColor } from 'react-colorful';

type DrawStore = {
    drawMode: DrawMode;
    brushSetting: {
        size: number;
        color: RgbColor;
        opacity: number;
    };

    eraserSetting: {
        size: number,
        opacity: number,
    };

    setDrawMode: (mode: DrawMode) => void;
    setBrushSize: (brushSize: number) => void;
    setBrushColor: (brushColor: RgbColor) => void;
    setBrushOpacity: (brushOpacity: number) => void;
    setEraserSize: (eraserSize: number) => void;
    setEraserOpacity: (eraserOpacity: number) => void;
};

const useDrawStore = create<DrawStore>((setState, getState) => {
    return {
        drawMode: DrawMode.BRUSH_MODE,
        brushSetting: {
            size: 5,
            color: { r: 15, g: 15, b: 15 },
            opacity: 60,
        },
        eraserSetting: {
            size: 5,
            opacity: 60,
        },


        setDrawMode(mode) {
            setState(pre => {
                return {
                    ...pre,
                    drawMode: mode
                }
            })
        },

        setBrushColor(brushColor) {
            setState(pre => {
                const { brushSetting } = pre;
                brushSetting.color = brushColor;
                return {
                    ...pre,
                    brushSetting
                }
            })
        },
        setBrushSize(brushSize) {
            setState(pre => {
                const { brushSetting } = pre;
                brushSetting.size = brushSize;
                return {
                    ...pre,
                    brushSetting
                }
            })
        },
        setBrushOpacity(brushOpacity) {
            setState(pre => {
                const { brushSetting } = pre;
                brushSetting.opacity = brushOpacity;
                return {
                    ...pre,
                    brushSetting
                }
            })
        },
        setEraserOpacity(eraserOpacity) {
            setState(pre => {
                const { eraserSetting } = pre;
                eraserSetting.opacity = eraserOpacity;
                return {
                    ...pre,
                    eraserSetting
                }
            })
        },
        setEraserSize(eraserSize) {
            setState(pre => {
                const { eraserSetting } = pre;
                eraserSetting.size = eraserSize;
                return {
                    ...pre,
                    eraserSetting
                }
            })
        },
    }
})

export default useDrawStore;