-- DropForeignKey
ALTER TABLE `project_role` DROP FOREIGN KEY `project_role_projectId_fkey`;

-- DropForeignKey
ALTER TABLE `project_role` DROP FOREIGN KEY `project_role_roleId_fkey`;

-- DropForeignKey
ALTER TABLE `project_tag` DROP FOREIGN KEY `project_tag_projectId_fkey`;

-- DropForeignKey
ALTER TABLE `project_tag` DROP FOREIGN KEY `project_tag_tagId_fkey`;

-- DropForeignKey
ALTER TABLE `project_tech_item` DROP FOREIGN KEY `project_tech_item_projectId_fkey`;

-- DropForeignKey
ALTER TABLE `project_tech_item` DROP FOREIGN KEY `project_tech_item_techItemId_fkey`;

-- DropIndex
DROP INDEX `project_role_roleId_fkey` ON `project_role`;

-- DropIndex
DROP INDEX `project_tag_tagId_fkey` ON `project_tag`;

-- DropIndex
DROP INDEX `project_tech_item_techItemId_fkey` ON `project_tech_item`;

-- AddForeignKey
ALTER TABLE `project_tag` ADD CONSTRAINT `project_tag_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `project`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `project_tag` ADD CONSTRAINT `project_tag_tagId_fkey` FOREIGN KEY (`tagId`) REFERENCES `tag`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `project_tech_item` ADD CONSTRAINT `project_tech_item_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `project`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `project_tech_item` ADD CONSTRAINT `project_tech_item_techItemId_fkey` FOREIGN KEY (`techItemId`) REFERENCES `tech_item`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `project_role` ADD CONSTRAINT `project_role_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `project`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `project_role` ADD CONSTRAINT `project_role_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `role`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
