-- Create tables for appointment scheduling
CREATE TABLE "SlotAvailability" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slotDate" DATETIME NOT NULL,
    "slot" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL DEFAULT 1,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "Appointment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "notes" TEXT,
    "slotAvailabilityId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Appointment_slotAvailabilityId_fkey" FOREIGN KEY ("slotAvailabilityId") REFERENCES "SlotAvailability"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE UNIQUE INDEX "SlotAvailability_slotDate_slot_key" ON "SlotAvailability"("slotDate", "slot");
CREATE INDEX "Appointment_slotAvailabilityId_idx" ON "Appointment"("slotAvailabilityId");
