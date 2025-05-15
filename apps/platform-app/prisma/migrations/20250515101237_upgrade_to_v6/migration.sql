/*
  Warnings:

  - The `language` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "UserLanguage" AS ENUM ('en', 'pl');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "language",
ADD COLUMN     "language" "UserLanguage";

-- AlterTable
ALTER TABLE "_LanguageToProfile" ADD CONSTRAINT "_LanguageToProfile_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_LanguageToProfile_AB_unique";

-- AlterTable
ALTER TABLE "_ProfileToTechnology" ADD CONSTRAINT "_ProfileToTechnology_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_ProfileToTechnology_AB_unique";

-- DropEnum
DROP TYPE "EmailLanguage";
