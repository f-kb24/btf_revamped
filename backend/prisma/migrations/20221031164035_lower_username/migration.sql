/*
  Warnings:

  - A unique constraint covering the columns `[lower_username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `lower_username` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "lower_username" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_lower_username_key" ON "User"("lower_username");
