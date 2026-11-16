import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { UsersModule } from '../users/users.module.js';
import { AuthModule } from '../auth/auth.module.js';
import { ClientesModule } from '../clientes/clientes.module.js';
import { VehiculosModule } from '../vehiculos/vehiculos.module.js';
import { OrdenesModule } from '../ordenes/ordenes.module.js';
import { RepuestosModule } from '../repuestos/repuestos.module.js';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    UsersModule, AuthModule, ClientesModule, VehiculosModule ,OrdenesModule,RepuestosModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
