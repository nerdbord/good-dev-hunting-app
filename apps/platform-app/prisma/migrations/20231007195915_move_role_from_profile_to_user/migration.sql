/*
  Warnings:

  - You are about to drop the column `role` on the `Profile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "role";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';
