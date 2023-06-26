import { create } from "zustand";
import { DrawLine, Layer } from "../packages/types";
import { v4 as uuid } from 'uuid';
import { Key } from "react";
import lodashClone from 'lodash/clone';

type LayerStore = {
    layres: Layer[];
    selected?: Key;
    getLayerByUuid: (uuid: Key) => Layer | undefined;
    getLayerIndexByUuid: (uuid: Key) => number;
    addLayer: () => void;
    handleSelectLayer: (uuid: Key) => void;
    setOpacity: (uuid: string, opacity: number) => void;
    setImage: (uuid: Key, imageBlob: Blob, imageSrc: string, img: CanvasImageSource) => void;
    setVisible: (uuid: Key, visible: boolean) => void;
    clone: (uuid: Key) => void;
    delete: (uuid: Key) => void;
    getLinePoints: (uuid: Key) => DrawLine[] | undefined;
    updateLinePoints: (uuid: Key, linePoints: DrawLine[]) => void;
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
                visible: true,
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
        setVisible(uuid, visible) {
            const idx = getState().getLayerIndexByUuid(uuid);
            if (idx === -1) return;
            const layres = getState().layres;
            layres[idx].visible = visible;
            setState((pre) => {
                return {
                    ...pre,
                    layres: Array.from(layres)
                }
            })
        },
        clone(id) {
            const layer = getState().getLayerByUuid(id);
            if (!layer) return;
            const clone = lodashClone(layer);
            clone.uuid = uuid();
            console.log(id, clone)
            const layres = getState().layres;
            layres.push(clone);
            setState((pre) => {
                return {
                    ...pre,
                    layres: Array.from(layres)
                }
            })
        },
        delete(uuid) {
            const layres = getState().layres;
            setState((pre) => {
                return {
                    ...pre,
                    layres: layres.filter(v => v.uuid !== uuid)
                }
            })
        },
        getLinePoints(uuid) {
            const target = getState().getLayerByUuid(uuid);
            if (!target) return [];
            return target.linePost;
        },
        updateLinePoints(uuid, linePoints) {
            const idx = getState().getLayerIndexByUuid(uuid);
            if (idx === -1) return;
            const layres = getState().layres;
            console.log(linePoints)
            layres[idx].linePost = linePoints;
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