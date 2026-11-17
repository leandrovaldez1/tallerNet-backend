import { IsString, IsNotEmpty } from 'class-validator';

export class CreateMarcaDto {
    @IsString({ message: 'El nombre debe ser un texto.' })
    @IsNotEmpty({ message: 'El nombre es obligatorio.' })
    nombre: string;
}