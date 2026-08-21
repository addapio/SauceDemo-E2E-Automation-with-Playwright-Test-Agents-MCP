# SauceDemo E2E Automation with Playwright

End-to-end test automation project for the SauceDemo e-commerce application using Playwright and TypeScript. The project follows the Page Object Model (POM) and includes functional test coverage for core user workflows, test planning documentation, Playwright Test Agents, MCP integration, and continuous integration through GitHub Actions.

## Highlights

* End-to-end UI automation using Playwright
* TypeScript-based test implementation
* Page Object Model (POM) architecture
* Coverage of core SauceDemo user workflows
* Playwright Test Agents and MCP integration
* Test planning and documentation
* Automated CI execution with GitHub Actions
* Playwright HTML test reports uploaded as GitHub Actions artifacts

## Tech Stack

| Technology             | Purpose                                             |
| ---------------------- | --------------------------------------------------- |
| Playwright             | End-to-end browser automation and testing           |
| TypeScript             | Test and Page Object implementation                 |
| Node.js                | Runtime environment                                 |
| npm                    | Dependency management                               |
| Git & GitHub           | Version control and source management               |
| GitHub Actions         | Continuous integration and automated test execution |
| Playwright MCP         | Browser interaction and test development support    |
| Playwright Test Agents | Test planning, generation, and healing support      |

## Test Coverage

The project covers five core end-user operations within the SauceDemo application:

| Test Area            | Coverage                                              |
| -------------------- | ----------------------------------------------------- |
| Authentication       | User login workflow                                   |
| Product Browsing     | Product discovery and selection                       |
| Cart Management      | Adding, removing, and validating products in the cart |
| Checkout Information | Entering and validating checkout information          |
| Order Completion     | Reviewing and completing an order                     |

The automated test suites are located in the `tests/` directory.

## Project Structure

```text
SauceDemo-E2E-Automation-with-Playwright-Test-Agents-MCP/
│
├── .github/
│   ├── agents/
│   │   ├── playwright-test-generator.agent.md
│   │   ├── playwright-test-healer.agent.md
│   │   └── playwright-test-planner.agent.md
│   │
│   └── workflows/
│       ├── copilot-setup-steps.yml
│       └── playwright.yml
│
├── .vscode/
│   └── mcp.json
│
├── pages/
│   ├── CartPage.ts
│   ├── CheckoutCompletePage.ts
│   ├── CheckoutInformationPage.ts
│   ├── CheckoutOverviewPage.ts
│   ├── LoginPage.ts
│   ├── ProductDetailsPage.ts
│   └── ProductsPage.ts
│
├── specs/
│   ├── README.md
│   └── sauce-demo-core-user-operations.plan.md
│
├── tests/
│   ├── browse-products.spec.ts
│   ├── checkout-information.spec.ts
│   ├── complete-order.spec.ts
│   ├── login.spec.ts
│   └── manage-cart.spec.ts
│
├── .gitignore
├── package.json
├── package-lock.json
└── playwright.config.ts
```

## Page Object Model

The project uses the Page Object Model to separate page-specific interactions from test logic.

Each page class in the `pages/` directory represents a page or major workflow within the application and contains its relevant locators and actions.

The test files in `tests/` use these Page Objects to perform user workflows, keeping the test cases readable, maintainable, and easier to update when the application changes.

## Setup and Installation

Clone the repository:

```bash
git clone https://github.com/addapio/SauceDemo-E2E-Automation-with-Playwright-Test-Agents-MCP.git
cd SauceDemo-E2E-Automation-with-Playwright-Test-Agents-MCP
```

Install project dependencies:

```bash
npm install
```

Install the Playwright browsers:

```bash
npx playwright install
```

## Running Tests

Run the complete test suite:

```bash
npx playwright test
```

Run tests with the Playwright browser visible:

```bash
npx playwright test --headed
```

Run a specific test file:

```bash
npx playwright test tests/login.spec.ts
```

Run tests using a specific browser:

```bash
npx playwright test --project=chromium
```

## Test Reports

Playwright generates an HTML test report after test execution.

To open the report locally:

```bash
npx playwright show-report
```

The generated `playwright-report/` directory is excluded from version control through `.gitignore`.

For CI execution, the Playwright HTML report is automatically uploaded as a GitHub Actions artifact and can be accessed from the corresponding workflow run under the `playwright-report` artifact.

## CI/CD

The project uses GitHub Actions to automatically execute the Playwright test suite.

The workflow is defined in:

```text
.github/workflows/playwright.yml
```

The workflow runs on pushes and pull requests targeting the `main` or `master` branches.

The pipeline performs the following steps:

1. Checks out the repository
2. Sets up Node.js
3. Installs dependencies using `npm ci`
4. Installs Playwright browsers and required dependencies
5. Executes the complete Playwright test suite
6. Uploads the Playwright HTML report as a workflow artifact

This provides automated test execution and validation whenever changes are pushed to the repository.

## Playwright Test Agents and MCP

The project also includes Playwright Test Agents and Playwright MCP configuration to support test planning, generation, browser interaction, and test maintenance.

Agent configurations are located in:

```text
.github/agents/
```

The available agents include:

* `playwright-test-planner.agent.md`
* `playwright-test-generator.agent.md`
* `playwright-test-healer.agent.md`

Playwright MCP configuration is maintained through:

```text
.vscode/mcp.json
```

These tools are used as part of the test development workflow alongside the core Playwright automation framework.

## Test Documentation

Detailed test planning documentation is maintained separately under the `specs/` directory.

The test plan covers the five core SauceDemo user operations and provides additional context for the automated test coverage.

## CI Status

The Playwright test suite is executed automatically through GitHub Actions.

Current CI workflow:

[Playwright Tests](https://github.com/addapio/SauceDemo-E2E-Automation-with-Playwright-Test-Agents-MCP/actions)
