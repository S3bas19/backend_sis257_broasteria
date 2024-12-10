import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateEmpleadoDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'El campo nombre no debe ser vacío' })
  @IsString({ message: 'El campo nombre debe ser de tipo cadena' })
  @MaxLength(30, {
    message: 'El campo nombre no debe ser mayor a 30 caracteres',
  })
  readonly nombre: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo apellido paterno no debe ser vacío' })
  @IsString({ message: 'El campo apellido paterno debe ser de tipo cadena' })
  @MaxLength(30, {
    message: 'El campo apellido paterno no debe ser mayor a 30 caracteres',
  })
  readonly apellidoPaterno: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo apellido materno no debe ser vacío' })
  @IsString({ message: 'El campo apellido materno debe ser de tipo cadena' })
  @MaxLength(30, {
    message: 'El campo apellido materno no debe ser mayor a 30 caracteres',
  })
  readonly apellidoMaterno: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo cargo no debe ser vacío' })
  @IsString({ message: 'El cammpo cargo debe ser de tipo cadena' })
  @MaxLength(40, {
    message: 'El campo cargo no debe ser mayor a 40 caracteres',
  })
  readonly cargo: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo telefono no debe ser vacío' })
  @IsString({ message: 'El campo telefono debe ser de tipo cadena' })
  @MaxLength(8, {
    message: 'El campo telefono no debe ser mayor a 8 caracteres',
  })
  readonly telefono: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo salario no debe ser vacío' })
  @IsString({ message: 'El campo salario debe ser de tipo cadena' })
  @MaxLength(10, {
    message: 'El campo salario no debe ser mayor a 10 caracteres',
  })
  readonly salario: string;
}
