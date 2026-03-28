import navigationSelectors from '../../fixtures/selectors/navigation.selectors.json';

/**
 * Click on a navigation item by name
 * @param {string} itemName - Name of the navigation item
 */
export function clickNavigationItem(itemName) {
  cy.get(navigationSelectors.leftPane.element).contains(itemName).click();
}

/**
 * Verify current URL
 * @param {string} expectedUrl - Expected URL
 */
export function verifyNavigationUrl(expectedUrl) {
  cy.url().should('eq', expectedUrl);
}

/**
 * Cancel maintenance modal
 */
export function cancelMaintenance() {
  cy.get(navigationSelectors.maintenance.cancel).click();
}

/**
 * Navigate to menu item and verify URL
 * @param {string} itemName - Name of the navigation item
 * @param {string} expectedUrl - Expected URL after navigation
 * @param {boolean} requiresCancel - Whether the page requires cancel button
 */
export function navigateAndVerify(itemName, expectedUrl, requiresCancel = false) {
  clickNavigationItem(itemName);
  verifyNavigationUrl(expectedUrl);
  
  if (requiresCancel) {
    cancelMaintenance();
  }
}

/**
 * Search in left pane
 * @param {string} searchTerm - Term to search for
 */
export function searchInLeftPane(searchTerm) {
  cy.get(navigationSelectors.leftPane.search).click();
  cy.get(navigationSelectors.leftPane.search).type(searchTerm);
}

/**
 * Verify search result exists
 * @param {string} expectedResult - Expected search result text
 */
export function verifySearchResult(expectedResult) {
  cy.get(navigationSelectors.leftPane.element).contains(expectedResult).should('exist');
}
