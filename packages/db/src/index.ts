import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

const connectionString = `postgresql://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?sslmode=${process.env.DB_SSL_MODE}`;

const queryClient = postgres(connectionString);

export const db = drizzle(queryClient);