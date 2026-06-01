/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `tag` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `tech_item` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `tag_name_key` ON `tag`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `tech_item_name_key` ON `tech_item`(`name`);
