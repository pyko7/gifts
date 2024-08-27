DO $$ BEGIN
 CREATE TYPE "public"."friendshipStatusEnum" AS ENUM('pending', 'accepted', 'declined', 'blocked');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "friends" (
	"userId" uuid NOT NULL,
	"friendId" uuid NOT NULL,
	"friendshipStatusEnum" "friendshipStatusEnum" DEFAULT 'pending' NOT NULL,
	"created_at" timestamp (3) with time zone DEFAULT now(),
	"updated_at" timestamp (3) with time zone DEFAULT now(),
	CONSTRAINT "friends_userId_friendId_pk" PRIMARY KEY("userId","friendId")
);
--> statement-breakpoint
ALTER TABLE "gifts" ALTER COLUMN "userId" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "gifts" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "gifts" ALTER COLUMN "description" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "gifts" ALTER COLUMN "price" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "gifts" ALTER COLUMN "state" SET DEFAULT 'available';--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "email" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "password" SET NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "friends" ADD CONSTRAINT "friends_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "friends" ADD CONSTRAINT "friends_friendId_users_id_fk" FOREIGN KEY ("friendId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
