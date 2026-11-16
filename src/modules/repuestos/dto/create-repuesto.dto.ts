import { IsString, IsNotEmpty, IsOptional, IsNumber, IsInt } from 'class-validator';

export class CreateRepuestoDto {
    @IsString({ message: 'El nombre debe ser un texto.' })
    @IsNotEmpty({ message: 'El nombre es obligatorio.' })
    nombre: string;

    @IsOptional()
    @IsString({ message: 'La marca debe ser un texto.' })
    marca?: string;

    @IsOptional()
    @IsNumber({}, { message: 'El precio debe ser un número.' })
    precio?: number;

    @IsOptional()
    @IsInt({ message: 'El stock debe ser un número entero.' })
    stock?: number;
}