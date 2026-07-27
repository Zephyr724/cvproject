/*
  Warnings:

  - You are about to alter the column `description` on the `education` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Json`.
  - You are about to alter the column `description` on the `experience` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Json`.
  - A unique constraint covering the columns `[userId,degree,institution]` on the table `education` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,title,company]` on the table `experience` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `education` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `experience` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `education_degree_institution_key` ON `education`;

-- DropIndex
DROP INDEX `experience_title_company_key` ON `experience`;

-- AlterTable
ALTER TABLE `education` ADD COLUMN `userId` VARCHAR(191) NOT NULL,
    MODIFY `description` JSON NULL;

-- AlterTable
ALTER TABLE `experience` ADD COLUMN `userId` VARCHAR(191) NOT NULL,
    MODIFY `description` JSON NULL;

-- CreateIndex
CREATE UNIQUE INDEX `education_userId_degree_institution_key` ON `education`(`userId`, `degree`, `institution`);

-- CreateIndex
CREATE UNIQUE INDEX `experience_userId_title_company_key` ON `experience`(`userId`, `title`, `company`);

-- AddForeignKey
ALTER TABLE `experience` ADD CONSTRAINT `experience_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `education` ADD CONSTRAINT `education_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
