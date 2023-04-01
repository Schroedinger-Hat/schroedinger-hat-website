/// <reference types="cypress" />
import messages from '@/i18n/messages'

describe('English tests', {
  env: {
    // Modify with your local environment url
    localhost: 'http://localhost:5173',
    githubLink: 'https://github.com/Schrodinger-Hat',
    imageGoNordLink: 'https://ign.schrodinger-hat.it',
    youtube: 'https://www.youtube.com/channel/UC1QLLgrGrPmlaFhS0orykCA',
    spotify: 'https://open.spotify.com/show/7yfkQCV6hrPIqflSqJDB2P',
    openCollective: 'https://opencollective.com/schrodinger-hat',
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
    // Wait for mailchimp modal to appear.
    // As the modal is loaded async, edit the time depending on your situation.
    cy.wait(5000).then(() => {
      cy.get('.mc-closeModal').click()
    })
  })
  describe('Navbar tests', () => {
    it('Changes to mobile viewport, assures all CTAs work correctly', () => {
      cy.viewport('iphone-xr')
      cy.get('[data-test="nav-wrapper"]').should('be.visible').and('exist')
      cy.get('[data-test="nav-logo-button"]').should('be.visible').and('have.attr', 'href').and('include', '/')
      cy.get('[data-test="logo-text"]').should('be.visible').and('contain.text', 'Schrödinger Hat')
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
      // TODO: Include GitHub and ImageGoNord into the messages
      cy.get('[data-test="mobile-github-page-link"]')
        .should('exist')
        .and('contain.text', 'GitHub')
        .and('have.attr', 'href', Cypress.env('githubLink'))
        .and('have.attr', 'target', '_blank')
      cy.get('[data-test="mobile-team-page-link"]')
        .should('exist')
        .and('contain.text', messages.en.navbar.team)
        .and('have.attr', 'href', '/team')
      cy.get('[data-test="mobile-event-page-link"]')
        .should('exist')
        .and('contain.text', messages.en.navbar.events)
        .and('have.attr', 'href', '/events')
      cy.get('[data-test="mobile-conduct-page-link"]')
        .should('exist')
        .and('contain.text', messages.en.navbar.codeOfConduct)
        .and('have.attr', 'href', '/code-of-conduct')
      cy.get('[data-test="mobile-go-nord-page-link"]')
        .should('exist')
        .and('contain.text', 'ImageGoNord')
        .and('have.attr', 'href', Cypress.env('imageGoNordLink'))
        .and('have.attr', 'target', '_blank')
      cy.get('[data-test="mobile-homepage-link"]').should('exist')
        .and('have.attr', 'href', '/').click()
      cy.get('[data-test="mobile-menu"]').should('not.exist')
      cy.url().then((url) => {
        expect(url).to.contain(Cypress.env('localhost'))
      })
    })
    it('Changes to desktop viewport, assures all CTAs work correctly', () => {
      cy.viewport('macbook-16')
      cy.get('[data-test="nav-wrapper"]').should('be.visible').and('exist')
      cy.get('[data-test="nav-logo-button"]').should('be.visible').and('have.attr', 'href').and('include', '/')
      cy.get('[data-test="logo-text"]').should('be.visible').and('contain.text', 'Schrödinger Hat')
      cy.get('[data-test="nav-wrapper"]').should('be.visible').and('exist')
      cy.get('[data-test="nav-team-page-link"]')
        .should('exist')
        .and('contain.text', messages.en.navbar.team)
        .and('have.attr', 'href', '/team')
      cy.get('[data-test="nav-event-page-link"]')
        .should('exist')
        .and('contain.text', messages.en.navbar.events)
        .and('have.attr', 'href', '/events')
      cy.get('[data-test="nav-conduct-page-link"]')
        .should('exist')
        .and('contain.text', messages.en.navbar.codeOfConduct)
        .and('have.attr', 'href', '/code-of-conduct')
      cy.get('[data-test="nav-go-nord-page-link"]')
        .should('exist')
        .and('contain.text', 'ImageGoNord')
        .and('have.attr', 'href', Cypress.env('imageGoNordLink'))
        .and('have.attr', 'target', '_blank')
      cy.get('[data-test="nav-github-page-link"]')
        .should('exist')
        .and('have.attr', 'href', Cypress.env('githubLink'))
        .and('have.attr', 'target', '_blank')
      cy.get('[data-test="nav-github-icon"]').should('have.class', 'fab fa-github').and('be.visible').and('exist')
      cy.get('html').then(($html) => {
        const oldClass = $html[0].getAttribute('class')
        cy.get('[data-test="nav-theme-cta"]').click()
        cy.get('html').should('not.have.class', oldClass)
      })
    })
  })
  describe('Hero section tests', () => {
    it('Changes to mobile viewport, assures all elements are present', () => {
      cy.viewport('iphone-xr')
      cy.get('[data-test="main"]').should('be.visible').and('exist')
      cy.get('[data-test="main-h1"]').should('be.visible').and('exist').and('contain.text', messages.en.main.h1)
      cy.get('[data-test="main-h2"]').should('be.visible').and('exist').and('contain.text', messages.en.main.h2)
      cy.get('[data-test="main-cta-youtube"]')
        .should('exist')
        .and('contain.text', messages.en.main.links.youtube)
        .and('have.attr', 'href', Cypress.env('youtube'))
        .and('have.attr', 'target', '_blank')
      cy.get('[data-test="main-cta-spotify"]')
        .should('exist')
        .and('contain.text', messages.en.main.links.spotify)
        .and('have.attr', 'href', Cypress.env('spotify'))
        .and('have.attr', 'target', '_blank')
      cy.get('[data-test="main-cta-open-collective"]')
        .should('exist')
        .and('contain.text', messages.en.main.links.openCollective)
        .and('have.attr', 'href', Cypress.env('openCollective'))
        .and('have.attr', 'target', '_blank')
    })
    it('Changes to desktop viewport, assures all elements are present', () => {
      cy.viewport('macbook-16')
      cy.get('[data-test="main"]').should('be.visible').and('exist')
      cy.get('[data-test="main-h1"]').should('be.visible').and('exist').and('contain.text', messages.en.main.h1)
      cy.get('[data-test="main-h2"]').should('be.visible').and('exist').and('contain.text', messages.en.main.h2)
      cy.get('[data-test="main-cta-youtube"]')
        .should('exist')
        .and('contain.text', messages.en.main.links.youtube)
        .and('have.attr', 'href', Cypress.env('youtube'))
        .and('have.attr', 'target', '_blank')
      cy.get('[data-test="main-cta-spotify"]')
        .should('exist')
        .and('contain.text', messages.en.main.links.spotify)
        .and('have.attr', 'href', Cypress.env('spotify'))
        .and('have.attr', 'target', '_blank')
      cy.get('[data-test="main-cta-open-collective"]')
        .should('exist')
        .and('contain.text', messages.en.main.links.openCollective)
        .and('have.attr', 'href', Cypress.env('openCollective'))
        .and('have.attr', 'target', '_blank')
    })
  })
})
