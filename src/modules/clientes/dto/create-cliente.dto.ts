import { IsString, IsNotEmpty, IsOptional, IsEmail } from 'class-validator';

export class CreateClienteDto {
    @IsString({ message: 'El nombre debe ser un texto.' })
    @IsNotEmpty({ message: 'El nombre es obligatorio.' })
    nombre: string;

    @IsString({ message: 'El apellido debe ser un texto.' })
    @IsNotEmpty({ message: 'El apellido es obligatorio.' })
    apellido: string;

    @IsOptional()
    @IsString({ message: 'El teléfono debe ser un texto.' })
    telefono?: string;

    @IsOptional()
    @IsEmail({}, { message: 'El correo no es válido.' })
    email?: string;
}