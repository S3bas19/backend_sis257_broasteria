import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateProductoDto {
  @ApiProperty()
  @IsDefined({ message: 'El campo idCategoria debe estar definido' })
  @IsNumber({}, { message: 'El campo idCategoria debe ser tipo numérico' })
  readonly idCategoria: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo nombre es obligatorio' })
  @IsString({ message: 'El campo nombre debe ser de tipo cadena' })
  @MaxLength(30, {
    message: 'El campo nombre no debe ser mayor a 30 caracteres',
  })
  readonly nombre: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El descripcion es obligatorio' })
  @IsString({ message: 'El campo descripcion debe ser de tipo cadena' })
  @MaxLength(250, {
    message: 'El campo descripcion no debe ser mayor a 250 caracteres',
  })
  readonly descripcion: string;

  @ApiProperty()
  @IsDefined({ message: 'El campo cantidadDisponible debe estar definido' })
  @IsNumber({}, { message: 'El campo cantidadDisponible debe ser tipo numérico' })
  readonly cantidadDisponible: number;

  @ApiProperty()
  @IsDefined({ message: 'El campo precio debe estar definido' })
  @IsNumber({}, { message: 'El campo precio debe ser tipo numérico' })
  readonly precio: number;
}
