-- AlterTable
ALTER TABLE `content_image` MODIFY `url` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `content_text` MODIFY `content` LONGTEXT NOT NULL;

-- AlterTable
ALTER TABLE `content_video` MODIFY `url` TEXT NOT NULL;
