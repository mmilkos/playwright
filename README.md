# Playwright Tests
E2E tests for the RealWorld App using Playwright.

## Prerequisites & Setup
1. Node.js (v20.19.0+)
2. Register account manually on [demo.realworld.show](https://demo.realworld.show/)
3. Clone and install dependencies:
```
npm install
npx playwright install chrome
```
4. Create a config folder and a .env file inside it (config/.env) with your account details:
```
BASE_URL=https://demo.realworld.show/
API_URL=https://api.realworld.show/api
USER_EMAIL=your_email@example.com
USER_PASSWORD=your_password
USER=your_username
```
## Run tests
- ``` npm run test ``` - Run tests in headless mode
- ``` npm run test:headed ``` - Run tests in the browser
- ```npm run test:ui ``` - Run tests with Playwright's interactive UI
-  ```npm run report ``` - View test results

## Highlights & Best Practices Applied
- Page object model
- Custom Playwright fixtures
- API state management (setup & cleanup)
- Network interception
- Dynamic test data
