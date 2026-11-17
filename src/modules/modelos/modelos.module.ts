import { Module } from '@nestjs/common';
import { ModelosService } from './modelos.service.js';
import { ModelosController } from './modelos.controller.js';

@Module({
  controllers: [ModelosController],
  providers: [ModelosService],
})
export class ModelosModule {}
