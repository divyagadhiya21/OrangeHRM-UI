import myinfoSelectors from '../../fixtures/selectors/myinfo.selectors.json';

/**
 * Navigate to My Info module
 * @description Clicks on the My Info link in the main menu
 */
export function navigateToMyInfo() {
  cy.get(myinfoSelectors.myinfo.myinfoLink)
    .should('be.visible')
    .click();
}

/**
 * Click on Personal Details link
 * @description Navigates to personal details section in My Info
 */
export function openPersonalDetails() {
  cy.get(myinfoSelectors.myinfo.personalDetailsLink)
    .should('be.visible')
    .contains(myinfoSelectors.myinfo.personalDetailsText);
}

/**
 * Verify Personal Details link is visible
 * @description Checks that Personal Details link exists on the page
 */
export function verifyPersonalDetailsLink() {
  cy.get(myinfoSelectors.myinfo.personalDetailsLink)
    .should('be.visible');
}
