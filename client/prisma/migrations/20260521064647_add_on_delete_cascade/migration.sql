-- DropForeignKey
ALTER TABLE `content_image` DROP FOREIGN KEY `content_image_sectionId_fkey`;

-- DropForeignKey
ALTER TABLE `content_text` DROP FOREIGN KEY `content_text_sectionId_fkey`;

-- DropForeignKey
ALTER TABLE `content_video` DROP FOREIGN KEY `content_video_sectionId_fkey`;

-- DropForeignKey
ALTER TABLE `section` DROP FOREIGN KEY `section_projectId_fkey`;

-- DropIndex
DROP INDEX `content_image_sectionId_fkey` ON `content_image`;

-- DropIndex
DROP INDEX `content_text_sectionId_fkey` ON `content_text`;

-- DropIndex
DROP INDEX `content_video_sectionId_fkey` ON `content_video`;

-- DropIndex
DROP INDEX `section_projectId_fkey` ON `section`;

-- AddForeignKey
ALTER TABLE `section` ADD CONSTRAINT `section_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `project`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `content_text` ADD CONSTRAINT `content_text_sectionId_fkey` FOREIGN KEY (`sectionId`) REFERENCES `section`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `content_image` ADD CONSTRAINT `content_image_sectionId_fkey` FOREIGN KEY (`sectionId`) REFERENCES `section`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `content_video` ADD CONSTRAINT `content_video_sectionId_fkey` FOREIGN KEY (`sectionId`) REFERENCES `section`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
