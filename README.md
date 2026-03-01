# QuickHire

A modern job platform built with Next.js 15, featuring a public job board, admin dashboard, and application management system.

## Tech Stack

- **Framework:** Next.js 15 (App Router, Turbopack)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4, shadcn/ui
- **State Management:** Redux Toolkit, RTK Query, redux-persist
- **HTTP Client:** Axios (with auto token refresh interceptor)
- **Form Handling:** React Hook Form + Zod validation
- **Fonts:** Clash Display (headings), Epilogue (body)
- **Auth:** JWT access token (in-memory) + refresh token (httpOnly cookie)

## Features

### Public Pages

- **Landing Page** — Hero section, company logos, job categories, CTA, featured jobs, latest jobs, footer
- **Jobs Page** (`/jobs`) — Search, category/location filter dropdowns, sorting, pagination
- **Job Details** (`/jobs/[id]`) — Full job info with "Apply Now" modal (name, email, resume link, cover note)

### Auth Pages

- **Login** (`/login`) — Email + password with validation
- **Register** (`/register`) — Name, email, password, confirm password with validation

### Admin Dashboard

- **Overview** (`/dashboard`) — Stats cards (total jobs, applications, categories) + recent jobs list
- **All Jobs** (`/dashboard/jobs`) — Job list with delete
- **Create Job** (`/dashboard/create-job`) — Validated form (title, company, location, category, description)
- **Applications** (`/dashboard/applications`) — All applications table with detail modal, filter by job, resume link, send email

## Project Structure

```
quickhire/
├── app/
│   ├── (authLayout)/            # Auth route group (login, register)
│   │   ├── layout.tsx           # Split layout: branding left, form right
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── (dashboard)/             # Admin dashboard route group
│   │   ├── layout.tsx           # Sidebar + topbar layout with auth guard
│   │   └── dashboard/
│   │       ├── page.tsx         # Stats overview
│   │       ├── jobs/page.tsx    # All jobs management
│   │       ├── create-job/page.tsx
│   │       └── applications/page.tsx
│   ├── jobs/
│   │   ├── page.tsx             # Public jobs listing with search/filter
│   │   └── [id]/page.tsx        # Job details + apply modal
│   ├── layout.tsx               # Root layout (StoreProvider, fonts, Toaster)
│   ├── page.tsx                 # Landing page
│   ├── globals.css              # Tailwind, fonts, CSS variables
│   └── StoreProvide.tsx         # Redux Provider + PersistGate + axios init
├── axios/
│   ├── axiosInstance.ts         # Axios with in-memory token, auto-refresh on 401
│   └── axiosBaseQuery.ts        # RTK Query base query adapter
├── redux/
│   ├── store.ts                 # Singleton store with configureStore
│   ├── rootReducer.ts           # Persisted auth + API reducers
│   ├── slice/
│   │   └── authSlice.ts         # Auth state (user, accessToken)
│   ├── api/
│   │   ├── baseApi.ts           # RTK Query base (axios-based)
│   │   ├── adminBaseApi.ts      # Admin RTK Query base (fetch-based)
│   │   └── endpoints/
│   │       ├── authApi.ts       # Login, register mutations
│   │       └── jobApi.ts        # Jobs CRUD, applications queries/mutations
│   └── hooks/
│       └── reduxHooks.ts        # Typed useAppDispatch, useAppSelector
├── components/
│   ├── ui/                      # shadcn/ui components (button, input, label, card, sonner)
│   ├── Navbar.tsx
│   ├── HeroSection.tsx          # Functional search → /jobs
│   ├── CompaniesSection.tsx
│   ├── CategorySection.tsx      # Links to /jobs?category=X
│   ├── CTASection.tsx
│   ├── FeaturedJobsSection.tsx
│   ├── LatestJobsSection.tsx
│   ├── Footer.tsx
│   └── theme-provider.tsx
├── types/
│   └── AuthTypes.ts             # Auth, API response, request types
├── config/
│   └── envConfig.ts             # getBaseUrl() from env
├── lib/
│   └── utils.ts                 # cn() utility
└── public/
    ├── logo.png
    └── images/
        ├── Hero/man.png
        ├── company/             # Company logos (vodafone, intel, tesla, amd, talkit)
        └── dashboard/dashoard.png
```

## Getting Started

### Prerequisites

- Node.js >= 18
- Yarn (or npm)
- Backend API running on `http://localhost:5000`

### Environment Variables

Create a `.env` file in the root:

```env
NEXT_PUBLIC_BACKEND_API_URL='http://localhost:5000/api/v1'
```

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd quickhire

# Install dependencies
yarn install

# Start development server (Turbopack)
yarn dev
```

The app will be available at `http://localhost:3000`.

### Build for Production

```bash
yarn build
yarn start
```

## API Endpoints Used

| Method | Endpoint               | Access | Description            |
| ------ | ---------------------- | ------ | ---------------------- |
| POST   | `/auth/register`       | Public | Register admin         |
| POST   | `/auth/login`          | Public | Admin login            |
| GET    | `/auth/refresh-token`  | Public | Refresh access token   |
| GET    | `/jobs`                | Public | List jobs (search, filter, paginate) |
| GET    | `/jobs/:id`            | Public | Get job details        |
| POST   | `/jobs`                | Admin  | Create a job           |
| DELETE | `/jobs/:id`            | Admin  | Delete a job           |
| GET    | `/applications`        | Admin  | List all applications  |
| GET    | `/applications/:id`    | Admin  | Get single application |
| POST   | `/applications`        | Public | Submit job application |

## Authentication Flow

1. **Login** — Server returns `accessToken` in response body, sets `refreshToken` as httpOnly cookie
2. **API Calls** — Axios interceptor attaches `accessToken` from memory to `Authorization` header
3. **Token Expired (401)** — Interceptor auto-calls `GET /auth/refresh-token`, browser sends cookie automatically, gets new `accessToken`
4. **Refresh Fails** — User is logged out, redirected to `/login`
