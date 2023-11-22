
describe('ErrorPage',() => {
    it('Deve renderizar a página de erro quando o usuário tentar acessar uma página que não tem acesso',() => {
        cy.visit("/");
        cy.get(`[data-testid='loginUser']`).type("Davi");
        cy.get(`[data-testid='loginPassword']`).type("1234");
        cy.get(`[data-testid='entrar']`).click();

        cy.get('[href="/Dashboard"]').click();

        cy.location('pathname').should('eq', '/ErrorPage')

        cy.get('button').click()
        cy.location('pathname').should('eq', '/Home')

    })
})