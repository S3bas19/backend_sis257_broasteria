import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNumber } from 'class-validator';

export class CreateDetallesVentaDto {
  @ApiProperty()
  @IsDefined({ message: 'El campo idProducto debe estar definido' })
  @IsNumber({}, { message: 'El campo idProducto debe ser tipo numérico' })
  readonly idProducto: number;

  @ApiProperty()
  @IsDefined({ message: 'El campo idVenta debe estar definido' })
  @IsNumber({}, { message: 'El campo idVenta debe ser tipo numérico' })
  readonly idVenta: number;

  @ApiProperty()
  @IsDefined({ message: 'El campo cantidad debe estar definido' })
  @IsNumber({}, { message: 'El campo cantidad debe ser tipo numérico' })
  readonly cantidad: number;
}
