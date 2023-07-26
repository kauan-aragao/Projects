/*
  Warnings:

  - You are about to drop the column `pet_id` on the `orgs` table. All the data in the column will be lost.
  - Added the required column `org_id` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "orgs" DROP CONSTRAINT "orgs_pet_id_fkey";

-- AlterTable
ALTER TABLE "orgs" DROP COLUMN "pet_id",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "org_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "orgs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
