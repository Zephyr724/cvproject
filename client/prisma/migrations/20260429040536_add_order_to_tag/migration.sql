/*
  Warnings:

  - Added the required column `order` to the `project_tag` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `project_tag` ADD COLUMN `order` INTEGER NOT NULL;
