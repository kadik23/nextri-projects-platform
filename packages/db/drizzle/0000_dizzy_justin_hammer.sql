DO $$ BEGIN
 CREATE TYPE "public"."project_type" AS ENUM('freelance', 'open_source', 'company');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."work_pace" AS ENUM('short_term', 'medium_term', 'long_term', 'specific_task');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."work_type" AS ENUM('rebuild_projects', 'solve_issues');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
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
CREATE TABLE IF NOT EXISTS "prefernces" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"role" text,
	"skill_level" text,
	"project_type" text,
	"project_focus" text[],
	"work_type" text[],
	"work_pace" text[],
	"tech_stack" text[]
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "profileBookmarks" (
	"profile_id" text,
	"project_id" text,
	CONSTRAINT "profileBookmarks_profile_id_project_id_pk" PRIMARY KEY("profile_id","project_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "project_users" (
	"id" text PRIMARY KEY NOT NULL,
	"project_id" text NOT NULL,
	"profile_id" text NOT NULL,
	"request_date" timestamp DEFAULT now(),
	"status" text DEFAULT 'pending'
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "projects" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text DEFAULT '',
	"roles" text[],
	"skill_level" text[],
	"project_type" text,
	"project_focus" text[],
	"work_type" text[],
	"work_pace" text[],
	"tech_stack" text[],
	CONSTRAINT "projects_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "session" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"expires_at" timestamp with time zone NOT NULL
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
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"work_pace" "work_pace" NOT NULL,
	"skill_level" text NOT NULL,
	"role" text NOT NULL,
	"skills" text[] NOT NULL,
	"category_preference" project_type[] NOT NULL,
	"focus" text[] NOT NULL,
	"work_type" work_type[],
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
 ALTER TABLE "prefernces" ADD CONSTRAINT "prefernces_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "profileBookmarks" ADD CONSTRAINT "profileBookmarks_profile_id_prefernces_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."prefernces"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "profileBookmarks" ADD CONSTRAINT "profileBookmarks_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project_users" ADD CONSTRAINT "project_users_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project_users" ADD CONSTRAINT "project_users_profile_id_prefernces_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."prefernces"("id") ON DELETE cascade ON UPDATE no action;
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
