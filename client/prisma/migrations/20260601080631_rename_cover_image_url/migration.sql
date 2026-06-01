/*
  Warnings:

  - You are about to drop the column `coverImage` on the `project` table. All the data in the column will be lost.
  - Added the required column `coverImageUrl` to the `project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `project` DROP COLUMN `coverImage`,
    ADD COLUMN `coverImageUrl` VARCHAR(191) NOT NULL;
