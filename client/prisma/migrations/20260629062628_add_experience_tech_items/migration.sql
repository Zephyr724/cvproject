-- CreateTable
CREATE TABLE `experience_tech_item` (
    `experienceId` INTEGER NOT NULL,
    `techItemId` INTEGER NOT NULL,

    PRIMARY KEY (`experienceId`, `techItemId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `experience_tech_item` ADD CONSTRAINT `experience_tech_item_experienceId_fkey` FOREIGN KEY (`experienceId`) REFERENCES `experience`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `experience_tech_item` ADD CONSTRAINT `experience_tech_item_techItemId_fkey` FOREIGN KEY (`techItemId`) REFERENCES `tech_item`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
