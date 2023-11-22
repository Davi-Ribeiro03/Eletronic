


describe("Teste de jornadas de usuário", () => {
  it("O usuário deve conseguir logar no site, colocar alguns produto no carrinho e tirá-los, alterar a quantidade de produtos no carrinho e no toast, comprá-los e depois deslogar", () => {
    cy.visit("/");
    //Logar
    cy.get(`[data-testid='loginUser']`).type("Davi");
    cy.get(`[data-testid='loginPassword']`).type("1234");
    cy.get(`[data-testid='entrar']`).click();

    //Adicionar no carrinho
    cy.get(`[data-testid='adicionaNoCarrinho']`).eq(0).click();
    cy.get(`[data-testid='botaoConfirmar']`).click();

    cy.get(`[data-testid='adicionaNoCarrinho']`).eq(1).click();
    cy.get(`[data-testid='botaoConfirmar']`).click();

    cy.get(`[data-testid='adicionaNoCarrinho']`).eq(2).click();
    cy.getByData("aumentaQtdNoToast").click();
    cy.getByData("diminuiQtdNoToast").click();
    cy.get(`[data-testid='botaoConfirmar']`).click();

    //Tirar do carrinho
    cy.get(`[data-testid='tiraDoCarrinho']`).eq(1).click();


    //Entrar no carrinho
    cy.get('[href="/Carrinho"]').click();

    //Alterar quantidade no carrinho
    cy.getByData("aumenta_qtd").eq(0).click()
    cy.getByData("diminui_qtd").eq(0).click()
    cy.getByData("aumenta_qtd").eq(1).click()

    //Comprar
    cy.get(`[data-testid='botaoComprar']`).click();

    cy.getByData('toast').should('exist')

    cy.get(`[data-testid='textToast']`).contains(
      "Compra realizada com sucesso"
    );

    cy.getByData('toast').wait(3000).should('not.exist')

    cy.get(`[data-testid="logout"]`).click();
  });
});
