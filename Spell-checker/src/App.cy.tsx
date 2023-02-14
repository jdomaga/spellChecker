//flag: cypress tests were done / added after the 1 hour scope, just for fun :)
import React from 'react'
import App from './App'
import SpellingMistake from './models/SpellingMistake'

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

describe('<App />', () => {
  it('renders', () => {
    cy.mount(<App />)
  })

  it('can identify errors', () => {
    cy.mount(<App />)

    // enter in the sentence and check the errors are there
    cy.get('textarea').clear().type(errorSentence)
    cy.get('ol li').should('have.length', 3)
  })

  it('can identify errors with punctuation', () => {
    cy.mount(<App />)
    cy.get('textarea').clear().type(punctuatedErrorSentence)
    cy.get('ol li').should('have.length', 3)
    cy.get('textarea').clear().type('yummers')
    cy.get('ol li').should('have.length', 1)
  })

  it('can fix errors', () => {
    cy.mount(<App />)

    // enter in the sentence and check the errors are there
    cy.get('textarea').clear().type(errorSentence)
    cy.get('ol li').should('have.length', 3)

    // enter teh fixed values into the errors section, then submit
    fixedErrors.forEach((error, index) => {
      cy.get(`#error-input-${index}`).clear().type(error.word)
    })
    cy.get('#updateText').click()

    // check if the errors are gone
    cy.get('ol li').should('have.length', 0)
  })

  it('can submit with partially fixed errors', () => {
    cy.mount(<App />)

    // enter in the sentence and check the errors are there
    cy.get('textarea').clear().type(errorSentence)
    cy.get('ol li').should('have.length', 3)

    // enter teh fixed values into the errors section, then submit
    semiFixedErrors.forEach((error, index) => {
      cy.get(`#error-input-${index}`).clear().type(error.word)
    })
    cy.get('#updateText').click()

    // check if the errors are gone
    cy.get('ol li').should('have.length', 2)
  })

  it('can fix errors with punctuation', () => {
    cy.mount(<App />)

    // enter in the sentence and check the errors are there
    cy.get('textarea').clear().type(punctuatedErrorSentence)
    cy.get('ol li').should('have.length', 3)

    // enter teh fixed values into the errors section, then submit
    semiFixedErrors.forEach((error, index) => {
      cy.get(`#error-input-${index}`).clear().type(error.word)
    })
    cy.get('#updateText').click()

    // check if the errors are gone
    cy.get('ol li').should('have.length', 2)
  })
})
