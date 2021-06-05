describe('the news page is usable', () => {
    beforeEach(() => {
        cy.visit(`${Cypress.env('url')}/news`, {
            auth: {
                username: Cypress.env('username'),
                password: Cypress.env('password'),
            },
        })

        // the loading of the banner interacted with the invoke call, so just accepting the cookies in these tests
        cy.get('#cookiebanner').within(() => {
            cy.contains('Accept').click()
        })
        cy.get('#cookiebanner').should('not.exist')
    })

    it('should have news in the featured section', () => {
        cy.get('.container').eq(3).within(() => {
            cy.get('[data-testid=news-data]').should('have.length', 4)
        })
    })

    it('should have news in the all section', () => {
        cy.get('.container').eq(5).within(() => {
            cy.get('[data-testid=news-data]').should('have.length', 79)
        })
    })

    it('all content can be filtered', () => {
        
        cy.get('[data-testid=news-filter-popover]').invoke('show')
        cy.get('[data-testid=news-filter-checkbox-Webinar]').click()

        cy.get('.container').eq(5).within(() => {
            cy.get('[data-testid=news-data]').should('have.length', 3)
        })

        
    })
})