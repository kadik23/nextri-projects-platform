import path from "node:path";
import * as dotenv from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

// Load environment variables from the root .env file
dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

const connectionString = `postgresql://${process.env.DB_USERNAME!}:${process.env.DB_PASSWORD!}@${process.env.DB_HOST!}:${process.env.DB_PORT!}/${process.env.DB_NAME!}?sslmode=${process.env.DB_SSL_MODE}`;

const queryClient = postgres(connectionString);

export const db = drizzle(queryClient, { schema });
