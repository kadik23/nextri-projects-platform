import { defineConfig } from "drizzle-kit";
export default defineConfig({
  dialect: "postgresql",
  schema: "./src/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    //@ts-ignore -> Cannot find name 'process' basa7 rahi tamchi
    url: `postgresql://${process.env.DB_USERNAME!}:${process.env.DB_PASSWORD!}@${process.env.DB_HOST!}:${process.env.DB_PORT!}/${process.env.DB_NAME!}?sslmode=${process.env.DB_SSL_MODE}`,
  },
});
