DROP TABLE "project_category_preference";--> statement-breakpoint
DROP TABLE "skill";--> statement-breakpoint
ALTER TABLE "user_profile" ADD COLUMN "skill_level" text NOT NULL;--> statement-breakpoint
ALTER TABLE "user_profile" ADD COLUMN "role" text NOT NULL;--> statement-breakpoint
ALTER TABLE "user_profile" ADD COLUMN "technologies" text[] NOT NULL;--> statement-breakpoint
ALTER TABLE "user_profile" ADD COLUMN "category_preference" text[] NOT NULL;--> statement-breakpoint
ALTER TABLE "user_profile" ADD COLUMN "focus" text[] NOT NULL;