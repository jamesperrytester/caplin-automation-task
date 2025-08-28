# caplin-automation-task

## Installation of Dependencies
Run
'''npm install'''

to ensure all dependencies are installed.

## Running Tests from PowerShell

To run all Playwright tests on all browsers (default), you can choose one of the following options:

    npm run test
    npm run test:all
    npm run test:all:allbrowsers

To run all tests on a specific browser:

    npm run test:all:chromium   # Run all tests on Chromium
    npm run test:all:firefox    # Run all tests on Firefox
    npm run test:all:webkit     # Run all tests on WebKit

To run an individual scenario, on all browsers:

    npm run test:scenario1      # Navigate to site
    npm run test:scenario2      # Top 10 highest % change
    npm run test:scenario3      # Top 10 lowest % change
    npm run test:scenario4      # Market cap > 7 million

Run these commands in your PowerShell terminal from the project directory to execute the tests as needed.