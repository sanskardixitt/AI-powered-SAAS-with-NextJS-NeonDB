## AI-powered SaaS with Next.js and Neon

A minimal, production-ready Next.js 15 app for authenticated video upload, storage, and sharing. Authentication uses Clerk. Media is handled by Cloudinary. Data persists in Neon Postgres through Prisma. Styling uses Tailwind CSS. Built on React 19 and the App Router.

## Core Features

User authentication and middleware based route protection
Video and image upload endpoints backed by Cloudinary
Public video listing endpoint for discovery
Typed data model and Prisma migrations on Neon

## Tech Stack

Next.js 15, React 19, TypeScript, Tailwind CSS 4
Prisma ORM, Neon Postgres
Clerk authentication, Cloudinary media

## Quick Start

Create .env with required secrets

```env
DATABASE_URL="postgresql://user:password@neon-host/db?sslmode=require"
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"
CLERK_PUBLISHABLE_KEY="your_publishable_key"
CLERK_SECRET_KEY="your_secret_key"
```

Install, migrate, run

```bash
npm install
npx prisma migrate deploy && npx prisma generate
npm run dev
```

Open http://localhost:3000, sign up or sign in, upload a video, then verify it appears in the list and in the database.

## Data Model

Single Video table with id, title, optional description, Cloudinary publicId, originalSize, compressedSize, duration in seconds, createdAt, updatedAt.

## Routes

Public pages at / and /home and auth at /sign-in and /sign-up. Public api at /api/videos. Auth required for /api/video-upload and /api/image-upload. Authenticated users visiting auth pages are redirected to /home.

## Build and Deploy

```bash
npm run build
npm run start
```

On platforms like Vercel, set environment variables, ensure Neon requires TLS, and run prisma migrate deploy during deployment.

## Structure

app contains routes and layouts. app/api holds api routes. app/(auth) contains auth pages. app/(app) holds signed-in pages including home, video-upload, social-share. prisma contains schema and migrations. components holds UI like VideoCard. middleware.ts configures Clerk based access control.
