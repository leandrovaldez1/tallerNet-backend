import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { UsersModule } from '../users/users.module.js';
import { AuthModule } from '../auth/auth.module.js';
import { ClientesModule } from '../clientes/clientes.module.js';
import { VehiculosModule } from '../vehiculos/vehiculos.module.js';
import { OrdenesModule } from '../ordenes/ordenes.module.js';
import { RepuestosModule } from '../repuestos/repuestos.module.js';
import { PrismaModule } from '../prisma/prisma.module.js';
import { MarcasModule } from '../marcas/marcas.module.js';
import { ModelosModule } from '../modelos/modelos.module.js';


@Module({
  imports: [
    UsersModule, AuthModule, ClientesModule, VehiculosModule, OrdenesModule, RepuestosModule, PrismaModule, MarcasModule, ModelosModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
