CREATE TABLE IF NOT EXISTS "photos" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"album_id" uuid NOT NULL,
	"first_name" varchar(50) NOT NULL,
	"people" varchar[] DEFAULT ARRAY[]::varchar[],
	"original_resized_url" varchar NOT NULL,
	"watermark_resized_url" varchar NOT NULL,
	"original_url" varchar NOT NULL,
	"watermark_url" varchar NOT NULL
);

ALTER TABLE "albums" ALTER COLUMN "created_at" SET DATA TYPE varchar(25);
ALTER TABLE "albums" ALTER COLUMN "created_at" DROP DEFAULT;
ALTER TABLE "albums" DROP COLUMN IF EXISTS "photos";
DO $$ BEGIN
 ALTER TABLE "photos" ADD CONSTRAINT "photos_album_id_albums_id_fk" FOREIGN KEY ("album_id") REFERENCES "albums"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
