/*
  Warnings:

  - You are about to drop the `UsersOnPictures` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UsersOnPictures" DROP CONSTRAINT "UsersOnPictures_pictureId_fkey";

-- DropForeignKey
ALTER TABLE "UsersOnPictures" DROP CONSTRAINT "UsersOnPictures_userId_fkey";

-- DropTable
DROP TABLE "UsersOnPictures";

-- CreateTable
CREATE TABLE "_PictureToUser" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PictureToUser_AB_unique" ON "_PictureToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_PictureToUser_B_index" ON "_PictureToUser"("B");

-- AddForeignKey
ALTER TABLE "_PictureToUser" ADD CONSTRAINT "_PictureToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Picture"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PictureToUser" ADD CONSTRAINT "_PictureToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
