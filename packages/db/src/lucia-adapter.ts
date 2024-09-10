import { db } from ".";
import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import { sessionTable, userTable } from "./schema";

export const adapter = new DrizzlePostgreSQLAdapter(
  db,
  sessionTable as any,
  userTable as any
);
