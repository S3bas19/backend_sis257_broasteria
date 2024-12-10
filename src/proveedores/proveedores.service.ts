import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProveedorDto } from './dto/create-proveedor.dto';
import { UpdateProveedorDto } from './dto/update-proveedor.dto';
import { Proveedor } from './entities/proveedor.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProveedoresService {
  constructor(
    @InjectRepository(Proveedor)
    private proveedoresRepository: Repository<Proveedor>,
  ) {}
  async create(createProveedorDto: CreateProveedorDto): Promise<Proveedor> {
    const existe = await this.proveedoresRepository.findOneBy({
      nombre: createProveedorDto.nombre.trim(),
      apellidoPaterno: createProveedorDto.apellidoPaterno.trim(),
      telefono: createProveedorDto.telefono.trim(),
    });

    if (existe) throw new ConflictException('La proveedor ya existe');

    const proveedor = new Proveedor();
    proveedor.idProducto = createProveedorDto.idProducto;
    proveedor.nombre = createProveedorDto.nombre.trim();
    proveedor.apellidoPaterno = createProveedorDto.apellidoPaterno.trim();
    proveedor.telefono = createProveedorDto.telefono.trim();
    proveedor.direccion = createProveedorDto.direccion.trim();
    return this.proveedoresRepository.save(proveedor);
  }

  async findAll(): Promise<Proveedor[]> {
    return this.proveedoresRepository.find({
      relations: ['producto'],
    });
  }

  async findOne(id: number): Promise<Proveedor> {
    const proveedor = await this.proveedoresRepository.findOne({
      where: { id },
      relations: ['producto'],
    });
    if (!proveedor) throw new NotFoundException('La proveedor no existe');
    return proveedor;
  }

  async update(
    id: number,
    updateProveedorDto: UpdateProveedorDto,
  ): Promise<Proveedor> {
    const proveedor = await this.findOne(id);
    const proveedorUpdate = Object.assign(proveedor, updateProveedorDto);
    return this.proveedoresRepository.save(proveedorUpdate);
  }

  async remove(id: number) {
    const proveedor = await this.findOne(id);
    return this.proveedoresRepository.softRemove(proveedor);
  }
}
