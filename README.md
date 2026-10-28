# Trello SaaS — QA Automation Framework

## Project Overview

A UI test automation framework for a Trello-like SaaS application, built with **Playwright and TypeScript** using the Page Object Model (POM).

The project focuses on automating critical SaaS workflows, validating Role-Based Access Control (RBAC), and maintaining reliable regression coverage for board management, task management, authentication, and simulated AI task suggestions.

It demonstrates a structured approach to building maintainable, reusable, and scalable end-to-end test automation.

## Technologies Used

- **Language:** TypeScript
- **Automation:** Playwright
- **Design Pattern:** Page Object Model (POM)
- **Test Coverage:** UI, authentication, RBAC, regression, and task workflows
- **CI/CD:** GitHub Actions
- **Reporting:** Playwright HTML Reporter

## Key Objectives

- Automate critical user journeys in a Trello-like SaaS application.
- Validate authentication and role-specific permissions.
- Test board creation, deletion, and member management.
- Automate task creation, assignment, updates, and status changes.
- Validate simulated AI-generated task suggestions.
- Build reusable page objects, fixtures, and test utilities.
- Support automated test execution and reporting through GitHub Actions.

## Project Structure

```text
Trello-SaaS-Combined/
├── README.md
└── Automation/
    ├── package.json
    ├── tsconfig.json
    ├── playwright.config.ts
    ├── tests/
    │   ├── auth.spec.ts
    │   ├── board.spec.ts
    │   ├── task.spec.ts
    │   └── ai.spec.ts
    ├── pages/
    │   ├── BasePage.ts
    │   ├── LoginPage.ts
    │   ├── BoardPage.ts
    │   └── TaskPage.ts
    ├── fixtures/
    │   ├── users.ts
    │   └── tasks.ts
    ├── helpers/
    │   └── AIHelper.ts
    └── reports/
        └── html/
```

*The structure above reflects the intended project layout; update it if your current repository differs.*

## Automated Test Coverage

### 1. Authentication and RBAC

- Validate successful and unsuccessful login scenarios.
- Verify access based on Admin, Member, and Observer roles.
- Confirm that restricted actions are unavailable to unauthorized users.
- Validate role-specific access to boards and tasks.

### 2. Board Management

- Create and delete boards with appropriate permissions.
- Manage board members and role assignments.
- Validate authorization rules for board-level actions.

### 3. Task Management

- Create and update tasks.
- Assign tasks to members.
- Manage labels, due dates, and comments.
- Move tasks between workflow statuses.
- Verify that Observer users cannot modify tasks.

### 4. Simulated AI Task Suggestions

- Generate simulated suggestions for task improvements.
- Validate suggestions such as adding checklists, assigning members, setting due dates, and applying labels.
- Verify that applying a suggestion updates the relevant task correctly.

**Note:** AI suggestions are simulated through test helper logic. This project does not claim to integrate with a real AI model.

## Framework Design

### Page Object Model

Page classes encapsulate page-specific locators and user interactions, separating test scenarios from UI implementation details.

### Test Fixtures and Data

Reusable fixtures and test data support role-based scenarios and consistent test execution across authentication, board, and task workflows.

### Reusable Helpers

Shared helper utilities reduce duplication and centralize common test operations, including simulated AI suggestion generation.

### Assertions and Reliability

Playwright assertions validate application behavior and expected UI states. Reliable locators and appropriate synchronization help reduce flaky test execution.

## CI/CD Integration

GitHub Actions can execute the Playwright test suite automatically as part of a configured workflow.

The pipeline can support:

- Automated dependency installation.
- Playwright browser installation.
- Automated test execution.
- Test result collection.
- HTML report generation and artifact retention.

## Running the Tests

Run these commands from the `Automation` directory.

Install dependencies:

```bash
npm ci
```

Install Playwright browsers:

```bash
npx playwright install --with-deps
```

Run all tests:

```bash
npx playwright test
```

Open the HTML report:

```bash
npx playwright show-report
```

## Project Goals

This project demonstrates practical skills in:

- TypeScript-based UI automation.
- Playwright framework development.
- Page Object Model implementation.
- Authentication and RBAC testing.
- End-to-end regression automation.
- Test data and fixture management.
- CI/CD test execution and reporting.

## Future Improvements

- Expand regression coverage for critical SaaS workflows.
- Improve test isolation and test data management.
- Add API-level validation where supported.
- Enhance CI reporting and failure diagnostics.
- Extend cross-browser coverage.

---

**Project Focus:** Maintainable Playwright automation for SaaS applications, with an emphasis on reliable regression coverage, authorization testing, and practical CI/CD integration.
