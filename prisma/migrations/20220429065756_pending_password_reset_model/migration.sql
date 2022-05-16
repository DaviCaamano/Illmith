-- CreateTable
CREATE TABLE `PendingPasswordReset` (
    `userId` INTEGER NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `expiration` DATETIME(3) NOT NULL,

    UNIQUE INDEX `PendingPasswordReset_userId_key`(`userId`),
    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PendingPasswordReset` ADD CONSTRAINT `PendingPasswordReset_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
