import { relations } from "drizzle-orm";
import { pgTable, serial, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const userTable = pgTable("user", {
  id: text("id").primaryKey(),
  email: text("email").unique(),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
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
