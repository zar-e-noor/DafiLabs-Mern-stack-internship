import dotenv from 'dotenv';
import { defineConfig } from '@prisma/config';

// Aapki .env.local file se variables load karne ke liye
dotenv.config({ path: '.env.local' });

export default defineConfig({
  schema: 'prisma/schema.prisma',
  datasource: {
    url: process.env.DIRECT_URL,
  },
});