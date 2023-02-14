import SpellingMistake from '../models/SpellingMistake'
// flag: importing both what we split on, the words, and what defines a word end from here lets us change it based on other languages in the future
import {
  wordsList,
  punctuationRegx,
  nonAlphaChars,
} from '../assets/wordSets/en'

export function isBasicWord(word: string) {
  return wordsList.includes(word)
}

/**
 *
 * @param inputWords
 * @returns an array of spellingMistakes found in the inputWords
 */
export function findAllMistakes(inputText: string) {
  const nonAlphaChars = new RegExp(/[^A-Za-z]/)

  // we dont want empty words (just plain punctuation. newlines, spaces, etc to be included)
  const inputWords = inputText.split(nonAlphaChars).filter(word => word?.length)

  const errors: Array<SpellingMistake> = []
  inputWords.forEach((word, index) => {
    if (!isBasicWord(word)) {
      errors.push({ word, index, fixed: false })
    }
  })
  return errors
}

/**
 *
 * Note: this WILL replace multiple spaces if they exist without a word, excessive newlines, doubled punctuation etc, since we filter out empty...
 *
 * @param editedErrors the array of all spelling mistake objects, containing the updated values
 * @param inputWords the array of input words (user entered text which has been split by any non-alpha characters)
 * @param inputText the string of user text, which contains the inputWords combined with punctuation
 * @returns the inputText string, but with any words identified as errors replaced with their new values in the errors array ()
 */
export function ReplaceWords(
  editedErrors: Array<SpellingMistake>,
  inputText: string
): string {
  // we dont want empty words (just plain punctuation. newlines, spaces, etc to be included)
  const inputWords = inputText.split(nonAlphaChars).filter(word => word?.length)

  // get all words including correct ones
  // then update them with the new values
  for (const error of editedErrors) {
    inputWords[error.index] = error.word
  }

  // we dont want empty words (just plain punctuation. newlines, spaces, etc to be included)
  const punctuation = inputText
    .split(punctuationRegx)
    .filter(word => word?.length)

  //rebuild string using punctuation
  let newStr = ''
  for (const word of inputWords) {
    newStr += word
    if (punctuation.length) {
      // grab the first punctuation seperator
      newStr += punctuation.shift()
    }
  }
  return newStr
}
