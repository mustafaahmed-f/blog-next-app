# Blog App ( Frontend )

A modern, full-featured blog application built with Next.js, TypeScript, TailwindCSS, shadcn/ui, and more. This project demonstrates best practices in authentication, form handling, validation, API data fetching, UI composition, and performance optimization.

---

## Table of Contents

- [Features](#features)
- [Tech Stack & Libraries](#tech-stack--libraries)
- [Uploading Post Images](#uploading-post-images)
- [Virtualization (Comments UI)](#virtualization-comments-ui)
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

## Uploading Post Images

When a user inserts an image through the Quill editor we use a custom toolbar handler (quillImageHandler) that uploads the image to the backend and sets a loader state to true so the UI shows a spinner and blocks user actions while the upload is in progress. The backend uploads the file to Cloudinary and responds with a secure_url and a public_id.

To handle temporary uploads and automatic cleanup, the backend creates a Redis key with a TTL and associated expiration logic. If the post is never published or the user abandons the editor (closes the page, cancels, etc.), the Redis TTL triggers server-side cleanup: the uploaded image(s) are removed from Cloudinary (and the folder removed if empty). When a post is successfully published or edited, the temporary Redis key is deleted so the TTL cleanup does not run.

On the frontend we use a CustomImageBlot (a class that extends Quill’s image blot) so the editor can embed an object { secure_url, public_id } instead of a plain src string. CustomImageBlot:

- create(): accepts an object and sets both src (secure_url) and a custom attribute data-public-id (public_id) on the image node.
- value(): returns the object { secure_url, public_id } for persistence.

For deletions, we listen to Quill's text-change events and compare the previous delta with the current delta. If an image has been removed (detected by comparing public_ids extracted from both deltas), we add those public_ids to a deletedIds state. When the user publishes or updates the post, deletedIds are sent with the post payload to the backend, which deletes the images in parallel (Promise.allSettled) from Cloudinary.

This flow keeps image uploads responsive, prevents orphaned files, and ensures published posts retain their images while temporary uploads are automatically cleaned up.

---

## Virtualization (Comments UI)

The comments list is virtualized using @tanstack/react-virtual to render very large lists efficiently. In CommentsUI.tsx the implementation:

- measures the container and item sizes,
- creates a virtualizer that calculates only the visible range plus an overscan buffer,
- renders only the visible comment rows into the DOM while keeping scroll position and layout consistent.

This dramatically reduces memory and rendering costs for pages with many comments and keeps scrolling smooth. CommentsUI.tsx also integrates with TanStack Query for paginated or streaming comment data, allowing efficient fetching + virtualized rendering.

For details and the concrete implementation, see CommentsUI.tsx in the project (the component shows the virtualizer setup, row rendering, and data integration).

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

Live demo: [MuBlog](https://blog-next-app-by-mustafa.vercel.app/)

> _Made with ❤️ using Next.js, TypeScript, TailwindCSS, and the best of the modern React ecosystem._

---
