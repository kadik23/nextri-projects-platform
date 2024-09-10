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
DROP TABLE "reset_tokens";--> statement-breakpoint
DROP TABLE "verify_email_tokens";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "account" ADD CONSTRAINT "account_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
