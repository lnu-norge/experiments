ALTER TABLE "public"."pets" ADD COLUMN "owner" text;
ALTER TABLE "public"."pets" ALTER COLUMN "owner" DROP NOT NULL;
