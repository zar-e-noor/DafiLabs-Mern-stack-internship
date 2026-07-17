# Portfolio Website

A personal portfolio built with Next.js, Tailwind CSS, and Framer Motion.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Editing Your Content

All personal information lives in **`data/content.ts`**. Edit that file to update your name, bio, projects, skills, social links, and SEO metadata — no component changes needed.

## Project Structure

```
app/           → Pages (Home, About, Projects, Contact)
components/    → Reusable UI components
data/          → Editable content config (content.ts)
lib/           → Utility functions
public/        → Static assets (resume.pdf, og-image.png, favicon.ico)
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Deployment

Deploy to [Vercel](https://vercel.com) — see Task 3 in the project plan.
