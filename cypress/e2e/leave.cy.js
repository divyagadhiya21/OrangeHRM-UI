import leaveTestData from '../fixtures/data/leaveTestData.json';
import { navigateToLeave, verifyLeaveModuleVisible } from '../support/helpers/leave.helper';
import { loginWithCredentials } from '../support/helpers/login.helper';
import loginTestData from '../fixtures/data/loginTestData.json';

describe('Leave Module Tests - Data Driven', () => {
  beforeEach('Login before each test', () => {
    // Use default admin credentials to login
    const credentials = loginTestData.loginTests[0];
    loginWithCredentials(credentials.userName, credentials.password);
  });

  leaveTestData.leaveTests.forEach((testCase) => {
    it(`Leave: ${testCase.testName}`, () => {
      if (testCase.testType === 'verifyLeaveModule') {
        verifyLeaveModuleVisible();
        navigateToLeave();
      }
    });
  });
});
