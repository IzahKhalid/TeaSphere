# TeaSphere User Directory

A premium multi-page React app inspired by [Two Leaves and a Bud](https://twoleavestea.com/) — tea-inspired UI, user directory (JSONPlaceholder), tea menu with cart & checkout, and polished loading/error states.

## Live demo (Vercel)

**Production:** [https://bqassignment17.vercel.app](https://bqassignment17.vercel.app)

[![Live on Vercel](https://img.shields.io/badge/Live-bqassignment17.vercel.app-000?style=flat&logo=vercel)](https://bqassignment17.vercel.app)

---

## Features

### Pages

| Route | Description |
|-------|-------------|
| `/` | Cinematic home, featured members, reviews |
| `/menu` | Tea & snack shop with images, filters, cart |
| `/checkout` | Order form and confirmation (demo) |
| `/users` | Community directory with search, filter, sort |
| `/user/:id` | Member profile detail |
| `/about` | Brand story and animated stats |
| `/contact` | Contact form with loading & validation |
| `*` | Custom 404 page |

### UX & data

- **Loading:** Tea-themed spinner, section loaders, route transition overlay, skeleton cards
- **Errors:** API error messages, retry buttons, global React error boundary
- **Cart:** Persistent cart (localStorage), slide-out drawer, free shipping over $50
- **Animations:** Framer Motion page transitions, scroll reveals, magnetic buttons

### Stack

- React 18 + Vite 5
- React Router DOM 6
- Tailwind CSS 3
- Framer Motion 11
- Axios + JSONPlaceholder API
- Lucide React icons

---

## Getting started

### Prerequisites

- Node.js 18+
- npm 9+

### Install & run locally

```bash
cd bqassignment17
npm install --legacy-peer-deps
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

### Build

```bash
npm run build
npm run preview
```

---

## Deploy to Vercel

Configured per [Vercel Vite docs](https://vercel.com/docs/frameworks/vite) via `vercel.json`:

| Setting | Value |
|---------|--------|
| Framework | Vite |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Install Command | `npm install --legacy-peer-deps` |
| SPA routing | Rewrites to `index.html` |

### 1. Log in to Vercel CLI

```bash
npx vercel login
```

Complete authentication in the browser when prompted.

### 2. Deploy to production

```bash
cd bqassignment17
npm run deploy
# or: npx vercel --prod
```

Copy the **Production** URL from the CLI output (e.g. `https://bqassignment17.vercel.app`).

### 3. Deploy via Vercel Dashboard (alternative)

1. Push this folder to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) → Import repository.
3. Set **Install Command** to `npm install --legacy-peer-deps`.
4. Deploy — Vercel auto-detects Vite.

### Environment variables

None required. The app uses public JSONPlaceholder and Unsplash image URLs.

---

## Loading & error states

| Area | Loading | Error |
|------|---------|-------|
| Users list | `LoadingState` + spinner | `ErrorState` + retry |
| User detail | `LoadingState` | `ErrorState` + retry |
| Home featured | `LoadingSpinner` | `ErrorState` + retry |
| Route changes | `PageLoader` overlay | — |
| Checkout / Contact submit | Button spinner | Inline validation |
| React crashes | — | `ErrorBoundary` fallback |

`src/services/api.js` uses a 12s timeout and clear network/404 messages.

---

## Project structure

```
src/
├── animations/       # Framer Motion variants
├── components/
│   ├── cart/         # CartButton, CartDrawer
│   ├── menu/         # MenuProductCard
│   ├── ErrorBoundary.jsx
│   ├── ErrorState.jsx
│   ├── LoadingSpinner.jsx
│   ├── LoadingState.jsx
│   └── ...
├── context/          # CartContext
├── data/             # menuProducts.js
├── hooks/            # useUsers.js
├── layouts/          # RootLayout
├── pages/
├── services/         # api.js
└── utils/
```

---

## Color palette

| Token | Hex |
|-------|-----|
| Forest | `#1f3b2d` |
| Cream | `#f5efe6` |
| Sand | `#d8c3a5` |
| Sage | `#8ba888` |
| Charcoal | `#111111` |
| Gold | `#c49b66` |

---

## License

MIT — educational / portfolio use.
