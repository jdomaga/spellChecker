import SpellingMistake from '../models/SpellingMistake'

export default function ErrorList({
  errors,
  updateErrorWord,
}: {
  errors: Array<SpellingMistake>
  updateErrorWord: Function
}) {
  return (
    <ol className="text-left px-8">
      {errors.map((error, errorNumber) => {
        const color = error.fixed ? 'green' : 'red'
        return (
          <li key={error.index}>
            <label htmlFor={`error-input-${errorNumber}`}>
              fix {errorNumber + 1} :
            </label>
            <input
              className={`border-solid border-b-2 border-b-solid border-${color}-200 `}
              id={`error-input-${errorNumber}`}
              value={error.word}
              onChange={e => updateErrorWord(e.target.value, error.index)}
            />
          </li>
        )
      })}
    </ol>
  )
}
