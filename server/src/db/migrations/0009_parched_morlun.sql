ALTER TABLE "users" RENAME COLUMN "isConfirmed" TO "verified";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "confirmToken";