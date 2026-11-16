import { IsInt, IsString, IsNotEmpty, IsOptional, IsNumber, IsIn } from 'class-validator';

export class CreateOrdeneDto {
    @IsInt({ message: 'El ID del vehículo debe ser un número entero.' })
    vehiculo_id: number;

    @IsString({ message: 'La descripción debe ser un texto.' })
    @IsNotEmpty({ message: 'La descripción es obligatoria.' })
    descripcion: string;

    @IsOptional()
    @IsIn(['pendiente', 'en_reparacion', 'terminado', 'entregado'], {
        message: 'El estado no es válido.',
    })
    estado?: string;

    @IsOptional()
    @IsNumber({}, { message: 'El total debe ser un número.' })
    total?: number;
}