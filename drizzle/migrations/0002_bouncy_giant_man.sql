ALTER TABLE "photos" ALTER COLUMN "original_resized_url" SET DEFAULT 'https://photo-drop-lambda.s3.eu-central-1.amazonaws.com/logo.jpg';
ALTER TABLE "photos" ALTER COLUMN "watermark_resized_url" SET DEFAULT 'https://photo-drop-lambda.s3.eu-central-1.amazonaws.com/logo.jpg';
ALTER TABLE "photos" ALTER COLUMN "original_url" SET DEFAULT 'https://photo-drop-lambda.s3.eu-central-1.amazonaws.com/logo.jpg';
ALTER TABLE "photos" ALTER COLUMN "watermark_url" SET DEFAULT 'https://photo-drop-lambda.s3.eu-central-1.amazonaws.com/logo.jpg';
ALTER TABLE "photos" ALTER COLUMN "name" DROP NOT NULL;