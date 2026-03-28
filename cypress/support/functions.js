import { login, credentials } from "../fixtures/testData.js";

async function loginOrangHRM(password) {
  password == undefined
    ? (password = credentials.userName)
    : (password = password);
  cy.get(login.userName).type(credentials.userName);
  cy.get(login.password).type(password);
  cy.get(login.loginButton).click();
}

async function linkShouldBe(url){
    cy.url().should('eq', url);
}

export { loginOrangHRM, linkShouldBe };
