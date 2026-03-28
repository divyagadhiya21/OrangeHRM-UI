# File Structure Visualization & Reference

## Complete Folder Tree

```
1OrangeHRM-automation-cypress-main/
│
├── 📄 README.md                              ← Main documentation (START HERE)
├── 📄 cypress.config.js                      ← Cypress configuration
├── 📄 package.json                           ← Dependencies
│
├── 📚 DOCUMENTATION/
│   ├── 📄 QUICK_START.md                    ← 5-minute quick start
│   ├── 📄 DATA_DRIVEN_TESTING_GUIDE.md      ← Complete framework guide
│   ├── 📄 MIGRATION_GUIDE.md                ← Migrate old tests
│   ├── 📄 PROJECT_RESTRUCTURING_SUMMARY.md  ← What changed & why
│   └── 📄 FILE_STRUCTURE_REFERENCE.md       ← This file
│
└── 📁 cypress/
    │
    ├── 📁 e2e/                              ← Test files
    │   ├── 📄 login.cy.js                   ⭐ NEW - Login tests (7 cases)
    │   ├── 📄 navigation.cy.js              ⭐ NEW - Navigation tests (12+ cases)
    │   └── 📄 tests.cy.js                   📋 Legacy - Original test file
    │
    ├── 📁 fixtures/                         ← Test data & selectors
    │   │
    │   ├── 📁 selectors/                    ⭐ NEW - Page locators (JSON)
    │   │   ├── 📄 login.selectors.json
    │   │   │   └── Contains: username, password, loginButton, pageTitle, 
    │   │   │                 landingUrl, accountName, errorIcon, 
    │   │   │                 errorMessage, forgotPassword link
    │   │   │
    │   │   ├── 📄 forgotPassword.selectors.json
    │   │   │   └── Contains: userName, cancel, resetPassword, error,
    │   │   │                 success, URL references
    │   │   │
    │   │   └── 📄 navigation.selectors.json
    │   │       └── Contains: leftPane (element, search), maintenance (cancel)
    │   │
    │   ├── 📁 data/                         ⭐ NEW - Test scenarios (JSON)
    │   │   ├── 📄 credentials.json
    │   │   │   └── Valid & invalid user credentials
    │   │   │
    │   │   ├── 📄 loginTestData.json
    │   │   │   └── 5 test scenarios:
    │   │   │       - Valid login
    │   │   │       - Invalid password
    │   │   │       - Invalid username
    │   │   │       - Forgot password (empty)
    │   │   │       - Forgot password (valid)
    │   │   │
    │   │   └── 📄 navigationTestData.json
    │   │       └── 12 menu items + 2 search scenarios
    │   │           (Admin, PIM, Leave, Time, Recruitment, My Info,
    │   │            Performance, Dashboard, Directory, Maintenance,
    │   │            Claim, Buzz)
    │   │
    │   └── 📄 testData.js                   📋 Backward compatible re-exports
    │       └── Maintains compatibility with old code
    │
    ├── 📁 support/                          ← Helper functions & setup
    │   │
    │   ├── 📁 helpers/                      ⭐ NEW - Reusable functions
    │   │   ├── 📄 login.helper.js           [15 functions]
    │   │   │   ├── loginWithCredentials()
    │   │   │   ├── loginWithDefaultCredentials()
    │   │   │   ├── verifyPageTitle()
    │   │   │   ├── verifyLoginSuccess()
    │   │   │   ├── verifyLoginError()
    │   │   │   ├── verifyCurrentUrl()
    │   │   │   ├── navigateToForgotPassword()
    │   │   │   ├── resetPasswordWithUsername()
    │   │   │   ├── cancelForgotPassword()
    │   │   │   ├── verifyForgotPasswordSuccess()
    │   │   │   └── verifyForgotPasswordError()
    │   │   │
    │   │   └── 📄 navigation.helper.js      [6 functions]
    │   │       ├── clickNavigationItem()
    │   │       ├── verifyNavigationUrl()
    │   │       ├── cancelMaintenance()
    │   │       ├── navigateAndVerify()
    │   │       ├── searchInLeftPane()
    │   │       └── verifySearchResult()
    │   │
    │   ├── 📄 e2e.js                        ← Global test setup
    │   ├── 📄 commands.js                   ← Custom Cypress commands
    │   └── 📄 functions.js                  📋 Legacy - Original functions
    │
    └── 📁 videos/                           ← Test recordings (auto-generated)
```

---

## File Dependencies & Data Flow

### Test Execution Flow

```
Test File (*.cy.js)
    │
    ├─→ Import Helper Functions
    │   └─→ support/helpers/*.js
    │
    ├─→ Import Test Data (JSON)
    │   └─→ fixtures/data/*.json
    │
    └─→ Helper Functions Use
        └─→ Selectors (JSON)
            └─→ fixtures/selectors/*.json
```

### Example: Login Test Flow

```
login.cy.js (Test File)
    │
    ├─→ Imports helpers
    │   └─→ login.helper.js
    │
    ├─→ Imports test data
    │   └─→ loginTestData.json (3 scenarios)
    │
    ├─→ For each scenario:
    │   ├─→ loginWithCredentials()
    │   │   └─→ Uses selectors from:
    │   │       └─→ login.selectors.json
    │   │
    │   ├─→ verifyLoginSuccess() OR verifyLoginError()
    │   │   └─→ Uses selectors from:
    │   │       └─→ login.selectors.json
    │   │
    │   └─→ Test result ✅ or ❌
```

---

## How to Read Each File Type

### JSON Selector Files (fixtures/selectors/)

**Purpose:** Store CSS selectors/XPath for page elements

**Structure:**
```json
{
  "pageSection": {
    "elementName": "[selector]",
    "anotherElement": "[another-selector]"
  }
}
```

**Usage in Tests:**
```javascript
import selectors from '../fixtures/selectors/login.selectors.json'

cy.get(selectors.login.userName).type('Admin')
```

**When to Update:** When UI elements change

---

### JSON Test Data Files (fixtures/data/)

**Purpose:** Store test scenarios and expected outcomes

**Structure:**
```json
{
  "testSuites": [
    {
      "testName": "Human-readable test name",
      "data1": "value1",
      "data2": "value2",
      "expectedResult": "value",
      "shouldPass": true
    }
  ]
}
```

**Usage in Tests:**
```javascript
import testData from '../fixtures/data/loginTestData.json'

testData.loginTests.forEach((testCase) => {
  it(`Login Test: ${testCase.testName}`, () => {
    // Test using testCase data
  })
})
```

**When to Update:** To add more test scenarios (no code changes needed!)

---

### Helper Functions (support/helpers/)

**Purpose:** Reusable test actions and verifications

**Structure:**
```javascript
/**
 * Function description
 * @param {type} paramName - Parameter description
 */
export function functionName(paramName) {
  // Implementation using Cypress commands
  // and selector imports
}
```

**Usage in Tests:**
```javascript
import { loginWithCredentials } from '../support/helpers/login.helper.js'

loginWithCredentials('Admin', 'admin123')
```

**When to Create:** For frequently used test actions

**Best Practices:**
- Use JSDoc comments
- Keep functions focused (single responsibility)
- Accept parameters for flexibility
- Return values when needed
- Name clearly (verb_noun pattern)

---

### Test Files (e2e/)

**Purpose:** Define test cases

**Structure:**
```javascript
import testData from '../fixtures/data/featureTestData.json'
import { helperFunction } from '../support/helpers/feature.helper.js'

describe('Feature Tests', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  // Data-driven test
  testData.scenarios.forEach((scenario) => {
    it(`Test: ${scenario.testName}`, () => {
      helperFunction(scenario.param)
      // assertions...
    })
  })
})
```

**When to Create:** For each feature/module

**Best Practices:**
- Use parameterized approach (forEach)
- Keep test logic in helpers
- Use descriptive test names
- Organize into describe blocks
- Import from data and helpers

---

## Adding a New Feature - Step by Step

### Step 1: Create Selector File
**File:** `cypress/fixtures/selectors/employee.selectors.json`
```json
{
  "employee": {
    "addButton": "[data-test='add-employee']",
    "nameField": "[name='name']",
    "saveButton": "[class='save']"
  }
}
```

### Step 2: Create Test Data File
**File:** `cypress/fixtures/data/employeeTestData.json`
```json
{
  "addEmployeeTests": [
    {
      "testName": "Add valid employee",
      "name": "John Doe",
      "expectedSuccess": true
    }
  ]
}
```

### Step 3: Create Helper Functions
**File:** `cypress/support/helpers/employee.helper.js`
```javascript
import selectors from '../../fixtures/selectors/employee.selectors.json'

export function addEmployee(name) {
  cy.get(selectors.employee.addButton).click()
  cy.get(selectors.employee.nameField).type(name)
  cy.get(selectors.employee.saveButton).click()
}

export function verifyEmployeeAdded(name) {
  cy.contains(name).should('be.visible')
}
```

### Step 4: Create Test File
**File:** `cypress/e2e/employee.cy.js`
```javascript
import testData from '../fixtures/data/employeeTestData.json'
import { addEmployee, verifyEmployeeAdded } from '../support/helpers/employee.helper.js'

describe('Employee Management Tests', () => {
  beforeEach(() => {
    cy.visit('/employees')
  })

  testData.addEmployeeTests.forEach((test) => {
    it(`Add Employee: ${test.testName}`, () => {
      addEmployee(test.name)
      if (test.expectedSuccess) {
        verifyEmployeeAdded(test.name)
      }
    })
  })
})
```

### Step 5: Run Tests
```bash
npx cypress run --spec "cypress/e2e/employee.cy.js"
```

---

## File Size & Content Reference

| File | Lines | Purpose | Update Frequency |
|------|-------|---------|------------------|
| login.selectors.json | 20 | Selectors | When UI changes |
| forgotPassword.selectors.json | 15 | Selectors | When UI changes |
| navigation.selectors.json | 15 | Selectors | When UI changes |
| credentials.json | 20 | Credentials | Rarely |
| loginTestData.json | 50 | Test scenarios | Weekly |
| navigationTestData.json | 80 | Test data | Monthly |
| login.helper.js | 100 | Helper functions | Monthly |
| navigation.helper.js | 80 | Helper functions | Monthly |
| login.cy.js | 70 | Tests | When adding scenarios |
| navigation.cy.js | 75 | Tests | When adding scenarios |

---

## Import Patterns Quick Reference

### Import Selector File (JSON)
```javascript
import loginSelectors from '../../fixtures/selectors/login.selectors.json'
// Usage: loginSelectors.login.userName
```

### Import Test Data (JSON)
```javascript
import loginTestData from '../../fixtures/data/loginTestData.json'
// Usage: loginTestData.loginTests
```

### Import Helper Functions
```javascript
import { loginWithCredentials, verifyLoginSuccess } from '../support/helpers/login.helper.js'
// Usage: loginWithCredentials('Admin', 'admin123')
```

### Import Multiple Functions
```javascript
import * as loginHelper from '../support/helpers/login.helper.js'
// Usage: loginHelper.loginWithCredentials('Admin', 'admin123')
```

---

## Troubleshooting File Issues

| Issue | Solution |
|-------|----------|
| Selector not found | Check `fixtures/selectors/*.json` |
| Test data not loading | Verify JSON syntax in `fixtures/data/*.json` |
| Helper not found | Check export in `support/helpers/*.js` |
| Import error | Verify file path and use `.js` extension |
| Test not running | Check describe/it blocks in `e2e/*.cy.js` |

---

## Naming Conventions

### Files
- **Selectors:** `[feature].selectors.json`
- **Test Data:** `[feature]TestData.json`
- **Helpers:** `[feature].helper.js`
- **Tests:** `[feature].cy.js`

### Functions
- **Action functions:** `[verb][noun]` (e.g., `loginWithCredentials`)
- **Verification functions:** `verify[Condition]` (e.g., `verifyLoginSuccess`)
- **Helper functions:** descriptive and reusable

### Variables in JSON
- **Selectors:** camelCase
- **Test data:** camelCase
- **URLs:** keep full URL strings
- **Messages:** exactMatch from UI

---

**For quick answers: [QUICK_START.md](QUICK_START.md)**  
**For complete details: [DATA_DRIVEN_TESTING_GUIDE.md](DATA_DRIVEN_TESTING_GUIDE.md)**
