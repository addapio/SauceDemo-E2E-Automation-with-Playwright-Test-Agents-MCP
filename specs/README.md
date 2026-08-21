# Test Specifications

This directory contains the test specifications and planning artifacts used for the SauceDemo Playwright automation project.

The specifications define the user workflows, test scenarios, steps, and expected results before they are implemented as automated Playwright tests.

## Test Planning Workflow

The project follows this Playwright Test Agents workflow:

**1. Application Exploration**
Explore the SauceDemo application using Playwright MCP.

**2. Planner**
Create structured test scenarios based on the application's workflows.

**3. Test Specification**
Document the scenarios, steps, and expected results.

**4. Generator**
Convert the test specifications into Playwright test cases.

**5. Playwright Tests**
Execute the generated tests against SauceDemo.

**6. Healer**
Analyze failing tests and assist with fixing issues when required.

## Contents

### `sauce-demo-test-plan.md`

Contains the detailed test plan for the core SauceDemo workflows:

- Authentication
- Product browsing and selection
- Shopping cart management
- Checkout information
- Order review and completion

Each scenario is mapped to its corresponding automated test in the `tests/` directory.
