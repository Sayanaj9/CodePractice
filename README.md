# CodePractice

A full-stack coding practice platform for solving algorithmic problems, running code, and viewing test results with AI-powered analysis.

---

## Live Demo

Demo Link: https://code-practice-jade.vercel.app/home



## Features
- Browse coding questions by category and difficulty
- View question descriptions and sample testcases
- Write and run code in an in-browser Monaco editor
- See real-time test results (Passed/Failed)
- Analyze code complexity with AI
- Responsive, modern UI with Tailwind CSS
- Backend with Express and PostgreSQL
- Unit testing with Jest and React Testing Library

## Tech Stack
- **Frontend:** React, TypeScript, Tailwind CSS, Vite, Redux Toolkit, React Router, Monaco Editor
- **Backend:** Node.js, Express
- **Database:** PostgreSQL(Neon)
- **AI Integration:** OpenRouter AI API 
- **Testing:** Jest, React Testing Library
- **Deployment:** Vercel (Frontend), Render (Backend)

## Architecture Diagram

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    participant Database
    participant AI
    User->>Frontend: Interacts with UI
    Frontend->>Backend: Fetch questions/testcases, submit code
    Backend->>Database: Query questions/testcases
    Backend->>AI: Send code for analysis
    AI-->>Backend: Return analysis
    Backend-->>Frontend: Return results/analysis
    Frontend-->>User: Display results
```

---

## Screenshots

### Home Page
![Home](./screenshots/home.png)

---

### Coding Workspace

![Workspace](./screenshots/passed_testcases/codesection1.png)

#### Successful Testcase Execution (Including Hidden Testcases)

![Testcase](./screenshots/passed_testcases/codesection2.png)

![Testcase](./screenshots/passed_testcases/codesection3.png)

#### Partial Testcase Failure Scenario

![Testcase](./screenshots/failed_testcases/codesection1.png)

![Testcase](./screenshots/failed_testcases/codesection2.png)
---

### AI Analysis

![AI Analysis](./screenshots/ai.png)

### Jest Unit Test Results

![Unit Testcases](./screenshots/unit_testcase.png)

---

## Setup Instructions

### Prerequisites
- Node.js (v18+ recommended)
- npm
- PostgreSQL

### 1. Clone the repository
```sh
git clone <repo-url>
cd CodePractise
```

### 2. Backend Setup
```sh
cd backend
npm install
# Configure your .env with DB connection and OpenRouter API key
npm run dev
```

### 3. Frontend Setup
```sh
cd frontend
npm install
npm run dev
```

### 4. Database Setup
- Create a PostgreSQL database and run the provided schema/migration scripts in `backend/db/`.

### 5. Running Tests
```sh
cd frontend
npm test
```

---

## Folder Structure
```
CodePractise/
├── backend/
│   ├── src/
│   ├── db/
│   └── ...
├── frontend/
│   ├── src/
│   ├── public/
│   └── ...
└── README.md
```

---

## Future Improvements

- Authentication
- Submission history
- Search and sort based on question type and difficulty

---

## Author
Sayana Joy
- GitHub: https://github.com/Sayanaj9     
- Portfolio: https://sayanajoy-portfolio.vercel.app/
