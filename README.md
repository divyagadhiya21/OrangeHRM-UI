# OrangeHRM Automation - Cypress Testing Framework

[![Data-Driven Testing](https://img.shields.io/badge/Framework-Data%20Driven-blue)](https://github.com)
[![Cypress](https://img.shields.io/badge/Tool-Cypress-green)](https://cypress.io)
[![JavaScript](https://img.shields.io/badge/Language-JavaScript-yellow)](https://javascript.com)

Professional test automation framework for **OrangeHRM** using Cypress with a **data-driven testing** approach.

## ✨ Key Features

- **Data-Driven Testing**: Add test scenarios without writing code
- **Parameterized Tests**: Run same test with multiple data sets
- **Modular Architecture**: Organized by features and concerns
- **Reusable Helpers**: 21+ helper functions for common actions
- **Clean Separation**: Selectors, data, and logic are separate
- **Easy Scaling**: Manage 100+ tests through JSON files
- **Backward Compatible**: Old code still works

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- npm or yarn

### Installation
```bash
git clone <repository-url>
cd 1OrangeHRM-automation-cypress-main
npm install
```

### Run Tests
```bash
# Run all tests
npx cypress run

# Run specific feature
npx cypress run --spec "cypress/e2e/login.cy.js"

# Open Cypress UI
npx cypress open
```

## 📁 Project Structure

```
cypress/
├── e2e/                              # Test files
│   ├── login.cy.js                  # Login & forgot password tests (7 cases)
│   ├── navigation.cy.js             # Navigation tests (12+ cases)
│   └── tests.cy.js                  # Legacy test file
│
├── fixtures/
│   ├── selectors/                   # Page element locators (JSON)
│   │   ├── login.selectors.json
│   │   ├── forgotPassword.selectors.json
│   │   └── navigation.selectors.json
│   │
│   ├── data/                        # Test data & scenarios (JSON)
│   │   ├── credentials.json         # User credentials
│   │   ├── loginTestData.json       # 5 login scenarios
│   │   └── navigationTestData.json  # 12 menu items + search
│   │
│   └── testData.js                  # Backward compatible exports
│
├── support/
│   ├── helpers/                     # Feature-specific helpers
│   │   ├── login.helper.js          # 15 login functions
│   │   └── navigation.helper.js     # 6 navigation functions
│   │
│   ├── commands.js                  # Cypress custom commands
│   ├── e2e.js                       # Global test setup
│   └── functions.js                 # Legacy utilities
│
└── videos/                          # Test recordings

```

## 📊 Test Coverage

| Feature | Tests | Scenarios | Type |
|---------|-------|-----------|------|
| Login | 3 | Valid, Invalid password, Invalid username | Parameterized |
| Forgot Password | 2 | Empty username, Valid username | Parameterized |
| Navigation | 12 | Menu items + special handling | Parameterized |
| Search | 2 | Admin, PIM | Parameterized |
| **Total** | **19+** | **17+ data-driven scenarios** | **100% Parameterized** |

## 💡 Data-Driven Testing Example

### Add a New Login Test (Without Writing Code!)
1. Edit `cypress/fixtures/data/loginTestData.json`
2. Add new scenario object:
```json
{
  "testName": "Locked Account",
  "userName": "LockedUser",
  "password": "password123",
  "shouldSucceed": false,
  "expectedError": "Account is locked"
}
```
3. Run tests → **New test runs automatically!** ✅

### Update a Selector (Changes All Tests)
1. Edit `cypress/fixtures/selectors/login.selectors.json`
2. Update selector:
```json
{
  "login": {
    "userName": "[name=\"email\"]"  // Changed!
  }
}
```
3. **All tests using this selector automatically updated!** ✅

## 📚 Documentation

| Document | Purpose |
|----------|---------|
| [QUICK_START.md](QUICK_START.md) | 5-minute quick start guide |
| [DATA_DRIVEN_TESTING_GUIDE.md](DATA_DRIVEN_TESTING_GUIDE.md) | Complete framework reference |
| [MIGRATION_GUIDE.md](MIGRATION_GUIDE.md) | Migrate old tests guide |
| [PROJECT_RESTRUCTURING_SUMMARY.md](PROJECT_RESTRUCTURING_SUMMARY.md) | What was changed & why |

## 🔧 Helper Functions

### Login Helpers (cypress/support/helpers/login.helper.js)
```javascript
loginWithCredentials(userName, password)
loginWithDefaultCredentials()
verifyPageTitle(expectedTitle)
verifyLoginSuccess(expectedUrl, expectedAccountName)
verifyLoginError(expectedError)
verifyCurrentUrl(expectedUrl)
navigateToForgotPassword()
resetPasswordWithUsername(userName)
cancelForgotPassword()
verifyForgotPasswordSuccess(expectedMessage)
verifyForgotPasswordError(expectedError)
```

### Navigation Helpers (cypress/support/helpers/navigation.helper.js)
```javascript
clickNavigationItem(itemName)
verifyNavigationUrl(expectedUrl)
cancelMaintenance()
navigateAndVerify(itemName, expectedUrl, requiresCancel)
searchInLeftPane(searchTerm)
verifySearchResult(expectedResult)
```

## 🎯 Common Tasks

### Add a New Feature Test
```bash
# 1. Create selector file
cypress/fixtures/selectors/feature.selectors.json

# 2. Create test data
cypress/fixtures/data/featureTestData.json

# 3. Create helper functions
cypress/support/helpers/feature.helper.js

# 4. Create test file
cypress/e2e/feature.cy.js
```

### Run Tests in CI/CD
```bash
# In pipeline
npm install
npx cypress run --headless --browser chrome
```

## 📋 Test Data Files

### credentials.json
```json
{
  "validCredentials": { "userName": "Admin", "password": "admin123" },
  "invalidCredentials": [
    { "userName": "Admin", "password": "wrong" },
    { "userName": "Invalid", "password": "admin123" }
  ]
}
```

### loginTestData.json
Pre-configured with 5 test scenarios:
- Valid login
- Invalid password
- Invalid username
- Forgot password (no username)
- Forgot password (with username)

### navigationTestData.json
Pre-configured with:
- 12 menu items with URLs
- 2 search test scenarios
- Special handling for Maintenance page

## ✅ Benefits

✨ **Faster Test Creation** - Add tests in JSON instead of code  
🔧 **Easier Maintenance** - Update selectors once, tests update everywhere  
📦 **Better Organization** - Feature-based structure  
♻️ **High Reusability** - 21+ helper functions  
📈 **Scalable** - Manage 100+ tests easily  
📖 **Well Documented** - Multiple guides included  
🔄 **Backward Compatible** - Old code still works  

## 🔍 Debugging Tips

**Test fails? Check in this order:**
1. Is the selector correct? → Check `fixtures/selectors/*.json`
2. Is the test data correct? → Check `fixtures/data/*.json`
3. Is the helper function correct? → Check `support/helpers/*.js`
4. Is there a UI change? → Update the selector file

## 📈 Scaling the Framework

| Size | Approach |
|------|----------|
| 5-10 tests | Current structure (perfect!) |
| 50-100 tests | Add env-specific data files |
| 100+ tests | Add test tags/filters in JSON |
| Multi-env | Add environment config in cypress.config.js |

## 🤝 Contributing

1. Follow the existing structure for new features
2. Separate selectors, data, and logic
3. Use parameterized testing pattern
4. Update documentation when adding features
5. Maintain 100% data-driven approach

## ❓ FAQ

**Q: Can I use the old test format?**  
A: Yes, backward compatible. But new tests should use parameterized format.

**Q: How do I add selectors for a new page?**  
A: Create `cypress/fixtures/selectors/pageName.selectors.json`

**Q: Where do I put environment-specific data?**  
A: Create separate JSON files: `loginTestData.prod.json`, `loginTestData.dev.json`

**Q: How do I handle dynamic elements?**  
A: Use helper functions with parameters for flexibility.

## 📝 License

ISC

## 🙋 Support

- Check [QUICK_START.md](QUICK_START.md) for immediate answers
- See [DATA_DRIVEN_TESTING_GUIDE.md](DATA_DRIVEN_TESTING_GUIDE.md) for complete reference
- Review [MIGRATION_GUIDE.md](MIGRATION_GUIDE.md) for updating old tests

---

**Ready to start? → See [QUICK_START.md](QUICK_START.md)**
