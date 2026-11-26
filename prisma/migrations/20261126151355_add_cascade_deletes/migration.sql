-- DropForeignKey
ALTER TABLE `modelos` DROP FOREIGN KEY `modelos_marca_id_fkey`;

-- DropForeignKey
ALTER TABLE `ordenes` DROP FOREIGN KEY `ordenes_vehiculo_id_fkey`;

-- DropForeignKey
ALTER TABLE `vehiculos` DROP FOREIGN KEY `vehiculos_cliente_id_fkey`;

-- DropForeignKey
ALTER TABLE `vehiculos` DROP FOREIGN KEY `vehiculos_modelo_id_fkey`;

-- DropIndex
DROP INDEX `ordenes_vehiculo_id_fkey` ON `ordenes`;

-- DropIndex
DROP INDEX `vehiculos_cliente_id_fkey` ON `vehiculos`;

-- DropIndex
DROP INDEX `vehiculos_modelo_id_fkey` ON `vehiculos`;

-- AddForeignKey
ALTER TABLE `modelos` ADD CONSTRAINT `modelos_marca_id_fkey` FOREIGN KEY (`marca_id`) REFERENCES `marcas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `vehiculos` ADD CONSTRAINT `vehiculos_modelo_id_fkey` FOREIGN KEY (`modelo_id`) REFERENCES `modelos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `vehiculos` ADD CONSTRAINT `vehiculos_cliente_id_fkey` FOREIGN KEY (`cliente_id`) REFERENCES `clientes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ordenes` ADD CONSTRAINT `ordenes_vehiculo_id_fkey` FOREIGN KEY (`vehiculo_id`) REFERENCES `vehiculos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
