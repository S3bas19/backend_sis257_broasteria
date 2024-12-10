import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePromocionDto } from './dto/create-promocion.dto';
import { UpdatePromocionDto } from './dto/update-promocion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Promocion } from './entities/promocion.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PromocionesService {
  constructor(
    @InjectRepository(Promocion)
    private promocionesRepository: Repository<Promocion>,
  ) {}

  async create(createPromocionDto: CreatePromocionDto): Promise<Promocion> {
    const existe = await this.promocionesRepository.findOneBy({
      nombre: createPromocionDto.nombre.trim(),
      descripcion: createPromocionDto.descripcion.trim(),
    });

    if (existe) throw new ConflictException('La promocion ya existe');

    const promocion = new Promocion();
    promocion.idProducto = createPromocionDto.idProducto;
    promocion.nombre = createPromocionDto.nombre.trim();
    promocion.descripcion = createPromocionDto.descripcion.trim();
    promocion.fechaInicio = createPromocionDto.fechaInicio;
    promocion.fechaFin = createPromocionDto.fechaFin;
    return this.promocionesRepository.save(promocion);
  }

  async findAll(): Promise<Promocion[]> {
    return this.promocionesRepository.find();
  }

  async findOne(id: number): Promise<Promocion> {
    const promocion = await this.promocionesRepository.findOneBy({ id });
    if (!promocion) throw new NotFoundException('La promocion no existe');
    return promocion;
  }

  async update(
    id: number,
    updatePromocionDto: UpdatePromocionDto,
  ): Promise<Promocion> {
    const promocion = await this.findOne(id);
    const promocionUpdate = Object.assign(promocion, updatePromocionDto);
    return this.promocionesRepository.save(promocionUpdate);
  }

  async remove(id: number) {
    const promocion = await this.findOne(id);
    return this.promocionesRepository.softRemove(promocion);
  }
}
