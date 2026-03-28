import loginSelectors from '../../fixtures/selectors/login.selectors.json';
import forgotPasswordSelectors from '../../fixtures/selectors/forgotPassword.selectors.json';
import credentials from '../../fixtures/data/credentials.json';

/**
 * Login to OrangeHRM with provided credentials
 * @param {string} userName - Username to login with
 * @param {string} password - Password to login with
 */
export function loginWithCredentials(userName, password) {
  cy.get(loginSelectors.login.userName).type(userName);
  cy.get(loginSelectors.login.password).type(password);
  cy.get(loginSelectors.login.loginButton).click();
}

/**
 * Login with default valid credentials
 */
export function loginWithDefaultCredentials() {
  loginWithCredentials(
    credentials.validCredentials.userName,
    credentials.validCredentials.password
  );
}

/**
 * Verify page title
 * @param {string} expectedTitle - Expected page title
 */
export function verifyPageTitle(expectedTitle) {
  cy.title().should('eq', expectedTitle);
}

/**
 * Verify login success
 * @param {string} expectedUrl - Expected URL after login
 * @param {string} expectedAccountName - Expected account name
 */
export function verifyLoginSuccess(expectedUrl, expectedAccountName) {
  cy.url().should('eq', expectedUrl);
  cy.get(loginSelectors.login.accountName).should('have.text', expectedAccountName);
}

/**
 * Verify login error
 * @param {string} expectedError - Expected error message
 */
export function verifyLoginError(expectedError) {
  cy.get(loginSelectors.login.errorIcon).should('exist');
  cy.get(loginSelectors.login.errorMessageElement).should('have.text', expectedError);
}

/**
 * Verify current URL
 * @param {string} expectedUrl - Expected URL
 */
export function verifyCurrentUrl(expectedUrl) {
  cy.url().should('eq', expectedUrl);
}

/**
 * Navigate to forgot password
 */
export function navigateToForgotPassword() {
  cy.get(loginSelectors.login.forgotPassword).click();
}

/**
 * Reset password with username
 * @param {string} userName - Username for password reset
 */
export function resetPasswordWithUsername(userName) {
  cy.get(forgotPasswordSelectors.forgotPassword.userName).type(userName);
  cy.get(forgotPasswordSelectors.forgotPassword.resetPassword).click();
}

/**
 * Cancel forgot password
 */
export function cancelForgotPassword() {
  cy.get(forgotPasswordSelectors.forgotPassword.cancel).click();
}

/**
 * Verify forgot password success
 * @param {string} expectedMessage - Expected success message
 */
export function verifyForgotPasswordSuccess(expectedMessage) {
  cy.get(forgotPasswordSelectors.forgotPassword.success).should('have.text', expectedMessage);
}

/**
 * Verify forgot password error
 * @param {string} expectedError - Expected error message
 */
export function verifyForgotPasswordError(expectedError) {
  cy.get(forgotPasswordSelectors.forgotPassword.error).should('have.text', expectedError);
}
