import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service.js';
import { UpdateUserDto } from './dto/update-user.dto.js';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  // Listar usuarios
  findAll() {
    return this.prisma.user.findMany({
      omit: { passwordHash: true },
    });
  }

  // Buscar usuario por ID
  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      omit: { passwordHash: true },
    });

    if (!user) {
      throw new NotFoundException(`No existe un usuario con ID ${id}.`);
    }

    return user;
  }

  // Actualizar usuario
  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.findOne(id);

    if (updateUserDto.email) {
      await this.validateEmail(updateUserDto.email, id);
    }

    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
      omit: { passwordHash: true },
    });
  }

  // Eliminar usuario
  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.user.delete({
      where: { id },
      omit: { passwordHash: true },
    });
  }

  // Validar correo duplicado
  private async validateEmail(email: string, userId?: number) {
    const existing = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existing && existing.id !== userId) {
      throw new ConflictException(
        'Ya existe una cuenta con ese correo electrónico.',
      );
    }
  }
}
