import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service.js';
import { CreateMarcaDto } from './dto/create-marca.dto.js';
import { UpdateMarcaDto } from './dto/update-marca.dto.js';

@Injectable()
export class MarcasService {
  constructor(private readonly prisma: PrismaService) {}

  // Crear marca
  create(createMarcaDto: CreateMarcaDto) {
    return this.prisma.marca.create({
      data: createMarcaDto,
    });
  }

  // Listar marcas
  findAll() {
    return this.prisma.marca.findMany();
  }

  // Buscar marca por ID
  async findOne(id: number) {
    const marca = await this.prisma.marca.findUnique({
      where: { id },
    });

    if (!marca) {
      throw new NotFoundException(`No existe una marca con ID ${id}.`);
    }

    return marca;
  }

  // Actualizar marca
  async update(id: number, updateMarcaDto: UpdateMarcaDto) {
    await this.findOne(id);

    return this.prisma.marca.update({
      where: { id },
      data: updateMarcaDto,
    });
  }

  // Eliminar marca
  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.marca.delete({
      where: { id },
    });
  }
}