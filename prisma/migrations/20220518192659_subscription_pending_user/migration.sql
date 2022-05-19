/*
  Warnings:

  - Added the required column `subscribe` to the `PendingUser` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `pendinguser` ADD COLUMN `subscribe` BOOLEAN NOT NULL;
