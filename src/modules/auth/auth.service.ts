import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service.js';
import { LoginAuthDto } from './dto/login-auth.dto.js';
import { RegisterAuthDto } from './dto/register-auth.dto.js';
import { hashPassword, verifyPassword } from './password.util.js';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  // Registrar usuario
  async register(registerAuthDto: RegisterAuthDto) {
    await this.validateEmail(registerAuthDto.email);

    return this.prisma.user.create({
      data: {
        nombre: registerAuthDto.nombre,
        email: registerAuthDto.email,
        passwordHash: await hashPassword(registerAuthDto.password),
      },
      select: {
        id: true,
        nombre: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  // Iniciar sesión
  async login(loginAuthDto: LoginAuthDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: loginAuthDto.email },
    });

    if (
      !user ||
      !(await verifyPassword(loginAuthDto.password, user.passwordHash))
    ) {
      throw new UnauthorizedException('Correo o contraseña incorrectos.');
    }

    const accessToken = await this.jwtService.signAsync({
      sub: user.id,
      email: user.email,
    });

    return {
      access_token: accessToken,
      user: {
        id: user.id,
        nombre: user.nombre,
        email: user.email,
      },
    };
  }

  // Validar correo duplicado
  private async validateEmail(email: string) {
    const existing = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existing) {
      throw new ConflictException(
        'Ya existe una cuenta con ese correo electrónico.',
      );
    }
  }
}
