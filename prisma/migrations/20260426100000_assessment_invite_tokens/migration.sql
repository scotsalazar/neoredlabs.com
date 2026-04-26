-- AlterTable
ALTER TABLE "applicant_tokens" ADD COLUMN "applicantName" TEXT NOT NULL DEFAULT '';
ALTER TABLE "applicant_tokens" ADD COLUMN "applicantEmail" TEXT NOT NULL DEFAULT '';
ALTER TABLE "applicant_tokens" ALTER COLUMN "careerApplicationId" DROP NOT NULL;
ALTER TABLE "applicant_tokens" ALTER COLUMN "applicantName" DROP DEFAULT;
ALTER TABLE "applicant_tokens" ALTER COLUMN "applicantEmail" DROP DEFAULT;

-- DropForeignKey
ALTER TABLE "applicant_tokens" DROP CONSTRAINT "applicant_tokens_careerApplicationId_fkey";

-- AddForeignKey
ALTER TABLE "applicant_tokens" ADD CONSTRAINT "applicant_tokens_careerApplicationId_fkey" FOREIGN KEY ("careerApplicationId") REFERENCES "CareerApplication"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- CreateIndex
CREATE INDEX "applicant_tokens_applicantEmail_idx" ON "applicant_tokens"("applicantEmail");
