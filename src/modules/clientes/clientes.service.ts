import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service.js';
import { CreateClienteDto } from './dto/create-cliente.dto.js';
import { UpdateClienteDto } from './dto/update-cliente.dto.js';

@Injectable()
export class ClientesService {
  constructor(private readonly prisma: PrismaService) {}

  // Crear cliente
  create(createClienteDto: CreateClienteDto) {
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
}