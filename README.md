# User Management Dashboard

A responsive single-page application for viewing, adding, editing, and deleting users. Built with React + Vite, styled with Tailwind CSS, and powered by the free [JSONPlaceholder](https://jsonplaceholder.typicode.com) mock API.

---

## Features

- **View** all users fetched from JSONPlaceholder `/users`
- **Add** a new user (POST request — simulated by the API)
- **Edit** any existing user (PUT request — simulated by the API)
- **Delete** a user with a confirmation prompt (DELETE request — simulated)
- **Search** across first name, last name, email, and department simultaneously
- **Sort** by first name, last name, email, or department (A→Z / Z→A)
- **Filter panel** with per-field inputs for fine-grained filtering
- **Pagination** with selectable page sizes: 10, 25, 50, 100; with first/prev/next/last controls
- **Form validation** using `react-hook-form` — all fields required; email format checked
- **Error handling** — API failures show a dismissible banner; loading shows a spinner
- **Responsive layout** — works on mobile, tablet, and desktop screens

---

## Tech Stack

| Tool | Version | Reason |
|---|---|---|
| React | 18 | Component-based UI |
| Vite | 6 | Fast dev server & build |
| Tailwind CSS | 3 | Utility-first styling |
| Axios | 1.7 | HTTP requests |
| react-hook-form | 7 | Form state + validation |

---

## Project Structure

```
src/
├── components/
│   ├── FilterPanel.jsx    # Collapsible filter inputs
│   ├── Pagination.jsx     # Page size selector + page navigation
│   ├── SearchBar.jsx      # Search input + sort dropdown
│   ├── UserForm.jsx       # Add / Edit form with validation
│   └── UserTable.jsx      # Data table with Edit / Delete actions
├── services/
│   └── api.js             # Axios instance + API helper functions
├── utils/
│   └── helpers.js         # transformUsers – maps API shape to app shape
├── App.jsx                # Root component; holds all state + logic
├── index.css              # Tailwind directives + global resets
└── main.jsx               # React entry point
```

---

## Setup & Run

### Prerequisites
- Node.js ≥ 18
- npm ≥ 9 (or yarn / pnpm)

### Steps

```bash
# 1. Clone or download the repository
git clone https://github.com/MedisettiRenukeswar/user-management-dashboard
cd user-management-dashboard

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
# → Opens at http://localhost:5173

# 4. Build for production
npm run build
# → Output goes to dist/

# 5. Preview the production build locally
npm run preview
```

---

## Deploying to Vercel

1. Push this project to a **public GitHub repository**.
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub.
3. Click **"Add New → Project"** and import your repository.
4. Vercel auto-detects Vite. Confirm these settings:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Click **Deploy**. Your live URL is ready in ~1 minute.

---

## Assumptions Made

- JSONPlaceholder's `/users` endpoint returns 10 users. The **Add** and **Edit** operations call the real API but the response is simulated (the data isn't persisted server-side), so changes are reflected only in local state during the current session.
- The `company.name` field from JSONPlaceholder is used as the **Department** value since the API doesn't have a department field.
- User IDs for newly added users are assigned as `existingUsers.length + 1` — good enough for a demo with no real backend.

---

## Challenges & Future Improvements

**Challenges during development:**
- JSONPlaceholder always returns `id: 11` for POST requests, so local ID generation was needed to keep the list consistent.
- Managing the interaction between search, filters, sort, and pagination required careful state reset (page resets to 1 whenever filters change) to avoid empty pages.

**If given more time, I would:**
- Add a real backend (Node + Express or Supabase) so data persists across sessions.
- Add debouncing to the search input to reduce unnecessary re-renders on large lists.
- Add unit tests with React Testing Library for the form validation and filtering logic.
- Add column-header click sorting directly on the table.
- Support inline editing (clicking a cell to edit in place).
- Add toast notifications for success/error feedback instead of a static banner.
