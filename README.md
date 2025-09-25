# Trello-SaaS-Combined: Manual + Automation + Simulated AI

## Project Overview
This project demonstrates an **end-to-end QA lifecycle** for a Trello-like SaaS application, combining **manual testing**, **automation testing**, and **simulated AI task suggestions**. It covers core SaaS workflows including **Boards**, **Tasks**, **Users**, and **Roles**, while validating **RBAC (Role-Based Access Control)** for Admin, Member, and Observer roles.  

**Technologies Used:**  
- Manual Testing: Test Plans, Test Cases, Bug Reports  
- Automation: Playwright + TypeScript + Page Object Model (POM)  
- Simulated AI: Dynamic task suggestions for innovation  

##  Objectives
- Test core SaaS workflows: Boards, Tasks, Users, Roles  
- Validate RBAC (Admin, Member, Observer)  
- Execute manual test cases and log bugs  
- Implement automation for regression, RBAC checks, and core flows  
- Simulate AI task suggestions for a dynamic testing edge  
- Showcase a complete QA portfolio project  


##  Project Structure

Trello-SaaS-Combined/
│
├── README.md
├── ManualTesting/
│ ├── TestPlan.md
│ ├── TestCases/
│ │ ├── auth_testcases.md
│ │ ├── board_testcases.md
│ │ └── task_testcases.md
│ └── BugReports/
│ └── Screenshots + logs
├── Automation/
│ ├── package.json
│ ├── tsconfig.json
│ ├── playwright.config.ts
│ ├── tests/
│ │ ├── auth.spec.ts
│ │ ├── board.spec.ts
│ │ ├── task.spec.ts
│ │ └── ai.spec.ts
│ ├── pages/
│ │ ├── BasePage.ts
│ │ ├── LoginPage.ts
│ │ ├── BoardPage.ts
│ │ └── TaskPage.ts
│ ├── fixtures/
│ │ ├── users.ts
│ │ └── tasks.ts
│ ├── helpers/
│ │ └── AIHelper.ts
│ └── reports/
│ └── html/

markdown
Copy code

---

##  Manual Testing Plan

### A. Authentication & RBAC
- **Admin:** Login, create/delete boards, invite/remove members  
- **Member:** Create/move tasks, cannot delete boards  
- **Observer:** View-only access  
**Expected:** Permissions strictly enforced  

### B. Board Management
- Create boards (Admin)  
- Invite members with specific roles (Admin)  
- Delete board (Admin only)  
**Expected:** Correct restrictions applied  

### C. Task Management
- Create tasks/cards, assign members  
- Add labels, due dates, comments  
- Move completed tasks to "Done"  
- Observer: cannot modify tasks  
**Expected:** Tasks behave per role  

### D. Simulated AI Suggestions
- Example: "Add checklist", "Assign member", "Set due date"  
- Verify suggestions apply correctly  
**Expected:** Task updated as per AI simulation  


## Automation Testing Plan

### Why Automation?
- Regression testing: ensure old flows remain intact  
- Repetitive checks: RBAC rules, task creation  
- Faster execution: 50+ test cases run in minutes  
- Consistency: avoid human error  
- Portfolio showcase: Playwright + POM in action  

### Tests
- `auth.spec.ts` → Login + role validation  
- `board.spec.ts` → Board creation, deletion, member invites  
- `task.spec.ts` → Task lifecycle management  
- `ai.spec.ts` → Apply simulated AI suggestions  

### Fixtures
- `users.ts`: Admin, Member, Observer accounts  
- `tasks.ts`: Sample task titles, labels, priorities  

### Helpers
- `AIHelper.ts`: Simulates AI suggestions  
```ts
export const getAISuggestion = (taskTitle: string) => {
  const suggestions = [
    `Add checklist to "${taskTitle}"`,
    `Assign member to "${taskTitle}"`,
    `Set due date for "${taskTitle}"`,
    `Add label "Urgent" to "${taskTitle}"`
  ];
  return suggestions[Math.floor(Math.random() * suggestions.length)];
};
Page Objects
BasePage.ts: Common utilities (click, fill, wait)

LoginPage.ts: Role-specific login methods

BoardPage.ts: Create/delete boards, manage members

TaskPage.ts: Task lifecycle + apply AI suggestions

