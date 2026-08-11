# EnLight - Project Guidelines & Instructions

This workspace contains the source code for **EnLight**, a modern, visually striking, and responsive student portal/learning management platform. It is designed to track courses, schedules, homework, and study resources.

---

## Project Overview

- **Core Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5.7+
- **Styling**: Tailwind CSS v4.3.3 (CSS-only configuration, no legacy `tailwind.config.js`)
- **UI & Components**: `@base-ui/react`, Shadcn UI (Style: `base-nova`), and custom tailored UI cards
- **Animations**: `tw-animate-css` (CSS animation framework)
- **Icons**: `lucide-react`
- **Package Manager**: `pnpm`

### Directory Structure

```text
/
├── app/                  # Next.js App Router Pages & Styles
│   ├── globals.css       # Core Tailwind v4 setup, design tokens, typography utility classes
│   ├── layout.tsx        # Base root layout
│   ├── page.tsx          # Root redirect to /dashboard
│   └── [routes]/         # Individual app routes (dashboard, library, settings, etc.)
├── components/           # React Components organized by context
│   ├── dashboard/        # Dashboard specific widgets and cards
│   ├── layout/           # Shared layout wrappers (AppShell, Header, Sidebar, etc.)
│   ├── shared/           # Reusable shared domain components (e.g., CourseCard)
│   └── ui/               # Base design primitives (e.g., button.tsx)
├── lib/                  # Shared utilities and mock data sources
│   ├── courses.ts        # Course dataset and categories
│   └── utils.ts          # Helper utilities (e.g., cn for class joining)
├── public/               # Static assets (logos, placeholders, and icons)
├── components.json       # Shadcn UI configuration
├── tsconfig.json         # TypeScript configurations & paths
└── package.json          # Dependencies & package scripts
```

---

## Building and Running

The project utilizes `pnpm` as the package manager. The following scripts are defined in `package.json`:

- **Development Server**:
  ```bash
  pnpm dev
  ```
  Starts the Next.js development server at `http://localhost:3000`.
- **Production Build**:
  ```bash
  pnpm build
  ```
  Compiles and builds the production-ready Next.js application. (Note: TypeScript build errors are ignored and image optimization is bypassed per configuration in `next.config.mjs`).
- **Production Run**:
  ```bash
  pnpm start
  ```
  Starts the compiled Next.js server.
- **Linting**:
  ```bash
  pnpm lint
  ```
  Runs ESLint across the codebase using `eslint .`.

---

## Development & Architecture Conventions

### 1. Tailwind CSS v4 Configuration
This codebase is built using **Tailwind CSS v4**. Do NOT create a `tailwind.config.js` or `tailwind.config.ts` file, as Tailwind configuration in v4 is fully CSS-driven:
- Design tokens and variables are declared directly inside `app/globals.css` using the `@theme inline { ... }` syntax.
- Refer to `app/globals.css` when referencing custom colors or variables.

### 2. Design Tokens (Brand Palette)
To maintain visual consistency across all pages and features, always use the defined EnLight design tokens (either via raw HEX, CSS variables, or the configured Tailwind utility classes):
- **Orange (Primary Accents)**: `--color-el-orange` | `#FF4D2E`
- **Blue (Primary Domain Accents)**: `--color-el-blue` | `#1E56FB`
- **Lime (Highlights/Indicators)**: `--color-el-lime` | `#C6F232`
- **Charcoal (Dark Texts/Solids)**: `--color-el-charcoal` | `#111111`
- **Surface (Backgrounds)**: `--color-el-surface` | `#F4F5F7`
- **Gray (Descriptions/Meta)**: `--color-el-gray` | `#6B7280`
- **Border**: `--color-el-border` | `#E5E7EB`

### 3. Typography System
Always use the specialized typography utility classes defined in `app/globals.css` under the `@layer components` directive to ensure font sizes, line heights, and weights align perfectly with EnLight design standards:
- **`.text-brand-logo`**: Logo presentation (`text-[18px] font-semibold tracking-tight`).
- **`.text-page-title`**: Main page-level headings (`text-[30px] font-semibold leading-tight tracking-[-0.02em] text-[#111111]`).
- **`.text-card-title`**: Main card headers and sections (`text-[22px] font-medium leading-[1.3] tracking-[-0.01em]`).
- **`.text-sub-heading`**: Sub-sections and list items (`text-[15px] font-semibold text-[#111111]`).
- **`.text-body`**: Primary reading texts and descriptions (`text-[14px] font-normal text-[#666666] leading-relaxed`).
- **`.text-subtitle`**: Smaller sub-texts (`text-[13px] font-medium text-[#666666]`).
- **`.text-microcopy`**: Tiny metadata or details (`text-[12px] font-normal text-[#888888]`).
- **`.text-badge`**: Category tags or indicators (`text-[12px] font-semibold px-3 py-1 rounded-full`).
- **`.text-button`**: Button label typography (`text-[14px] font-semibold`).

### 4. Layout Architecture (App Shells)
The workspace provides two distinct layout containers inside `components/layout/`:
- **`AppShell`**: Used for standard responsive page layouts (`library`, `diary`, `about`, `settings`, etc.). Renders side navigation and a scrollable main viewport.
- **`AppShellDash`**: Custom wrapper used exclusively for the `dashboard` view, utilizing a centering flex layout.

### 5. Coding & Component Conventions
- **Client Components**: Mark files that handle interactive states (`useState`, `useEffect`), router navigation/hooks (`usePathname`, `useRouter`), or animations with the `'use client'` directive at the very top.
- **Component File Locations**:
  - UI primitives go into `components/ui/`
  - Shared domain cards and widgets go into `components/shared/`
  - Workspace layouts go into `components/layout/`
  - Page-specific localized components go into subfolders corresponding to their views (e.g., `components/dashboard/`)
- **Path Aliases**: Prefer absolute imports via path aliases over relative path nesting:
  - `@/components/*` -> Points to `components/*`
  - `@/ui/*` -> Points to `components/ui/*`
  - `@/utils` -> Points to `lib/utils`
  - `@/lib/*` -> Points to `lib/*`
  - `@/hooks/*` -> Points to `hooks/*`
- **Code Styling**: Use clean, modern, type-safe TypeScript. Provide explicit interfaces or types for all component props. Avoid using `any` or bypassing TypeScript's type checking.
