# CVProject — Personal Portfolio & Resume Website

A full-stack monorepo built with **Next.js + NestJS**, designed to showcase personal projects, skills, and experience. Features an online admin dashboard for content management.

---

## 🧱 Project Structure

```
cvproject/
├── client/                  # Frontend (Next.js 16)
│   ├── app/                 # App Router pages
│   │   ├── page.tsx         # Home page
│   │   ├── projects/        # Project list & detail pages
│   │   ├── admin/           # Admin dashboard
│   │   ├── auth/            # Auth pages & Provider
│   │   ├── api/             # API Routes (auth, projects)
│   │   ├── components/      # Global shared components
│   │   └── styles/          # Global styles
│   ├── components/          # Cross-page shared component library
│   ├── hooks/               # Custom React Hooks
│   ├── lib/                 # Utility functions
│   ├── prisma/              # Prisma schema, migrations & seed data
│   ├── src/                 # Legacy src directory (phasing out)
│   └── types/               # TypeScript type definitions
│
└── server/                  # Backend (NestJS 11)
    ├── src/                 # Core modules (Controller, Service, Module)
    ├── api/                 # Standalone API modules
    └── test/                # Test files
```

---

## 🛠 Tech Stack

### Frontend (`client/`)

| Category | Technology |
|----------|------------|
| Framework | React 19 + Next.js 16 (App Router) |
| Styling | Tailwind CSS 4, DaisyUI 5, Radix UI Themes, shadcn |
| State Management | React Context / Custom Hooks |
| Forms | React Hook Form + Zod validation |
| Authentication | NextAuth 4 |
| Database ORM | Prisma 7 + MariaDB |
| Markdown | react-markdown + remark-gfm + react-simplemde-editor |
| Media | react-player (video), embla-carousel (image carousel) |
| 3D / Graphics | Three.js (via `@react-three/fiber` + `@react-three/drei`) |
| Utilities | class-variance-authority, clsx, tailwind-merge |

### Backend (`server/`)

| Category | Technology |
|----------|------------|
| Framework | NestJS 11 + Express |
| Language | TypeScript 5 |
| Testing | Jest + Supertest |

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** >= 18
- **npm** >= 9
- **MariaDB** / **MySQL** instance

### 1. Clone the Repository

```bash
git clone git@personal:Zephyr724/cvproject.git
cd cvproject
```

### 2. Install Frontend Dependencies

```bash
cd client
npm install
```

The `postinstall` hook runs `prisma generate` automatically to generate the Prisma Client.

### 3. Configure Environment Variables

Create a `.env` file in the `client/` directory:

```env
# Database connection string (MariaDB)
DATABASE_URL="mysql://user:password@localhost:3306/cvproject"

# NextAuth secret (use a strong random string in production)
NEXTAUTH_SECRET="your-secret-here"
NEXTAUTH_URL="http://localhost:5050"

# API base URL (if backend is running separately)
API_BASE_URL="http://localhost:3001"
```

### 4. Initialize the Database

```bash
# Inside the client/ directory
npx prisma migrate dev
npx prisma db seed
```

### 5. Install Backend Dependencies (Optional)

```bash
cd ../server
npm install
```

### 6. Start Development Servers

```bash
# Frontend (port 5050)
cd client
npm run dev

# Backend (default port 3000)
cd server
npm run start:dev
```

Open **http://localhost:5050** in your browser to view the site.

---

## 📜 Available Scripts

### Frontend `client/`

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Next.js dev server (port 5050) |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run release` | Generate CHANGELOG and tag with standard-version |

### Backend `server/`

| Command | Description |
|---------|-------------|
| `npm run start:dev` | Start Nest dev server (hot reload) |
| `npm run build` | Compile TypeScript |
| `npm run start:prod` | Start production server |
| `npm run test` | Run unit tests |
| `npm run test:e2e` | Run end-to-end tests |
| `npm run format` | Format code with Prettier |

---

## 🧩 Core Features

- **Project Showcase** — Image carousels, Markdown content, tech stack tags, online media playback
- **Admin Dashboard** — Login authentication, project CRUD, inline Markdown editor
- **Responsive Design** — Adapts to desktop and mobile (DaisyUI + Tailwind breakpoints)
- **Authentication** — NextAuth-based, protecting admin routes
- **RESTful API** — Next.js API Routes for frontend data, NestJS for core business logic

---

## 📁 Key Files

| File | Purpose |
|------|---------|
| `client/prisma/schema.prisma` | Database model definitions |
| `client/prisma/seed.ts` | Database seed data |
| `client/prisma.config.ts` | Global Prisma configuration |
| `client/app/layout.tsx` | Root layout (global providers, NavBar, etc.) |
| `client/app/admin/_components/SectionEditor.tsx` | Admin section inline editor |
| `client/proxy.ts` | API proxy configuration |

---

## 🧪 Quality Assurance

- TypeScript end-to-end type safety
- ESLint + Prettier for consistent code style
- Jest unit tests & E2E tests (backend)
- standard-version for standardized CHANGELOG management
- SOLID principles in component design

---

## 📄 License

Private — Personal project, not open-licensed.