import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service.js';
import { CreateModeloDto } from './dto/create-modelo.dto.js';
import { UpdateModeloDto } from './dto/update-modelo.dto.js';

@Injectable()
export class ModelosService {
  constructor(private readonly prisma: PrismaService) { }

  // Crear modelo
  async create(createModeloDto: CreateModeloDto) {
    await this.validateNombreMarca(createModeloDto.nombre, createModeloDto.marca_id);

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
    const modelo = await this.findOne(id);

    const nombre = updateModeloDto.nombre ?? modelo.nombre;
    const marca_id = updateModeloDto.marca_id ?? modelo.marca_id;
    await this.validateNombreMarca(nombre, marca_id, id);

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

  private async validateNombreMarca(nombre: string, marca_id: number, modeloId?: number) {
    const existing = await this.prisma.modelo.findUnique({
      where: { marca_id_nombre: { marca_id, nombre } },
      select: { id: true },
    });

    if (existing && existing.id !== modeloId) {
      throw new ConflictException('Ya existe ese modelo para esa marca.');
    }
  }
}