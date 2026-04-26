-- CreateTable
CREATE TABLE "SlotAvailability" (
    "id" SERIAL NOT NULL,
    "slotDate" TIMESTAMP(3) NOT NULL,
    "slot" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SlotAvailability_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Appointment" (
    "id" SERIAL NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "notes" TEXT,
    "slotAvailabilityId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Appointment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusinessPost" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "publishedAt" TIMESTAMP(3),
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BusinessPost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CareerApplication" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "role" TEXT NOT NULL,
    "answerAiTools" TEXT NOT NULL,
    "answerApi" TEXT NOT NULL,
    "answerModernWorkflows" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "passed" BOOLEAN NOT NULL,
    "passingScore" INTEGER NOT NULL DEFAULT 70,
    "recommendation" TEXT NOT NULL,
    "aiGeneratedRisk" TEXT NOT NULL,
    "categoryScores" JSONB NOT NULL,
    "strengths" JSONB NOT NULL,
    "concerns" JSONB NOT NULL,
    "summary" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CareerApplication_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SlotAvailability_slotDate_slot_key" ON "SlotAvailability"("slotDate", "slot");

-- CreateIndex
CREATE UNIQUE INDEX "BusinessPost_slug_key" ON "BusinessPost"("slug");

-- CreateIndex
CREATE INDEX "BusinessPost_isPublished_publishedAt_idx" ON "BusinessPost"("isPublished", "publishedAt");

-- CreateIndex
CREATE INDEX "CareerApplication_role_passed_score_idx" ON "CareerApplication"("role", "passed", "score");

-- CreateIndex
CREATE INDEX "CareerApplication_createdAt_idx" ON "CareerApplication"("createdAt");

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_slotAvailabilityId_fkey" FOREIGN KEY ("slotAvailabilityId") REFERENCES "SlotAvailability"("id") ON DELETE CASCADE ON UPDATE CASCADE;
