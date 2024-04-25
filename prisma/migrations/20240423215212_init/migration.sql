/*
  Warnings:

  - The values [REGECTED] on the enum `GuestStatus` will be removed. If these variants are still used in the database, this will fail.
  - The primary key for the `Guest` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Wish` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "GuestStatus_new" AS ENUM ('NEW', 'EDITED', 'REJECTED');
ALTER TABLE "Guest" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Guest" ALTER COLUMN "status" TYPE "GuestStatus_new" USING ("status"::text::"GuestStatus_new");
ALTER TYPE "GuestStatus" RENAME TO "GuestStatus_old";
ALTER TYPE "GuestStatus_new" RENAME TO "GuestStatus";
DROP TYPE "GuestStatus_old";
ALTER TABLE "Guest" ALTER COLUMN "status" SET DEFAULT 'NEW';
COMMIT;

-- AlterTable
ALTER TABLE "Guest" DROP CONSTRAINT "Guest_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Guest_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Guest_id_seq";

-- AlterTable
ALTER TABLE "Wish" DROP CONSTRAINT "Wish_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Wish_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Wish_id_seq";
