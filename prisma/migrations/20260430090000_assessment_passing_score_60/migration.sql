ALTER TABLE "CareerApplication"
ALTER COLUMN "passingScore" SET DEFAULT 60;

UPDATE "CareerApplication"
SET
  "passingScore" = 60,
  "passed" = "score" >= 60;
