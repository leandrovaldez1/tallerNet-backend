import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service.js';
import { CreateRepuestoDto } from './dto/create-repuesto.dto.js';
import { UpdateRepuestoDto } from './dto/update-repuesto.dto.js';

@Injectable()
export class RepuestosService {
  constructor(private readonly prisma: PrismaService) { }

  // Crear repuesto
  async create(createRepuestoDto: CreateRepuestoDto) {
    await this.validateNombreMarca(createRepuestoDto.nombre, createRepuestoDto.marca);

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
    const repuesto = await this.findOne(id);

    const nombre = updateRepuestoDto.nombre ?? repuesto.nombre;
    const marca = updateRepuestoDto.marca ?? repuesto.marca;
    await this.validateNombreMarca(nombre, marca, id);

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

  private async validateNombreMarca(nombre: string, marca: string, repuestoId?: number) {
    const existing = await this.prisma.repuesto.findUnique({
      where: { nombre_marca: { nombre, marca } },
      select: { id: true },
    });

    if (existing && existing.id !== repuestoId) {
      throw new ConflictException('Ya existe un repuesto con ese nombre y marca.');
    }
  }
}