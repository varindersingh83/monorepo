-- CreateTable
CREATE TABLE "VisitCount" (
    "id" SERIAL NOT NULL,
    "page" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "VisitCount_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VisitCount_page_key" ON "VisitCount"("page");
