-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'MODERATOR');

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';
