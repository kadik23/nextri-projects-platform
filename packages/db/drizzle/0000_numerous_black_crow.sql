DO $$ BEGIN
 CREATE TYPE "public"."type" AS ENUM('email', 'google', 'github');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "account" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"accountType" "type" NOT NULL,
	"githubId" text,
	"googleId" text,
	CONSTRAINT "account_id_unique" UNIQUE("id"),
	CONSTRAINT "account_githubId_unique" UNIQUE("githubId"),
	CONSTRAINT "account_googleId_unique" UNIQUE("googleId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "magic_links" (
	"id" text PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"token" text,
	"tokenExpiresAt" timestamp,
	CONSTRAINT "magic_links_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "project_category_preference" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"category_preference" text[] NOT NULL,
	"focus" text[] NOT NULL,
	"open_source_path" text,
	"profile_id" uuid NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "session" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"expires_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "skill" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"profile_id" uuid NOT NULL,
	"role" text NOT NULL,
	"skill_level" text NOT NULL,
	"technologies" text[] NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_detail" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"displayName" text,
	"imageId" text,
	"bio" text DEFAULT '' NOT NULL,
	CONSTRAINT "user_detail_userId_unique" UNIQUE("userId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_profile" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"work_pace" text NOT NULL,
	"open_source_path" text,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" text PRIMARY KEY NOT NULL,
	"email" text,
	"created_at" timestamp,
	"updated_at" timestamp,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "account" ADD CONSTRAINT "account_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project_category_preference" ADD CONSTRAINT "project_category_preference_profile_id_user_profile_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."user_profile"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "skill" ADD CONSTRAINT "skill_profile_id_user_profile_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."user_profile"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_detail" ADD CONSTRAINT "user_detail_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_profile" ADD CONSTRAINT "user_profile_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
