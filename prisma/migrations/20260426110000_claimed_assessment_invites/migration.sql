-- AlterTable
ALTER TABLE "applicant_tokens" ADD COLUMN "claimedAt" TIMESTAMP(3);
ALTER TABLE "applicant_tokens" ADD COLUMN "resumeTokenHash" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "applicant_tokens_resumeTokenHash_key" ON "applicant_tokens"("resumeTokenHash");

-- CreateIndex
CREATE INDEX "applicant_tokens_resumeTokenHash_idx" ON "applicant_tokens"("resumeTokenHash");
