import React, { useRef, useState } from 'react'
import './App.css'
import { RexDrawEdit, RexDrawStateRef } from './packages'
import { DrawBrushColor, DrawBrushSize, DrawMode } from './packages/types';
import { RexColorPicker } from './Components/ColorPicker';
import { Color } from '@rc-component/color-picker';

function App() {
  const editor = useRef<RexDrawStateRef>(null);
  const [mode, setMode] = useState<DrawMode>(DrawMode.SELECT_MODE);
  const [brushColor, setBurshColor] = useState<DrawBrushColor>(
    new Color('#333')
  );
  const [brushSize, setBrusSize] = useState<DrawBrushSize>(10);

  return (
    <>
      <div>
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

        <div style={{ display: 'inline-block' }}>
          <RexColorPicker
            color={brushColor}
            onChange={color => {
              setBurshColor(color);
            }}
          />
        </div>


      </div>
      <div style={{ height: "500px" }}>
        <RexDrawEdit
          brushColor={brushColor}
          brushSize={brushSize}
          mode={mode}
          ref={editor} />
      </div>
    </>
  )
}

export default App
