# OrangeHRM Cypress Automation - Data-Driven Testing Framework

## Overview

This project has been restructured to follow **data-driven testing** best practices. The new structure separates test data, selectors, and test logic for better maintainability, reusability, and scalability.

## Project Structure

```
cypress/
├── fixtures/
│   ├── selectors/                    # Page element locators (separated by feature)
│   │   ├── login.selectors.json
│   │   ├── forgotPassword.selectors.json
│   │   └── navigation.selectors.json
│   ├── data/                         # Test data sets (separated by scenario)
│   │   ├── credentials.json          # User credentials
│   │   ├── loginTestData.json        # Login test scenarios
│   │   └── navigationTestData.json   # Navigation test scenarios
│   └── testData.js                   # Legacy backward-compatible exports
├── e2e/
│   ├── login.cy.js                   # Login feature tests (data-driven)
│   ├── navigation.cy.js              # Navigation feature tests (data-driven)
│   └── tests.cy.js                   # Original test file (legacy)
├── support/
│   ├── helpers/                      # Reusable helper functions
│   │   ├── login.helper.js           # Login-related helpers
│   │   └── navigation.helper.js      # Navigation-related helpers
│   ├── commands.js
│   ├── e2e.js
│   └── functions.js
└── videos/
```

## Key Features

### 1. **Separated Selectors** (`fixtures/selectors/`)
- Each feature has its own selector file (JSON format)
- Easy to maintain and update locators
- Centralized selector management

**Example:**
```json
{
  "login": {
    "userName": "[name=\"username\"]",
    "password": "[name=\"password\"]",
    "loginButton": "[type=\"submit\"]"
  }
}
```

### 2. **Test Data Files** (`fixtures/data/`)
- **credentials.json**: User credentials (valid/invalid)
- **loginTestData.json**: Login scenarios with expected outcomes
- **navigationTestData.json**: Navigation items and search tests

**Example:**
```json
{
  "loginTests": [
    {
      "testName": "Valid Login",
      "userName": "Admin",
      "password": "admin123",
      "shouldSucceed": true,
      "expectedUrl": "..."
    },
    {
      "testName": "Invalid Password",
      "userName": "Admin",
      "password": "wrongPassword",
      "shouldSucceed": false,
      "expectedError": "Invalid credentials"
    }
  ]
}
```

### 3. **Helper Functions** (`support/helpers/`)
Reusable, well-documented functions that:
- Perform common actions (login, verification, navigation)
- Accept parameters for flexibility
- Follow naming conventions
- Include JSDoc comments

**Example:**
```javascript
export function loginWithCredentials(userName, password) {
  cy.get(loginSelectors.login.userName).type(userName);
  cy.get(loginSelectors.login.password).type(password);
  cy.get(loginSelectors.login.loginButton).click();
}
```

### 4. **Parameterized Tests** (Data-Driven Execution)
Tests automatically run for each data set using `.forEach()`:

```javascript
loginTestData.loginTests.forEach((testCase) => {
  it(`Login Test: ${testCase.testName}`, () => {
    loginWithCredentials(testCase.userName, testCase.password);
    // assertions...
  });
});
```

## Test Files

### Login Tests (`cypress/e2e/login.cy.js`)
- Website title verification
- **Parameterized login tests** (valid/invalid credentials)
- **Parameterized forgot password tests**

**Benefits:**
- Add new test scenarios by updating `loginTestData.json`
- No need to update test code
- Easy to track test results per scenario

### Navigation Tests (`cypress/e2e/navigation.cy.js`)
- **Parameterized navigation tests** (12 menu items)
- **Parameterized search tests**
- Maintenance page handling

**Benefits:**
- Single test iterates through all navigation items
- Update test data instead of writing new test cases
- Centralized test scenario management

## How to Add New Test Scenarios

### Example 1: Add a New Login Test Scenario

1. **Update** `cypress/fixtures/data/loginTestData.json`:
```json
{
  "testName": "Expired Password",
  "userName": "Admin",
  "password": "expiredPassword",
  "shouldSucceed": false,
  "expectedError": "Password expired"
}
```

2. **That's it!** The test automatically runs for the new scenario.

### Example 2: Add a New Navigation Item

1. **Update** `cypress/fixtures/data/navigationTestData.json`:
```json
{
  "name": "New Module",
  "url": "https://opensource-demo.orangehrmlive.com/web/index.php/new-module",
  "requiresCancel": false
}
```

2. **The test automatically includes the new navigation item.**

## Benefits of This Structure

| Aspect | Benefit |
|--------|---------|
| **Maintainability** | Update selectors in one place, test logic stays unchanged |
| **Scalability** | Add hundreds of test scenarios without writing new test code |
| **Reusability** | Helper functions work across multiple test files |
| **Readability** | Clear separation of concerns (data, logic, selectors) |
| **Debugging** | Easy to identify if issue is selector, data, or logic |
| **Flexibility** | Update test data without touching code |

## Running Tests

```bash
# Run all tests
npx cypress run

# Run specific test file
npx cypress run --spec "cypress/e2e/login.cy.js"

# Open Cypress UI
npx cypress open
```

## Adding More Features

To add a new feature (e.g., Employee module):

1. **Create selectors file**: `cypress/fixtures/selectors/employee.selectors.json`
2. **Create test data**: `cypress/fixtures/data/employeeTestData.json`
3. **Create helper file**: `cypress/support/helpers/employee.helper.js`
4. **Create test file**: `cypress/e2e/employee.cy.js`

Follow the existing pattern for consistency.

## Backward Compatibility

The `cypress/fixtures/testData.js` file is maintained for backward compatibility. It re-exports data from the new data-driven files, allowing existing test code to continue working without changes.

## Best Practices

1. **DRY (Don't Repeat Yourself)**: Use helper functions instead of duplicating Cypress commands
2. **Naming**: Use descriptive names for test cases and helper functions
3. **Data Organization**: Keep selectors separate from test data
4. **Centralization**: All test data should be in JSON fixtures, not hardcoded
5. **Documentation**: Add JSDoc comments to helper functions
6. **Assertions**: Use `cy.` commands for assertions; don't use standard assertions

## File Dependencies

```
Test Files (*.cy.js)
    ↓
Helper Functions (helpers/*.js)
    ↓
Selectors (fixtures/selectors/*.json) + Test Data (fixtures/data/*.json)
```

## Future Enhancements

- Add environment-specific test data (dev, staging, prod)
- Implement test result reporting with detailed data mapping
- Add visual regression testing with data-driven components
- Create test data generators for performance testing
- Integrate with CI/CD pipeline for automated test runs
