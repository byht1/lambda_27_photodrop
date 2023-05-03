CREATE TABLE IF NOT EXISTS "albums" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"owner" uuid NOT NULL,
	"first_name" varchar(50) NOT NULL,
	"location" varchar(250) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"photos" varchar[] DEFAULT '{}'::varchar[]
);

CREATE TABLE IF NOT EXISTS "albums_of_photographers" (
	"photographers_id" uuid,
	"albums_id" uuid
);
--> statement-breakpoint
ALTER TABLE "albums_of_photographers" ADD CONSTRAINT "albums_of_photographers_albums_id_photographers_id" PRIMARY KEY("albums_id","photographers_id");

CREATE TABLE IF NOT EXISTS "photographers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"first_name" varchar(50) NOT NULL,
	"last_name" varchar(50) NOT NULL,
	"email" varchar(50) NOT NULL,
	"password" varchar NOT NULL,
	"login" varchar(50) NOT NULL,
	"role" varchar(25) DEFAULT 'photographers' NOT NULL,
	"token" varchar,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);

DO $$ BEGIN
 ALTER TABLE "albums" ADD CONSTRAINT "albums_owner_photographers_id_fk" FOREIGN KEY ("owner") REFERENCES "photographers"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "albums_of_photographers" ADD CONSTRAINT "albums_of_photographers_photographers_id_photographers_id_fk" FOREIGN KEY ("photographers_id") REFERENCES "photographers"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "albums_of_photographers" ADD CONSTRAINT "albums_of_photographers_albums_id_albums_id_fk" FOREIGN KEY ("albums_id") REFERENCES "albums"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

CREATE UNIQUE INDEX IF NOT EXISTS "emailIdx" ON "photographers" ("email");
CREATE UNIQUE INDEX IF NOT EXISTS "loginIdx" ON "photographers" ("login");