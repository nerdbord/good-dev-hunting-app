/*
  Warnings:

  - You are about to drop the column `email` on the `Profile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "email",
ALTER COLUMN "linkedIn" DROP NOT NULL;
