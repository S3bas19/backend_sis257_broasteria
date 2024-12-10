import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateProveedorDto {
  @ApiProperty()
  @IsDefined({ message: 'El campo idProducto debe estar definido' })
  @IsNumber({}, { message: 'El campo idProducto debe ser tipo numérico' })
  readonly idProducto: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo nombres no debe ser vacío' })
  @IsString({ message: 'El campo nombres debe ser de tipo cadena' })
  @MaxLength(30, {
    message: 'El campo nombres no debe ser mayor a 50 caracteres',
  })
  readonly nombre: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo apellidoPaterno no debe ser vacío' })
  @IsString({ message: 'El campo apellidoPaterno debe ser de tipo cadena' })
  @MaxLength(30, {
    message: 'El campo apellidoPaterno no debe ser mayor a 50 caracteres',
  })
  readonly apellidoPaterno: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo telefono no debe ser vacío' })
  @IsString({ message: 'El campo telefono debe ser de tipo cadena' })
  @MaxLength(8, {
    message: 'El campo telefono no debe ser mayor a 8 caracteres',
  })
  readonly telefono: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo direccion no debe ser vacío' })
  @IsString({ message: 'El campo direccion debe ser de tipo cadena' })
  @MaxLength(250, {
    message: 'El campo direccion no debe ser mayor a 30 caracteres',
  })
  readonly direccion: string;
}
