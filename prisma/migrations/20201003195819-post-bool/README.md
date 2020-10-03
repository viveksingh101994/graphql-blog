# Migration `20201003195819-post-bool`

This migration has been generated by viveksinghscheduleonce at 10/4/2020, 1:28:19 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."Post" DROP COLUMN "published",
ADD COLUMN "published" boolean   NOT NULL 

ALTER INDEX "public"."User_email_key" RENAME TO "User.email_unique"
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20201003195819-post-bool
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,35 @@
+generator client {
+  provider = "prisma-client-js"
+}
+
+datasource db {
+  provider = "postgresql"
+  url = "***"
+}
+
+model Comment {
+  id     Int    @id @default(autoincrement())
+  text   String
+  post   Int
+  author Int
+  User   User   @relation(fields: [author], references: [id])
+  Post   Post   @relation(fields: [post], references: [id])
+}
+
+model Post {
+  id        Int       @id @default(autoincrement())
+  title     String
+  body      String
+  published Boolean
+  author    Int
+  User      User      @relation(fields: [author], references: [id])
+  Comment   Comment[]
+}
+
+model User {
+  id      Int       @id @default(autoincrement())
+  email   String    @unique
+  name    String
+  Comment Comment[]
+  Post    Post[]
+}
```

