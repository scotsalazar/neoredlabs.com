-- CreateTable
CREATE TABLE "applicant_tokens" (
    "id" SERIAL NOT NULL,
    "careerApplicationId" INTEGER NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "usedAt" TIMESTAMP(3),
    "revokedAt" TIMESTAMP(3),
    "sentAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "applicant_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "applicant_tokens_tokenHash_key" ON "applicant_tokens"("tokenHash");

-- CreateIndex
CREATE INDEX "applicant_tokens_careerApplicationId_usedAt_revokedAt_idx" ON "applicant_tokens"("careerApplicationId", "usedAt", "revokedAt");

-- CreateIndex
CREATE INDEX "applicant_tokens_expiresAt_idx" ON "applicant_tokens"("expiresAt");

-- AddForeignKey
ALTER TABLE "applicant_tokens" ADD CONSTRAINT "applicant_tokens_careerApplicationId_fkey" FOREIGN KEY ("careerApplicationId") REFERENCES "CareerApplication"("id") ON DELETE CASCADE ON UPDATE CASCADE;
