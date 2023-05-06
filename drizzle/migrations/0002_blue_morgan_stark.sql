ALTER TABLE "photos" ADD COLUMN "original_url" varchar NOT NULL;
ALTER TABLE "photos" DROP COLUMN IF EXISTS "created_at";