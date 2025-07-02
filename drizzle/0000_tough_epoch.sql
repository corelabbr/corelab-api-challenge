CREATE TYPE "public"."color" AS ENUM('white', 'light_blue', 'mint_green', 'light_yellow', 'light_peach', 'coral', 'sky_blue', 'lavender', 'yellow_green', 'light_orange', 'light_gray', 'medium_gray', 'light_brown');--> statement-breakpoint
CREATE TABLE "one_time_tokens" (
	"id" char(26) PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"was_used" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE "tasks" (
	"id" char(26) PRIMARY KEY NOT NULL,
	"user_id" char(26) NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"color" "color" DEFAULT 'white' NOT NULL,
	"favorite" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" char(26) PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;