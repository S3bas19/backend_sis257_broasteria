import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreatePromocionDto {
  @ApiProperty()
  @IsDefined({ message: 'El campo idProducto debe estar definido' })
  @IsNumber({}, { message: 'El campo idProducto debe ser tipo numérico' })
  readonly idProducto: number;

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
  @IsDefined({ message: 'El campo fechaInicio debe estar definido' })
  @IsDateString({}, { message: 'El campo fechaInicio debe ser de tipo fecha' })
  readonly fechaInicio: Date;

  @ApiProperty()
  @IsDefined({ message: 'El campo fechaFin debe estar definido' })
  @IsDateString({}, { message: 'El campo fechaFin debe ser de tipo fecha' })
  readonly fechaFin: Date;
}
