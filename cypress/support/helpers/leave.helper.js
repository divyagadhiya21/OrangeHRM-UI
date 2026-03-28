import leaveSelectors from '../../fixtures/selectors/leave.selectors.json';

/**
 * Navigate to the Leave module
 * @description Clicks on the Leave module link
 */
export function navigateToLeave() {
  cy.get(leaveSelectors.leave.leaveLink)
    .should('be.visible')
    .click();
}

/**
 * Verify Leave module is accessible
 * @description Confirms that the leave module link is visible
 */
export function verifyLeaveModuleVisible() {
  cy.get(leaveSelectors.leave.leaveLink)
    .should('be.visible');
}
