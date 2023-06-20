import { useRef } from 'react'
import './App.css'
import { RexDrawEdit, RexDrawStateRef } from './packages'

function App() {
  const editor = useRef<RexDrawStateRef>(null);
  return (
    <>
      <div>
        <button onClick={() => {
        }}>画笔模式</button>
        <button onClick={() => {
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
      </div>
      <div style={{ height: "500px" }}>
        <RexDrawEdit ref={editor} />
      </div>
    </>
  )
}

export default App
