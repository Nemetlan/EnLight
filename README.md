# 💡 EnLight — Modern Student Portal & Learning Hub

EnLight is a modern, visually striking, and highly responsive student portal and learning management platform. It features a high-fidelity interface designed to help students track their ongoing courses, keep tabs on weekly class schedules, manage homework checklists, and access study resources in one centralized, sleek dashboard.

Built with bleeding-edge technologies including **Next.js 16 (App Router)**, **React 19**, and **Tailwind CSS v4**, EnLight delivers an immersive user experience utilizing glassmorphism headers, responsive drawer layouts, custom design tokens, and smooth, interactive components.

---

## ✨ Features

*   **📱 Interactive Student Dashboard**: Personalized, dynamic time-of-day greetings and a styled navigation grid featuring vibrant neon-accented card buttons to guide students to key modules.
*   **📚 My Library**: Categorized course lists (Civil, Mechanical, and Electrical) with interactive, instant filtering and responsive course cards to monitor completed lessons and student engagement.
*   **📅 Interactive Class Diary**: A complete, weekly scheduling ledger (Past Week, Current Week, Next Week) mapping out days, dates, subjects, topics, and teacher names, combined with an interactive homework checklist for real-time task completion tracking.
*   **🔔 Floating Glassmorphism Header**: A sticky header with a built-in search bar and a responsive, interactive slide-over notification drawer displaying recent assignment updates, reminders, and schedules.
*   **🎨 Highly Polished Aesthetic**: Beautiful custom-crafted line-art SVGs, modern glassmorphic overlays, premium color gradients, and tailored typography.

---

## 🛠️ Tech Stack

*   **Framework**: [Next.js 16](https://nextjs.org/) (App Router, React Server Components)
*   **Core Library**: [React 19](https://react.dev/)
*   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (CSS-driven inline themes and custom typography utility layers)
*   **Components & Primitives**: [@base-ui/react](https://base-ui.com/), [Shadcn UI](https://ui.shadcn.com/) (Style: `base-nova`)
*   **Icons**: [Lucide React](https://lucide.dev/)
*   **Animations**: [tw-animate-css](https://github.com/lucasgelfond/tw-animate-css)
*   **Package Manager**: [pnpm](https://pnpm.io/)

---

## 🚀 Getting Started

Follow these instructions to set up the project locally on your machine.

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) (v18+ recommended) and [pnpm](https://pnpm.io/) installed.

```bash
# Verify pnpm installation
pnpm -v
```

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/EnLight.git
   cd EnLight
   ```

2. Install the dependencies:
   ```bash
   pnpm install
   ```

### Running the Application

*   **Start the Development Server**:
    ```bash
    pnpm dev
    ```
    Open `http://localhost:3000` in your browser to see the live application.

*   **Build for Production**:
    ```bash
    pnpm build
    ```

*   **Run Production Build**:
    ```bash
    pnpm start
    ```

*   **Lint the Codebase**:
    ```bash
    pnpm lint
    ```

---

## 📁 Repository Structure

```text
EnLight/
├── app/                  # Next.js App Router (pages & global layouts)
│   ├── globals.css       # Core Tailwind v4 configuration & design tokens
│   ├── layout.tsx        # Base root layout wrapper
│   ├── page.tsx          # Root redirect to the dashboard
│   └── [routes]/         # Individual page routes (dashboard, library, diary, etc.)
├── components/           # UI Components
│   ├── dashboard/        # Dashboard cards, lesson tables, and sidebar widgets
│   ├── layout/           # Shared wrappers (AppShell, glassmorphic Header, Sidebar)
│   ├── shared/           # Reusable cards (e.g., CourseCard.tsx)
│   └── ui/               # Lower-level design components (e.g., button.tsx)
├── lib/                  # Utilities & Data Sources
│   ├── courses.ts        # Course dataset and categories
│   └── utils.ts          # CN (classNames merge) helper
├── public/               # Static assets, SVG placeholders, and logos
├── components.json       # Shadcn CLI layout mapping
├── tsconfig.json         # TypeScript compiler rules
└── package.json          # Dependency list & package run scripts
```

---

## 🎨 Styling & Design Philosophy

EnLight is styled using **Tailwind CSS v4**, which operates under a **CSS-first configuration** model. All design tokens, custom themes, and custom-layered typography rules are declared cleanly in `app/globals.css`.

### Custom Design Tokens
*   **Primary Brand Colors**:
    *   `--color-el-orange`: `#FF4D2E` (Bright, motivating primary brand color)
    *   `--color-el-blue`: `#1E56FB` (Deep structural accent color)
    *   `--color-el-lime`: `#C6F232` (Energetic highlight / indicator tag)
*   **Neutrals**:
    *   `--color-el-charcoal`: `#111111` (Primary text color)
    *   `--color-el-surface`: `#F4F5F7` (Workspace background canvas)
    *   `--color-el-gray`: `#6B7280` (Muted secondary meta-texts)

### Custom Typographic Classes
EnLight implements a structured typography hierarchy accessible via custom CSS utility classes:
*   `.text-brand-logo` - Core logo text (18px, Semi-Bold)
*   `.text-page-title` - Major page-level headers (30px, Semi-Bold)
*   `.text-card-title` - Main card headers and sections (22px, Medium)
*   `.text-sub-heading` - List group and section subheadings (15px, Semi-Bold)
*   `.text-body` - Primary content description (14px, Normal, Relaxed)
*   `.text-subtitle` - Small info subtitles (13px, Medium)
*   `.text-microcopy` - Tiny date stamps and metadata (12px, Normal)

---

## 📝 License

This project is licensed under the [MIT License](LICENSE) — see the LICENSE file for details.
