import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service.js';
import { CreateVehiculoDto } from './dto/create-vehiculo.dto.js';
import { UpdateVehiculoDto } from './dto/update-vehiculo.dto.js';

@Injectable()
export class VehiculosService {
  constructor(private readonly prisma: PrismaService) { }

  // Crear vehículo
  create(createVehiculoDto: CreateVehiculoDto) {
    return this.prisma.vehiculo.create({
      data: createVehiculoDto,
    });
  }

  // Listar vehículos
  findAll() {
    return this.prisma.vehiculo.findMany();
  }

  // Buscar vehículo por ID
  async findOne(id: number) {
    const vehiculo = await this.prisma.vehiculo.findUnique({
      where: { id },
    });

    if (!vehiculo) {
      throw new NotFoundException(`No existe un vehículo con ID ${id}.`);
    }

    return vehiculo;
  }

  // Actualizar vehículo
  async update(id: number, updateVehiculoDto: UpdateVehiculoDto) {
    await this.findOne(id);

    return this.prisma.vehiculo.update({
      where: { id },
      data: updateVehiculoDto,
    });
  }

  // Eliminar vehículo
  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.vehiculo.delete({
      where: { id },
    });
  }
}