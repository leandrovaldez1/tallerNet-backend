/*
  Warnings:

  - A unique constraint covering the columns `[dni]` on the table `clientes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nombre,marca]` on the table `repuestos` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `dni` to the `clientes` table without a default value. This is not possible if the table is not empty.
  - Made the column `marca` on table `repuestos` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `clientes` ADD COLUMN `dni` VARCHAR(15) NOT NULL;

-- AlterTable
ALTER TABLE `repuestos` MODIFY `marca` VARCHAR(50) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `clientes_dni_key` ON `clientes`(`dni`);

-- CreateIndex
CREATE UNIQUE INDEX `repuestos_nombre_marca_key` ON `repuestos`(`nombre`, `marca`);
