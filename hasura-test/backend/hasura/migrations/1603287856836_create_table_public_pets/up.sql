CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE "public"."pets"("id" uuid NOT NULL DEFAULT gen_random_uuid(), "name" text NOT NULL, "type" text NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("type") REFERENCES "public"."animal_types"("type") ON UPDATE cascade ON DELETE set null, UNIQUE ("id"));
