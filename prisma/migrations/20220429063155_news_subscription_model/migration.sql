-- CreateTable
CREATE TABLE `NewsSubscription` (
    `userId` INTEGER NOT NULL,

    UNIQUE INDEX `NewsSubscription_userId_key`(`userId`),
    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `NewsSubscription` ADD CONSTRAINT `NewsSubscription_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
