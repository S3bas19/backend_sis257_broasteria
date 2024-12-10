import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreatePagoDto {
  @ApiProperty()
  @IsDefined({ message: 'El campo idVenta debe estar definido' })
  @IsNumber({}, { message: 'El campo idVenta debe ser tipo numérico' })
  readonly idVenta: number;

  @ApiProperty()
  @IsDefined({ message: 'El campo monto debe estar definido' })
  @IsNumber({}, { message: 'El campo monto debe ser tipo numérico' })
  readonly monto: number;

  @ApiProperty()
  @IsDefined({ message: 'El campo fechaPago debe estar definido' })
  @IsDateString({}, { message: 'El campo fechaPago debe ser de tipo fecha' })
  readonly fechaPago: Date;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo metodoPago no debe ser vacío' })
  @IsString({ message: 'El campo metodoPago debe ser de tipo cadena' })
  @MaxLength(30, {
    message: 'El campo metodoPago no debe ser mayor a 30 caracteres',
  })
  readonly metodoPago: string;
}
