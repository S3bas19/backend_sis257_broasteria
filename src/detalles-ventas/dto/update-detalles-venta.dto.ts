import { PartialType } from '@nestjs/swagger';
import { CreateDetallesVentaDto } from './create-detalles-venta.dto';

export class UpdateDetallesVentaDto extends PartialType(
  CreateDetallesVentaDto,
) {}
