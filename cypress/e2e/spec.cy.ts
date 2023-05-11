/// <reference types="cypress" />
import messages from '@/i18n/messages'
import type { EventMessageName } from '@/i18n/types'

describe('English tests', {
  env: {
    discordURL: 'https://discord.gg/RTXr8A3eFn',
    facebookURL: 'https://www.facebook.com/schrodingerhat',
    githubURL: 'https://github.com/Schrodinger-Hat',
    githubWebsiteRepoURL: 'https://github.com/Schrodinger-Hat/schrodinger-hat-website/issues/new/choose',
    imageGoNordURL: 'https://ign.schrodinger-hat.it',
    instagramURL: 'https://www.instagram.com/schrodinger_hat/',
    linkedinURL: 'https://www.linkedin.com/company/schrodinger-hat/',
    // Modify with your local environment url
    localhost: 'http://localhost:5173',
    openCollectiveURL: 'https://opencollective.com/schrodinger-hat',
    spotifyURL: 'https://open.spotify.com/show/7yfkQCV6hrPIqflSqJDB2P',
    twitterURL: 'https://twitter.com/schrodinger_hat',
    youtubeURL: 'https://www.youtube.com/channel/UC1QLLgrGrPmlaFhS0orykCA',
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
  describe('Conduct page', () => {
    it('Assures al text is loaded correctly', () => {
      const conductMessages = messages.en.code_of_conduct
      cy.visit(`${Cypress.env('localhost')}/code-of-conduct`)
      cy.get('[data-test="conduct-main-title"]').should('exist').and('be.visible').and('contain.text', conductMessages.main_title)
      cy.get('[data-test="conduct-short-version-title"]').should('exist').and('be.visible').and('contain.text', conductMessages.short_version.title)
      cy.get('[data-test="conduct-short-version-description"]').should('exist').and('be.visible').and('contain.text', conductMessages.short_version.description)
      cy.get('[data-test="conduct-long-version-title"]').should('exist').and('be.visible').and('contain.text', conductMessages.longer_version.title)
      cy.get('[data-test="conduct-long-version-description"]').should('exist').and('be.visible').and('contain.text', conductMessages.longer_version.description)
      cy.get('[data-test="conduct-full-version-title"]').should('exist').and('be.visible').and('contain.text', conductMessages.full_version.title)
      cy.get('[data-test="conduct-full-version-subtitle"]').should('exist').and('be.visible').and('contain.text', conductMessages.full_version.sub_title)
      cy.get('[data-test="conduct-full-version-description"]').should('exist').and('be.visible').and('contain.text', conductMessages.full_version.description)
      cy.get('[data-test="conduct-full-version-rules"]').then(($rules) => {
        const totalRules = Object.keys(conductMessages.full_version.rules_list).length
        cy.wrap($rules).should('have.length', totalRules)
      })
      cy.get('[data-test="conduct-full-version-rules-paragraph"]').should('exist').and('be.visible').and('contain.text', conductMessages.full_version.rules_paragraph)
      cy.get('[data-test="conduct-full-version-enforcement-title"]').should('exist').and('be.visible').and('contain.text', conductMessages.full_version.enforcement.title)
      cy.get('[data-test="conduct-full-version-enforcement-description"]').should('exist').and('be.visible').and('contain.text', conductMessages.full_version.enforcement.description)
      cy.get('[data-test="conduct-full-version-enforcement-second-description"]').should('exist').and('be.visible').and('contain.text', conductMessages.full_version.enforcement.second_description)
      cy.get('[data-test="conduct-full-version-reporting-title"]').should('exist').and('be.visible').and('contain.text', conductMessages.full_version.reporting.title)
      cy.get('[data-test="conduct-full-version-reporting-description"]').should('exist').and('be.visible').and('contain.text', conductMessages.full_version.reporting.description)
      cy.get('[data-test="conduct-full-version-reporting-items-title"]').should('exist').and('be.visible').and('contain.text', conductMessages.full_version.reporting.items_title)
      cy.get('[data-test="conduct-full-version-reporting-items"]').then(($rules) => {
        const totalRules = Object.keys(conductMessages.full_version.reporting.items).length
        cy.wrap($rules).should('have.length', totalRules)
      })
      cy.get('[data-test="conduct-full-version-final-description"]').should('exist').and('be.visible').and('contain.text', conductMessages.full_version.final_description)
    })
  })
  describe('Contributing section', () => {
    it('Changes to mobile viewport and assures all elements are rendered correctly', () => {
      cy.viewport('iphone-xr')
      cy.get('[data-test="contributing-section"]').should('be.visible').and('exist').scrollIntoView()
      // TODO: Rewrite test once nyan cat is disabled on mobile
      cy.get('[data-test="nyan-cat"]').then(($element) => {
        cy.wrap($element).should('not.have.class', 'loaded')
        cy.wait(300)
        cy.wrap($element).should('have.class', 'loaded')
        cy.wait(8000)
        cy.wrap($element).should('have.css', 'display', 'none')
      })
      cy.get('[data-test="contributing-title"]')
        .should('be.visible')
        .and('contain.text', messages.en.contributing.title)
      cy.get('[data-test="contributing-description"]')
        .should('be.visible')
      // TODO: Fix this way of assuring the text exists
        .and('contain.text', `Schrödinger Hat ${messages.en.contributing['is-a-project']} GitHub`)
      cy.get('[data-test="contributing-github-link"]')
        .should('be.visible')
        .and('exist')
        .and('have.attr', 'href', Cypress.env('githubURL'))
        .and('have.attr', 'target', '_blank')
      cy.get('[data-test="contributing-cta"]')
        .should('exist')
        .and('contain.text', `${messages.en.contributing.cta} ${messages.en.contributing['external-link']} ${messages.en.contributing['cta-2']}`)
      cy.get('[data-test="contributing-github-website-link"]')
        .should('be.visible')
        .and('exist')
        .and('have.attr', 'href', Cypress.env('githubWebsiteRepoURL'))
        .and('have.attr', 'target', '_blank')
      cy.get('[data-test="contributing-social"]').should('be.visible')
    })
    it('Changes to desktop viewport and assures all elements are rendered correctly', () => {
      cy.viewport('macbook-16')
      cy.get('[data-test="contributing-section"]').should('be.visible').and('exist').scrollIntoView()
      // TODO: Rewrite test once nyan cat is disabled on mobile
      cy.get('[data-test="nyan-cat"]').then(($element) => {
        cy.wrap($element).should('not.have.class', 'loaded')
        cy.wait(300)
        cy.wrap($element).should('have.class', 'loaded')
        cy.wait(8000)
        cy.wrap($element).should('have.css', 'display', 'none')
      })
      cy.get('[data-test="contributing-title"]')
        .should('be.visible')
        .and('contain.text', messages.en.contributing.title)
      cy.get('[data-test="contributing-description"]')
        .should('be.visible')
      // TODO: Fix this way of assuring the text exists
        .and('contain.text', `Schrödinger Hat ${messages.en.contributing['is-a-project']} GitHub`)
      cy.get('[data-test="contributing-github-link"]')
        .should('be.visible')
        .and('exist')
        .and('have.attr', 'href', Cypress.env('githubURL'))
        .and('have.attr', 'target', '_blank')
      cy.get('[data-test="contributing-cta"]')
        .should('exist')
        .and('contain.text', `${messages.en.contributing.cta} ${messages.en.contributing['external-link']} ${messages.en.contributing['cta-2']}`)
      cy.get('[data-test="contributing-github-website-link"]')
        .should('be.visible')
        .and('exist')
        .and('have.attr', 'href', Cypress.env('githubWebsiteRepoURL'))
        .and('have.attr', 'target', '_blank')
      cy.get('[data-test="contributing-social"]').should('be.visible')
    })
    it('Assures all social CTAs are rendered correctly', () => {
      cy.get('[data-test="contributing-social"]').should('be.visible').and('exist')
      cy.get('[data-test="contributing-open-collective"]')
        .should('exist')
        .and('have.attr', 'href', Cypress.env('openCollectiveURL'))
        .and('have.attr', 'target', '_blank')
      cy.get('[data-test="contributing-open-collective-icon"]')
        .should('be.visible')
        .and('have.class', 'fas fa-donate external-link-color')
      cy.get('[data-test="contributing-facebook"]')
        .should('exist')
        .and('have.attr', 'href', Cypress.env('facebookURL'))
        .and('have.attr', 'target', '_blank')
      cy.get('[data-test="contributing-facebook-icon"]')
        .should('be.visible')
        .and('have.class', 'fab fa-facebook external-link-color')
      cy.get('[data-test="contributing-twitter"]')
        .should('exist')
        .and('have.attr', 'href', Cypress.env('twitterURL'))
        .and('have.attr', 'target', '_blank')
      cy.get('[data-test="contributing-twitter-icon"]')
        .should('be.visible')
        .and('have.class', 'fab fa-twitter external-link-color')
      cy.get('[data-test="contributing-linkedin"]')
        .should('exist')
        .and('have.attr', 'href', Cypress.env('linkedinURL'))
        .and('have.attr', 'target', '_blank')
      cy.get('[data-test="contributing-linkedin-icon"]')
        .should('be.visible')
        .and('have.class', 'fab fa-linkedin external-link-color')
      cy.get('[data-test="contributing-instagram"]')
        .should('exist')
        .and('have.attr', 'href', Cypress.env('instagramURL'))
        .and('have.attr', 'target', '_blank')
      cy.get('[data-test="contributing-instagram-icon"]')
        .should('be.visible')
        .and('have.class', 'fab fa-instagram external-link-color')
      cy.get('[data-test="contributing-discord"]')
        .should('exist')
        .and('have.attr', 'href', Cypress.env('discordURL'))
        .and('have.attr', 'target', '_blank')
      cy.get('[data-test="contributing-discord-icon"]')
        .should('be.visible')
        .and('have.class', 'fab fa-discord external-link-color')
    })
    it('Assures all contributing partners are rendered correctly', () => {
      cy.get('[data-test="contributing-partners-logo"]').should('be.visible')
      cy.get('[data-test="contributing-partners-logo"] > a').then(($elements) => {
        cy.wrap($elements)
          .should('be.visible')
          .should('not.have.attr', 'href', '')
          .and('have.attr', 'target', '_blank')
        cy.wrap($elements.children())
          .should('be.visible')
          .and('exist')
          .and('not.have.attr', 'src', '')
          .and('not.have.attr', 'alt', '')
      })
    })
  })
  describe('Events page', () => {
    const eventsMessages = messages.en.events
    const eventsKeys = Object.keys(eventsMessages)
    it('Changes to mobile and assuress content is loaded correctly', () => {
      cy.visit(`${Cypress.env('localhost')}/events`)
      cy.viewport('iphone-xr')
      cy.get('[data-test="events-header"]').should('contain.text', messages.en.navbar.events).and('exist').and('be.visible')
      eventsKeys.forEach((_key) => {
        const key = _key as EventMessageName
        cy.get(`[data-test="event-${key}-link"]`).should('exist').and('be.visible').and('have.attr', 'href', `/events/${key}`)
        cy.get(`[data-test="event-${key}-photo"]`).should('exist').and('be.visible')
        cy.get(`[data-test="event-${key}-title"]`).should('exist').and('be.visible').and('contain.text', eventsMessages[key].title)
        cy.get(`[data-test="event-${key}-date"]`).should('exist').and('be.visible').and('contain.text', `${eventsMessages[key].date} | ${eventsMessages[key].location}`)
        cy.get(`[data-test="event-${key}-subtitle"]`).should('exist').and('be.visible').and('contain.text', eventsMessages[key].subtitle)
        cy.get(`[data-test="event-${key}-read-more"]`).should('exist').and('be.visible').and('contain.text', messages.en.message.common['read-more'])
        cy.get(`[data-test="event-${key}-title"]`).should('exist').and('be.visible').and('contain.text', eventsMessages[key].title)
      })
    })
    it('Changes to desktop and assuress content is loaded correctly', () => {
      cy.visit(`${Cypress.env('localhost')}/events`)
      cy.viewport('macbook-16')
      cy.get('[data-test="events-header"]').should('contain.text', messages.en.navbar.events).and('exist').and('be.visible')
      eventsKeys.forEach((_key) => {
        const key = _key as EventMessageName
        cy.get(`[data-test="event-${key}-link"]`).should('exist').and('be.visible').and('have.attr', 'href', `/events/${key}`)
        cy.get(`[data-test="event-${key}-photo"]`).should('exist').and('be.visible')
        cy.get(`[data-test="event-${key}-title"]`).should('exist').and('be.visible').and('contain.text', eventsMessages[key].title)
        cy.get(`[data-test="event-${key}-date"]`).should('exist').and('be.visible').and('contain.text', `${eventsMessages[key].date} | ${eventsMessages[key].location}`)
        cy.get(`[data-test="event-${key}-subtitle"]`).should('exist').and('be.visible').and('contain.text', eventsMessages[key].subtitle)
        cy.get(`[data-test="event-${key}-read-more"]`).should('exist').and('be.visible').and('contain.text', messages.en.message.common['read-more'])
        cy.get(`[data-test="event-${key}-title"]`).should('exist').and('be.visible').and('contain.text', eventsMessages[key].title)
      })
    })
  })
  describe('Event specific page', () => {
    it('Changes to mobile, assures the single event content is loaded correctly', () => {
      cy.viewport('iphone-xr')
      const eventsMessages = messages.en.events
      const eventsKeys = Object.keys(eventsMessages)
      eventsKeys.forEach((_key) => {
        const key = _key as EventMessageName
        cy.visit(`${Cypress.env('localhost')}/events/${key}`)
        cy.get(`[data-test="${key}-title"]`).should('contain.text', eventsMessages[key].title).and('be.visible')
        cy.get(`[data-test="${key}-date"]`).should('contain.text', eventsMessages[key].date).and('have.attr', 'target', '_blank')
        cy.get(`[data-test="${key}-location"]`).should('contain.text', eventsMessages[key].location).and('have.attr', 'target', '_blank')
        cy.get(`[data-test="${key}-subtitle"]`).should('contain.text', eventsMessages[key].subtitle)
        if (eventsMessages[key].description.length > 1) {
          // TODO: Redo test once we take out the HTML from the text
          cy.get(`[data-test="${key}-description"]`).should('exist')
            .and('be.visible')
        }
        else { cy.get(`[data-test="${key}-description"]`).should('not.exist') }
        if (eventsMessages[key]['signup-link'].length > 1) {
          cy.get(`[data-test="${key}-signup-link"]`)
            .should('contain.text', messages.en.message.common['go-to-event'])
            .and('have.attr', 'href', eventsMessages[key]['signup-link'])
        }
        else {
          cy.get(`[data-test="${key}-signup-link"]`).should('not.exist')
        }
        if (eventsMessages[key].cfp.length > 1) {
          cy.get(`[data-test="${key}-cfp"]`)
            .should('contain.text', messages.en.message.common['go-to-cfp'])
            .and('have.attr', 'href', eventsMessages[key].cfp)
        }
        else {
          cy.get(`[data-test="${key}-cfp"]`).should('not.exist')
        }
        if (eventsMessages[key].donation.length > 1) {
          cy.get(`[data-test="${key}-donation"]`)
            .should('contain.text', messages.en.message.common['go-to-donation'])
            .and('have.attr', 'href', eventsMessages[key].donation)
        }
        else {
          cy.get(`[data-test="${key}-donation"]`).should('not.exist')
        }
        if (eventsMessages[key]['conference-website'].length > 1) {
          cy.get(`[data-test="${key}-website"]`)
            .should('contain.text', messages.en.message.common['go-to-conference-website'])
            .and('have.attr', 'href', eventsMessages[key]['conference-website'])
        }
        else {
          cy.get(`[data-test="${key}-website"]`).should('not.exist')
        }
        if (eventsMessages[key].sponsors.length > 1) {
          cy.get(`[data-test="${key}-sponsors-title"]`).should('contain.text', 'Sponsors')
          cy.get(`[data-test="${key}-sponsors-logo"]`)
            .should('exist')
            .and('be.visible')
        }
        else {
          cy.get(`[data-test="${key}-sponsors"]`).should('not.exist')
        }
        if (eventsMessages[key].sponsors.length > 1) {
          cy.get(`[data-test="${key}-community-sponsors-title"]`).should('contain.text', 'Community Sponsors')
          cy.get(`[data-test="${key}-community-sponsors-logo"]`)
            .should('exist')
            .and('be.visible')
        }
        else {
          cy.get(`[data-test="${key}--community-sponsors"]`).should('not.exist')
        }
      })
    })
    it('Changes to desktop, assures the single event content is loaded correctly', () => {
      cy.viewport('macbook-16')
      const eventsMessages = messages.en.events
      const eventsKeys = Object.keys(eventsMessages)
      eventsKeys.forEach((_key) => {
        const key = _key as EventMessageName
        cy.visit(`${Cypress.env('localhost')}/events/${key}`)
        cy.get(`[data-test="${key}-title"]`).should('contain.text', eventsMessages[key].title).and('be.visible')
        cy.get(`[data-test="${key}-date"]`).should('contain.text', eventsMessages[key].date).and('have.attr', 'target', '_blank')
        cy.get(`[data-test="${key}-location"]`).should('contain.text', eventsMessages[key].location).and('have.attr', 'target', '_blank')
        cy.get(`[data-test="${key}-subtitle"]`).should('contain.text', eventsMessages[key].subtitle)
        if (eventsMessages[key].description.length > 1) {
          // TODO: Redo test once we take out the HTML from the text
          cy.get(`[data-test="${key}-description"]`).should('exist')
            .and('be.visible')
        }
        else { cy.get(`[data-test="${key}-description"]`).should('not.exist') }
        if (eventsMessages[key]['signup-link'].length > 1) {
          cy.get(`[data-test="${key}-signup-link"]`)
            .should('contain.text', messages.en.message.common['go-to-event'])
            .and('have.attr', 'href', eventsMessages[key]['signup-link'])
        }
        else {
          cy.get(`[data-test="${key}-signup-link"]`).should('not.exist')
        }
        if (eventsMessages[key].cfp.length > 1) {
          cy.get(`[data-test="${key}-cfp"]`)
            .should('contain.text', messages.en.message.common['go-to-cfp'])
            .and('have.attr', 'href', eventsMessages[key].cfp)
        }
        else {
          cy.get(`[data-test="${key}-cfp"]`).should('not.exist')
        }
        if (eventsMessages[key].donation.length > 1) {
          cy.get(`[data-test="${key}-donation"]`)
            .should('contain.text', messages.en.message.common['go-to-donation'])
            .and('have.attr', 'href', eventsMessages[key].donation)
        }
        else {
          cy.get(`[data-test="${key}-donation"]`).should('not.exist')
        }
        if (eventsMessages[key]['conference-website'].length > 1) {
          cy.get(`[data-test="${key}-website"]`)
            .should('contain.text', messages.en.message.common['go-to-conference-website'])
            .and('have.attr', 'href', eventsMessages[key]['conference-website'])
        }
        else {
          cy.get(`[data-test="${key}-website"]`).should('not.exist')
        }
        if (eventsMessages[key].sponsors.length > 1) {
          cy.get(`[data-test="${key}-sponsors-title"]`).should('contain.text', 'Sponsors')
          cy.get(`[data-test="${key}-sponsors-logo"]`)
            .should('exist')
            .and('be.visible')
        }
        else {
          cy.get(`[data-test="${key}-sponsors"]`).should('not.exist')
        }
        if (eventsMessages[key].sponsors.length > 1) {
          cy.get(`[data-test="${key}-community-sponsors-title"]`).should('contain.text', 'Community Sponsors')
          cy.get(`[data-test="${key}-community-sponsors-logo"]`)
            .should('exist')
            .and('be.visible')
        }
        else {
          cy.get(`[data-test="${key}--community-sponsors"]`).should('not.exist')
        }
      })
    })
  })
  describe('Footer', () => {
    it('Changes to mobile viewport, assures all elements are present', () => {
      cy.viewport('iphone-xr')
      cy.get('[data-test="footer"]').should('exist').and('be.visible')
      cy.get('[data-test="footer-logo"]').should('exist').and('be.visible')
      cy.get('[data-test="footer-logo"]').should('exist').and('be.visible')
      cy.get('[data-test="footer-home-link"]')
        .should('exist')
        .and('be.visible')
        .and('have.attr', 'href', '/')
      cy.get('[data-test="footer-home-link-img"]')
        .should('exist')
        .and('be.visible')
        .and('not.have.attr', 'alt', '')
      cy.get('[data-test="footer-home-link-text"]')
        .should('exist')
        .and('not.be.visible')
      cy.get('[data-test="footer-nav"]')
        .should('exist')
        .and('be.visible')
      cy.get('[data-test="footer-nav-text"]')
        .should('exist')
        .and('be.visible')
        .and('contain.text', `©${new Date().getFullYear()} Schrödinger Hat`)
    })
    it('Changes to desktop viewport, assures all elements are present', () => {
      cy.viewport('macbook-16')
      cy.get('[data-test="footer"]').should('exist').and('be.visible')
      cy.get('[data-test="footer-logo"]').should('exist').and('be.visible')
      cy.get('[data-test="footer-logo"]').should('exist').and('be.visible')
      cy.get('[data-test="footer-home-link"]')
        .should('exist')
        .and('be.visible')
        .and('have.attr', 'href', '/')
      cy.get('[data-test="footer-home-link-img"]')
        .should('exist')
        .and('be.visible')
        .and('not.have.attr', 'alt', '')
      cy.get('[data-test="footer-home-link-text"]')
        .should('exist')
        .and('be.visible')
        .and('contain.text', 'Schrödinger Hat')
      cy.get('[data-test="footer-nav"]')
        .should('exist')
        .and('be.visible')
      cy.get('[data-test="footer-nav-text"]')
        .should('exist')
        .and('be.visible')
        .and('contain.text', `©${new Date().getFullYear()} Schrödinger Hat`)
    })
  })
  describe('Homepage hero section page', () => {
    it('Changes to mobile viewport, assures all elements are present', () => {
      cy.viewport('iphone-xr')
      cy.get('[data-test="main"]').should('be.visible').and('exist')
      cy.get('[data-test="main-h1"]').should('be.visible').and('exist').and('contain.text', messages.en.main.h1)
      cy.get('[data-test="main-h2"]').should('be.visible').and('exist').and('contain.text', messages.en.main.h2)
      cy.get('[data-test="main-cta-youtube"]')
        .should('exist')
        .and('contain.text', messages.en.main.links.youtube)
        .and('have.attr', 'href', Cypress.env('youtubeURL'))
        .and('have.attr', 'target', '_blank')
      cy.get('[data-test="main-cta-spotify"]')
        .should('exist')
        .and('contain.text', messages.en.main.links.spotify)
        .and('have.attr', 'href', Cypress.env('spotifyURL'))
        .and('have.attr', 'target', '_blank')
      cy.get('[data-test="main-cta-open-collective"]')
        .should('exist')
        .and('contain.text', messages.en.main.links.openCollective)
        .and('have.attr', 'href', Cypress.env('openCollectiveURL'))
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
        .and('have.attr', 'href', Cypress.env('youtubeURL'))
        .and('have.attr', 'target', '_blank')
      cy.get('[data-test="main-cta-spotify"]')
        .should('exist')
        .and('contain.text', messages.en.main.links.spotify)
        .and('have.attr', 'href', Cypress.env('spotifyURL'))
        .and('have.attr', 'target', '_blank')
      cy.get('[data-test="main-cta-open-collective"]')
        .should('exist')
        .and('contain.text', messages.en.main.links.openCollective)
        .and('have.attr', 'href', Cypress.env('openCollectiveURL'))
        .and('have.attr', 'target', '_blank')
    })
  })
  describe('Navbar', () => {
    it('Changes to mobile viewport, assures all CTAs work correctly', () => {
      cy.viewport('iphone-xr')
      cy.get('[data-test="nav-wrapper"]').should('be.visible').and('exist')
      cy.get('[data-test="nav-logo-button"]').should('be.visible').and('have.attr', 'href').and('include', '/')
      cy.get('[data-test="logo-text"]').should('be.visible').and('contain.text', 'Schrödinger Hat')
      cy.get('[data-test="nav-team-page-link"]').should('not.be.visible')
      cy.get('[data-test="nav-event-page-link"]').should('not.be.visible')
      cy.get('[data-test="nav-conduct-page-link"]').should('not.be.visible')
      cy.get('[data-test="nav-go-nord-page-link"]').should('not.be.visible')
      cy.get('[data-test="nav-github-page-link"]').should('have.attr', 'href').and('include', Cypress.env('githubURL'))
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
        .and('have.attr', 'href', Cypress.env('githubURL'))
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
        .and('have.attr', 'href', Cypress.env('imageGoNordURL'))
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
        .and('have.attr', 'href', Cypress.env('imageGoNordURL'))
        .and('have.attr', 'target', '_blank')
      cy.get('[data-test="nav-github-page-link"]')
        .should('exist')
        .and('have.attr', 'href', Cypress.env('githubURL'))
        .and('have.attr', 'target', '_blank')
      cy.get('[data-test="nav-github-icon"]').should('have.class', 'fab fa-github').and('be.visible').and('exist')
      cy.get('html').then(($html) => {
        const oldClass = $html[0].getAttribute('class')
        cy.get('[data-test="nav-theme-cta"]').click()
        cy.get('html').should('not.have.class', oldClass)
      })
    })
  })
  describe('Team member page', () => {
    it('Changes to mobile viewport, assures all content is displayed correctly', () => {
      cy.viewport('iphone-xr')
      const teamMessages = messages.en.team
      type TeamMemberKey = keyof typeof teamMessages
      const memberKeys = Object.keys(teamMessages)
      memberKeys.forEach((_key) => {
        const key = _key as TeamMemberKey
        cy.visit(`${Cypress.env('localhost')}/team/${key}`)
        cy.get('[data-test="member-page-photo"]').should('exist').and('be.visible')
        cy.get('[data-test="member-page-name"]').should('exist').and('be.visible').and('contain.text', `${teamMessages[key].name}`)
        if (teamMessages[key].github_url.length > 1)
          cy.get('[data-test="member-page-github"]').should('have.attr', 'href', teamMessages[key].github_url).and('have.attr', 'target', '_blank')
        if (teamMessages[key].linkedin_url.length > 1)
          cy.get('[data-test="member-page-linkedin"]').should('have.attr', 'href', teamMessages[key].linkedin_url).and('have.attr', 'target', '_blank')
        if (teamMessages[key].twitter_url.length > 1)
          cy.get('[data-test="member-page-twitter"]').should('have.attr', 'href', teamMessages[key].twitter_url).and('have.attr', 'target', '_blank')
        if (teamMessages[key].website.length > 1)
          cy.get('[data-test="member-page-website"]').should('have.attr', 'href', teamMessages[key].website).and('have.attr', 'target', '_blank')
        cy.get('[data-test="member-page-description"]').should('contain.text', teamMessages[key].description)
      })
    })
    it('Changes to desktop viewport, assures all content is displayed correctly', () => {
      cy.viewport('macbook-16')
      const teamMessages = messages.en.team
      type TeamMemberKey = keyof typeof teamMessages
      const memberKeys = Object.keys(teamMessages)
      memberKeys.forEach((_key) => {
        const key = _key as TeamMemberKey
        cy.visit(`${Cypress.env('localhost')}/team/${key}`)
        cy.get('[data-test="member-page-photo"]').should('exist').and('be.visible')
        cy.get('[data-test="member-page-name"]').should('exist').and('be.visible').and('contain.text', `${teamMessages[key].name}`)
        if (teamMessages[key].github_url.length > 1)
          cy.get('[data-test="member-page-github"]').should('have.attr', 'href', teamMessages[key].github_url).and('have.attr', 'target', '_blank')
        if (teamMessages[key].linkedin_url.length > 1)
          cy.get('[data-test="member-page-linkedin"]').should('have.attr', 'href', teamMessages[key].linkedin_url).and('have.attr', 'target', '_blank')
        if (teamMessages[key].twitter_url.length > 1)
          cy.get('[data-test="member-page-twitter"]').should('have.attr', 'href', teamMessages[key].twitter_url).and('have.attr', 'target', '_blank')
        if (teamMessages[key].website.length > 1)
          cy.get('[data-test="member-page-website"]').should('have.attr', 'href', teamMessages[key].website).and('have.attr', 'target', '_blank')
        cy.get('[data-test="member-page-description"]').should('contain.text', teamMessages[key].description)
      })
    })
  })
  describe('Team page', () => {
    it('Changes the viewport to mobile, assures you can go to page from menu and assures are content is displayed correctly', () => {
      cy.viewport('iphone-xr')
      cy.get('[data-test="nav-burger-menu-cta"]').should('exist').and('be.visible').click()
      cy.get('[data-test="mobile-team-page-link"]').should('exist').and('be.visible').click()
      cy.get('[data-test="team-page-headline"]').should('exist').and('be.visible').and('contain.text', 'Schrödinger Hat\'s fam')
      cy.url().should('include', `${Cypress.env('localhost')}/team`)
      cy.get('[data-test="team-card"]').then(($teamCards) => {
        const teamMessages = messages.en.team
          type TeamMemberKey = keyof typeof teamMessages
          const teamMembersQuantity = Object.keys(teamMessages).length
          const teamMembersKey = Object.keys(teamMessages)
          cy.wrap($teamCards).should('have.length', teamMembersQuantity)
          teamMembersKey.forEach((_key) => {
            const key = _key as TeamMemberKey
            cy.get(`[data-test-member-name="team-member-${key}"]`).should('exist').and('be.visible')
            cy.get(`[data-test="team-member-${key}-index-photo"]`).should('exist').and('be.visible')
            cy.get(`[data-test="team-member-${key}-name"]`).should('exist').and('be.visible').and('contain.text', `${teamMessages[key].name}`)
            if (teamMessages[key].github_url.length > 1)
              cy.get(`[data-test="team-member-${key}-github"]`).should('have.attr', 'href', teamMessages[key].github_url).and('have.attr', 'target', '_blank')
            if (teamMessages[key].linkedin_url.length > 1)
              cy.get(`[data-test="team-member-${key}-linkedin"]`).should('have.attr', 'href', teamMessages[key].linkedin_url).and('have.attr', 'target', '_blank')
            if (teamMessages[key].twitter_url.length > 1)
              cy.get(`[data-test="team-member-${key}-twitter"]`).should('have.attr', 'href', teamMessages[key].twitter_url).and('have.attr', 'target', '_blank')
            if (teamMessages[key].website.length > 1)
              cy.get(`[data-test="team-member-${key}-website"]`).should('have.attr', 'href', teamMessages[key].website).and('have.attr', 'target', '_blank')
            cy.get(`[data-test="team-member-${key}-page-link"]`).should('be.visible').and('have.attr', 'href', `/team/${key}`).and('contain.text', messages.en.redirect.profile)
          })
      })
    })
    it('Changes the viewport to desktop, assures you can go to page from menu and assures are content is displayed correctly', () => {
      cy.viewport('macbook-16')
      cy.get('[data-test="nav-team-page-link"]').should('exist').and('be.visible').click()
      cy.get('[data-test="team-page-headline"]').should('exist').and('be.visible').and('contain.text', 'Schrödinger Hat\'s fam')
      cy.url().should('include', `${Cypress.env('localhost')}/team`)
      cy.get('[data-test="team-card"]').then(($teamCards) => {
        const teamMessages = messages.en.team
          type TeamMemberKey = keyof typeof teamMessages
          const teamMembersQuantity = Object.keys(teamMessages).length
          const teamMembersKey = Object.keys(teamMessages)
          cy.wrap($teamCards).should('have.length', teamMembersQuantity)
          teamMembersKey.forEach((_key) => {
            const key = _key as TeamMemberKey
            cy.get(`[data-test-member-name="team-member-${key}"]`).should('exist').and('be.visible')
            cy.get(`[data-test="team-member-${key}-index-photo"]`).should('exist').and('be.visible')
            cy.get(`[data-test="team-member-${key}-name"]`).should('exist').and('be.visible').and('contain.text', `${teamMessages[key].name}`)
            if (teamMessages[key].github_url.length > 1)
              cy.get(`[data-test="team-member-${key}-github"]`).should('have.attr', 'href', teamMessages[key].github_url).and('have.attr', 'target', '_blank')
            if (teamMessages[key].linkedin_url.length > 1)
              cy.get(`[data-test="team-member-${key}-linkedin"]`).should('have.attr', 'href', teamMessages[key].linkedin_url).and('have.attr', 'target', '_blank')
            if (teamMessages[key].twitter_url.length > 1)
              cy.get(`[data-test="team-member-${key}-twitter"]`).should('have.attr', 'href', teamMessages[key].twitter_url).and('have.attr', 'target', '_blank')
            if (teamMessages[key].website.length > 1)
              cy.get(`[data-test="team-member-${key}-website"]`).should('have.attr', 'href', teamMessages[key].website).and('have.attr', 'target', '_blank')
            cy.get(`[data-test="team-member-${key}-page-link"]`).should('be.visible').and('have.attr', 'href', `/team/${key}`).and('contain.text', messages.en.redirect.profile)
          })
      })
    })
  })
})
describe('Italian tests', {
  env: {
    discordURL: 'https://discord.gg/RTXr8A3eFn',
    facebookURL: 'https://www.facebook.com/schrodingerhat',
    githubURL: 'https://github.com/Schrodinger-Hat',
    githubWebsiteRepoURL: 'https://github.com/Schrodinger-Hat/schrodinger-hat-website/issues/new/choose',
    imageGoNordURL: 'https://ign.schrodinger-hat.it',
    instagramURL: 'https://www.instagram.com/schrodinger_hat/',
    linkedinURL: 'https://www.linkedin.com/company/schrodinger-hat/',
    // Modify with your local environment url
    localhost: 'http://localhost:5173',
    openCollectiveURL: 'https://opencollective.com/schrodinger-hat',
    spotifyURL: 'https://open.spotify.com/show/7yfkQCV6hrPIqflSqJDB2P',
    twitterURL: 'https://twitter.com/schrodinger_hat',
    youtubeURL: 'https://www.youtube.com/channel/UC1QLLgrGrPmlaFhS0orykCA',
  },
}, () => {
  beforeEach(() => {
    cy.visit(Cypress.env('localhost'), {
      onBeforeLoad(win) {
        Object.defineProperty(win.navigator, 'language', {
          value: 'it_IT',
        })
      },
    })
    // Wait for mailchimp modal to appear.
    // As the modal is loaded async, edit the time depending on your situation.
    cy.wait(5000).then(() => {
      cy.get('.mc-closeModal').click()
    })
  })
  describe('Conduct page', () => {
    it('Assures al text is loaded correctly', () => {
      const conductMessages = messages.it.code_of_conduct
      cy.visit(`${Cypress.env('localhost')}/code-of-conduct`, {
        onBeforeLoad(win) {
          Object.defineProperty(win.navigator, 'language', {
            value: 'it_IT',
          })
        },
      })
      cy.get('[data-test="conduct-main-title"]').should('exist').and('be.visible').and('contain.text', conductMessages.main_title)
      cy.get('[data-test="conduct-short-version-title"]').should('exist').and('be.visible').and('contain.text', conductMessages.short_version.title)
      cy.get('[data-test="conduct-short-version-description"]').should('exist').and('be.visible').and('contain.text', conductMessages.short_version.description)
      cy.get('[data-test="conduct-long-version-title"]').should('exist').and('be.visible').and('contain.text', conductMessages.longer_version.title)
      cy.get('[data-test="conduct-long-version-description"]').should('exist').and('be.visible').and('contain.text', conductMessages.longer_version.description)
      cy.get('[data-test="conduct-full-version-title"]').should('exist').and('be.visible').and('contain.text', conductMessages.full_version.title)
      cy.get('[data-test="conduct-full-version-subtitle"]').should('exist').and('be.visible').and('contain.text', conductMessages.full_version.sub_title)
      cy.get('[data-test="conduct-full-version-description"]').should('exist').and('be.visible').and('contain.text', conductMessages.full_version.description)
      cy.get('[data-test="conduct-full-version-rules"]').then(($rules) => {
        const totalRules = Object.keys(conductMessages.full_version.rules_list).length
        cy.wrap($rules).should('have.length', totalRules)
      })
      cy.get('[data-test="conduct-full-version-rules-paragraph"]').should('exist').and('be.visible').and('contain.text', conductMessages.full_version.rules_paragraph)
      cy.get('[data-test="conduct-full-version-enforcement-title"]').should('exist').and('be.visible').and('contain.text', conductMessages.full_version.enforcement.title)
      cy.get('[data-test="conduct-full-version-enforcement-description"]').should('exist').and('be.visible').and('contain.text', conductMessages.full_version.enforcement.description)
      cy.get('[data-test="conduct-full-version-enforcement-second-description"]').should('exist').and('be.visible').and('contain.text', conductMessages.full_version.enforcement.second_description)
      cy.get('[data-test="conduct-full-version-reporting-title"]').should('exist').and('be.visible').and('contain.text', conductMessages.full_version.reporting.title)
      cy.get('[data-test="conduct-full-version-reporting-description"]').should('exist').and('be.visible').and('contain.text', conductMessages.full_version.reporting.description)
      cy.get('[data-test="conduct-full-version-reporting-items-title"]').should('exist').and('be.visible').and('contain.text', conductMessages.full_version.reporting.items_title)
      cy.get('[data-test="conduct-full-version-reporting-items"]').then(($rules) => {
        const totalRules = Object.keys(conductMessages.full_version.reporting.items).length
        cy.wrap($rules).should('have.length', totalRules)
      })
      cy.get('[data-test="conduct-full-version-final-description"]').should('exist').and('be.visible').and('contain.text', conductMessages.full_version.final_description)
    })
  })
  describe('Contributing section', () => {
    it('Changes to mobile viewport and assures all elements are rendered correctly', () => {
      cy.viewport('iphone-xr')
      cy.get('[data-test="contributing-section"]').should('be.visible').and('exist').scrollIntoView()
      // TODO: Rewrite test once nyan cat is disabled on mobile
      cy.get('[data-test="nyan-cat"]').then(($element) => {
        cy.wrap($element).should('not.have.class', 'loaded')
        cy.wait(300)
        cy.wrap($element).should('have.class', 'loaded')
        cy.wait(8000)
        cy.wrap($element).should('have.css', 'display', 'none')
      })
      cy.get('[data-test="contributing-title"]')
        .should('be.visible')
        .and('contain.text', messages.it.contributing.title)
      cy.get('[data-test="contributing-description"]')
        .should('be.visible')
      // TODO: Fix this way of assuring the text exists
        .and('contain.text', `Schrödinger Hat ${messages.it.contributing['is-a-project']} GitHub`)
      cy.get('[data-test="contributing-github-link"]')
        .should('be.visible')
        .and('exist')
        .and('have.attr', 'href', Cypress.env('githubURL'))
        .and('have.attr', 'target', '_blank')
      cy.get('[data-test="contributing-cta"]')
        .should('exist')
        .and('contain.text', `${messages.it.contributing.cta} ${messages.it.contributing['external-link']} ${messages.it.contributing['cta-2']}`)
      cy.get('[data-test="contributing-github-website-link"]')
        .should('be.visible')
        .and('exist')
        .and('have.attr', 'href', Cypress.env('githubWebsiteRepoURL'))
        .and('have.attr', 'target', '_blank')
      cy.get('[data-test="contributing-social"]').should('be.visible')
    })
    it('Changes to desktop viewport and assures all elements are rendered correctly', () => {
      cy.viewport('macbook-16')
      cy.get('[data-test="contributing-section"]').should('be.visible').and('exist').scrollIntoView()
      // TODO: Rewrite test once nyan cat is disabled on mobile
      cy.get('[data-test="nyan-cat"]').then(($element) => {
        cy.wrap($element).should('not.have.class', 'loaded')
        cy.wait(300)
        cy.wrap($element).should('have.class', 'loaded')
        cy.wait(8000)
        cy.wrap($element).should('have.css', 'display', 'none')
      })
      cy.get('[data-test="contributing-title"]')
        .should('be.visible')
        .and('contain.text', messages.it.contributing.title)
      cy.get('[data-test="contributing-description"]')
        .should('be.visible')
      // TODO: Fix this way of assuring the text exists
        .and('contain.text', `Schrödinger Hat ${messages.it.contributing['is-a-project']} GitHub`)
      cy.get('[data-test="contributing-github-link"]')
        .should('be.visible')
        .and('exist')
        .and('have.attr', 'href', Cypress.env('githubURL'))
        .and('have.attr', 'target', '_blank')
      cy.get('[data-test="contributing-cta"]')
        .should('exist')
        .and('contain.text', `${messages.it.contributing.cta} ${messages.it.contributing['external-link']} ${messages.it.contributing['cta-2']}`)
      cy.get('[data-test="contributing-github-website-link"]')
        .should('be.visible')
        .and('exist')
        .and('have.attr', 'href', Cypress.env('githubWebsiteRepoURL'))
        .and('have.attr', 'target', '_blank')
      cy.get('[data-test="contributing-social"]').should('be.visible')
    })
    it('Assures all social CTAs are rendered correctly', () => {
      cy.get('[data-test="contributing-social"]').should('be.visible').and('exist')
      cy.get('[data-test="contributing-open-collective"]')
        .should('exist')
        .and('have.attr', 'href', Cypress.env('openCollectiveURL'))
        .and('have.attr', 'target', '_blank')
      cy.get('[data-test="contributing-open-collective-icon"]')
        .should('be.visible')
        .and('have.class', 'fas fa-donate external-link-color')
      cy.get('[data-test="contributing-facebook"]')
        .should('exist')
        .and('have.attr', 'href', Cypress.env('facebookURL'))
        .and('have.attr', 'target', '_blank')
      cy.get('[data-test="contributing-facebook-icon"]')
        .should('be.visible')
        .and('have.class', 'fab fa-facebook external-link-color')
      cy.get('[data-test="contributing-twitter"]')
        .should('exist')
        .and('have.attr', 'href', Cypress.env('twitterURL'))
        .and('have.attr', 'target', '_blank')
      cy.get('[data-test="contributing-twitter-icon"]')
        .should('be.visible')
        .and('have.class', 'fab fa-twitter external-link-color')
      cy.get('[data-test="contributing-linkedin"]')
        .should('exist')
        .and('have.attr', 'href', Cypress.env('linkedinURL'))
        .and('have.attr', 'target', '_blank')
      cy.get('[data-test="contributing-linkedin-icon"]')
        .should('be.visible')
        .and('have.class', 'fab fa-linkedin external-link-color')
      cy.get('[data-test="contributing-instagram"]')
        .should('exist')
        .and('have.attr', 'href', Cypress.env('instagramURL'))
        .and('have.attr', 'target', '_blank')
      cy.get('[data-test="contributing-instagram-icon"]')
        .should('be.visible')
        .and('have.class', 'fab fa-instagram external-link-color')
      cy.get('[data-test="contributing-discord"]')
        .should('exist')
        .and('have.attr', 'href', Cypress.env('discordURL'))
        .and('have.attr', 'target', '_blank')
      cy.get('[data-test="contributing-discord-icon"]')
        .should('be.visible')
        .and('have.class', 'fab fa-discord external-link-color')
    })
    it('Assures all contributing partners are rendered correctly', () => {
      cy.get('[data-test="contributing-partners-logo"]').should('be.visible')
      cy.get('[data-test="contributing-partners-logo"] > a').then(($elements) => {
        cy.wrap($elements)
          .should('be.visible')
          .should('not.have.attr', 'href', '')
          .and('have.attr', 'target', '_blank')
        cy.wrap($elements.children())
          .should('be.visible')
          .and('exist')
          .and('not.have.attr', 'src', '')
          .and('not.have.attr', 'alt', '')
      })
    })
  })
  describe('Events page', () => {
    const eventsMessages = messages.it.events
    const eventsKeys = Object.keys(eventsMessages)
    it('Changes to mobile and assuress content is loaded correctly', () => {
      cy.visit(`${Cypress.env('localhost')}/events`, {
        onBeforeLoad(win) {
          Object.defineProperty(win.navigator, 'language', {
            value: 'it_IT',
          })
        },
      })
      cy.viewport('iphone-xr')
      cy.get('[data-test="events-header"]').should('contain.text', messages.it.navbar.events).and('exist').and('be.visible')
      eventsKeys.forEach((_key) => {
        const key = _key as EventMessageName
        cy.get(`[data-test="event-${key}-link"]`).should('exist').and('be.visible').and('have.attr', 'href', `/events/${key}`)
        cy.get(`[data-test="event-${key}-photo"]`).should('exist').and('be.visible')
        cy.get(`[data-test="event-${key}-title"]`).should('exist').and('be.visible').and('contain.text', eventsMessages[key].title)
        cy.get(`[data-test="event-${key}-date"]`).should('exist').and('be.visible').and('contain.text', `${eventsMessages[key].date} | ${eventsMessages[key].location}`)
        cy.get(`[data-test="event-${key}-subtitle"]`).should('exist').and('be.visible').and('contain.text', eventsMessages[key].subtitle)
        cy.get(`[data-test="event-${key}-read-more"]`).should('exist').and('be.visible').and('contain.text', messages.it.message.common['read-more'])
        cy.get(`[data-test="event-${key}-title"]`).should('exist').and('be.visible').and('contain.text', eventsMessages[key].title)
      })
    })
    it('Changes to desktop and assuress content is loaded correctly', () => {
      cy.visit(`${Cypress.env('localhost')}/events`, {
        onBeforeLoad(win) {
          Object.defineProperty(win.navigator, 'language', {
            value: 'it_IT',
          })
        },
      })
      cy.viewport('macbook-16')
      cy.get('[data-test="events-header"]').should('contain.text', messages.it.navbar.events).and('exist').and('be.visible')
      eventsKeys.forEach((_key) => {
        const key = _key as EventMessageName
        cy.get(`[data-test="event-${key}-link"]`).should('exist').and('be.visible').and('have.attr', 'href', `/events/${key}`)
        cy.get(`[data-test="event-${key}-photo"]`).should('exist').and('be.visible')
        cy.get(`[data-test="event-${key}-title"]`).should('exist').and('be.visible').and('contain.text', eventsMessages[key].title)
        cy.get(`[data-test="event-${key}-date"]`).should('exist').and('be.visible').and('contain.text', `${eventsMessages[key].date} | ${eventsMessages[key].location}`)
        cy.get(`[data-test="event-${key}-subtitle"]`).should('exist').and('be.visible').and('contain.text', eventsMessages[key].subtitle)
        cy.get(`[data-test="event-${key}-read-more"]`).should('exist').and('be.visible').and('contain.text', messages.it.message.common['read-more'])
        cy.get(`[data-test="event-${key}-title"]`).should('exist').and('be.visible').and('contain.text', eventsMessages[key].title)
      })
    })
  })
  describe('Event specific page', () => {
    it('Changes to mobile, assures the single event content is loaded correctly', () => {
      cy.viewport('iphone-xr')
      const eventsMessages = messages.it.events
      const eventsKeys = Object.keys(eventsMessages)
      eventsKeys.forEach((_key) => {
        const key = _key as EventMessageName
        cy.visit(`${Cypress.env('localhost')}/events/${key}`, {
          onBeforeLoad(win) {
            Object.defineProperty(win.navigator, 'language', {
              value: 'it_IT',
            })
          },
        })
        cy.get(`[data-test="${key}-title"]`).should('contain.text', eventsMessages[key].title).and('be.visible')
        cy.get(`[data-test="${key}-date"]`).should('contain.text', eventsMessages[key].date).and('have.attr', 'target', '_blank')
        cy.get(`[data-test="${key}-location"]`).should('contain.text', eventsMessages[key].location).and('have.attr', 'target', '_blank')
        cy.get(`[data-test="${key}-subtitle"]`).should('contain.text', eventsMessages[key].subtitle)
        if (eventsMessages[key].description.length > 1) {
          // TODO: Redo test once we take out the HTML from the text
          cy.get(`[data-test="${key}-description"]`).should('exist')
            .and('be.visible')
        }
        else { cy.get(`[data-test="${key}-description"]`).should('not.exist') }
        if (eventsMessages[key]['signup-link'].length > 1) {
          cy.get(`[data-test="${key}-signup-link"]`)
            .should('contain.text', messages.it.message.common['go-to-event'])
            .and('have.attr', 'href', eventsMessages[key]['signup-link'])
        }
        else {
          cy.get(`[data-test="${key}-signup-link"]`).should('not.exist')
        }
        if (eventsMessages[key].cfp.length > 1) {
          cy.get(`[data-test="${key}-cfp"]`)
            .should('contain.text', messages.it.message.common['go-to-cfp'])
            .and('have.attr', 'href', eventsMessages[key].cfp)
        }
        else {
          cy.get(`[data-test="${key}-cfp"]`).should('not.exist')
        }
        if (eventsMessages[key].donation.length > 1) {
          cy.get(`[data-test="${key}-donation"]`)
            .should('contain.text', messages.it.message.common['go-to-donation'])
            .and('have.attr', 'href', eventsMessages[key].donation)
        }
        else {
          cy.get(`[data-test="${key}-donation"]`).should('not.exist')
        }
        if (eventsMessages[key]['conference-website'].length > 1) {
          cy.get(`[data-test="${key}-website"]`)
            .should('contain.text', messages.it.message.common['go-to-conference-website'])
            .and('have.attr', 'href', eventsMessages[key]['conference-website'])
        }
        else {
          cy.get(`[data-test="${key}-website"]`).should('not.exist')
        }
        if (eventsMessages[key].sponsors.length > 1) {
          cy.get(`[data-test="${key}-sponsors-title"]`).should('contain.text', 'Sponsors')
          cy.get(`[data-test="${key}-sponsors-logo"]`)
            .should('exist')
            .and('be.visible')
        }
        else {
          cy.get(`[data-test="${key}-sponsors"]`).should('not.exist')
        }
        if (eventsMessages[key]['community-sponsors'].length > 1) {
          cy.get(`[data-test="${key}-community-sponsors-title"]`).should('contain.text', 'Community Sponsors')
          cy.get(`[data-test="${key}-community-sponsors-logo"]`)
            .should('exist')
            .and('be.visible')
        }
        else {
          cy.get(`[data-test="${key}--community-sponsors"]`).should('not.exist')
        }
      })
    })
    it('Changes to desktop, assures the single event content is loaded correctly', () => {
      cy.viewport('macbook-16')
      const eventsMessages = messages.it.events
      const eventsKeys = Object.keys(eventsMessages)
      eventsKeys.forEach((_key) => {
        const key = _key as EventMessageName
        cy.visit(`${Cypress.env('localhost')}/events/${key}`, {
          onBeforeLoad(win) {
            Object.defineProperty(win.navigator, 'language', {
              value: 'it_IT',
            })
          },
        })
        cy.get(`[data-test="${key}-title"]`).should('contain.text', eventsMessages[key].title).and('be.visible')
        cy.get(`[data-test="${key}-date"]`).should('contain.text', eventsMessages[key].date).and('have.attr', 'target', '_blank')
        cy.get(`[data-test="${key}-location"]`).should('contain.text', eventsMessages[key].location).and('have.attr', 'target', '_blank')
        cy.get(`[data-test="${key}-subtitle"]`).should('contain.text', eventsMessages[key].subtitle)
        if (eventsMessages[key].description.length > 1) {
          // TODO: Redo test once we take out the HTML from the text
          cy.get(`[data-test="${key}-description"]`).should('exist')
            .and('be.visible')
        }
        else { cy.get(`[data-test="${key}-description"]`).should('not.exist') }
        if (eventsMessages[key]['signup-link'].length > 1) {
          cy.get(`[data-test="${key}-signup-link"]`)
            .should('contain.text', messages.it.message.common['go-to-event'])
            .and('have.attr', 'href', eventsMessages[key]['signup-link'])
        }
        else {
          cy.get(`[data-test="${key}-signup-link"]`).should('not.exist')
        }
        if (eventsMessages[key].cfp.length > 1) {
          cy.get(`[data-test="${key}-cfp"]`)
            .should('contain.text', messages.it.message.common['go-to-cfp'])
            .and('have.attr', 'href', eventsMessages[key].cfp)
        }
        else {
          cy.get(`[data-test="${key}-cfp"]`).should('not.exist')
        }
        if (eventsMessages[key].donation.length > 1) {
          cy.get(`[data-test="${key}-donation"]`)
            .should('contain.text', messages.it.message.common['go-to-donation'])
            .and('have.attr', 'href', eventsMessages[key].donation)
        }
        else {
          cy.get(`[data-test="${key}-donation"]`).should('not.exist')
        }
        if (eventsMessages[key]['conference-website'].length > 1) {
          cy.get(`[data-test="${key}-website"]`)
            .should('contain.text', messages.it.message.common['go-to-conference-website'])
            .and('have.attr', 'href', eventsMessages[key]['conference-website'])
        }
        else {
          cy.get(`[data-test="${key}-website"]`).should('not.exist')
        }
        if (eventsMessages[key].sponsors.length > 1) {
          cy.get(`[data-test="${key}-sponsors-title"]`).should('contain.text', 'Sponsors')
          cy.get(`[data-test="${key}-sponsors-logo"]`)
            .should('exist')
            .and('be.visible')
        }
        else {
          cy.get(`[data-test="${key}-sponsors"]`).should('not.exist')
        }
        if (eventsMessages[key]['community-sponsors'].length > 1) {
          cy.get(`[data-test="${key}-community-sponsors-title"]`).should('contain.text', 'Community Sponsors')
          cy.get(`[data-test="${key}-community-sponsors-logo"]`)
            .should('exist')
            .and('be.visible')
        }
        else {
          cy.get(`[data-test="${key}--community-sponsors"]`).should('not.exist')
        }
      })
    })
  })
  describe('Footer', () => {
    it('Changes to mobile viewport, assures all elements are present', () => {
      cy.viewport('iphone-xr')
      cy.get('[data-test="footer"]').should('exist').and('be.visible')
      cy.get('[data-test="footer-logo"]').should('exist').and('be.visible')
      cy.get('[data-test="footer-logo"]').should('exist').and('be.visible')
      cy.get('[data-test="footer-home-link"]')
        .should('exist')
        .and('be.visible')
        .and('have.attr', 'href', '/')
      cy.get('[data-test="footer-home-link-img"]')
        .should('exist')
        .and('be.visible')
        .and('not.have.attr', 'alt', '')
      cy.get('[data-test="footer-home-link-text"]')
        .should('exist')
        .and('not.be.visible')
      cy.get('[data-test="footer-nav"]')
        .should('exist')
        .and('be.visible')
      cy.get('[data-test="footer-nav-text"]')
        .should('exist')
        .and('be.visible')
        .and('contain.text', `©${new Date().getFullYear()} Schrödinger Hat`)
    })
    it('Changes to desktop viewport, assures all elements are present', () => {
      cy.viewport('macbook-16')
      cy.get('[data-test="footer"]').should('exist').and('be.visible')
      cy.get('[data-test="footer-logo"]').should('exist').and('be.visible')
      cy.get('[data-test="footer-logo"]').should('exist').and('be.visible')
      cy.get('[data-test="footer-home-link"]')
        .should('exist')
        .and('be.visible')
        .and('have.attr', 'href', '/')
      cy.get('[data-test="footer-home-link-img"]')
        .should('exist')
        .and('be.visible')
        .and('not.have.attr', 'alt', '')
      cy.get('[data-test="footer-home-link-text"]')
        .should('exist')
        .and('be.visible')
        .and('contain.text', 'Schrödinger Hat')
      cy.get('[data-test="footer-nav"]')
        .should('exist')
        .and('be.visible')
      cy.get('[data-test="footer-nav-text"]')
        .should('exist')
        .and('be.visible')
        .and('contain.text', `©${new Date().getFullYear()} Schrödinger Hat`)
    })
  })
  describe('Homepage hero section page', () => {
    it('Changes to mobile viewport, assures all elements are present', () => {
      cy.viewport('iphone-xr')
      cy.get('[data-test="main"]').should('be.visible').and('exist')
      cy.get('[data-test="main-h1"]').should('be.visible').and('exist').and('contain.text', messages.it.main.h1)
      cy.get('[data-test="main-h2"]').should('be.visible').and('exist').and('contain.text', messages.it.main.h2)
      cy.get('[data-test="main-cta-youtube"]')
        .should('exist')
        .and('contain.text', messages.it.main.links.youtube)
        .and('have.attr', 'href', Cypress.env('youtubeURL'))
        .and('have.attr', 'target', '_blank')
      cy.get('[data-test="main-cta-spotify"]')
        .should('exist')
        .and('contain.text', messages.it.main.links.spotify)
        .and('have.attr', 'href', Cypress.env('spotifyURL'))
        .and('have.attr', 'target', '_blank')
      cy.get('[data-test="main-cta-open-collective"]')
        .should('exist')
        .and('contain.text', messages.it.main.links.openCollective)
        .and('have.attr', 'href', Cypress.env('openCollectiveURL'))
        .and('have.attr', 'target', '_blank')
    })
    it('Changes to desktop viewport, assures all elements are present', () => {
      cy.viewport('macbook-16')
      cy.get('[data-test="main"]').should('be.visible').and('exist')
      cy.get('[data-test="main-h1"]').should('be.visible').and('exist').and('contain.text', messages.it.main.h1)
      cy.get('[data-test="main-h2"]').should('be.visible').and('exist').and('contain.text', messages.it.main.h2)
      cy.get('[data-test="main-cta-youtube"]')
        .should('exist')
        .and('contain.text', messages.it.main.links.youtube)
        .and('have.attr', 'href', Cypress.env('youtubeURL'))
        .and('have.attr', 'target', '_blank')
      cy.get('[data-test="main-cta-spotify"]')
        .should('exist')
        .and('contain.text', messages.it.main.links.spotify)
        .and('have.attr', 'href', Cypress.env('spotifyURL'))
        .and('have.attr', 'target', '_blank')
      cy.get('[data-test="main-cta-open-collective"]')
        .should('exist')
        .and('contain.text', messages.it.main.links.openCollective)
        .and('have.attr', 'href', Cypress.env('openCollectiveURL'))
        .and('have.attr', 'target', '_blank')
    })
  })
  describe('Navbar', () => {
    it('Changes to mobile viewport, assures all CTAs work correctly', () => {
      cy.viewport('iphone-xr')
      cy.get('[data-test="nav-wrapper"]').should('be.visible').and('exist')
      cy.get('[data-test="nav-logo-button"]').should('be.visible').and('have.attr', 'href').and('include', '/')
      cy.get('[data-test="logo-text"]').should('be.visible').and('contain.text', 'Schrödinger Hat')
      cy.get('[data-test="nav-team-page-link"]').should('not.be.visible')
      cy.get('[data-test="nav-event-page-link"]').should('not.be.visible')
      cy.get('[data-test="nav-conduct-page-link"]').should('not.be.visible')
      cy.get('[data-test="nav-go-nord-page-link"]').should('not.be.visible')
      cy.get('[data-test="nav-github-page-link"]').should('have.attr', 'href').and('include', Cypress.env('githubURL'))
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
        .and('have.attr', 'href', Cypress.env('githubURL'))
        .and('have.attr', 'target', '_blank')
      cy.get('[data-test="mobile-team-page-link"]')
        .should('exist')
        .and('contain.text', messages.it.navbar.team)
        .and('have.attr', 'href', '/team')
      cy.get('[data-test="mobile-event-page-link"]')
        .should('exist')
        .and('contain.text', messages.it.navbar.events)
        .and('have.attr', 'href', '/events')
      cy.get('[data-test="mobile-conduct-page-link"]')
        .should('exist')
        .and('contain.text', messages.it.navbar.codeOfConduct)
        .and('have.attr', 'href', '/code-of-conduct')
      cy.get('[data-test="mobile-go-nord-page-link"]')
        .should('exist')
        .and('contain.text', 'ImageGoNord')
        .and('have.attr', 'href', Cypress.env('imageGoNordURL'))
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
        .and('contain.text', messages.it.navbar.team)
        .and('have.attr', 'href', '/team')
      cy.get('[data-test="nav-event-page-link"]')
        .should('exist')
        .and('contain.text', messages.it.navbar.events)
        .and('have.attr', 'href', '/events')
      cy.get('[data-test="nav-conduct-page-link"]')
        .should('exist')
        .and('contain.text', messages.it.navbar.codeOfConduct)
        .and('have.attr', 'href', '/code-of-conduct')
      cy.get('[data-test="nav-go-nord-page-link"]')
        .should('exist')
        .and('contain.text', 'ImageGoNord')
        .and('have.attr', 'href', Cypress.env('imageGoNordURL'))
        .and('have.attr', 'target', '_blank')
      cy.get('[data-test="nav-github-page-link"]')
        .should('exist')
        .and('have.attr', 'href', Cypress.env('githubURL'))
        .and('have.attr', 'target', '_blank')
      cy.get('[data-test="nav-github-icon"]').should('have.class', 'fab fa-github').and('be.visible').and('exist')
      cy.get('html').then(($html) => {
        const oldClass = $html[0].getAttribute('class')
        cy.get('[data-test="nav-theme-cta"]').click()
        cy.get('html').should('not.have.class', oldClass)
      })
    })
  })
  describe('Team member page', () => {
    it('Changes to mobile viewport, assures all content is displayed correctly', () => {
      cy.viewport('iphone-xr')
      const teamMessages = messages.it.team
      type TeamMemberKey = keyof typeof teamMessages
      const memberKeys = Object.keys(teamMessages)
      memberKeys.forEach((_key) => {
        const key = _key as TeamMemberKey
        cy.visit(`${Cypress.env('localhost')}/team/${key}`, {
          onBeforeLoad(win) {
            Object.defineProperty(win.navigator, 'language', {
              value: 'it_IT',
            })
          },
        })
        cy.get('[data-test="member-page-photo"]').should('exist').and('be.visible')
        cy.get('[data-test="member-page-name"]').should('exist').and('be.visible').and('contain.text', `${teamMessages[key].name}`)
        if (teamMessages[key].github_url.length > 1)
          cy.get('[data-test="member-page-github"]').should('have.attr', 'href', teamMessages[key].github_url).and('have.attr', 'target', '_blank')
        if (teamMessages[key].linkedin_url.length > 1)
          cy.get('[data-test="member-page-linkedin"]').should('have.attr', 'href', teamMessages[key].linkedin_url).and('have.attr', 'target', '_blank')
        if (teamMessages[key].twitter_url.length > 1)
          cy.get('[data-test="member-page-twitter"]').should('have.attr', 'href', teamMessages[key].twitter_url).and('have.attr', 'target', '_blank')
        if (teamMessages[key].website.length > 1)
          cy.get('[data-test="member-page-website"]').should('have.attr', 'href', teamMessages[key].website).and('have.attr', 'target', '_blank')
        cy.get('[data-test="member-page-description"]').should('contain.text', teamMessages[key].description)
      })
    })
    it('Changes to desktop viewport, assures all content is displayed correctly', () => {
      cy.viewport('macbook-16')
      const teamMessages = messages.it.team
      type TeamMemberKey = keyof typeof teamMessages
      const memberKeys = Object.keys(teamMessages)
      memberKeys.forEach((_key) => {
        const key = _key as TeamMemberKey
        cy.visit(`${Cypress.env('localhost')}/team/${key}`)
        cy.get('[data-test="member-page-photo"]').should('exist').and('be.visible')
        cy.get('[data-test="member-page-name"]').should('exist').and('be.visible').and('contain.text', `${teamMessages[key].name}`)
        if (teamMessages[key].github_url.length > 1)
          cy.get('[data-test="member-page-github"]').should('have.attr', 'href', teamMessages[key].github_url).and('have.attr', 'target', '_blank')
        if (teamMessages[key].linkedin_url.length > 1)
          cy.get('[data-test="member-page-linkedin"]').should('have.attr', 'href', teamMessages[key].linkedin_url).and('have.attr', 'target', '_blank')
        if (teamMessages[key].twitter_url.length > 1)
          cy.get('[data-test="member-page-twitter"]').should('have.attr', 'href', teamMessages[key].twitter_url).and('have.attr', 'target', '_blank')
        if (teamMessages[key].website.length > 1)
          cy.get('[data-test="member-page-website"]').should('have.attr', 'href', teamMessages[key].website).and('have.attr', 'target', '_blank')
        cy.get('[data-test="member-page-description"]').should('contain.text', teamMessages[key].description)
      })
    })
  })
  describe('Team page', () => {
    it('Changes the viewport to mobile, assures you can go to page from menu and assures are content is displayed correctly', () => {
      cy.viewport('iphone-xr')
      cy.get('[data-test="nav-burger-menu-cta"]').should('exist').and('be.visible').click()
      cy.get('[data-test="mobile-team-page-link"]').should('exist').and('be.visible').click()
      cy.get('[data-test="team-page-headline"]').should('exist').and('be.visible').and('contain.text', 'Schrödinger Hat\'s fam')
      cy.url().should('include', `${Cypress.env('localhost')}/team`)
      cy.get('[data-test="team-card"]').then(($teamCards) => {
        const teamMessages = messages.it.team
          type TeamMemberKey = keyof typeof teamMessages
          const teamMembersQuantity = Object.keys(teamMessages).length
          const teamMembersKey = Object.keys(teamMessages)
          cy.wrap($teamCards).should('have.length', teamMembersQuantity)
          teamMembersKey.forEach((_key) => {
            const key = _key as TeamMemberKey
            cy.get(`[data-test-member-name="team-member-${key}"]`).should('exist').and('be.visible')
            cy.get(`[data-test="team-member-${key}-index-photo"]`).should('exist').and('be.visible')
            cy.get(`[data-test="team-member-${key}-name"]`).should('exist').and('be.visible').and('contain.text', `${teamMessages[key].name}`)
            if (teamMessages[key].github_url.length > 1)
              cy.get(`[data-test="team-member-${key}-github"]`).should('have.attr', 'href', teamMessages[key].github_url).and('have.attr', 'target', '_blank')
            if (teamMessages[key].linkedin_url.length > 1)
              cy.get(`[data-test="team-member-${key}-linkedin"]`).should('have.attr', 'href', teamMessages[key].linkedin_url).and('have.attr', 'target', '_blank')
            if (teamMessages[key].twitter_url.length > 1)
              cy.get(`[data-test="team-member-${key}-twitter"]`).should('have.attr', 'href', teamMessages[key].twitter_url).and('have.attr', 'target', '_blank')
            if (teamMessages[key].website.length > 1)
              cy.get(`[data-test="team-member-${key}-website"]`).should('have.attr', 'href', teamMessages[key].website).and('have.attr', 'target', '_blank')
            cy.get(`[data-test="team-member-${key}-page-link"]`).should('be.visible').and('have.attr', 'href', `/team/${key}`).and('contain.text', messages.it.redirect.profile)
          })
      })
    })
    it('Changes the viewport to desktop, assures you can go to page from menu and assures are content is displayed correctly', () => {
      cy.viewport('macbook-16')
      cy.get('[data-test="nav-team-page-link"]').should('exist').and('be.visible').click()
      cy.get('[data-test="team-page-headline"]').should('exist').and('be.visible').and('contain.text', 'Schrödinger Hat\'s fam')
      cy.url().should('include', `${Cypress.env('localhost')}/team`)
      cy.get('[data-test="team-card"]').then(($teamCards) => {
        const teamMessages = messages.it.team
          type TeamMemberKey = keyof typeof teamMessages
          const teamMembersQuantity = Object.keys(teamMessages).length
          const teamMembersKey = Object.keys(teamMessages)
          cy.wrap($teamCards).should('have.length', teamMembersQuantity)
          teamMembersKey.forEach((_key) => {
            const key = _key as TeamMemberKey
            cy.get(`[data-test-member-name="team-member-${key}"]`).should('exist').and('be.visible')
            cy.get(`[data-test="team-member-${key}-index-photo"]`).should('exist').and('be.visible')
            cy.get(`[data-test="team-member-${key}-name"]`).should('exist').and('be.visible').and('contain.text', `${teamMessages[key].name}`)
            if (teamMessages[key].github_url.length > 1)
              cy.get(`[data-test="team-member-${key}-github"]`).should('have.attr', 'href', teamMessages[key].github_url).and('have.attr', 'target', '_blank')
            if (teamMessages[key].linkedin_url.length > 1)
              cy.get(`[data-test="team-member-${key}-linkedin"]`).should('have.attr', 'href', teamMessages[key].linkedin_url).and('have.attr', 'target', '_blank')
            if (teamMessages[key].twitter_url.length > 1)
              cy.get(`[data-test="team-member-${key}-twitter"]`).should('have.attr', 'href', teamMessages[key].twitter_url).and('have.attr', 'target', '_blank')
            if (teamMessages[key].website.length > 1)
              cy.get(`[data-test="team-member-${key}-website"]`).should('have.attr', 'href', teamMessages[key].website).and('have.attr', 'target', '_blank')
            cy.get(`[data-test="team-member-${key}-page-link"]`).should('be.visible').and('have.attr', 'href', `/team/${key}`).and('contain.text', messages.it.redirect.profile)
          })
      })
    })
  })
})
