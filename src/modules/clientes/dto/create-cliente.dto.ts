import {
    IsString,
    IsNotEmpty,
    IsOptional,
    IsEmail,
    Matches,
} from 'class-validator';

export class CreateClienteDto {
    @IsString({ message: 'El nombre debe ser un texto.' })
    @IsNotEmpty({ message: 'El nombre es obligatorio.' })
    nombre: string;

    @IsString({ message: 'El apellido debe ser un texto.' })
    @IsNotEmpty({ message: 'El apellido es obligatorio.' })
    apellido: string;

    @IsString({ message: 'El DNI debe ser un texto.' })
    @IsNotEmpty({ message: 'El DNI es obligatorio.' })
    @Matches(/^\d{7,8}$/, {
        message: 'El DNI debe contener 7 u 8 números.',
    })
    dni: string;

    @IsOptional()
    @IsString({ message: 'El teléfono debe ser un texto.' })
    telefono?: string;

    @IsOptional()
    @IsEmail({}, { message: 'El correo electrónico no es válido.' })
    email?: string;
}