import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service.js';
import { CreateClienteDto } from './dto/create-cliente.dto.js';
import { UpdateClienteDto } from './dto/update-cliente.dto.js';

@Injectable()
export class ClientesService {
  constructor(private readonly prisma: PrismaService) { }

  // Crear cliente
  async create(createClienteDto: CreateClienteDto) {
    await this.validateDni(createClienteDto.dni);

    return this.prisma.cliente.create({
      data: createClienteDto,
    });
  }

  // Listar clientes
  findAll() {
    return this.prisma.cliente.findMany();
  }

  // Buscar cliente por ID
  async findOne(id: number) {
    const cliente = await this.prisma.cliente.findUnique({
      where: { id },
    });

    if (!cliente) {
      throw new NotFoundException(`No existe un cliente con ID ${id}.`);
    }

    return cliente;
  }

  // Actualizar cliente
  async update(id: number, updateClienteDto: UpdateClienteDto) {
    await this.findOne(id);

    if (updateClienteDto.dni) {
      await this.validateDni(updateClienteDto.dni, id);
    }

    return this.prisma.cliente.update({
      where: { id },
      data: updateClienteDto,
    });
  }

  // Eliminar cliente
  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.cliente.delete({
      where: { id },
    });
  }

  private async validateDni(dni: string, clienteId?: number) {
    const existing = await this.prisma.cliente.findUnique({
      where: { dni },
      select: { id: true },
    });

    if (existing && existing.id !== clienteId) {
      throw new ConflictException('Ya existe un cliente con ese DNI.');
    }
  }
}