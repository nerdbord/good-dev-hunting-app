-- AlterTable
ALTER TABLE "User" DROP COLUMN "role";

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';

