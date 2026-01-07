import 'dotenv/config';
import { defineConfig, env } from 'prisma/config';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    // Prefer strict check in CI, but allow local default via process.env when missing
    url: process.env.DATABASE_URL ?? 'file:./prisma/dev.db',
  },
});
