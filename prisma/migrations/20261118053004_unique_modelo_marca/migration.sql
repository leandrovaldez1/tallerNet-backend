/*
  Warnings:

  - A unique constraint covering the columns `[marca_id,nombre]` on the table `modelos` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `modelos_marca_id_nombre_key` ON `modelos`(`marca_id`, `nombre`);
