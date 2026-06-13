# Project Instructions

<!-- BEGIN:nextjs-agent-rules -->
## Next.js Version Note
This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Project Conventions
- **Data Access Layer:** All database queries and Prisma logic should be placed in `app/lib/`.
- **Session Management:** Use `app/lib/session.ts` for JWT-based session handling and `app/lib/dal.ts` for server-side verification.
- **Routes:** Centralize all route constants in `app/lib/routes.ts`.
