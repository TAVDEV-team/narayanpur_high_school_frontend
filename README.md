# Narayanpur High School Frontend

The official frontend for **Narayanpur High School**. It provides a public school website and role-based account areas for students, teachers, staff, and school administrators.

The application is built with React and Vite, styled with Tailwind CSS, and connects to a REST API hosted at Render.

## Features

### Public website
- School introduction, welcome message, and principal information
- Latest notices and notice detail pages
- Governing body, teacher, and staff listings
- Admission documents
- School routine and syllabus
- Exam results and result cards
- Photo gallery
- Fund and transaction information
- Contact and school information

### Account and administration
- JWT-based login and automatic access-token refresh
- Role-based profile dashboard
- Student, teacher, and staff registration forms
- Password changes
- Notice creation and approval
- Result entry and updates
- Class and student browsing
- Gallery photo and category management
- Routine and message management

## Technology stack

- React 19
- React Router 6
- Vite 6
- Tailwind CSS 3
- Axios
- Framer Motion
- Swiper and React Slick
- Lucide React and React Icons
- React Toastify
- html2pdf.js
- Font Awesome
- ESLint

## API integration

The frontend uses Axios in `src/api/api.js`. The default API base URL is:

```text
https://narayanpur-high-school.onrender.com/api
```

Authenticated requests send the `accessToken` from `localStorage` as a Bearer token. The Axios response interceptor refreshes expired access tokens through `/user/token/refresh/`; if refreshing fails, the application clears its stored authentication data and redirects to `/login`.

The repository also contains `.env` with:

```text
VITE_API_BASE_URL=http://127.0.0.1:8000/api/
```

This value is currently not consumed by `src/api/api.js`. The API base URL must be changed in that file to use a different backend.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Public home page |
| `/documents` | Admission documents |
| `/notice-approved` | Approved notices |
| `/notice-pending` | Pending notices |
| `/notices-create` | Create a notice |
| `/notices/:id` | Notice details |
| `/routine` | School routine |
| `/update-routine` | Routine management |
| `/syllabus` | Syllabus listing |
| `/syllabus/:id` | Syllabus viewer |
| `/results` | Exam and result entry point |
| `/results/:examId` | Classes for an exam |
| `/results/:examId/:classId` | Result table |
| `/add-result` | Add or update results |
| `/result` | Exam card |
| `/portal` | Student portal |
| `/class/:grade` | Grade view |
| `/class/:grade/:group` | Students in a grade group |
| `/student` | Add a student |
| `/teacher` | Teacher information |
| `/staffs` | Staff information |
| `/governing-body` | Governing body |
| `/gallery` | School gallery |
| `/fund` | Fund and transaction information |
| `/contact` | Contact information |
| `/login` | Account login |
| `/profile` | Role-based account dashboard |
| `/change-pass` | Change password |
| `/add-staffs` | Add staff |
| `/addteacher` | Add teacher |
| `/add-message` | Add a school message |

Unknown routes redirect to the home page.

## Project structure

```text
.
├── public/                 # Static images, logo, and video assets
├── src/
│   ├── api/                # Axios client and paginated list helper
│   ├── assets/             # Bundled source assets
│   ├── components/
│   │   ├── Common/         # Shared cards and list wrappers
│   │   ├── buttons/        # Loading and PDF buttons
│   │   ├── Titles/         # Section headers
│   │   ├── Footer.jsx
│   │   ├── Layout.jsx
│   │   ├── Navbar.jsx
│   │   └── Pagination.jsx
│   ├── pages/
│   │   ├── Forms/          # Account, teacher, student, and message forms
│   │   ├── Home/           # Home page sections
│   │   ├── Notices/        # Notice workflows
│   │   ├── PeopleListing/  # Governing body, teachers, and staff
│   │   ├── Profile/        # Profile and role dashboards
│   │   ├── Results/        # Result management and cards
│   │   └── ...             # Website and administration pages
│   ├── services/           # Authentication helpers
│   ├── App.jsx             # Application routes
│   ├── index.css           # Global styles
│   └── main.jsx            # React entry point
├── dist/                   # Generated build output
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── vercel.json             # SPA rewrite configuration
```

## Getting started

### Prerequisites

- Node.js 18 or newer
- npm 9 or newer
- A running instance of the Narayanpur High School REST API

### Installation

```bash
git clone https://github.com/TAVDEV-team/narayanpur_high_school_frontend.git
cd narayanpur_high_school_frontend
npm install
```

### Configure the API

The default backend is configured in `src/api/api.js`. For local backend development, change:

```js
const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});
```

Ensure the backend allows requests from the frontend origin through CORS.

### Run locally

```bash
npm run dev
```

Vite prints the local URL, usually `http://localhost:5173`.

### Create a production build

```bash
npm run build
npm run preview
```

The production bundle is generated in `dist/`.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Build the application for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |
| `npm run deploy` | Publish `dist/` with `gh-pages` |

## Authentication

Login is handled by `POST /user/token/`. Successful login stores these values in `localStorage`:

- `accessToken`
- `refreshToken`
- `accountId`
- `role`

The profile route redirects unauthenticated users to `/login`. Logout and token-refresh flows remove or replace the corresponding stored values.

## Deployment

### Vercel

`vercel.json` rewrites every route to `index.html`, allowing React Router routes to work on refresh.

1. Import the repository in Vercel.
2. Use `npm run build` as the build command.
3. Set the output directory to `dist`.
4. Confirm that the deployed frontend can reach the REST API.

### GitHub Pages

The package script can deploy `dist/` to GitHub Pages:

```bash
npm run deploy
```

The repository currently declares the homepage `https://tavdev-team.github.io/demo_narayn/`. Before deploying to a different GitHub Pages URL, update the `homepage` field in `package.json` and verify the Vite `base` setting.

## Development notes

- `src/App.jsx` is the main route configuration.
- `src/api/api.js` is the shared authenticated API client.
- `src/api/ListAPI.jsx` supplies paginated API data and pagination state.
- Most public and account sections are implemented as route-level React components.
- Static school assets are stored in `public/`.
- Environment files are ignored by Git. Do not commit credentials or private tokens.

## Contributing

1. Create a branch from `main`.
2. Keep changes scoped to the relevant page or shared component.
3. Use the existing React, Tailwind CSS, and API patterns.
4. Run lint and a production build before opening a pull request:

```bash
npm run lint
npm run build
```
