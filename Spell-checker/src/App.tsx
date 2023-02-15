import { useState } from 'react'
import './App.css'
import bird from './assets/img/birdpic.png'
import typewriter from './assets/img/typewriter.png'
import eraser from './assets/img/eraser.png'
import LabelWithImage from './components/LabelWithImage'
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
    <div className="App w-full bg-slate-300 text-center md:p-16">
      <div className="flex flex-col md:flex-row w-full md:space-x-16">
        <div className="flex flex-col md:w-3/4">
          <LabelWithImage
            imagePaths={textAreaImages}
            label="Enter text below:"
            id={entryId}
          ></LabelWithImage>
          <SpellCheckTextArea text={text} setText={setText} id={entryId} />
        </div>
        <div className="flex flex-col ml-0 md:w-1/4">
          <LabelWithImage
            imagePaths={errorAreaImages}
            label="Try fixing these:"
          ></LabelWithImage>
          <FixedText inputText={text} setInputWords={setText} />
        </div>
      </div>
    </div>
  )
}

export default App
