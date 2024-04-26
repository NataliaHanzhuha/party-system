-- CreateEnum
CREATE TYPE "InvitationPageEnum" AS ENUM ('DEFAULT', 'JULIETPAGE');

-- AlterTable
ALTER TABLE "Client" ADD COLUMN     "invitationPage" "InvitationPageEnum" NOT NULL DEFAULT 'DEFAULT';
