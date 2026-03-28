import claimSelectors from '../../fixtures/selectors/claim.selectors.json';

/**
 * Navigate to the Claim module
 * @description Clicks on the Claim module link
 */
export function navigateToClaim() {
  cy.get(claimSelectors.claim.claimModule)
    .should('be.visible')
    .click();
}

/**
 * Verify Claim module is accessible
 * @description Confirms that the claim module link is visible
 */
export function verifyClaimModuleVisible() {
  cy.get(claimSelectors.claim.claimModule)
    .should('be.visible');
}
