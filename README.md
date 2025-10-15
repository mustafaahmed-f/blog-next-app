# Blog App ( Frontend )

A modern, full-featured blog application built with Next.js, TypeScript, TailwindCSS, shadcn/ui, and more. This project demonstrates best practices in authentication, form handling, validation, API data fetching, UI composition, and performance optimization.

---

## Table of Contents

- [Features](#features)
- [Tech Stack & Libraries](#tech-stack--libraries)
- [Getting Started](#getting-started)
- [Useful Links](#useful-links)
- [Backend Repository](#backend-repository)
- [Deployment](#deployment)

---

## Features

- User authentication and management (Clerk)
- Create, edit, and delete blog posts with rich text editing (Quill.js)
- Form handling and validation (React Hook Form + Yup)
- Responsive, accessible UI components (shadcn/ui, Radix UI, TailwindCSS)
- Efficient client-side data fetching and caching (TanStack Query)
- High-performance rendering of large comment lists (TanStack Virtualization)
- Modern Next.js 14+ app directory structure with TypeScript

---

## Tech Stack & Libraries

### Core

- **Next.js**: React framework for server-side rendering, routing, and API routes.
- **TypeScript**: Static typing for safer, more maintainable code.
- **TailwindCSS**: Utility-first CSS framework for rapid UI development.

### UI & Styling

- **shadcn/ui**: Beautiful, accessible React components built on Radix UI primitives.
- **Radix UI**: Unstyled, accessible UI primitives for building high-quality design systems.

### Forms & Validation

- **React Hook Form**: Performant, flexible form state management for React.
- **Yup**: JavaScript schema builder for value parsing and validation, integrated with React Hook Form for robust form validation.

### Data Fetching & Performance

- **@tanstack/react-query**: Powerful asynchronous state management for fetching, caching, and updating server data in React.
- **@tanstack/react-virtual**: Virtualization library for efficiently rendering large lists (e.g., comments) without performance loss.

### Rich Text Editing

- **Quill.js**: Powerful, extensible rich text editor for composing blog posts.

### Authentication

- **Clerk**: Complete user authentication and management solution for React and Next.js apps.

---

## Getting Started

### 1. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 2. Set up environment variables

Create a `.env.local` file in the root directory and add your required environment variables (e.g., Clerk API keys, database URLs, etc.).

### 3. Run the development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

### 4. Build for production

```bash
npm run build
npm start
```

---

## Useful Links

- [Next.js Documentation](https://nextjs.org/docs)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com/docs)
- [Radix UI Primitives](https://www.radix-ui.com/primitives/docs/overview/introduction)
- [React Hook Form](https://react-hook-form.com/)
- [Yup](https://github.com/jquense/yup)
- [TanStack Query](https://tanstack.com/query/latest)
- [TanStack Virtual](https://tanstack.com/virtual/latest)
- [Quill.js](https://quilljs.com/)
- [Clerk](https://clerk.com/docs)

---

## Backend Repository

You can find the backend source code here: [Blog App Backend (GitHub)](https://github.com/mustafaahmed-f?tab=repositories)

---

## Deployment

Live demo: [Luminae Store](https://ecommerce-nextjs-by-mustafa.vercel.app/)

> _Made with ❤️ using Next.js, TypeScript, TailwindCSS, and the best of the modern React ecosystem._
