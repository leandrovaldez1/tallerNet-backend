import {
    IsString,
    IsNotEmpty,
    IsOptional,
    IsNumber,
    IsInt,
    Min,
} from 'class-validator';

export class CreateRepuestoDto {
    @IsString({ message: 'El nombre debe ser un texto.' })
    @IsNotEmpty({ message: 'El nombre es obligatorio.' })
    nombre: string;

    @IsString({ message: 'La marca debe ser un texto.' })
    @IsNotEmpty({ message: 'La marca es obligatoria.' })
    marca: string;

    @IsOptional()
    @IsNumber({}, { message: 'El precio debe ser un número.' })
    @Min(0, { message: 'El precio no puede ser negativo.' })
    precio?: number;

    @IsOptional()
    @IsInt({ message: 'El stock debe ser un número entero.' })
    @Min(0, { message: 'El stock no puede ser negativo.' })
    stock?: number;
}