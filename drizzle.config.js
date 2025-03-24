// import dotenv from 'dotenv/config';
// dotenv.config();
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './configs/schema.js',
  dialect: 'postgresql',
  dbCredentials: {
    url: "postgresql://Video_AI_db_owner:npg_y8cUxFzd5Tlk@ep-withered-bread-a58ycczp-pooler.us-east-2.aws.neon.tech/Video_AI_db?sslmode=require",
  },
});