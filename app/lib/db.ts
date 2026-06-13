import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { PrismaClient } from '../generated/prisma/client';


if (!process.env['DATABASE_URL']) {
  throw new Error('DATABASE_URL environment variable is not set.');
}

// @ts-expect-error - This is a workaround to ensure that we only create one instance of PrismaClient in development mode, 
// which prevents issues with hot reloading in Next.js. 
// In production, this will not cause any issues since the server will be restarted on each deployment.
if (!globalThis.prismaClient) {
    const adapter = new PrismaBetterSqlite3({ url: process.env['DATABASE_URL'] });
    // @ts-expect-error - same reason as above
    globalThis.prismaClient = new PrismaClient({ adapter });
}
// @ts-expect-error - same reason as above
export const prisma = globalThis.prismaClient as PrismaClient;