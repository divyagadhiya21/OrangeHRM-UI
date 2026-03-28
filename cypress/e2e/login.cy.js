import loginTestData from '../fixtures/data/loginTestData.json';
import loginSelectors from '../fixtures/selectors/login.selectors.json';
import {
  loginWithCredentials,
  loginWithDefaultCredentials,
  verifyPageTitle,
  verifyLoginSuccess,
  verifyLoginError,
  verifyCurrentUrl,
  navigateToForgotPassword,
  resetPasswordWithUsername,
  cancelForgotPassword,
  verifyForgotPasswordSuccess,
  verifyForgotPasswordError
} from '../support/helpers/login.helper.js';

describe('Login Page Tests - Data-Driven', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Website title should be OrangeHRM', () => {
    verifyPageTitle(loginSelectors.login.pageTitle);
  });

  describe('Login Tests - Parameterized', () => {
    loginTestData.loginTests.forEach((testCase) => {
      it(`Login Test: ${testCase.testName}`, () => {
        loginWithCredentials(testCase.userName, testCase.password);

        if (testCase.shouldSucceed) {
          verifyLoginSuccess(testCase.expectedUrl, testCase.expectedAccountName);
        } else {
          verifyLoginError(testCase.expectedError);
          verifyCurrentUrl(testCase.expectedUrl);
        }
      });
    });
  });

  describe('Forgot Password Tests - Data-Driven', () => {
    beforeEach(() => {
      navigateToForgotPassword();
    });

    it('Should navigate to forgot password page', () => {
      verifyCurrentUrl(loginSelectors.forgotPassword.url);
    });

    it('Should cancel forgot password and return to login', () => {
      cancelForgotPassword();
      verifyCurrentUrl(loginSelectors.login.pageUrl);
    });

    loginTestData.forgotPasswordTests.forEach((testCase) => {
      it(`Forgot Password: ${testCase.testName}`, () => {
        if (testCase.userName) {
          resetPasswordWithUsername(testCase.userName);
        } else {
          cy.get('[type="submit"]').click(); // Click reset without entering username
        }

        if (testCase.shouldSucceed) {
          verifyForgotPasswordSuccess(testCase.expectedSuccess);
        } else {
          verifyForgotPasswordError(testCase.expectedError);
        }
      });
    });
  });
});
