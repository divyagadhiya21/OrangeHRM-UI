import buzzSelectors from '../../fixtures/selectors/buzz.selectors.json';

/**
 * Navigate to the Buzz module
 * @description Clicks on the Buzz link in the main menu
 */
export function navigateToBuzz() {
  cy.get(buzzSelectors.buzz.buzzLink)
    .should('be.visible')
    .click();
}

/**
 * Create a new post in Buzz module
 * @param {string} postContent - The content of the post to create
 * @description Types content into newsfeed and submits the post
 */
export function createBuzzPost(postContent) {
  cy.get(buzzSelectors.buzz.newsfeedTextarea)
    .should('be.visible')
    .type(postContent);

  cy.get(buzzSelectors.buzz.submitButton)
    .click({ force: true });
}

/**
 * Verify Buzz post was created successfully
 * @param {string} expectedMessage - The expected success message
 * @description Checks for success toast notification
 */
export function verifyBuzzPostSuccess(expectedMessage = 'Successfully Saved') {
  cy.get(buzzSelectors.buzz.successMessage)
    .should('be.visible')
    .contains(expectedMessage);
}

/**
 * Post a message in Buzz and verify success
 * @param {string} postContent - The content to post
 * @description Complete workflow: post message and verify success
 */
export function postAndVerifyBuzz(postContent) {
  createBuzzPost(postContent);
  verifyBuzzPostSuccess();
}
