# ABTalks

ABTalks is a 60-day developer learning dashboard built for students and challenge-driven learners. It combines a React/Vite frontend with a Flask backend, providing daily challenge tracking, a progress calendar, status-based streak tracking, and challenge submission flows.

## Live Demo

- Live deploy link: https://ab-talks-9ovk.onrender.com

## Project Description

This web app is designed as a multi-page student learning dashboard with the following capabilities:

- Daily challenge overview with status indicators for `completed`, `pending`, and `incomplete`
- Challenge calendar with visual color coding and safe navigation
- Current streak tracking and progress metrics
- Challenge submission workflow with GitHub and LinkedIn link validation
- Flask backend for API support and status normalization
- Responsive UI using modern Tailwind-inspired utility classes

## Features

- Today's challenge card with a direct call-to-action
- Vertical challenge history feed ordered from newest to oldest
- Challenge calendar with color-coded status tiles
- Streak reset logic when a previous day is missed
- Fixed footer and safe content padding for mobile-friendly layout

## Tech Stack

- React 19
- Vite
- React Router DOM
- Flask
- Express-style static serving for production builds
- Tailwind-like utility classes for styling

## Run Locally

```bash
cd try
npm install
npm run build
python server.py
```

Then open `http://localhost:5000` in your browser.

## Repository

- GitHub repo: https://github.com/Veerang-112/ABtalks
- Live deploy link: https://veerang-112.github.io/ABtalks

## Notes

The README can be updated once the exact hosted URL is available or when the project is deployed to a hosting provider.
