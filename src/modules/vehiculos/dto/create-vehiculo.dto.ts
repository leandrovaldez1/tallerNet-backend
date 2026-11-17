import { IsString, IsNotEmpty, IsInt, IsOptional } from 'class-validator';

export class CreateVehiculoDto {
    @IsString({ message: 'La patente debe ser un texto.' })
    @IsNotEmpty({ message: 'La patente es obligatoria.' })
    patente: string;

    @IsOptional()
    @IsInt({ message: 'El año debe ser un número entero.' })
    anio?: number;

    @IsInt({ message: 'El ID del modelo debe ser un número entero.' })
    modelo_id: number;

    @IsInt({ message: 'El ID del cliente debe ser un número entero.' })
    cliente_id: number;
}