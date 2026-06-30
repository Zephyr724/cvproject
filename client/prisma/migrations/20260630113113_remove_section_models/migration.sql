/*
  Warnings:

  - You are about to drop the `content_image` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `content_text` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `content_video` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `section` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `content_image` DROP FOREIGN KEY `content_image_sectionId_fkey`;

-- DropForeignKey
ALTER TABLE `content_text` DROP FOREIGN KEY `content_text_sectionId_fkey`;

-- DropForeignKey
ALTER TABLE `content_video` DROP FOREIGN KEY `content_video_sectionId_fkey`;

-- DropForeignKey
ALTER TABLE `section` DROP FOREIGN KEY `section_projectId_fkey`;

-- DropTable
DROP TABLE `content_image`;

-- DropTable
DROP TABLE `content_text`;

-- DropTable
DROP TABLE `content_video`;

-- DropTable
DROP TABLE `section`;
