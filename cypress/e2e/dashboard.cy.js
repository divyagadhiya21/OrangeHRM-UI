import dashboardTestData from '../fixtures/data/dashboardTestData.json';
import {
  verifyUserDropdown,
  checkDashboardLinks,
  checkDashboardImages,
  takeDashboardScreenshot
} from '../support/helpers/dashboard.helper';
import { loginWithCredentials } from '../support/helpers/login.helper';
import loginTestData from '../fixtures/data/loginTestData.json';

describe('Dashboard Tests - Data Driven', () => {
  beforeEach('Login before each test', () => {
    // Use default admin credentials to login
    const credentials = loginTestData.loginTests[0];
    loginWithCredentials(credentials.userName, credentials.password);
  });

  dashboardTestData.dashboardTests.forEach((testCase) => {
    it(`Dashboard: ${testCase.testName}`, () => {
      switch (testCase.testType) {
        case 'checkLinks':
          checkDashboardLinks();
          takeDashboardScreenshot();
          break;
        case 'checkImages':
          checkDashboardImages();
          takeDashboardScreenshot('dashboard/imageNotBroken/');
          break;
        case 'verifyUserInfo':
          verifyUserDropdown();
          takeDashboardScreenshot();
          break;
        default:
          verifyUserDropdown();
      }
    });
  });
});
