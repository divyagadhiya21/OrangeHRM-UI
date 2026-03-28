import {login, forgotPassword, leftPane, credentials, maintenance} from '../fixtures/testData.js'
import {loginOrangHRM, linkShouldBe} from '../support/functions.js'

describe('Login page tests', function(){
    beforeEach(function(){
        cy.visit('/')
    })
    it('Website title', function(){
        cy.title().should('eq', login.pageTitle);
    })
    it('Login - correct credentials', function(){
        loginOrangHRM();
        linkShouldBe(login.landingUrl);
        cy.get(login.accountName).should('have.text', credentials.accountName);
        
    })
    it('Login - incorrect credentials', function(){
        loginOrangHRM('Bad password');
        cy.get(login.errorIcon).should('exist');
        cy.get(login.errorMessageElement).should('have.text',login.errorMessage);
        linkShouldBe(login.pageUrl);
    })
    it('Forgot password', function(){
        cy.get(login.forgotPassword).click();
        linkShouldBe(forgotPassword.url);
        cy.get(forgotPassword.cancel).click();
        linkShouldBe(login.pageUrl);
        cy.get(login.forgotPassword).click();
        cy.get(forgotPassword.resetPassword).click();
        cy.get(forgotPassword.error).should('have.text', forgotPassword.errorMessage);
        cy.get(forgotPassword.userName).type(credentials.userName);
        cy.get(forgotPassword.resetPassword).click();
        cy.get(forgotPassword.success).should('have.text', forgotPassword.successMessage);
        linkShouldBe(forgotPassword.urlAfterReset);
    })
})

describe('Landing page tests', function(){
        beforeEach(function(){
        cy.visit('/')
        loginOrangHRM();
    })
    it('URL of all the left pane actions', function(){
        Object.keys(leftPane.name).forEach(key=>{
            var i = `${leftPane.name[key]}`;
            var j = `${leftPane.url[key]}`;
            cy.get(leftPane.element).contains(i).click();
            linkShouldBe(j);
            if (j == leftPane.url.maintenance){
                cy.get(maintenance.cancel).click();
            }
        })

    })
    it('Search functionality in left pane', function(){
        cy.get(leftPane.search).click();
        cy.get(leftPane.search).type(leftPane.name.admin);
        cy.get(leftPane.element).contains(leftPane.name.admin)
    })
})