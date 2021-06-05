var chance = require('chance').Chance()

describe('the sign up is usable', () => {
    beforeEach(() => {
        cy.visit(`${Cypress.env('url')}/user/signup`, {
            auth: {
                username: Cypress.env('username'),
                password: Cypress.env('password'),
            },
        })
    })

    
    it('cannot sign up with an invalid email', () => {
        cy.fixture('invalidEmails').then((invalidEmails) => {
            invalidEmails.forEach(email => {
                cy.get('form').within(() => {
                    cy.get('input').eq(1).type(email)
                    cy.get('input').eq(2).type('password')
                    cy.get('input').eq(3).type('password')
                    cy.get('button').click()
                })
                cy.get('.error').should('have.text', 'The email you have entered is not valid')
            })
        })
    })
    

    it('cannot sign up without matching passwords', () => {
        cy.get('form').within(() => {
            cy.get('input').eq(1).type('notanemail@domain.com')
            cy.get('input').eq(2).type('password')
            cy.get('input').eq(3).type('nomatch')
            cy.get('button').click()
        })
        cy.get('.error').should('have.text', 'Passwords do not match')


    })

    it('can sign up with valid credentials', () => {
        cy.get('form').within(() => {
            cy.get('input').eq(1).type(chance.email())
            cy.get('input').eq(2).type(Cypress.env('password'))
            cy.get('input').eq(3).type(Cypress.env('password'))
            cy.get('button').click()
        })
        cy.location('pathname').should('eq', '/user/personal-details')
        cy.get('h1').should('have.text', 'Welcome to PrimaryBid')
    })
})