# OrangeHRM Cypress Automation - Project Instructions

## Project Overview
This is a **data-driven Cypress automation framework** for OrangeHRM UI testing. All code must adhere to a strict separation of concerns: selectors, test data, and logic are separated into distinct, reusable components.

## Core Architecture Rules

### 1. No Hardcoded Selectors ⛔
**Rule**: All page element locators MUST be defined in JSON selector files, never hardcoded in test files.

**Correct** ✅
```javascript
// cypress/e2e/login.cy.js
import loginSelectors from '../fixtures/selectors/login.selectors.json';
cy.get(loginSelectors.login.userName).type('Admin');
```

**Incorrect** ❌
```javascript
// cypress/e2e/login.cy.js
cy.get('[name="username"]').type('Admin');  // HARDCODED - VIOLATION
```

**Where**: `cypress/fixtures/selectors/*.selectors.json`
- One file per feature/page (e.g., `login.selectors.json`, `navigation.selectors.json`)
- Organized by feature/component within the JSON structure
- Always use descriptive keys matching the element's purpose

---

### 2. No Hardcoded Test Data ⛔
**Rule**: All test data (credentials, URLs, expected values) MUST be in JSON data files, never hardcoded in tests.

**Correct** ✅
```javascript
// In cypress/fixtures/data/loginTestData.json
{
  "loginTests": [
    {
      "testName": "Valid Login",
      "userName": "Admin",
      "password": "admin123",
      "shouldSucceed": true
    }
  ]
}

// In cypress/e2e/login.cy.js
loginTestData.loginTests.forEach((test) => {
  it(`Login: ${test.testName}`, () => {
    loginWithCredentials(test.userName, test.password);
  });
});
```

**Incorrect** ❌
```javascript
// HARDCODED DATA - VIOLATION
it('Login with Admin', () => {
  cy.get('[name="username"]').type('Admin');
  cy.get('[name="password"]').type('admin123');
});
```

**Where**: `cypress/fixtures/data/*.json`
- Organize by feature (e.g., `loginTestData.json`, `navigationTestData.json`)
- Include all test scenarios, credentials, and expected outcomes
- Use descriptive field names that match test logic

---

### 3. Use Helper Functions (Don't Repeat) ⛔
**Rule**: Reusable test actions and verifications MUST be in helper functions, not repeated across tests.

**Correct** ✅
```javascript
// cypress/support/helpers/login.helper.js
export function loginWithCredentials(userName, password) {
  cy.get(loginSelectors.login.userName).type(userName);
  cy.get(loginSelectors.login.password).type(password);
  cy.get(loginSelectors.login.loginButton).click();
}

// cypress/e2e/login.cy.js - Use the helper
loginWithCredentials(test.userName, test.password);
```

**Incorrect** ❌
```javascript
// REPEATED LOGIC - VIOLATION
it('Test 1', () => {
  cy.get('[name="username"]').type('Admin');
  cy.get('[name="password"]').type('admin123');
  cy.get('[type="submit"]').click();
});

it('Test 2', () => {
  cy.get('[name="username"]').type('User2');
  cy.get('[name="password"]').type('pass456');
  cy.get('[type="submit"]').click();
});
```

**Where**: `cypress/support/helpers/*.helper.js`
- One file per feature (e.g., `login.helper.js`, `navigation.helper.js`)
- Use JSDoc comments documenting parameters and purpose
- Name functions descriptively (verb + noun, e.g., `loginWithCredentials`)
- Export all helper functions for reuse across multiple tests

---

### 4. Parameterized Tests Only (Data-Driven) ⛔
**Rule**: All test scenarios MUST use data-driven approach with `forEach` loops over JSON data. No hardcoded individual test cases.

**Correct** ✅
```javascript
// cypress/fixtures/data/loginTestData.json
{
  "loginTests": [
    { "testName": "Valid Login", "userName": "Admin", ... },
    { "testName": "Invalid Password", "userName": "Admin", ... },
    { "testName": "Invalid Username", "userName": "BadUser", ... }
  ]
}

// cypress/e2e/login.cy.js
describe('Login Tests - Parameterized', () => {
  loginTestData.loginTests.forEach((testCase) => {
    it(`Login: ${testCase.testName}`, () => {
      loginWithCredentials(testCase.userName, testCase.password);
      // assertions...
    });
  });
});
```

**Incorrect** ❌
```javascript
// HARDCODED TEST CASES - VIOLATION (requires code change to add tests)
describe('Login Tests', () => {
  it('Valid Login', () => { /* ... */ });
  it('Invalid Password', () => { /* ... */ });
  it('Invalid Username', () => { /* ... */ });
  // To add new test, must edit code!
});
```

**Benefits**:
- Add test scenarios by updating JSON (no code changes)
- Easy to scale to 100+ test cases
- Simple to exclude/include tests by modifying data
- Clear separation between test logic and test scenarios

---

### 5. Proper File Organization ⛔
**Rule**: Files MUST be organized in the established structure. New files must follow the same patterns.

**Directory Structure**:
```
cypress/
├── e2e/
│   ├── login.cy.js          ← Feature-specific test files
│   ├── navigation.cy.js      ← One file per feature
│   └── tests.cy.js           ← Legacy (backward compat)
├── fixtures/
│   ├── selectors/            ← Page element locators
│   │   ├── login.selectors.json
│   │   ├── navigation.selectors.json
│   │   └── forgotPassword.selectors.json
│   ├── data/                 ← Test scenarios & credentials
│   │   ├── credentials.json
│   │   ├── loginTestData.json
│   │   ├── navigationTestData.json
│   │   └── employeeTestData.json  ← NEW files follow this pattern
│   └── testData.js           ← Backward-compatible re-exports
└── support/
    ├── helpers/              ← Reusable functions
    │   ├── login.helper.js
    │   ├── navigation.helper.js
    │   └── employee.helper.js ← NEW files follow this pattern
    ├── commands.js
    ├── e2e.js
    └── functions.js
```

**Naming Conventions**:
- **Test files**: `[feature].cy.js` (e.g., `employees.cy.js`)
- **Selectors**: `[feature].selectors.json` (e.g., `employees.selectors.json`)
- **Test data**: `[feature]TestData.json` (e.g., `employeeTestData.json`)
- **Helpers**: `[feature].helper.js` (e.g., `employee.helper.js`)

---

## Required Validation Checklist

When creating or modifying test files, verify:

- [ ] **Selectors**: All `cy.get()` use selector variables from JSON files, NEVER hardcoded strings
- [ ] **Test Data**: All test values (usernames, URLs, expected text) come from JSON data files
- [ ] **Helpers**: Repeated logic extracted into reusable functions in `support/helpers/`
- [ ] **Parameterization**: Tests use `forEach` loops over JSON data arrays, not hardcoded test cases
- [ ] **File Structure**: New files follow naming and directory conventions above
- [ ] **Imports**: Proper imports from selectors, data files, and helpers at top of test file
- [ ] **JSDoc Comments**: Helper functions have documentation with `@param` and description
- [ ] **No `cy.` in JSON**: JSON files contain ONLY data/selectors, no Cypress commands

---

## Common Validation Errors & Fixes

| ❌ Error | ✅ Fix |
|---------|--------|
| `cy.get('[name="username"]')` in test | Move to `login.selectors.json`, import and use: `cy.get(loginSelectors.login.userName)` |
| `userName: 'Admin'` hardcoded in test | Move to `loginTestData.json`, use in forEach loop |
| Same login code in 3 test files | Create `login.helper.js` with `loginWithCredentials()`, import and call it |
| `it('Test 1...', () => {...})`<br/>`it('Test 2...', () => {...})` instead of forEach | Use forEach loop over JSON array in `loginTestData.json` |
| File in wrong folder or with wrong name | Follow naming: `[feature].cy.js`, `[feature].selectors.json`, `[feature]TestData.json`, `[feature].helper.js` |

---

## Before Creating New Tests

When adding tests for a NEW FEATURE:

1. **Create selector file**: `cypress/fixtures/selectors/[feature].selectors.json`
   - List all page elements as JSON key-value pairs
   
2. **Create test data file**: `cypress/fixtures/data/[feature]TestData.json`
   - Define all test scenarios with inputs and expected outcomes

3. **Create helper file**: `cypress/support/helpers/[feature].helper.js`
   - Create functions for common actions (login, click, verify)
   - Use JSDoc comments for each function
   - Import selectors and data as needed

4. **Create test file**: `cypress/e2e/[feature].cy.js`
   - Import helpers, selectors (via helpers), and test data
   - Use data-driven tests with forEach loops
   - Keep test logic clean and focused

---

## Example: Adding Employee Tests

**Step 1**: Create `cypress/fixtures/selectors/employee.selectors.json`
```json
{
  "employee": {
    "addButton": "[data-test='add-employee']",
    "nameField": "[name='employeeName']",
    "saveButton": "[type='submit']"
  }
}
```

**Step 2**: Create `cypress/fixtures/data/employeeTestData.json`
```json
{
  "addEmployeeTests": [
    {
      "testName": "Add valid employee",
      "name": "John Doe",
      "shouldSucceed": true
    }
  ]
}
```

**Step 3**: Create `cypress/support/helpers/employee.helper.js`
```javascript
import selectors from '../../fixtures/selectors/employee.selectors.json';

export function addEmployee(name) {
  cy.get(selectors.employee.addButton).click();
  cy.get(selectors.employee.nameField).type(name);
  cy.get(selectors.employee.saveButton).click();
}
```

**Step 4**: Create `cypress/e2e/employee.cy.js`
```javascript
import testData from '../fixtures/data/employeeTestData.json';
import { addEmployee } from '../support/helpers/employee.helper.js';

describe('Employee Tests', () => {
  testData.addEmployeeTests.forEach((test) => {
    it(`Add Employee: ${test.testName}`, () => {
      addEmployee(test.name);
      cy.contains('Employee added').should('be.visible');
    });
  });
});
```

---

## Tools & Commands

```bash
# Run all tests
npm test

# Run specific feature tests
npm test -- --spec "cypress/e2e/login.cy.js"

# Open Cypress UI
npm run open

# Run tests in Chrome headless
npm run test:chrome

# Run tests with browser visible
npm run test:headed
```

---

## Key Benefits of This Structure

✅ **Easy to Scale**: Add 100+ tests by editing JSON, not code  
✅ **Easy to Maintain**: Update selectors in one place → all tests updated  
✅ **Easy to Reuse**: Helper functions work across multiple test files  
✅ **Easy to Onboard**: New team members follow clear patterns  
✅ **Easy to Debug**: Clear separation between data, selectors, and logic  

---

## Related Resources

- [DATA_DRIVEN_TESTING_GUIDE.md](./DATA_DRIVEN_TESTING_GUIDE.md) - Complete framework reference
- [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md) - How to migrate old tests
- [QUICK_START.md](./QUICK_START.md) - 5-minute quick start

---

**Last Updated**: March 28, 2026  
**Framework**: Cypress 13.x  
**Status**: Active - All new code must follow these rules
