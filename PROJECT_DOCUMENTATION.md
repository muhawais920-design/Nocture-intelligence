# Nocturne Intelligence — Project Documentation

## Overview
Nocturne Intelligence is a student-focused academic dashboard described in the interface as a Student Ambient OS. It combines academic planning, course/task organization, an AI academic copilot and study/focus tools in a dark, mobile-inspired interface.

## Problem and Goal
University students manage timetables, courses, assignments, study hours and exam preparation across different tools. This project aims to bring these activities into one academic workspace.

## Main Modules
- Dashboard: GPA, attendance, study hours, schedule and tasks.
- Timetable and Schedule: view lectures and add schedule entries.
- Courses and Tasks: review courses, manage tasks and mark tasks complete.
- AI Academic Copilot: contextual prompts and AI assistance interface.
- Focus and Campus: study-session tools and study-time logging.
- Lecture, schedule and task modals.
- Responsive preview with simulated mobile-device frame and expanded layout.

## Academic Logic
The app imports helper functions to calculate GPA and task/deliverable statistics. React state manages the student profile, schedule, courses, tasks, selected lecture and AI prompt context.

## Technology
- React 19 and TypeScript
- Vite
- Tailwind CSS
- Lucide React
- Motion
- Google GenAI SDK dependency
- Manrope and JetBrains Mono fonts

The package manifest includes the Google GenAI SDK. Verify the actual AI service configuration and required environment variables before deployment.

## Workflow
The app loads initial student, schedule, course and task data from a mock-data module. The dashboard calculates GPA and task statistics. Users navigate to timetable, courses/tasks, AI copilot and focus/campus views. Users can add schedule items and tasks, toggle task completion and log study-session minutes. Contextual actions can prefill an AI query and open the copilot view.

## Data Scope
The inspected entry point initializes academic data from mock data and stores it in React component state. Production authentication or database-backed synchronization is not established by the inspected code.

## Run Locally
Requirements: Node.js and npm.
1. Clone: https://github.com/muhawais920-design/Nocture-intelligence
2. Open the folder and run: npm install
3. Run: npm run dev
4. Open http://localhost:3000

Production: npm run build, then npm run preview.

## Important Files
- src/App.tsx — state, navigation, responsive preview and page composition.
- src/components/ — dashboard, timetable, courses/tasks, AI copilot, focus/campus and modals.
- src/data/mockData.ts — initial demonstration data.
- src/types/index.ts — TypeScript data models.
- src/utils/academic-logic.ts — GPA and task-statistics calculations.
- index.html — page metadata and font loading.
- package.json — dependencies and scripts.

## Future Improvements
Add secure user accounts and cloud persistence, connect AI through a documented protected backend, add calendar export and reminders, test GPA/task calculations, and replace mock data with user-managed records.

## Learning Outcomes
React architecture, TypeScript, state management, academic calculations, responsive UI and AI integration planning.

## Repository
https://github.com/muhawais920-design/Nocture-intelligence
