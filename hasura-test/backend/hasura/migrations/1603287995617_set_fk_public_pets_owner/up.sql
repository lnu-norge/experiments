alter table "public"."pets"
           add constraint "pets_owner_fkey"
           foreign key ("owner")
           references "public"."owners"
           ("id") on update restrict on delete restrict;
