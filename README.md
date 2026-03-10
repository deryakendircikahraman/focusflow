# FocusFlow – Study Session Planner

FocusFlow is a small React application that helps you plan focused study sessions, balance breaks with a simple Pomodoro-style timer, and review your progress over time.

## Features

- Create study sessions
- Edit and delete existing sessions
- Start a Pomodoro-style focus timer for a session
- Automatic break timer after focus time
- Study statistics dashboard
- Topic-based study distribution chart
- Productivity tip fetched from a public API
- Session data persistence using localStorage

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


## Routing

- `/` – Home
- `/planner` – Planner (create and edit sessions)
- `/history` – History and stats
- `*` – Not Found page

## Notes on libraries

- `react-router-dom` is used for routing.
- `recharts` is used for a single `PieChart` in the stats feature and manages its own DOM output in a React-friendly way.
