import dashboardSelectors from '../../fixtures/selectors/dashboard.selectors.json';

/**
 * Verify that the user dropdown element is visible on dashboard
 * @description Confirms user is logged in by checking dropdown visibility
 */
export function verifyUserDropdown() {
  cy.get(dashboardSelectors.dashboard.userDropdown)
    .should('be.visible');
}

/**
 * Fetch and verify all links on dashboard page
 * @description Uses custom command to check for broken links
 */
export function checkDashboardLinks() {
  cy.fetchAndLogLinks();
}

/**
 * Check all images on dashboard page
 * @description Uses custom command to verify images are not broken
 */
export function checkDashboardImages() {
  cy.checkImages();
}

/**
 * Take a screenshot of dashboard
 * @param {string} path - Optional path where screenshot should be saved
 */
export function takeDashboardScreenshot(path = '') {
  cy.screenshot(path);
}
