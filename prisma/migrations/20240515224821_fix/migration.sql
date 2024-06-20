-- DropIndex
DROP INDEX "Guest_email_key";

-- AlterTable
ALTER TABLE "Client" ADD COLUMN     "EmailTemplateDetailsId" INTEGER,
ALTER COLUMN "invitationPage" DROP NOT NULL;

-- CreateTable
CREATE TABLE "EmailTemplateDetails" (
    "id" SERIAL NOT NULL,
    "mediaEmailId" TEXT,
    "invitationEmailId" TEXT,

    CONSTRAINT "EmailTemplateDetails_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_EmailTemplateDetailsId_fkey" FOREIGN KEY ("EmailTemplateDetailsId") REFERENCES "EmailTemplateDetails"("id") ON DELETE SET NULL ON UPDATE CASCADE;
