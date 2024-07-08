/*
  Warnings:

  - The primary key for the `PickedAgency` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `PickedProject` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropIndex
DROP INDEX "PickedAgency_user_id_idx";

-- DropIndex
DROP INDEX "PickedProject_projectPostsId_idx";

-- DropIndex
DROP INDEX "PickedProject_user_id_idx";

-- AlterTable
ALTER TABLE "PickedAgency" DROP CONSTRAINT "PickedAgency_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "PickedAgency_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "PickedAgency_id_seq";

-- AlterTable
ALTER TABLE "PickedProject" DROP CONSTRAINT "PickedProject_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "PickedProject_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "PickedProject_id_seq";
