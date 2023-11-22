declare namespace Cypress {
    interface Chainable<Subject> {
      getByData(seletor: string): Chainable<any>;
      login(email: string, password:string): Chainable<any>;
      
    }
  }