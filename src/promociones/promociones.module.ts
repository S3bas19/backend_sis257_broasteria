import { Module } from '@nestjs/common';
import { PromocionesService } from './promociones.service';
import { PromocionesController } from './promociones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Promocion } from './entities/promocion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Promocion])],
  controllers: [PromocionesController],
  providers: [PromocionesService],
})
export class PromocionesModule {}
