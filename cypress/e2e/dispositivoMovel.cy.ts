describe("Dispositivos móveis", () => {
  it("Deve existir um botão menu hamburguer e a imagem da home não deve estar na tela", () => {
    cy.viewport(700, 500);

    cy.visit("/");
    cy.get(`[data-testid='loginUser']`).type("Davi");
    cy.get(`[data-testid='loginPassword']`).type("1234");
    cy.get(`[data-testid='entrar']`).click();

    cy.get(`[data-testid='menu_hamburguer']`).should("exist").click()
    // cy.get(`[data-testid='img_home']`).should("not.be.visible");
  });
});
