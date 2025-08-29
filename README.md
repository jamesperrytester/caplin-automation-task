
# 🧪 Caplin Automation Task

## Overview

This automation task was completed within a strict 4-hour timebox due to limited availability before annual leave. The task was assigned late Thursday afternoon with a deadline of end of the day Friday, alongside existing work commitments. While **Scenario 5** remains incomplete, the following has been successfully implemented:

- ✅ Full test logic for **Scenarios 1 to 4**
- ✅ A **GitHub Actions YAML workflow** to run tests across all browsers, either sequentially or in parallel
- ✅ A **matrix strategy** for parallel browser execution
- ✅ Enhanced `package.json` scripts to support targeted test execution

> **Note:** For visibility into console logs to see the identified, extracted and displayed results, run tests in **non-UI mode**. Details of which are explained below.

---

## 🧰 Prerequisites

- **Node.js** v18 or higher
- **npm** (bundled with Node.js)
- Run `npm install` to install dependencies
- No need to manually install browsers — Playwright handles this automatically

---

## 🧪 Running Tests via PowerShell

### Run All Tests (Headless Mode)
```bash
npm run test
```

### Run All Tests on a Specific Browser (UI Mode)
```bash
npm run test:all:chromium:ui   # Chromium
npm run test:all:firefox:ui    # Firefox
npm run test:all:webkit:ui     # WebKit
```

### Run Individual Scenarios (UI Mode)
```bash
npm run test:scenario1:ui      # Navigate to site
npm run test:scenario2:ui      # Top 10 highest % change
npm run test:scenario3:ui      # Top 10 lowest % change
npm run test:scenario4:ui      # Market cap > 7 million
```

---

## ⚙️ CI/CD Workflow – GitHub Actions

### 🚀 Caplin Automation Tests Workflow

This GitHub Actions workflow automates Playwright test execution across multiple browsers and environments.

#### 🔁 Triggered By
- Pull requests to `main` or `master`
- Manual dispatch via GitHub UI with custom inputs

#### 🧩 Configurable Inputs

| Input      | Description                                      | Required | Default   | Options                                  |
|------------|--------------------------------------------------|----------|-----------|------------------------------------------|
| `env`      | Target environment (e.g., qa, stage, demo, live) | ❌       | *(empty)* | Custom string                             |
| `tests`    | Specific tests to run (space-separated)          | ❌       | *(empty)* | Custom string                             |
| `browser`  | Browser to run tests on                          | ✅       | `chrome`  | `all`, `chrome`, `firefox`, `webkit`     |

#### 🖥️ Key Features
- Dynamic browser selection via matrix strategy
- Browser-specific Playwright project configurations
- Input parameters logged in GitHub Actions summary
- Test reports uploaded as artifacts per browser
- Parallel execution support
- Automatic dependency and browser installation

#### 📦 Artifacts
- Retained for **30 days**
- Location: `playwright-report-${{ matrix.browser }}`

---

## 🛠️ YAML File Enhancements

The GitHub Actions YAML workflow was enhanced with the following capabilities:

- **Matrix strategy** to run tests in parallel across `chrome`, `firefox`, and `webkit`
- **Custom inputs** for environment, test selection, and browser targeting
- **Artifact uploads** for each browser’s test report
- **Playwright installation steps** to ensure all dependencies and browsers are available
- **Manual dispatch support** via GitHub UI for flexible and on-demand test execution

---
