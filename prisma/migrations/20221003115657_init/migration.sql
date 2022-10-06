/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `UserDetails` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "UserDetails_email_hash_idx";

-- AlterTable
ALTER TABLE "UserDetails" ADD COLUMN     "token" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "UserDetails_token_key" ON "UserDetails"("token");

-- CreateIndex
CREATE INDEX "UserDetails_email_hash_token_idx" ON "UserDetails"("email", "hash", "token");
