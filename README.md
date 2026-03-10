# FocusFlow – Study Session Planner

FocusFlow is a small React application that helps you plan focused study sessions, balance breaks with a simple Pomodoro-style timer, and review your progress over time.

## Tech stack

- Vite (React template, JavaScript)
- React
- React Router (`react-router-dom`)
- Recharts (for a simple stats chart)

## Getting started

1. Clone the repo

```bash
git clone https://github.com/deryakendircikahraman/focusflow.git
cd focusflow
```

2. Install dependencies

```bash
npm install
```

3. Run the dev server

```bash
npm run dev
```

4. Build for production (optional)

```bash
npm run build
```

## Environment variables

This project currently uses only client-side state and `localStorage`. If you add APIs later, use `.env.local` for secrets and keep the example values in `.env.local.example`.

## Features

- Plan study sessions with a title, topic, focus duration, and break duration
- Create and edit sessions (state lives in `PlannerPage` and is passed to feature components)
- Persist sessions using `localStorage`
- View basic study stats and a simple topic-based chart on the History page
- Use a basic Pomodoro-style focus timer on the Planner page

## Routing

- `/` – Home
- `/planner` – Planner (create and edit sessions)
- `/history` – History and stats
- `*` – Not Found page

## Notes on libraries

- `react-router-dom` is used for routing.
- `recharts` is used for a single `PieChart` in the stats feature and manages its own DOM output in a React-friendly way.
