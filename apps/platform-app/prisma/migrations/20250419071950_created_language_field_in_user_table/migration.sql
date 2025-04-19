-- CreateEnum
CREATE TYPE "EmailLanguage" AS ENUM ('en', 'pl');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "language" "EmailLanguage";
