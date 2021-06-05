describe('the navigation header is usable', () => {
    beforeEach(() => {
        cy.visit(Cypress.env('url'), {
            auth: {
                username: Cypress.env('username'),
                password: Cypress.env('password'),
            },
        })
    })

    it('should navigate to the About page', () => {
        cy.get('[data-testid=navigation]').within(() => {
            cy.contains('About Us').as('about-us')
            cy.get('@about-us').should('have.prop', 'href').should('contain', '/about')
            cy.get('@about-us').click()
        })

        cy.location('pathname').should('eq', '/about')
        cy.get('[data-testid=about-hero-title]').should('contain', 'Our mission')
    }) 

    it('should navigate to the Help page', () => {
        cy.get('[data-testid=navigation]').within(() => {
            cy.contains('Help').as('help')
            cy.get('@help').should('have.prop', 'href').should('contain', '/faqs')
            cy.get('@help').click()
        })

        cy.location('pathname').should('eq', '/faqs')
        cy.contains('What would you like to know?').should('be.visible')
    })

    it('should navigate to the News page', () => {
        cy.get('[data-testid=navigation]').within(() => {
            cy.contains('News').as('news')
            cy.get('@news').should('have.prop', 'href').should('contain', '/news')
            cy.get('@news').click()
        })

        cy.location('pathname').should('eq', '/news')
        cy.contains('Featured Content').should('be.visible')
    })

    it('should navigate to the sign up page', () => {
        cy.get('[data-testid=navigation]').within(() => {
            cy.contains('Sign up').as('sign-up')
            cy.get('@sign-up').should('have.prop', 'href').should('contain', '/user/signup/')
            cy.get('@sign-up').click()
        })

        cy.location('pathname').should('eq', '/user/signup/')
        cy.contains('Sign up').should('be.visible')
    })
})