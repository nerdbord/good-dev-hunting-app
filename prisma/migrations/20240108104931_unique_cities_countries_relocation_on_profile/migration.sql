/*
  Warnings:

  - You are about to drop the column `openForRelocation` on the `City` table. All the data in the column will be lost.
  - You are about to drop the column `openForRelocation` on the `Country` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `City` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Country` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "City" DROP COLUMN "openForRelocation";

-- AlterTable
ALTER TABLE "Country" DROP COLUMN "openForRelocation";

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "openForCityRelocation" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "openForCountryRelocation" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "City_name_key" ON "City"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Country_name_key" ON "Country"("name");
