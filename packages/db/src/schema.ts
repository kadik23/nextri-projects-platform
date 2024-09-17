import { pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { OpenSourcePath, ProjectCategoryPreference, workPace } from "./types";

export const accountTypeEnum = pgEnum("type", ["email", "google", "github"]);

export const ProjectCategoryEnum = pgEnum("project_type", [
  "freelance",
  "open_source",
  "company",
]);

export const WorkPaceEnum = pgEnum("work_pace_type", [
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

// types

export type TUser = typeof userTable.$inferSelect;
export type TUserDetails = typeof userDetailsTable.$inferSelect;
export type TProfile = typeof userProfileTable.$inferSelect;
