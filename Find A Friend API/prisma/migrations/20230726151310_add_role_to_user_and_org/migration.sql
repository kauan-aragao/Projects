-- CreateEnum
CREATE TYPE "ROLE" AS ENUM ('User', 'Org');

-- AlterTable
ALTER TABLE "orgs" ADD COLUMN     "role" "ROLE" NOT NULL DEFAULT 'Org';

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" "ROLE" NOT NULL DEFAULT 'User';
