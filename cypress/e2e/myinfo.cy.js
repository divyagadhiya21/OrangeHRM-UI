import myinfoTestData from '../fixtures/data/myinfoTestData.json';
import { navigateToMyInfo, verifyPersonalDetailsLink } from '../support/helpers/myinfo.helper';
import { loginWithCredentials } from '../support/helpers/login.helper';
import loginTestData from '../fixtures/data/loginTestData.json';

describe('My Info Module Tests - Data Driven', () => {
  beforeEach('Login before each test', () => {
    // Use default admin credentials to login
    const credentials = loginTestData.loginTests[0];
    loginWithCredentials(credentials.userName, credentials.password);
  });

  myinfoTestData.myinfoTests.forEach((testCase) => {
    it(`My Info: ${testCase.testName}`, () => {
      if (testCase.testType === 'verifyMyInfoModule') {
        navigateToMyInfo();
        verifyPersonalDetailsLink();
      }
    });
  });
});
