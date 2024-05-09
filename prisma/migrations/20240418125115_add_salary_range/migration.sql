-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('PLN');

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "currency" "Currency" NOT NULL DEFAULT 'PLN',
ADD COLUMN     "hourlyRateMax" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "hourlyRateMin" INTEGER NOT NULL DEFAULT 0;
