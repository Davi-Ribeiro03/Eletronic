
describe('Login', () => {
  it('Deve ser possível realizar o login na aplicação', () => {
    cy.visit('/');

    cy.getByData("loginUser").type('Lucas');
    cy.getByData("loginPassword").type('5678');
    cy.getByData("entrar").click();
  });

  it('Deve ser possível tornar a senha visivel', () => {
    cy.visit('/');
    cy.getByData("eye").click()
    cy.getByData("loginPassword").type('text')

    cy.getByData("eye").click()
    cy.getByData("loginPassword").type('password')
    })

    it('Deve retornar um erro ao tentar logar sem preencher as informações necessárias', () => {
        cy.visit('/');
        
        cy.getByData("entrar").click();
        cy.getByData("erroDeCampoVazio").should('contain',"Preencha os campos de usuário e senha")
    
    })
    it('Deve retornar um erro ao tentar logar com informações incorretas', () => {
        cy.visit('/');
        
        cy.getByData("loginUser").type('hello');
        cy.getByData("loginPassword").type('1234');
        cy.getByData("entrar").click();

        cy.getByData("erroDeCampoVazio").should('contain',"Usuário ou senha incorretos")
    })

    it('Deve permanecer na página de login ao tentar acessar outras páginas sem estar logado',() => {
        cy.visit('/home');
        cy.location('pathname').should('eq', '/')
       
    })
});