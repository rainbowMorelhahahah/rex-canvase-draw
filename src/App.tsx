import './App.css'
import { RexDrawEdit } from './packages'
import { Layout } from './components/layout/Layout';
import { Aside } from './components/layout/Aside';
import { useDrawStore, useLayerStore } from './stores';
import { useEffect } from 'react';


function App() {
  // const editor = useRef<RexDrawStateRef>(null);

  const { drawMode, brushSetting, eraserSetting, } = useDrawStore();
  const { layres, selected, setImage } = useLayerStore();
  const { addLayer, updateLinePoints, getLinePoints } = useLayerStore();

  useEffect(() => {
    addLayer()
  }, [])

  return (
    <>
      {/* 
      <div>
        <button onClick={async () => {
          const url = await editor.current?.exportJpeg();

          // create link element
          const link = document.createElement('a');
          link.href = url!;
          link.download = 'my-image.jpg';

          // trigger download
          link.click();

        }}>导出图片</button>
      </div>
      */}

      <Layout>
        <main className='flex w-full h-[calc(100%-46px)]'>
          <section className='flex-auto h-full'>
            <RexDrawEdit
              brushSetting={brushSetting}
              eraserSetting={eraserSetting}
              mode={drawMode}
              layers={layres}
              currentLayerId={selected}
              onDrawImage={(imgSrc, imgBlob, img) => {
                if (!selected) return;
                setImage(selected, imgBlob, imgSrc, img);
              }}
              onPointerDown={(newPos, _e) => {
                if (selected) {
                  const current = getLinePoints(selected)
                  if (current) {

                    updateLinePoints(
                      selected,
                      [
                        ...current,
                        newPos
                      ])
                  }
                }
              }}
              onPointerMove={(newPos, _e) => {
                if (selected) {
                  const current = getLinePoints(selected);
                  if (current) {
                    const lastLine = current[current.length - 1];
                    lastLine.points = lastLine.points.concat(newPos);
                    current.splice(current.length - 1, 1, lastLine);
                    updateLinePoints(selected, current.concat());
                  }
                }

              }}
              onPointerUp={() => {
                if (selected) {
                  updateLinePoints(selected, []);
                }
              }}
            />
          </section>
          <Aside />
        </main>
      </Layout>

    </>
  )
}

export default App
