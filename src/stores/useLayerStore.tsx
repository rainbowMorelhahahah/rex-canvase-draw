import { create } from "zustand";
import { Layer } from "../packages/types";
import { v4 as uuid } from 'uuid';
import { Key } from "react";

type LayerStore = {
    layres: Layer[];
    selected?: Key;
    getLayerByUuid: (uuid: Key) => Layer | undefined;
    getLayerIndexByUuid: (uuid: Key) => number;
    addLayer: () => void;
    handleSelectLayer: (uuid: Key) => void;
    setOpacity: (uuid: string, opacity: number) => void;
    setImage: (uuid: Key, imageBlob: Blob, imageSrc: string, img: CanvasImageSource) => void;
};

const useLayerStore = create<LayerStore>((setState, getState) => {
    return {
        layres: [],
        getLayerByUuid(uuid) {
            return getState().layres.find(v => v.uuid === uuid);
        },
        getLayerIndexByUuid(uuid) {
            return getState().layres.findIndex(v => v.uuid === uuid);
        },
        setOpacity(uuid, opacity) {
            const idx = getState().getLayerIndexByUuid(uuid);
            if (idx === -1) return;
            const layres = getState().layres;
            layres[idx].opacity = opacity;
            setState((pre) => {
                return {
                    ...pre,
                    layres: Array.from(layres)
                }
            })
        },
        addLayer() {
            const layres = getState().layres;
            layres.push({
                uuid: uuid(),
                linePost: [],
                name: `layer${layres.length + 1}`,
                opacity: 100,
            });
            setState((pre) => {
                return {
                    ...pre,
                    layres: Array.from(layres)
                }
            })
        },
        handleSelectLayer(uuid) {
            setState((pre) => {
                return {
                    ...pre,
                    selected: uuid
                }
            })
        },
        setImage(uuid, imageBlob, imageSrc, img) {
            const idx = getState().getLayerIndexByUuid(uuid);
            if (idx === -1) return;
            const layres = getState().layres;
            layres[idx].imageSrc = imageSrc;
            layres[idx].image = imageBlob;
            layres[idx].img = img;

            setState((pre) => {
                return {
                    ...pre,
                    layres: Array.from(layres)
                }
            })

        },
    }
})


export default useLayerStore;