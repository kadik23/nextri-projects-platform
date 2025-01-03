import { datetime, foreignKey } from "drizzle-orm/mysql-core";
import {
	PgArray,
	PrimaryKey,
	PrimaryKeyBuilder,
	pgEnum,
	pgTable,
	primaryKey,
	text,
	timestamp,
	uuid,
} from "drizzle-orm/pg-core";
import bytea from "drizzle-orm/pg-core";
import { OpenSourcePath, ProjectCategoryPreference, workPace } from "./types";
export const accountTypeEnum = pgEnum("type", ["email", "google", "github"]);

export const ProjectCategoryEnum = pgEnum("project_type", [
	"freelance",
	"open_source",
	"company",
]);

export const WorkPaceEnum = pgEnum("work_pace", [
	"short_term",
	"medium_term",
	"long_term",
	"specific_task",
]);

export const WorkTypeEnum = pgEnum("work_type", [
	"rebuild_projects",
	"solve_issues",
]);

export const userTable = pgTable("user", {
	id: text("id").primaryKey(),
	email: text("email").unique(),
	createdAt: timestamp("created_at"),
	updatedAt: timestamp("updated_at"),
});

export const accountTable = pgTable("account", {
	id: text("id").primaryKey(),
	userId: text("userId")
		.notNull()
		.references(() => userTable.id, { onDelete: "cascade" }),
	accountType: accountTypeEnum("accountType").notNull(),
	githubId: text("githubId").unique(),
	googleId: text("googleId").unique(),
});

export const sessionTable = pgTable("session", {
	id: text("id").primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => userTable.id),
	expiresAt: timestamp("expires_at", {
		withTimezone: true,
		mode: "date",
	}).notNull(),
});

export const magicLinksTable = pgTable("magic_links", {
	id: text("id").primaryKey(),
	email: text("email").notNull().unique(),
	token: text("token"),
	tokenExpiresAt: timestamp("tokenExpiresAt", { mode: "date" }),
});

export const userProfileTable = pgTable("user_profile", {
	id: text("id").primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => userTable.id),
	workPace: WorkPaceEnum("work_pace").notNull(),
	skillLevel: text("skill_level").notNull(),
	role: text("role").notNull(),
	skills: text("skills").array().notNull(),
	categoryPreference: ProjectCategoryEnum("category_preference")
		.array()
		.notNull(),
	focus: text("focus").array().notNull(),
	work_types: WorkTypeEnum("work_type").array(),
	updatedAt: timestamp("updated_at"),
});

export const userDetailsTable = pgTable("user_detail", {
	id: text("id").primaryKey(),
	userId: text("userId")
		.notNull()
		.references(() => userTable.id, { onDelete: "cascade" })
		.unique(),
	displayName: text("displayName"),
	imageId: text("imageId"),
	bio: text("bio").notNull().default(""),
});

export const projectsTable = pgTable("projects", {
	id: text("id").primaryKey(),
	projectName: text("name").notNull().unique(),
	description: text("description").default(""),
	roles: text("roles").array(),
	skill_level: text("skill_level").array(),
	project_type: text("project_type"),
	project_focus: text("project_focus").array(),
	work_type: text("work_type").array(),
	work_pace: text("work_pace").array(),
	tech_stack: text("tech_stack").array(),
});

export const prefrencesTable = pgTable("prefernces", {
	id: text("id").primaryKey(),
	user_id: text("user_id")
		.notNull()
		.references(() => userTable.id, { onDelete: "cascade" }),
	role: text("role"),
	skill_level: text("skill_level"),
	project_type: text("project_type"),
	project_focus: text("project_focus").array(),
	work_type: text("work_type").array(),
	work_pace: text("work_pace").array(),
	tech_tack: text("tech_stack").array(),
});

export const project_users = pgTable("project_users", {
	id: text("id").primaryKey(),
	project_id: text("project_id")
		.notNull()
		.references(() => projectsTable.id, { onDelete: "cascade" }),
	profile_id: text("profile_id")
		.notNull()
		.references(() => prefrencesTable.id, { onDelete: "cascade" }),
	request_date: timestamp("request_date").defaultNow(),
	status: text("status").default("pending"),
});

export const profileBookmarks = pgTable(
	"profileBookmarks",
	{
		profile_id: text("profile_id").references(() => prefrencesTable.id),
		project_id: text("project_id").references(() => projectsTable.id),
	},
	(table) => {
		return {
			pk: primaryKey({ columns: [table.profile_id, table.project_id] }),
			pkWithCustomName: primaryKey({
				name: "pk_profile_bookmarks",
				columns: [table.profile_id, table.project_id],
			}),

			fk_profile: foreignKey,
		};
	},
);

// types

export type TUser = typeof userTable.$inferSelect;
export type TUserDetails = typeof userDetailsTable.$inferSelect;
export type TProfile = typeof userProfileTable.$inferSelect;
