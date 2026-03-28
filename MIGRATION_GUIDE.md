# Migration Guide: Data-Driven Testing Structure

## Overview
Your OrangeHRM Cypress project has been restructured from a monolithic test file to a **data-driven testing framework**. This guide helps you understand the changes and how to migrate your tests.

## What Changed?

### Old Structure (Before)
```
cypress/
├── e2e/
│   └── tests.cy.js              ❌ One large file with all tests
├── fixtures/
│   └── testData.js              ❌ Mixed selectors and data
└── support/
    └── functions.js             ❌ Few utility functions
```

### New Structure (After)
```
cypress/
├── e2e/
│   ├── login.cy.js              ✅ Feature-specific test files
│   ├── navigation.cy.js         ✅ Feature-specific test files
│   └── tests.cy.js              ✅ Legacy file (still works)
├── fixtures/
│   ├── selectors/               ✅ Organized by feature
│   │   ├── login.selectors.json
│   │   ├── navigation.selectors.json
│   │   └── forgotPassword.selectors.json
│   ├── data/                    ✅ Test data separated
│   │   ├── credentials.json
│   │   ├── loginTestData.json
│   │   └── navigationTestData.json
│   └── testData.js              ✅ Backward compatible
└── support/
    ├── helpers/                 ✅ Organized by feature
    │   ├── login.helper.js
    │   └── navigation.helper.js
    └── functions.js
```

## Key Improvements

| Aspect | Before | After |
|--------|--------|-------|
| **Test Maintenance** | Update test code for each scenario | Update JSON data file |
| **Code Reusability** | Scattered functions | Organized helpers with clear APIs |
| **Selector Management** | Mixed in testData.js | Centralized in selectors/ |
| **Test Scalability** | Hard to add new scenarios | Add data entry, tests auto-run |
| **Code Organization** | 100+ lines in one file | Features separated into modules |

## Migration Checklist for Old Tests

### ✅ Step 1: Import from New Structure (Optional)
Your old imports still work:
```javascript
// ✅ This still works (backward compatible)
import { login, credentials } from '../fixtures/testData.js'
```

But new code should import from modular files:
```javascript
// ✅ Preferred approach
import loginSelectors from '../fixtures/selectors/login.selectors.json'
import loginTestData from '../fixtures/data/loginTestData.json'
import { loginWithCredentials } from '../support/helpers/login.helper.js'
```

### ✅ Step 2: Replace Functions with Helpers
**Before:**
```javascript
async function loginOrangHRM(password) {
  password == undefined
    ? (password = credentials.userName)
    : (password = password);
  cy.get(login.userName).type(credentials.userName);
  cy.get(login.password).type(password);
  cy.get(login.loginButton).click();
}
```

**After:**
```javascript
import { loginWithCredentials } from '../support/helpers/login.helper.js'

// Use the helper
loginWithCredentials('Admin', 'admin123')
```

### ✅ Step 3: Remove Hardcoded Test Cases
**Before:**
```javascript
it('Login - correct credentials', function(){
    loginOrangHRM();
    linkShouldBe(login.landingUrl);
    cy.get(login.accountName).should('have.text', credentials.accountName);
})

it('Login - incorrect credentials', function(){
    loginOrangHRM('Bad password');
    cy.get(login.errorIcon).should('exist');
})
```

**After:**
```javascript
loginTestData.loginTests.forEach((testCase) => {
  it(`Login Test: ${testCase.testName}`, () => {
    loginWithCredentials(testCase.userName, testCase.password);
    
    if (testCase.shouldSucceed) {
      verifyLoginSuccess(testCase.expectedUrl, testCase.expectedAccountName);
    } else {
      verifyLoginError(testCase.expectedError);
    }
  });
});
```

### ✅ Step 4: Add Tests via JSON Data
Instead of writing new test code, add entries to JSON files:

**Add a new login scenario:**
Edit `cypress/fixtures/data/loginTestData.json`:
```json
{
  "testName": "Username with special characters",
  "userName": "Admin@123",
  "password": "admin123",
  "shouldSucceed": false,
  "expectedError": "Invalid credentials"
}
// Test automatically runs!
```

**Add a new navigation item test:**
Edit `cypress/fixtures/data/navigationTestData.json`:
```json
{
  "name": "Reports",
  "url": "https://opensource-demo.orangehrmlive.com/web/index.php/reports",
  "requiresCancel": false
}
// Navigation test automatically includes it!
```

## Common Patterns

### Pattern 1: Parameterized Testing
Run the same test with different data:

```javascript
const testCases = [
  { input: 'Admin', expected: 'success' },
  { input: 'BadUser', expected: 'error' }
];

testCases.forEach((testCase) => {
  it(`Test: ${testCase.input}`, () => {
    // Your test logic
  });
});
```

### Pattern 2: Helper Functions
Create reusable functions:

```javascript
// In support/helpers/login.helper.js
export function loginWithCredentials(userName, password) {
  cy.get(selectors.userName).type(userName);
  cy.get(selectors.password).type(password);
  cy.get(selectors.loginButton).click();
}

// In test file
import { loginWithCredentials } from '../support/helpers/login.helper.js'

it('my test', () => {
  loginWithCredentials('Admin', 'admin123')
})
```

### Pattern 3: Data Organization
Keep test data separate:

```javascript
// ✅ Good: Data in JSON file
// cypress/fixtures/data/scenarios.json
{
  "scenarios": [{ "name": "user1", "role": "admin" }]
}

// ❌ Bad: Hardcoded in test
it('test', () => {
  const user = { name": "user1", "role": "admin" }
})
```

## Running Tests

### Run All Tests
```bash
npx cypress run
```

### Run Specific Feature
```bash
# Run only login tests
npx cypress run --spec "cypress/e2e/login.cy.js"

# Run only navigation tests
npx cypress run --spec "cypress/e2e/navigation.cy.js"
```

### Open Cypress UI
```bash
npx cypress open
```

## Benefits You'll See

1. **Adding Tests**: 10 seconds (just add JSON entry)
2. **Fixing Selectors**: 1 file to update (not 10 test cases)
3. **Debugging**: Clear separation of concerns
4. **Reusability**: Helpers work across multiple tests
5. **Scalability**: Easily manage 100+ test scenarios

## FAQ

**Q: Do I have to update old tests?**
A: No! Old tests still work. You can migrate gradually. But new tests should follow the new pattern.

**Q: What if I need a custom assertion?**
A: Create a new helper function in `support/helpers/`. Keep it reusable.

**Q: How do I add selectors for a new feature?**
A: Create `cypress/fixtures/selectors/featureName.selectors.json`

**Q: Can I still use cy.visit() and cy.get() directly?**
A: Yes, but wrap them in helpers for reusability.

**Q: Where do I put global setup?**
A: Use `cypress/support/e2e.js` for global configuration.

## Next Steps

1. Review the [DATA_DRIVEN_TESTING_GUIDE.md](../DATA_DRIVEN_TESTING_GUIDE.md) for complete reference
2. Check out new test files: `cypress/e2e/login.cy.js` and `cypress/e2e/navigation.cy.js`
3. Look at helper functions in `cypress/support/helpers/`
4. Run tests to verify everything works
5. Start adding new test scenarios via JSON data files

## Questions or Issues?

- Check existing helpers in `cypress/support/helpers/`
- Review test data structure in `cypress/fixtures/data/`
- Look at examples in new test files (`login.cy.js`, `navigation.cy.js`)
