-- CreateTable
CREATE TABLE "GameMemory" (
    "id" SERIAL NOT NULL,
    "playTime" INTEGER NOT NULL,
    "mainImage" TEXT NOT NULL,
    "images" TEXT[],
    "gameId" INTEGER NOT NULL,

    CONSTRAINT "GameMemory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GameMemory_gameId_key" ON "GameMemory"("gameId");

-- AddForeignKey
ALTER TABLE "GameMemory" ADD CONSTRAINT "GameMemory_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
