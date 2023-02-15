import { useCallback, useEffect, useState } from 'react'
import ErrorList from './ErrorList'
import SpellingMistake from '../models/SpellingMistake'
import { findAllMistakes, ReplaceWords, isBasicWord } from '../utils/text'

export default function FixedText({
  inputText,
  setInputWords,
}: {
  inputText: string
  setInputWords: Function
}) {
  const [errors, setErrors] = useState<Array<SpellingMistake>>([])

  useEffect(() => {
    const foundErrors = findAllMistakes(inputText)
    setErrors(foundErrors)
  }, [inputText])

  const changeMispelledWord = useCallback(
    (newWord: string, index: number) => {
      const updatedErrors = errors.map(error => {
        const updatedWord = index === error.index ? newWord : error.word
        return {
          word: updatedWord,
          index: error.index,
          fixed: isBasicWord(updatedWord),
        }
      })
      setErrors(updatedErrors)
    },
    [errors]
  )

  function updateUserInput() {
    const newStr = ReplaceWords(errors, inputText)
    setInputWords(newStr)
  }

  return (
    <div className="bg-white border-2 border-solid border-slate-200 rounded-xl h-full py-4 flex flex-col justify-between">
      <ErrorList errors={errors} updateErrorWord={changeMispelledWord} />
      {!!errors.length && (
        <div className="w-full flex flex-row space-x-2 p-6">
          <button
            onClick={updateUserInput}
            id="updateText"
            className="mt-4 bg-green-200 w-full"
          >
            Update Text
          </button>
        </div>
      )}
    </div>
  )
}
