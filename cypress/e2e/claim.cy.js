import claimTestData from '../fixtures/data/claimTestData.json';
import { navigateToClaim, verifyClaimModuleVisible } from '../support/helpers/claim.helper';
import { loginWithCredentials } from '../support/helpers/login.helper';
import loginTestData from '../fixtures/data/loginTestData.json';

describe('Claim Module Tests - Data Driven', () => {
  beforeEach('Login before each test', () => {
    // Use default admin credentials to login
    const credentials = loginTestData.loginTests[0];
    loginWithCredentials(credentials.userName, credentials.password);
  });

  claimTestData.claimTests.forEach((testCase) => {
    it(`Claim: ${testCase.testName}`, () => {
      if (testCase.testType === 'verifyClaimModule') {
        verifyClaimModuleVisible();
        navigateToClaim();
      }
    });
  });
});
