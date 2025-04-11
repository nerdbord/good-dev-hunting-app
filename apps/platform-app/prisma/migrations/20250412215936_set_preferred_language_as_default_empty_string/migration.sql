/*
  Warnings:

  - Made the column `preferredLanguage` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "preferredLanguage" SET NOT NULL,
ALTER COLUMN "preferredLanguage" SET DEFAULT '';
