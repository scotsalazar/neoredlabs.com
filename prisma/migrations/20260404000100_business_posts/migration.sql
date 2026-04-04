CREATE TABLE "BusinessPost" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "publishedAt" DATETIME,
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

CREATE UNIQUE INDEX "BusinessPost_slug_key" ON "BusinessPost"("slug");
CREATE INDEX "BusinessPost_isPublished_publishedAt_idx" ON "BusinessPost"("isPublished", "publishedAt");
