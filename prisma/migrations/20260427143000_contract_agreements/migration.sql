ALTER TABLE "CareerApplication"
ADD COLUMN "contractAgreementAcceptedAt" TIMESTAMP(3);

CREATE TABLE "contract_agreements" (
  "id" SERIAL NOT NULL,
  "careerApplicationId" INTEGER NOT NULL,
  "fileName" TEXT NOT NULL,
  "contentType" TEXT NOT NULL DEFAULT 'application/pdf',
  "data" BYTEA NOT NULL,
  "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "contract_agreements_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "contract_agreements_careerApplicationId_key"
ON "contract_agreements"("careerApplicationId");

CREATE INDEX "contract_agreements_uploadedAt_idx"
ON "contract_agreements"("uploadedAt");

ALTER TABLE "contract_agreements"
ADD CONSTRAINT "contract_agreements_careerApplicationId_fkey"
FOREIGN KEY ("careerApplicationId") REFERENCES "CareerApplication"("id")
ON DELETE CASCADE ON UPDATE CASCADE;
