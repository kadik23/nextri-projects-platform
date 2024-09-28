import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import { db } from ".";
import { sessionTable, userTable } from "./schema";

export const adapter = new DrizzlePostgreSQLAdapter(
	db,
	sessionTable as any,
	userTable as any,
);
