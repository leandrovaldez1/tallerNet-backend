import { Module } from '@nestjs/common';
import { RepuestosService } from './repuestos.service.js';
import { RepuestosController } from './repuestos.controller.js';

@Module({
  controllers: [RepuestosController],
  providers: [RepuestosService],
})
export class RepuestosModule {}
