import React from 'react'
import { Stars } from './index'

describe('<Stars />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Stars />)
  })
})