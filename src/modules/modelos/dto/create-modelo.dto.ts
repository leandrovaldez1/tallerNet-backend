import { IsString, IsNotEmpty, IsInt } from 'class-validator';

export class CreateModeloDto {
    @IsString({ message: 'El nombre debe ser un texto.' })
    @IsNotEmpty({ message: 'El nombre es obligatorio.' })
    nombre: string;

    @IsInt({ message: 'El ID de la marca debe ser un número entero.' })
    marca_id: number;
}