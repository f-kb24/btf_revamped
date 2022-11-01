-- CreateTable
CREATE TABLE "Picture" (
    "id" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "num_comments" INTEGER NOT NULL,
    "reso" JSONB NOT NULL,

    CONSTRAINT "Picture_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsersOnPictures" (
    "userId" INTEGER NOT NULL,
    "pictureId" TEXT NOT NULL,

    CONSTRAINT "UsersOnPictures_pkey" PRIMARY KEY ("userId","pictureId")
);

-- AddForeignKey
ALTER TABLE "UsersOnPictures" ADD CONSTRAINT "UsersOnPictures_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersOnPictures" ADD CONSTRAINT "UsersOnPictures_pictureId_fkey" FOREIGN KEY ("pictureId") REFERENCES "Picture"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
