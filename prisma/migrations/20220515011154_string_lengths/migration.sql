/*
  Warnings:

  - You are about to alter the column `username` on the `pendinguser` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(32)`.
  - You are about to alter the column `password` on the `pendinguser` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(64)`.
  - You are about to alter the column `username` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(32)`.
  - You are about to alter the column `password` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(64)`.

*/
-- AlterTable
ALTER TABLE `authentication` MODIFY `token` VARCHAR(510) NOT NULL;

-- AlterTable
ALTER TABLE `pendingpasswordreset` MODIFY `token` VARCHAR(2000) NOT NULL;

-- AlterTable
ALTER TABLE `pendinguser` MODIFY `email` VARCHAR(320) NOT NULL,
    MODIFY `username` VARCHAR(32) NULL,
    MODIFY `password` VARCHAR(64) NOT NULL,
    MODIFY `token` VARCHAR(2000) NOT NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `email` VARCHAR(320) NOT NULL,
    MODIFY `username` VARCHAR(32) NULL,
    MODIFY `password` VARCHAR(64) NOT NULL;
