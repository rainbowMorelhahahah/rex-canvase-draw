import React, { useRef, useState } from 'react'
import './App.css'
import { RexDrawEdit, RexDrawStateRef } from './packages'
import { DrawBrushColor, DrawBrushSize, DrawMode } from './packages/types';
import { Color } from '@rc-component/color-picker';
import { Layout } from './components/layout/Layout';

function App() {
  const editor = useRef<RexDrawStateRef>(null);
  const [mode, setMode] = useState<DrawMode>(DrawMode.SELECT_MODE);
  const [brushColor, setBurshColor] = useState<DrawBrushColor>(
    new Color('#333')
  );
  const [brushSize, setBrusSize] = useState<DrawBrushSize>(10);

  return (
    <>
      {/* <div>
        <button onClick={() => {
          setMode(DrawMode.BRUSH_MODE)
        }}>画笔模式</button>

        <button onClick={() => {
          setMode(DrawMode.ERASER_MODE)
        }}>橡皮擦</button>


        <button onClick={() => {
          setMode(DrawMode.SELECT_MODE)
        }}>选择模式</button>

        <button onClick={async () => {
          const url = await editor.current?.exportJpeg();

          // create link element
          const link = document.createElement('a');
          link.href = url!;
          link.download = 'my-image.jpg';

          // trigger download
          link.click();

        }}>导出图片</button>

        <label>
          刷笔大小
          <input min={1} max={100} type='range' onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            var value = e.currentTarget.value;
            setBrusSize(Number(value));
          }} />
        </label>
     

      </div>
      <div style={{ height: "500px" }}>
        <RexDrawEdit
          brushColor={brushColor}
          brushSize={brushSize}
          mode={mode}
          ref={editor} />
      </div> */}

      <Layout>
        <main className='flex w-full h-[calc(100%-56px)]'>
          <section className='flex-auto h-full'>
            <RexDrawEdit
              brushColor={brushColor}
              brushSize={brushSize}
              mode={mode}
            />
          </section>
          <aside className='w-[367px] bg-[#151515] flex'>
            <div className='flex-auto flex flex-col justify-between'>
              <section className='flex-auto'>
                <header className='flex justify-between text-white p-[16px]'>
                  <h2>
                    <small>Icon</small>
                    Create
                  </h2>
                  <i>
                    Close
                  </i>
                </header>

                <form>
                  <p>AI-driven visualization tool for quick product variations, sketches, and renderings.</p>
                  
                </form>

              </section>
              <footer className='p-[16px]'>
                <button className='h-[45px] bg-blue-300 rounded-lg w-full'>Create</button>
              </footer>
            </div>
            <div className='w-[48px] bg-[#151515] border-l-[1px] border-[#98989b] border-solid flex flex-col justify-between items-center'>
              <nav className='text-white'>
                <a href='javascript:void(0);'>ai</a>
                <a href='javascript:void(0);'>图层</a>
              </nav>
              <nav className='text-white'>
                <a href='javascript:void(0);'>帮助</a>
              </nav>
            </div>
          </aside>
        </main>
      </Layout>

    </>
  )
}

export default App
