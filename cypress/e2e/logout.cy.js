import logoutTestData from '../fixtures/data/logoutTestData.json';
import { loginWithDefaultCredentials } from '../support/helpers/login.helper.js';
import {
  logout,
  verifyLogoutSuccess,
  verifyLoginPageAfterLogout
} from '../support/helpers/logout.helper.js';

describe('Logout Tests - Data-Driven', () => {
  beforeEach(() => {
    // Navigate to login page and login before each test
    cy.visit('/');
    loginWithDefaultCredentials();
  });

  describe('Logout Functionality - Parameterized', () => {
    logoutTestData.logoutTests.forEach((testCase) => {
      it(`Logout: ${testCase.testName}`, () => {
        logout();
        
        if (testCase.shouldSucceed) {
          verifyLogoutSuccess(testCase.expectedUrl);
          verifyLoginPageAfterLogout();
        }
      });
    });
  });

  describe('Logout - Session Management', () => {
    it('Should clear session after logout', () => {
      logout();
      verifyLoginPageAfterLogout();

      // Verify that user cannot access dashboard without login
      cy.visit('/dashboard/index', { failOnStatusCode: false });
      cy.url().should('include', '/auth/login');
    });

    it('Should prevent direct dashboard access after logout', () => {
      logout();
      
      // Try to access dashboard directly
      cy.visit('/dashboard/index', { failOnStatusCode: false });
      
      // Should redirect to login
      cy.url().should('include', '/auth/login');
    });
  });
});
