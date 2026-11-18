import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service.js';
import { CreateOrdeneDto } from './dto/create-ordene.dto.js';
import { UpdateOrdeneDto } from './dto/update-ordene.dto.js';

@Injectable()
export class OrdenesService {
  constructor(private readonly prisma: PrismaService) {}

  // Crear orden
  create(createOrdeneDto: CreateOrdeneDto) {
    return this.prisma.orden.create({
      data: createOrdeneDto,
    });
  }

  // Listar órdenes
  findAll() {
    return this.prisma.orden.findMany();
  }

  // Buscar orden por ID
  async findOne(id: number) {
    const orden = await this.prisma.orden.findUnique({
      where: { id },
    });

    if (!orden) {
      throw new NotFoundException(`No existe una orden con ID ${id}.`);
    }

    return orden;
  }

  // Actualizar orden
  async update(id: number, updateOrdeneDto: UpdateOrdeneDto) {
    await this.findOne(id);

    return this.prisma.orden.update({
      where: { id },
      data: updateOrdeneDto,
    });
  }

  // Eliminar orden
  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.orden.delete({
      where: { id },
    });
  }
}