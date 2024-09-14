import { pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { OpenSourcePath, ProjectCategoryPreference, workPace } from "./types";

export const accountTypeEnum = pgEnum("type", ["email", "google", "github"]);

export const userTable = pgTable("user", {
  id: text("id").primaryKey().notNull(),
  email: text("email").unique(),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});

export const accountTable = pgTable("account", {
  id: text("id").primaryKey().notNull().unique(),
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
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  workPace: text("work_pace").$type<workPace>().notNull(),
  openSourcePath: text("open_source_path"),
  updatedAt: timestamp("updated_at"),
});

export const skillTable = pgTable("skill", {
  id: uuid("id").primaryKey().defaultRandom(),
  profileId: uuid("profile_id")
    .notNull()
    .references(() => userProfileTable.id, { onDelete: "cascade" }),
  role: text("role").notNull(),
  skillLevel: text("skill_level").notNull(),
  technologies: text("technologies").array().notNull(),
  updatedAt: timestamp("updated_at"),
});

export const projectCategoryPreferenceTable = pgTable(
  "project_category_preference",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    categoryPreference: text("category_preference")
      .$type<ProjectCategoryPreference>()
      .array()
      .notNull(),
    focus: text("focus").array().notNull(),
    openSourcePath: text("open_source_path").$type<OpenSourcePath>(),
    profileId: uuid("profile_id")
      .notNull()
      .references(() => userProfileTable.id, { onDelete: "cascade" }),
    updatedAt: timestamp("updated_at"),
  }
);

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
