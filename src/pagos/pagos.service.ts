import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePagoDto } from './dto/create-pago.dto';
import { UpdatePagoDto } from './dto/update-pago.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pago } from './entities/pago.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PagosService {
  constructor(
    @InjectRepository(Pago)
    private pagosRepository: Repository<Pago>,
  ) {}
  async create(createPagoDto: CreatePagoDto): Promise<Pago> {
    const existe = await this.pagosRepository.findOneBy({
      idVenta: createPagoDto.idVenta,
      monto: createPagoDto.monto,
      fechaPago: createPagoDto.fechaPago,
      metodoPago: createPagoDto.metodoPago.trim(),
    });

    if (existe) throw new ConflictException('La pago ya existe');

    const pago = new Pago();
    pago.idVenta = createPagoDto.idVenta;
    pago.monto = createPagoDto.monto;
    pago.fechaPago = createPagoDto.fechaPago;
    pago.metodoPago = createPagoDto.metodoPago;
    return this.pagosRepository.save(pago);
  }

  async findAll(): Promise<Pago[]> {
    return this.pagosRepository.find({
      relations: ['venta'],
    });
  }

  async findOne(id: number): Promise<Pago> {
    const pago = await this.pagosRepository.findOne({
      where: { id },
      relations: ['venta'],
    });
    if (!pago) throw new NotFoundException('La pago no existe');
    return pago;
  }

  async update(id: number, updatePagoDto: UpdatePagoDto): Promise<Pago> {
    const pago = await this.pagosRepository.findOneBy({ id });
    if (!pago) throw new NotFoundException('La pago no existe');

    const pagoUpdate = Object.assign(pago, updatePagoDto);
    return this.pagosRepository.save(pagoUpdate);
  }

  async remove(id: number) {
    const pago = await this.pagosRepository.findOneBy({ id });
    if (!pago) throw new NotFoundException('La pago no existe');
    return this.pagosRepository.softRemove(pago);
  }
}
