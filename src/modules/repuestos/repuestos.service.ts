import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service.js';
import { CreateRepuestoDto } from './dto/create-repuesto.dto.js';
import { UpdateRepuestoDto } from './dto/update-repuesto.dto.js';

@Injectable()
export class RepuestosService {
  constructor(private readonly prisma: PrismaService) { }

  // Crear repuesto
  create(createRepuestoDto: CreateRepuestoDto) {
    return this.prisma.repuesto.create({
      data: createRepuestoDto,
    });
  }

  // Listar repuestos
  findAll() {
    return this.prisma.repuesto.findMany();
  }

  // Buscar repuesto por ID
  async findOne(id: number) {
    const repuesto = await this.prisma.repuesto.findUnique({
      where: { id },
    });

    if (!repuesto) {
      throw new NotFoundException(`No existe un repuesto con ID ${id}.`);
    }

    return repuesto;
  }

  // Actualizar repuesto
  async update(id: number, updateRepuestoDto: UpdateRepuestoDto) {
    await this.findOne(id);

    return this.prisma.repuesto.update({
      where: { id },
      data: updateRepuestoDto,
    });
  }

  // Eliminar repuesto
  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.repuesto.delete({
      where: { id },
    });
  }
}