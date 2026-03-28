import navigationTestData from '../fixtures/data/navigationTestData.json';
import loginSelectors from '../fixtures/selectors/login.selectors.json';
import {
  loginWithDefaultCredentials
} from '../support/helpers/login.helper.js';
import {
  clickNavigationItem,
  verifyNavigationUrl,
  cancelMaintenance,
  navigateAndVerify,
  searchInLeftPane,
  verifySearchResult
} from '../support/helpers/navigation.helper.js';

describe('Navigation Tests - Data-Driven', () => {
  beforeEach(() => {
    cy.visit('/');
    loginWithDefaultCredentials();
  });

  describe('Left Pane Navigation - Parameterized', () => {
    navigationTestData.navigationItems.forEach((navItem) => {
      it(`Navigate to ${navItem.name}`, () => {
        navigateAndVerify(navItem.name, navItem.url, navItem.requiresCancel || false);
      });
    });
  });

  describe('Search Functionality in Left Pane', () => {
    navigationTestData.searchTests.forEach((searchTest) => {
      it(`Search for ${searchTest.searchTerm}`, () => {
        searchInLeftPane(searchTest.searchTerm);
        verifySearchResult(searchTest.expectedResult);
      });
    });
  });

  describe('Maintenance Page Tests', () => {
    it('Should open and close maintenance page', () => {
      const maintenanceItem = navigationTestData.navigationItems.find(
        (item) => item.name === 'Maintenance'
      );

      navigateAndVerify(maintenanceItem.name, maintenanceItem.url, true);
      verifyNavigationUrl(loginSelectors.login.landingUrl);
    });
  });
});
