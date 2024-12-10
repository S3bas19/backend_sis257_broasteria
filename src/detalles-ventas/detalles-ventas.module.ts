import { Module } from '@nestjs/common';
import { DetallesVentasService } from './detalles-ventas.service';
import { DetallesVentasController } from './detalles-ventas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetallesVenta } from './entities/detalles-venta.entity';
import { ProductosModule } from 'src/productos/productos.module';
import { VentasModule } from 'src/ventas/ventas.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([DetallesVenta]),
    ProductosModule,
    VentasModule,
  ],
  controllers: [DetallesVentasController],
  providers: [DetallesVentasService],
})
export class DetallesVentasModule {}