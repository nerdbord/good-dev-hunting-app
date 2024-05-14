/*
  Warnings:

  - You are about to drop the column `employmentType` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `techStack` on the `Profile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "employmentType",
DROP COLUMN "techStack",
ADD COLUMN     "employmentTypes" "EmploymentType"[];

-- CreateTable
CREATE TABLE "Technology" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Technology_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProfileToTechnology" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Technology_name_key" ON "Technology"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_ProfileToTechnology_AB_unique" ON "_ProfileToTechnology"("A", "B");

-- CreateIndex
CREATE INDEX "_ProfileToTechnology_B_index" ON "_ProfileToTechnology"("B");

-- AddForeignKey
ALTER TABLE "_ProfileToTechnology" ADD CONSTRAINT "_ProfileToTechnology_A_fkey" FOREIGN KEY ("A") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProfileToTechnology" ADD CONSTRAINT "_ProfileToTechnology_B_fkey" FOREIGN KEY ("B") REFERENCES "Technology"("id") ON DELETE CASCADE ON UPDATE CASCADE;
