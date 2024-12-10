import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsDefined, IsNumber } from 'class-validator';

export class CreateVentaDto {
  @ApiProperty()
  @IsDefined({ message: 'El campo idCliente debe estar definido' })
  @IsNumber({}, { message: 'El campo idCliente debe ser tipo numérico' })
  readonly idCliente: number;
}
