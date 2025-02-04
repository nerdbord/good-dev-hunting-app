/*
  Warnings:

  - Made the column `slug` on table `Profile` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Profile" ALTER COLUMN "slug" SET NOT NULL;
