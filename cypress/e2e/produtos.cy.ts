
let registeredProducts = localStorage.getItem("products");
let productsQtd

if (registeredProducts !== null) {
  const registeredProductsArray = JSON.parse(registeredProducts);

  // if (registeredProducts.length !== initialState.length)
   productsQtd = registeredProductsArray.length()
}



describe('Produtos', () => {
    it('Deve ser possivel adicionar um produto', () => {
        cy.visit("/");
        cy.get(`[data-testid='loginUser']`).type("Davi");
        cy.get(`[data-testid='loginPassword']`).type("1234");
        cy.get(`[data-testid='entrar']`).click();

        cy.get('[href="/Products"]').click();
        //Abrir modal
        cy.get(`[data-testid="cadastrar-produto"]`).click();
        //Fechar modal para verificar se está fechando corretamente
        cy.get(`[data-testid="closaModal"]`).click();
        //Abrir modal novamente
        cy.get(`[data-testid="cadastrar-produto"]`).click();

        //Preencher dados do produto e cadastrar
        cy.get(`[data-testid='nome-do-produto']`).type("Produto-test");
        cy.get(`[data-testid='descrição-do-produto']`).type("...");
        cy.get(`[data-testid='url-da-imagem']`).type("/");
        cy.get(`[data-testid='valor-do-produto']`).type('1000');
        cy.get(`[data-testid='quantidade-de-produtos']`).type('5');
        cy.get(`[data-testid='cadastrar']`).click();


        cy.get(`[data-testid='productsName']`).last().contains('Produto: Produto-test');

    })

    it('Deve ser possível remover um produto', () => {
        cy.visit("/");
        cy.get(`[data-testid='loginUser']`).type("Davi");
        cy.get(`[data-testid='loginPassword']`).type("1234");
        cy.get(`[data-testid='entrar']`).click();

        cy.get('[href="/Products"]').click();

        cy.getByData('products').should('have.length',5)
        cy.getByData("removeProduct").last().click()

        cy.getByData('products').should('have.length',4)

    
    })
})