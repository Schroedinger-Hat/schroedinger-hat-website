/// <reference types="cypress" />
import messages from '@/i18n/messages'

describe('English tests', () => {
  describe('Tests the navbar', {
    env: {
    // Modify with your local environment url
      localhost: 'http://localhost:5173',
      githubLink: 'https://github.com/Schrodinger-Hat',
      imageGoNordLink: 'https://ign.schrodinger-hat.it',
    },
  }, () => {
    beforeEach(() => {
      // Sets the website language website to 'en_US'
      cy.visit(Cypress.env('localhost'), {
        onBeforeLoad(win) {
          Object.defineProperty(win.navigator, 'language', {
            value: 'en_US',
          })
        },
      })
      // Visit local environment and wait for mailchimp modal to appear.
      // As the modal is loaded async, edit the time depending on your situation.
      cy.wait(5000).then(() => {
        cy.get('.mc-closeModal').click()
      })
    })
    // As the mailchimp modal cannot be controlled by our code,
    // adjust the waiting time until it closes.
    it('Changes to mobile viewport, assures all CTAs work correctly', () => {
      cy.viewport('iphone-xr')
      cy.get('[data-test="nav-wrapper"]').should('be.visible')
      cy.get('[data-test="nav-team-page-link"]').should('not.be.visible')
      cy.get('[data-test="nav-event-page-link"]').should('not.be.visible')
      cy.get('[data-test="nav-conduct-page-link"]').should('not.be.visible')
      cy.get('[data-test="nav-go-nord-page-link"]').should('not.be.visible')
      cy.get('[data-test="nav-github-page-link"]').should('have.attr', 'href').and('include', Cypress.env('githubLink'))
      cy.get('html').then(($html) => {
        const oldClass = $html[0].getAttribute('class')
        cy.get('[data-test="nav-theme-cta"]').click()
        cy.get('html').should('not.have.class', oldClass)
      })
      cy.get('[data-test="mobile-menu"]').should('not.exist')
      cy.get('[data-test="nav-burger-menu-cta"]').click()
      cy.get('[data-test="mobile-menu"]').should('exist')
      cy.get('[data-test="mobile-burger-menu-cta"]').should('exist').click()
      cy.get('[data-test="mobile-menu"]').should('not.exist')
      cy.get('[data-test="nav-burger-menu-cta"]').click()
      // TODO Include GitHub and ImageGoNord into the messages
      cy.get('[data-test="mobile-github-page-link"]').should('exist').and('contain.text', 'GitHub').and('have.attr', 'href', Cypress.env('githubLink'))
      cy.get('[data-test="mobile-team-page-link"]').should('exist').and('contain.text', messages.en.navbar.team).and('have.attr', 'href', '/team')
      cy.get('[data-test="mobile-event-page-link"]').should('exist').and('contain.text', messages.en.navbar.events).and('have.attr', 'href', '/events')
      cy.get('[data-test="mobile-conduct-page-link"]').should('exist').and('contain.text', messages.en.navbar.codeOfConduct).and('have.attr', 'href', '/code-of-conduct')
      cy.get('[data-test="mobile-go-nord-page-link"]').should('exist').and('contain.text', 'ImageGoNord').and('have.attr', 'href', Cypress.env('imageGoNordLink'))
      cy.get('[data-test="mobile-homepage-link"]').should('exist').and('have.attr', 'href', '/').click()
      cy.get('[data-test="mobile-menu"]').should('not.exist')
      cy.url().then((url) => {
        expect(url).to.contain(Cypress.env('localhost'))
      })
    })
  })
})
