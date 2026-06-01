/*
  Warnings:

  - Added the required column `coverImage` to the `project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `introduction` to the `project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ownerId` to the `project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `project` ADD COLUMN `coverImage` VARCHAR(191) NOT NULL,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `introduction` VARCHAR(191) NOT NULL,
    ADD COLUMN `ownerId` VARCHAR(191) NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `role` ENUM('ADMIN', 'USER') NOT NULL DEFAULT 'USER';

-- AddForeignKey
ALTER TABLE `project` ADD CONSTRAINT `project_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
