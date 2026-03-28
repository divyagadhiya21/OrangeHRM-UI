import buzzTestData from '../fixtures/data/buzzTestData.json';
import { navigateToBuzz, postAndVerifyBuzz } from '../support/helpers/buzz.helper';
import { loginWithCredentials } from '../support/helpers/login.helper';
import loginTestData from '../fixtures/data/loginTestData.json';

describe('Buzz Module Tests - Data Driven', () => {
  beforeEach('Login and navigate to Buzz', () => {
    // Use default admin credentials to login
    const credentials = loginTestData.loginTests[0];
    loginWithCredentials(credentials.userName, credentials.password);
    navigateToBuzz();
  });

  buzzTestData.buzzTests.forEach((testCase) => {
    it(`Buzz: ${testCase.testName}`, () => {
      if (testCase.shouldSucceed) {
        postAndVerifyBuzz(testCase.postContent);
      }
    });
  });
});
