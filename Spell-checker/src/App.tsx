import { useState } from 'react'
import './App.css'
import bird from './assets/img/birdpic.png'
import typewriter from './assets/img/typewriter.png'
import eraser from './assets/img/eraser.png'
import LabelWithDefault from './components/LabelWithImage'
import SpellCheckTextArea from './components/SpellCheckTextArea'
import FixedText from './components/FixedText'

function App() {
  const textAreaImages = [
    {
      src: bird,
      alt: 'bird',
    },
    {
      src: typewriter,
      alt: 'typewriter',
    },
  ]
  const errorAreaImages = [
    {
      src: bird,
      alt: 'bird',
    },
    {
      src: eraser,
      alt: 'eraser',
    },
  ]

  const [text, setText] = useState('')

  const entryId = 'entryInput'

  return (
    <div className="App w-full bg-slate-300 text-center p-16">
      <div className="flex flex-row w-full space-x-16">
        <div className="flex flex-col w-3/4">
          <LabelWithDefault
            imagePaths={textAreaImages}
            label="Enter text below:"
            id={entryId}
          ></LabelWithDefault>
          <SpellCheckTextArea text={text} setText={setText} id={entryId} />
        </div>
        <div className="flex flex-col w-1/4">
          <LabelWithDefault
            imagePaths={errorAreaImages}
            label="Try fixing these:"
          ></LabelWithDefault>
          <FixedText inputText={text} setInputWords={setText} />
        </div>
      </div>
    </div>
  )
}

export default App
