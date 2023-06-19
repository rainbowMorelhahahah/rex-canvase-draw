import { useRef } from 'react'
import './App.css'
import { RexDrawEdit } from './packages'
import { DrawMode } from './packages/types';

function App() {
  const editor = useRef<any>(null);
  return (
    <>
      <div>
        <button onClick={() => {
          editor.current!.control.setDrawMode(DrawMode.BRUSH_MODE);
        }}>画笔模式</button>
        <button onClick={() => {
          editor.current!.control.setDrawMode(DrawMode.SELECT_MODE);
        }}>选择模式</button>
      </div>
      <div style={{ height: "500px" }}>
        <RexDrawEdit ref={editor} />
      </div>
    </>
  )
}

export default App
