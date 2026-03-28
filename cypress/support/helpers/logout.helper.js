import logoutSelectors from '../../fixtures/selectors/logout.selectors.json';

/**
 * Click on user dropdown menu
 */
export function clickUserDropdown() {
  cy.get(logoutSelectors.logout.userDropdown).click();
}

/**
 * Click logout option from dropdown menu
 */
export function clickLogout() {
  cy.xpath(logoutSelectors.logout.logoutOption).click();
}

/**
 * Perform complete logout
 */
export function logout() {
  clickUserDropdown();
  clickLogout();
}

/**
 * Verify logout success
 * @param {string} expectedUrl - Expected URL after logout
 */
export function verifyLogoutSuccess(expectedUrl) {
  cy.url().should('eq', expectedUrl);
}

/**
 * Verify user is on login page
 */
export function verifyLoginPageAfterLogout() {
  cy.url().should('include', '/auth/login');
  cy.title().should('eq', 'OrangeHRM');
}

/**
 * Verify logout message appears
 * @param {string} message - Expected logout message
 */
export function verifyLogoutMessage(message) {
  cy.contains(message).should('be.visible');
}
