# Day Dashboard ⏱️

An always-on **Day Dashboard** web app built with **React**, **Vite**, and **plain CSS variables** (zero external UI framework). Designed to stay open on a 1920×1080 monitor all day, showing what you should be doing right now and what comes next, with effortless legibility from 2 meters away.

---

## 🌟 Key Features

- **Live Accurate Clock & Date**:
  - Live clock (`HH:MM:SS` or `12-hour`) and localized date in **Asia/Dhaka** (`Wednesday, November 18, 2026` / `বুধবার, ১৮ নভেম্বর ২০২৬`).
  - Derived strictly from `Date.now()`, never from counting ticks.
  - Automatically recalculates on `visibilitychange` when waking or switching tabs.
- **Hero Element (Current Block)**:
  - Giant readable typography with task name, time range, optional notes, and live countdown (`MM:SS` or `H:MM:SS`).
  - Smooth animated progress bar (0% - 100%) with ambient category glow.
  - Category-tinted radial gradient background with 400ms smooth transitions.
  - **Last 5 minutes**: Countdown pulses gently so you notice upcoming transitions.
- **Next Block Line**:
  - Quiet, clean indicator under the hero: start time, task name, and `in X min`.
- **Full-Day Timeline**:
  - Compact complete day schedule list.
  - Past blocks are dimmed, the current block is highlighted with an active category glow, and upcoming blocks remain clean and legible.
- **Midnight Crossing & Automatic Gap Filling**:
  - Blocks seamlessly cross midnight (e.g., `Sleep 23:00 - 06:30`).
  - Unscheduled gaps (e.g. `15:45 - 16:00` and `22:30 - 23:00`) are auto-filled as `"Buffer"` blocks (`Break/Buffer` slate category).
  - Rolls over to the next day automatically at midnight without refreshing.
- **Profiles (Weekday & Weekend)**:
  - Weekday profile (default schedule).
  - Weekend profile (Friday & Saturday in Bangladesh), auto-selected by day of week with manual override.
- **Anti-Burn-In Protection**:
  - Subtle sub-pixel layout shifting every 3 minutes prevents static burn-in on always-on displays.
- **Monitor & Accessibility Modes**:
  - **F**: Toggle Fullscreen.
  - **M**: Toggle Mini mode / Document Picture-in-Picture window (always-on-top in Chrome).
  - **T**: Toggle Dark / Light theme.
  - **E**: Open full interactive schedule editor (with overlap validation, reorder, add/delete, JSON backup/restore).
  - **?**: Keyboard shortcuts cheat sheet.
- **Audio & Notifications**:
  - Optional soft Web Audio API harmonic chime on block transitions.
  - Optional desktop notifications (permission requested only when enabled).
- **Keep Screen Awake**:
  - Screen Wake Lock API integration to prevent display sleep.
- **Installable Desktop PWA**:
  - Web App Manifest and offline caching service worker for desktop installation via Chrome.
- **Test Simulation Mode**:
  - Use `?time=14:20` or `?time=23:15` query parameter to simulate any time of day for testing and demonstrations.

---

## 🎨 Schedule & Category Colors

| Category | Color | Included Default Blocks |
| :--- | :--- | :--- |
| **Morning routine** | Teal | `06:30-08:00` Morning routine (fresh up, bath, prayer, breakfast) |
| **Job search** | Orange | `08:00-09:30` Filter jobs, apply to 2-3, update tracker<br>`15:00-15:45` Follow-ups, LinkedIn |
| **Excel** | Green | `09:30-10:15` Excel learning<br>`21:00-21:45` Excel practice (Yellow Belt study) |
| **English** | Blue | `10:30-11:10` Part 1: Vocabulary, Grammar, Listening<br>`19:30-20:10` Part 2: Shadowing, Speaking, Writing |
| **Shop work** | Purple | `11:10-12:10` Block 1: Inventory & customer service<br>`14:00-15:00` Block 2: Orders & stock updates |
| **Rest/Meal/Prayer**| Amber | `12:10-14:00` Lunch, prayer, rest<br>`18:30-19:30` Family, prayer<br>`20:10-21:00` Dinner<br>`21:45-22:30` Relax |
| **Adda/Outside** | Pink | `16:00-18:30` Adda / outside |
| **Break/Buffer** | Slate | `10:15-10:30` Break<br>`15:45-16:00` Auto Buffer<br>`22:30-23:00` Auto Buffer |
| **Sleep** | Indigo | `23:00-06:30` Sleep (Midnight crossing) |

---

## 🚀 Run & Build Instructions

### Prerequisites
- Node.js 18+ (tested on Node v22.23.2)
- npm 9+

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```

### 3. Run Unit Tests (Vitest)
```bash
npm test
```

### 4. Build for Production
```bash
npm run build
```

---

## ☁️ Vercel Deployment Settings

When deploying this project to **Vercel**, use the following configuration:

- **Framework Preset**: `Vite`
- **Root Directory**: `./` (or `day-dashboard` if deploying from a monorepo)
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`
