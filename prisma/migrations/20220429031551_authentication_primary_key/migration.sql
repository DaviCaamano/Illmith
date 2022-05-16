/*
  Warnings:

  - The primary key for the `authentication` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `authentication` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[ip]` on the table `Authentication` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `authentication` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD PRIMARY KEY (`ip`);

-- CreateIndex
CREATE UNIQUE INDEX `Authentication_ip_key` ON `Authentication`(`ip`);
