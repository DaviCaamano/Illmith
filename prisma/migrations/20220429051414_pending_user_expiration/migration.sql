/*
  Warnings:

  - You are about to drop the column `createdAt` on the `authentication` table. All the data in the column will be lost.
  - Added the required column `expiration` to the `PendingUser` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `authentication` DROP COLUMN `createdAt`,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `pendinguser` ADD COLUMN `expiration` DATETIME(3) NOT NULL;
