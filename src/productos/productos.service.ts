import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from './entities/producto.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto)
    private productosRepository: Repository<Producto>,
  ) {}
  async create(createProductoDto: CreateProductoDto): Promise<Producto> {
    const existe = await this.productosRepository.findOneBy({
      nombre: createProductoDto.nombre.trim(),
      idCategoria: createProductoDto.idCategoria,
    });

    if (existe) throw new ConflictException('El producto ya existe');

    const producto = new Producto();
    producto.idCategoria = createProductoDto.idCategoria;
    producto.nombre = createProductoDto.nombre.trim();
    producto.descripcion = createProductoDto.descripcion.trim();
    producto.cantidadDisponible = createProductoDto.cantidadDisponible;
    producto.precio = createProductoDto.precio;
    return this.productosRepository.save(producto);
  }

  async findAll(): Promise<Producto[]> {
    return this.productosRepository.find({
      relations: ['categoria'],
    });
  }

  async findOne(id: number): Promise<Producto> {
    const producto = await this.productosRepository.findOne({
      where: { id },
      relations: ['categoria'],
    });
    if (!producto) throw new NotFoundException('El producto no existe');
    return producto;
  }

  async update(
    id: number,
    updateProductoDto: UpdateProductoDto,
  ): Promise<Producto> {
    const producto = await this.productosRepository.findOneBy({ id });
    if (!producto) throw new NotFoundException('El producto no existe');

    const productoUpdate = Object.assign(producto, updateProductoDto);
    return this.productosRepository.save(productoUpdate);
  }

  async remove(id: number) {
    const producto = await this.productosRepository.findOneBy({ id });
    if (!producto) throw new NotFoundException('El producto no existe');
    return this.productosRepository.softRemove(producto);
  }
}
