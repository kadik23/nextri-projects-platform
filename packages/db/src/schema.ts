import { pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const accountTypeEnum = pgEnum("type", ["email", "google", "github"]);

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

export const userOnboardingTable = pgTable("user_onboarding", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id").notNull().references(() => userTable.id),
  updatedAt: timestamp("updated_at"),
  role: text("role").notNull(),
  skillLevel: text("skill_level").notNull(),
  workPace: text("work_pace").notNull(),

})

export const projectCategoryPreferenceTable = pgTable("project_category_preference", {
  id: uuid("id").primaryKey().defaultRandom(),
  userOnboardingId: uuid("user_onboarding_id").notNull().references(() => userOnboardingTable.id, {onDelete: 'cascade'}),
  name: text("name").notNull()
})

export const technologyTable = pgTable("technology", {
  id: uuid("id").primaryKey().defaultRandom(),
  userOnboardingId: uuid("user_onboarding_id").notNull().references(() => userOnboardingTable.id, {onDelete: 'cascade'}),
  name: text("name").notNull()
})

export const profilesTable = pgTable("profile", {
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
export type TProfile = typeof profilesTable.$inferSelect;
