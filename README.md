# DafiLabs-Mern-stack-internship
## Portfolio Website — Project Plan & Design

### 1. Overview
A personal portfolio website for a CS student (currently a Product Builder Intern), built as a single **Next.js application**. The frontend and backend both live in one project, one repository, and run on a single development server. It showcases projects, skills, and includes a working contact form with an admin dashboard, built in phases across the internship tasks.

---

### 2. Tech Stack

*   **Framework:** Next.js (React) — handles **BOTH** frontend (pages/UI) and backend (API routes). No separate Node/Express server is needed, which avoids running multiple terminals or editor windows.
*   **Styling:** Tailwind CSS
*   **Database:** Supabase (Postgres) via Prisma ORM
*   **Auth:** Custom login flow with a seeded admin user
*   **Email:** Resend (for contact form alerts)
*   **Security:** Google reCAPTCHA v3 + login rate limiting
*   **Hosting:** Vercel
*   **Version Control:** GitHub

> **Why Next.js instead of Node+Express?** Next.js API routes (`app/api/...`) work exactly like an Express backend but run inside the same project. Running `npm run dev` starts everything together in a single window, eliminating context-switching.

---

### 3. Pages & Sections

*   **Home:** Introduction, tagline, and Call-to-Action (CTA).
*   **About:** Simple bio (student + tech enthusiast, background, skills).
*   **Projects:** Showcase grid (placeholder cards for now, real projects added later).
*   **Contact Us:** Form (name, email, message) that saves to the database and triggers email alerts.
*   **Admin Dashboard (Protected):** Login-only view to look over submitted contact entries.

---

### 4. Design Direction

*   **Aesthetics:** Clean, minimal, professional — not overly animated or decorative.
*   **Themes:** Light/Dark mode toggle.
*   **Animations:** Subtle, tasteful micro-animations only (hover states, gentle fade-ins).
*   **Accent Color:** Elegant slate/indigo palette. Deep indigo accent on a neutral slate/white (light) and slate/near-black (dark) base for a modern, sober feel.
*   **Typography:** Elegant typography (clean sans-serif), generous whitespace, and soft shadows with rounded corners.

---

### 5. Architecture Rules

*   **Reusability:** Every component (`Navbar`, `Footer`, `Button`, `Card`, `FormInput`, `ThemeToggle`, etc.) must be built as a standalone reusable component in `/components`. Later tasks (dashboard, login, admin views) must reuse these instead of creating duplicate versions.
*   **Manual-Edit File:** All personal content (name, project details, bio text, social links, resume link, etc.) goes into **ONE** separate file: `/data/content.ts` (or `content.json`). It will include setup comments so you only ever have to edit this single file to update your personal info.

#### Non-Functional Requirements
*   **Security:** Input validation on forms, environment variables for all secrets/API keys, and reCAPTCHA + rate limiting on login.
*   **Scalability:** Component-based structure so new pages/features can be added without rewriting existing code.
*   **Performance:** Next.js image optimization, lazy loading where relevant, and minimal unnecessary re-renders.
*   **Maintainability:** Clear folder structure and a single configuration file for editable content.
*   **Accessibility:** Proper semantic HTML, sufficient color contrast in both themes, and keyboard-navigable forms.

---

### 6. Task Breakdown (Full Program Roadmap)

| Task | Description |
| :--- | :--- |
| **Task 1** | Project plan & design (This document) |
| **Task 2** | Build portfolio site per plan + Contact Us page (UI only) |
| **Task 3** | Push to GitHub, deploy live via Vercel |
| **Task 4** | Configure Supabase + Prisma, make Contact form save to DB |
| **Task 5** | Make contact form dynamic, send Resend email alerts on new submissions |
| **Task 6** | Build login flow, seed first admin user, build dashboard to view contact submissions |
| **Task 7** | Add Google reCAPTCHA v3 on login, add rate limiting with good UX |

---

### 7. Folder Structure

```text
portfolio/
├── app/
│   ├── page.tsx (Home)
│   ├── about/
│   ├── projects/
│   ├── contact/
│   ├── admin/dashboard/
│   └── api/ (backend routes — contact, auth, etc.)
├── components/ (all reusable UI pieces)
├── data/content.ts (MY EDITABLE FILE — personal info, project details)
├── lib/ (prisma client, resend client, recaptcha utils)
├── prisma/schema.prisma
├── styles/
└── .env.local
