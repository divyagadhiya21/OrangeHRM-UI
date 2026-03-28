# Quick Start Guide - Data-Driven Testing

## 5-Minute Setup

### 1️⃣ Install Dependencies
```bash
npm install
```

### 2️⃣ Run Tests
```bash
npx cypress run
```

## 🎯 Common Tasks

### ➕ Add a New Login Test Scenario

**File:** `cypress/fixtures/data/loginTestData.json`

Add entry to `loginTests` array:
```json
{
  "testName": "Empty Username",
  "userName": "",
  "password": "admin123",
  "shouldSucceed": false,
  "expectedError": "Invalid credentials",
  "expectedUrl": "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
}
```

**That's it!** ✅ Test runs automatically 

### ➕ Add a New Navigation Menu Item

**File:** `cypress/fixtures/data/navigationTestData.json`

Add entry to `navigationItems` array:
```json
{
  "name": "New Module",
  "url": "https://opensource-demo.orangehrmlive.com/web/index.php/new-module",
  "requiresCancel": false
}
```

**Done!** ✅ Navigation test runs for the new item

### 🔧 Update a Selector (e.g., Username field changed)

**File:** `cypress/fixtures/selectors/login.selectors.json`

Update the selector:
```json
{
  "login": {
    "userName": "[name=\"email\"]"  // Changed from [name="username"]
  }
}
```

**All tests automatically use the new selector!** ✅

### 📝 Create a New Feature Test

**Step 1:** Create selector file (`cypress/fixtures/selectors/employee.selectors.json`)
```json
{
  "employee": {
    "addButton": "[data-test='add-employee']",
    "nameField": "[name='employeeName']"
  }
}
```

**Step 2:** Create test data file (`cypress/fixtures/data/employeeTestData.json`)
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

**Step 3:** Create helper file (`cypress/support/helpers/employee.helper.js`)
```javascript
import selectors from '../../fixtures/selectors/employee.selectors.json'

export function addEmployee(name) {
  cy.get(selectors.employee.addButton).click();
  cy.get(selectors.employee.nameField).type(name);
}
```

**Step 4:** Create test file (`cypress/e2e/employee.cy.js`)
```javascript
import testData from '../fixtures/data/employeeTestData.json'
import { addEmployee } from '../support/helpers/employee.helper.js'

describe('Employee Tests', () => {
  testData.addEmployeeTests.forEach((test) => {
    it(test.testName, () => {
      addEmployee(test.name);
      // assertions...
    });
  });
});
```

### 🔍 View Current Test Structure

```bash
tree cypress/
```

```
cypress/
├── e2e/
│   ├── login.cy.js              (Login & forgot password tests)
│   ├── navigation.cy.js         (Menu navigation tests)
│   └── tests.cy.js              (Legacy file)
├── fixtures/
│   ├── selectors/
│   │   ├── login.selectors.json
│   │   ├── navigation.selectors.json
│   │   └── forgotPassword.selectors.json
│   ├── data/
│   │   ├── credentials.json
│   │   ├── loginTestData.json
│   │   └── navigationTestData.json
│   └── testData.js              (Backward compatible)
├── support/
│   ├── helpers/
│   │   ├── login.helper.js
│   │   └── navigation.helper.js
│   ├── commands.js
│   ├── e2e.js
│   └── functions.js
└── videos/
```

## 📊 Example Workflows

### Workflow 1: Add Multiple Login Scenarios
```javascript
// Update cypress/fixtures/data/loginTestData.json
// Add 5 more objects to loginTests array
// Run tests → 5 more tests execute automatically
```

### Workflow 2: Fix a Broken Selector
1. Open `cypress/fixtures/selectors/login.selectors.json`
2. Update the selector
3. All tests using that selector get updated

### Workflow 3: Add Search Test
```javascript
// Update cypress/fixtures/data/navigationTestData.json
// Add to searchTests array

{
  "searchTerm": "Recruitment",
  "expectedResult": "Recruitment"
}

// Test runs automatically!
```

## 🚀 Key Advantages

| Action | Before | After |
|--------|--------|-------|
| **Add test scenario** | Write 15 lines of test code | Add 3-line JSON entry |
| **Fix selector** | Update 5 test files | Update 1 JSON file |
| **Scale to 100 tests** | No way! Code explosion | Easy! JSON-driven |

## 📚 Learn More

- **Full Guide:** [DATA_DRIVEN_TESTING_GUIDE.md](DATA_DRIVEN_TESTING_GUIDE.md)
- **Migration Help:** [MIGRATION_GUIDE.md](MIGRATION_GUIDE.md)
- **Test Examples:** Check `cypress/e2e/login.cy.js`

## ❓ Need Help?

**Q: How do I run a single test?**
```bash
npx cypress run --spec "cypress/e2e/login.cy.js"
```

**Q: Where do I add custom helpers?**
```
cypress/support/helpers/myFeature.helper.js
```

**Q: How do I handle dynamic selectors?**
Use helper functions with parameters:
```javascript
export function clickMenuItem(menuName) {
  cy.contains('[class="menu-item"]', menuName).click();
}
```

**Q: Can I use old test format?**
Yes! Backward compatible. But new tests should use parameterized format.

---

**🎉 You're ready!** Start with adding a new test scenario to see it in action.
