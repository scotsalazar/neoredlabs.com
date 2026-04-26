-- AlterTable
ALTER TABLE "CareerApplication" ADD COLUMN "applicationStatus" TEXT NOT NULL DEFAULT 'assessment_completed';
ALTER TABLE "CareerApplication" ADD COLUMN "followUpSentAt" TIMESTAMP(3);
ALTER TABLE "CareerApplication" ADD COLUMN "earliestStartDate" TIMESTAMP(3);
ALTER TABLE "CareerApplication" ADD COLUMN "gcashAccountNumber" TEXT;
ALTER TABLE "CareerApplication" ADD COLUMN "mobileNumber" TEXT;
ALTER TABLE "CareerApplication" ADD COLUMN "jobOfferDecision" TEXT;
ALTER TABLE "CareerApplication" ADD COLUMN "jobOfferRespondedAt" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "job_offer_tokens" (
    "id" SERIAL NOT NULL,
    "careerApplicationId" INTEGER NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "usedAt" TIMESTAMP(3),
    "revokedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "job_offer_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "job_offer_tokens_tokenHash_key" ON "job_offer_tokens"("tokenHash");

-- CreateIndex
CREATE INDEX "CareerApplication_applicationStatus_idx" ON "CareerApplication"("applicationStatus");

-- CreateIndex
CREATE INDEX "job_offer_tokens_careerApplicationId_usedAt_revokedAt_idx" ON "job_offer_tokens"("careerApplicationId", "usedAt", "revokedAt");

-- CreateIndex
CREATE INDEX "job_offer_tokens_expiresAt_idx" ON "job_offer_tokens"("expiresAt");

-- AddForeignKey
ALTER TABLE "job_offer_tokens" ADD CONSTRAINT "job_offer_tokens_careerApplicationId_fkey" FOREIGN KEY ("careerApplicationId") REFERENCES "CareerApplication"("id") ON DELETE CASCADE ON UPDATE CASCADE;
