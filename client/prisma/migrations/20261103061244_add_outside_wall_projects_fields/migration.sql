/*
  Warnings:

  - A unique constraint covering the columns `[ownerId,outsideWallSlot]` on the table `project` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `project_ownerId_outsideWallSlot_key` ON `project`(`ownerId`, `outsideWallSlot`);
