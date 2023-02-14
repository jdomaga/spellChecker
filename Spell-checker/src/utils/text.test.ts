import SpellingMistake from '../models/SpellingMistake'
import { describe, expect, test } from 'vitest'
import { findAllMistakes, ReplaceWords } from './text'

describe('text utils - findAllMistakes', () => {
  const safeWords = 'cow cow place or if because'
  const punctuatedWords = 'cow. .. - ! ?  cow place or if because'
  const errorWords = 'thusly a complicated sentence twas born'

  test('has no errors on valid words', () => {
    const errors = findAllMistakes(safeWords)
    expect(errors.length).toBe(0)
  })

  test('has errors on invalid words', () => {
    const errors = findAllMistakes(errorWords)
    expect(errors.length).toBe(6)
  })

  test('finds errors in mixed valid/invalid sentences', () => {
    const combinedWords = errorWords + safeWords
    const errors = findAllMistakes(combinedWords)
    expect(errors.length).toBe(6)
  })

  test('deals with weird punctuation', () => {
    const errors = findAllMistakes(punctuatedWords)
    expect(errors.length).toBe(0)
  })
})

describe('text utils - ReplaceWords', () => {
  const errorSentence = ' this is a sentence'
  const punctuatedErrorSentence = ' this is a sentence? . cow'
  const fixedErrors: Array<SpellingMistake> = [
    { word: 'cow', index: 1, fixed: false },
    { word: 'cow', index: 2, fixed: false },
    { word: 'cow', index: 3, fixed: false },
  ]
  const semiFixedErrors: Array<SpellingMistake> = [
    { word: 'ow', index: 1, fixed: false },
    { word: 'cow', index: 2, fixed: false },
    { word: 'ow', index: 3, fixed: false },
  ]

  test('replaces only words that arent in BASIC', () => {
    const errors = findAllMistakes(errorSentence)
    expect(errors.length).toBe(3)

    const fixed = ReplaceWords(fixedErrors, errorSentence)
    const errorsInFixed = findAllMistakes(fixed)
    expect(errorsInFixed.length).toBe(0)
  })

  test('replaces values with user entered ones, even if theyre still wrong', () => {
    const errors = findAllMistakes(errorSentence)
    expect(errors.length).toBe(3)

    const fixed = ReplaceWords(semiFixedErrors, errorSentence)
    const errorsInFixed = findAllMistakes(fixed)
    expect(errorsInFixed.length).toBe(2)
  })

  test('doesnt mind punctuation', () => {
    const errors = findAllMistakes(punctuatedErrorSentence)
    expect(errors.length).toBe(3)

    const fixed = ReplaceWords(fixedErrors, punctuatedErrorSentence)
    const errorsInFixed = findAllMistakes(fixed)
    expect(errorsInFixed.length).toBe(0)
    expect(fixed.indexOf('?')).greaterThan(-1)
  })
})
