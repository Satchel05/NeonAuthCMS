# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 template application demonstrating Neon Auth integration with Stack Auth. The app showcases how to implement authentication where user data is automatically synchronized to a Neon PostgreSQL database via the `neon_auth.users_sync` table.

**Key Technologies:**
- Next.js 15 with App Router
- Stack Auth for authentication
- Neon Serverless PostgreSQL
- TypeScript
- Tailwind CSS

## Development Commands

```bash
# Install dependencies
npm install

# Run development server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## Environment Setup

Required environment variables in `.env.local`:

```
# Stack Auth credentials
NEXT_PUBLIC_STACK_PROJECT_ID=
NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY=
STACK_SECRET_SERVER_KEY=

# Database connection (neondb_owner role)
DATABASE_URL=
```

To set up Neon Auth:
1. Create or use existing Neon project
2. Navigate to Neon Auth in dashboard
3. Click "Connect" and complete OAuth flow
4. Copy environment variables from Neon Auth dashboard

## Architecture

### Authentication Flow

The application uses a dual-provider Stack Auth setup:

1. **Stack Client App** (`src/stack/client.tsx`): Client-side authentication using Next.js cookie-based token storage
2. **Stack Server App** (`src/stack/server.tsx`): Server-side authentication that inherits from the client app
3. **Root Layout** (`src/app/layout.tsx`): Wraps the app in both `StackProvider` and `StackTheme` for client and server contexts

### Database Integration

User data is automatically synced to the `neon_auth.users_sync` table:

**Schema:**
```sql
neon_auth.users_sync (
  id TEXT PRIMARY KEY,
  name TEXT,
  email TEXT,
  created_at TIMESTAMP WITH TIME ZONE,
  deleted_at TIMESTAMP WITH TIME ZONE,
  raw_json JSONB NOT NULL
)
```

**Critical Rules:**
- Always filter `WHERE deleted_at IS NULL` when querying users
- Use LEFT JOIN (never INNER JOIN) when relating to `neon_auth.users_sync`
- Never create foreign key constraints to this table
- Never manually insert/update users - managed by auth system
- Access full user data from `raw_json` column (includes profile_image_url, etc.)

### Code Organization

```
src/
├── app/
│   ├── actions.ts           # Server actions (getUserDetails)
│   ├── header.tsx           # Server component showing auth state
│   ├── page.tsx             # Home page
│   ├── layout.tsx           # Root layout with StackProvider
│   ├── loading.tsx          # Suspense fallback
│   └── handler/[...stack]/  # Stack Auth pages (sign-in, sign-up, etc.)
├── stack/
│   ├── client.tsx           # Client Stack app instance
│   └── server.tsx           # Server Stack app instance
└── stack.tsx                # Re-exports server app (legacy)
```

### Authentication Patterns

**In Server Components:**
```tsx
import { stackServerApp } from '@/stack';

const user = await stackServerApp.getUser();
// Returns User object or null if not authenticated
```

**In Client Components:**
```tsx
'use client';
import { useUser } from '@stackframe/stack';

const user = useUser(); // null if not authenticated
// or
const user = useUser({ or: "redirect" }); // redirects if not authenticated
```

**Accessing Database User Data:**
```tsx
import { getUserDetails } from '@/app/actions';

const userProfile = await getUserDetails(user?.id);
// Returns data from neon_auth.users_sync including raw_json
```

**Auth URLs:**
```tsx
const app = stackServerApp.urls;
// Provides: app.signIn, app.signUp, app.signOut
```

## Stack Auth Setup

If starting fresh, run:
```bash
npx @stackframe/init-stack@latest
```

This creates:
- `app/handler/[...stack]/page.tsx` - Default auth UI
- Updates `app/layout.tsx` with StackProvider
- Creates `stack.ts` configuration

## TypeScript Configuration

- Uses path alias `@/*` mapping to `./src/*`
- Target: ES2017
- Strict mode enabled
- Module resolution: bundler

## Styling Conventions

- Tailwind CSS with mobile-first responsive design
- Custom fonts: Geist Sans and Geist Mono
- Follows Next.js guidelines: minimize client components, prefer Server Components

## Key Implementation Details

1. **Dual StackProvider Pattern**: The app wraps content in nested StackProvider components - one for client, one for server - to ensure both contexts have access to auth state.

2. **Server Actions for Database**: Database queries use server actions (`'use server'`) with `@neondatabase/serverless` driver for edge runtime compatibility.

3. **Header Component**: Shows different UI based on auth state, fetches user profile from database to display name and avatar from `raw_json.profile_image_url`.

4. **Route Handler**: The `app/handler/[...stack]/page.tsx` catch-all route uses `<StackHandler>` to provide all Stack Auth pages (sign-in, sign-up, password reset, etc.).

## Node.js Requirement

Requires Node.js >= 18 (specified in package.json engines).
