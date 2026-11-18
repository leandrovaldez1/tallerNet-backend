import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service.js';
import { CreateModeloDto } from './dto/create-modelo.dto.js';
import { UpdateModeloDto } from './dto/update-modelo.dto.js';

@Injectable()
export class ModelosService {
  constructor(private readonly prisma: PrismaService) {}

  // Crear modelo
  create(createModeloDto: CreateModeloDto) {
    return this.prisma.modelo.create({
      data: createModeloDto,
    });
  }

  // Listar modelos
  findAll() {
    return this.prisma.modelo.findMany();
  }

  // Buscar modelo por ID
  async findOne(id: number) {
    const modelo = await this.prisma.modelo.findUnique({
      where: { id },
    });

    if (!modelo) {
      throw new NotFoundException(`No existe un modelo con ID ${id}.`);
    }

    return modelo;
  }

  // Actualizar modelo
  async update(id: number, updateModeloDto: UpdateModeloDto) {
    await this.findOne(id);

    return this.prisma.modelo.update({
      where: { id },
      data: updateModeloDto,
    });
  }

  // Eliminar modelo
  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.modelo.delete({
      where: { id },
    });
  }
}