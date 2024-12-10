import { Module } from '@nestjs/common';
import { VentasService } from './ventas.service';
import { VentasController } from './ventas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Venta } from './entities/venta.entity';
import { DetallesVenta } from 'src/detalles-ventas/entities/detalles-venta.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Venta, DetallesVenta])],
  controllers: [VentasController],
  providers: [VentasService],
  exports: [TypeOrmModule.forFeature([Venta, DetallesVenta])],
})
export class VentasModule {}
