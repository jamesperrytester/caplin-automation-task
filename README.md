# caplin-automation-task

## Installation of Dependencies
Run
'''npm install'''

to ensure all dependencies are installed.

## Running Tests from PowerShell

To run all Playwright tests on all browsers, headless (default), you can run:

    npm run test

To run all Playwright tests on a specific browser, in UI mode, you can run:

    npm run test:all:chromium:ui   # Run all tests on Chromium
    npm run test:all:firefox:ui    # Run all tests on Firefox
    npm run test:all:webkit:ui     # Run all tests on WebKit

To run an individual scenario, on all browsers, in UI mode, you can run:

    npm run test:scenario1:ui      # Navigate to site
    npm run test:scenario2:ui      # Top 10 highest % change
    npm run test:scenario3:ui      # Top 10 lowest % change
    npm run test:scenario4:ui      # Market cap > 7 million

Run these commands in your PowerShell / Npm terminal from the project directory to execute the tests as needed.

## CI/CD - yaml file

## 🚀 Caplin Automation Task Tests Workflow

This GitHub Actions workflow automates the execution of Playwright tests for Caplin applications across multiple environments and browsers.

### 🔧 Triggered By
- **Pull Requests** to `main` or `master`
- **Manual Dispatch** via GitHub UI with customizable inputs

### 🧪 Configurable Inputs
InputDescriptionRequiredDefaultOptionsenvTarget environment (qa, stage, demo, live)❌(empty)Custom string| `tests`   | Specific tests to run (space-separated, comma-wrapped) | ❌       | *(empty)* | Custom string                    |
| `tags`    | Tags to filter tests (e.g., `@critical`)         | ❌       | *(empty)* | Custom string                    |
| `browser` | Browser to run tests on                          | ✅       | `chrome`  | `all`, `chrome`, `firefox`, `webkit` |

### 🖥️ Features
- Dynamically runs tests only on the selected browser(s)
- Uses Playwright projects for browser-specific configurations
- Logs input parameters to the GitHub Actions summary
- Uploads test reports as artifacts for each browser
- Supports parallel execution with matrix strategy
- Automatically installs dependencies and Playwright browsers

### 📦 Artifacts
- Test reports are uploaded per browser and retained for **30 days**.

### 📁 Output Location
- Artifacts: `playwright-report-${{ matrix.browser }}`

---

For any issues or enhancements, feel free to open a pull request or contact the test engineering team.
