import { create } from 'zustand';
import { DrawMode } from '../packages/types';

type DrawStore = {
    drawMode: DrawMode;

    setDrawMode: (mode: DrawMode) => void;
};

const useDrawStore = create<DrawStore>((setState, getState) => {
    return {
        drawMode: DrawMode.BRUSH_MODE,

        setDrawMode(mode) {
            setState(pre => {
                return {
                    ...pre,
                    drawMode: mode
                }
            })
        },

    }
})

export default useDrawStore;