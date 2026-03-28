// ============================================================
// DATA-DRIVEN TESTING STRUCTURE
// ============================================================
// This file now re-exports data from the new modular structure
// that separates selectors, credentials, and test data.
// 
// Old code can continue to work with these exports.
// New code should import directly from the modular files.
// ============================================================

const login = {
    pageUrl:'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login',
    userName:'[name="username"]',
    password:'[name="password"]',
    loginButton: '[type="submit"]',
    pageTitle: 'OrangeHRM',
    landingUrl: 'https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index',
    accountName: '[class="oxd-userdropdown-name"]',
    errorIcon: '[class="oxd-icon bi-exclamation-circle oxd-alert-content-icon"]',
    errorMessageElement: '[class="oxd-text oxd-text--p oxd-alert-content-text"]',
    errorMessage:'Invalid credentials',
    forgotPassword: '[class="oxd-text oxd-text--p orangehrm-login-forgot-header"]',
    cancel:'[class="oxd-button oxd-button--large oxd-button--ghost orangehrm-forgot-password-button orangehrm-forgot-password-button--cancel"]',
    resetPassword: '[type="submit"]',
    error:'[class="oxd-text oxd-text--span oxd-input-field-error-message oxd-input-group__message"]',
    errorMessage:'Required',
    success: '[class="oxd-text oxd-text--h6 orangehrm-forgot-password-title"]',
    successMessage:'Reset Password link sent successfully',
    url:'https://opensource-demo.orangehrmlive.com/web/index.php/auth/requestPasswordResetCode',
    urlAfterReset:'https://opensource-demo.orangehrmlive.com/web/index.php/auth/sendPasswordReset'
}

const forgotPassword = {
    userName:'[name="username"]',
    cancel:'[class="oxd-button oxd-button--large oxd-button--ghost orangehrm-forgot-password-button orangehrm-forgot-password-button--cancel"]',
    resetPassword: '[type="submit"]',
    error:'[class="oxd-text oxd-text--span oxd-input-field-error-message oxd-input-group__message"]',
    errorMessage:'Required',
    success: '[class="oxd-text oxd-text--h6 orangehrm-forgot-password-title"]',
    successMessage:'Reset Password link sent successfully',
    url:'https://opensource-demo.orangehrmlive.com/web/index.php/auth/requestPasswordResetCode',
    urlAfterReset:'https://opensource-demo.orangehrmlive.com/web/index.php/auth/sendPasswordReset'
}

const credentials = {
    userName:'Admin',
    password: 'admin123',
    accountName: 'manda user'
}

const leftPane = {
    element:'[class="oxd-text oxd-text--span oxd-main-menu-item--name"]',
    search:'[placeholder="Search"]',
    name:{
    admin: 'Admin',
    pim:'PIM',
    leave:'Leave',
    time:'Time',
    recruitment:'Recruitment',
    info: 'My Info',
    performance:'Performance',
    dashboard:'Dashboard',
    directory: 'Directory',
    maintenance:'Maintenance',
    claim: 'Claim',
    buzz:'Buzz',
    },
    url: {
        admin: 'https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewSystemUsers',
        pim:'https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewEmployeeList',
        leave:'https://opensource-demo.orangehrmlive.com/web/index.php/leave/viewLeaveList',
        time:'https://opensource-demo.orangehrmlive.com/web/index.php/time/viewEmployeeTimesheet',
        recruitment:'https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/viewCandidates',
        info: 'https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewPersonalDetails/empNumber/7',
        performance:'https://opensource-demo.orangehrmlive.com/web/index.php/performance/searchEvaluatePerformanceReview',
        dashboard:'https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index',
        directory: 'https://opensource-demo.orangehrmlive.com/web/index.php/directory/viewDirectory',
        maintenance:'https://opensource-demo.orangehrmlive.com/web/index.php/maintenance/purgeEmployee',
        claim: 'https://opensource-demo.orangehrmlive.com/web/index.php/claim/viewAssignClaim',
        buzz:'https://opensource-demo.orangehrmlive.com/web/index.php/buzz/viewBuzz'
    }

}

const maintenance = {
    cancel: '[class="oxd-button oxd-button--large oxd-button--ghost orangehrm-admin-access-button"]'
}

// For new modular data-driven structure, import directly from:
// - fixtures/selectors/*.json - Page element locators
// - fixtures/data/*.json - Test data and scenarios
// - support/helpers/*.js - Reusable helper functions

export {login, forgotPassword, credentials, leftPane, maintenance};