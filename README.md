# Smart Quiz Frontend

This is the frontend for the Smart Quiz application, built with React, Vite, and TypeScript.

## Tech Stack

- **Framework:** React.js + Vite
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion, GSAP
- **Component Library:** shadcn/ui (Tailwind + Radix)
- **State Management:** Zustand or Redux Toolkit
- **API Calls:** Axios or native fetch
- **Routing:** React Router v6
- **Forms & Validation:** React Hook Form + Zod
- **Charts:** Recharts or Chart.js
- **Data Fetching:** React Query or SWR
- **Icon Pack:** Lucide or Heroicons

## Essential Tools

- **Vite**: Super-fast React dev server
- **ESLint + Prettier**: Code quality + formatting
- **TypeScript**: Safer code, better DX
- **Git + GitHub**: Version control + collaboration
- **PostCSS + Autoprefixer**: For browser compatibility

## Project Structure

```
smart_quiz_frontend/
├── public/
│   └── index.html
├── src/
│   ├── assets/              # Images, icons, etc.
│   ├── components/          # Reusable UI components
│   ├── features/            # Quiz, Auth, Leaderboard, Goals etc.
│   ├── pages/               # Home, Dashboard, Profile, etc.
│   ├── services/            # API calls to FastAPI backend
│   ├── hooks/               # Custom React hooks
│   ├── stores/              # Zustand or Redux state logic
│   ├── utils/               # Helper functions
│   ├── App.tsx              # Root component
│   ├── main.tsx             # Entry point (with Vite)
│   └── tailwind.config.js   # Tailwind theme settings
├── .env                     # Frontend environment variables
├── index.html
└── package.json
```

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the dev server:
   ```bash
   npm run dev
   ```
3. Build for production:
   ```bash
   npm run build
   ```

---

For more details, see the documentation for each tool in the stack.
