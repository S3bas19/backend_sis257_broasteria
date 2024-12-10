import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DetallesVenta } from './entities/detalles-venta.entity';
import { CreateDetallesVentaDto } from './dto/create-detalles-venta.dto';
import { Venta } from 'src/ventas/entities/venta.entity';
import { Producto } from 'src/productos/entities/producto.entity';
import { UpdateDetallesVentaDto } from './dto/update-detalles-venta.dto';

@Injectable()
export class DetallesVentasService {
  constructor(
    @InjectRepository(DetallesVenta)
    private detalleventaRepository: Repository<DetallesVenta>,
    @InjectRepository(Producto)
    private productoRepository: Repository<Producto>,
    @InjectRepository(Venta)
    private ventaRepository: Repository<Venta>,
  ) {}

  // Método para crear un detalle de venta
  async create(
    createDetallesVentaDto: CreateDetallesVentaDto,
  ): Promise<DetallesVenta> {
    const existe = await this.detalleventaRepository.findOne({
      where: {
        venta: { id: createDetallesVentaDto.idVenta },
        producto: { id: createDetallesVentaDto.idProducto },
      },
    });
    if (existe) throw new ConflictException('El detalle de venta ya existe');

    const producto = await this.productoRepository.findOne({
      where: { id: createDetallesVentaDto.idProducto },
    });
    if (!producto) throw new NotFoundException('Producto no encontrado');

    // Verificar que haya suficiente stock disponible
    if (producto.cantidadDisponible < createDetallesVentaDto.cantidad) {
      throw new ConflictException(
        `No hay suficiente stock para el producto ${producto.nombre}. Solo quedan ${producto.cantidadDisponible} unidades.`,
      );
    }

    const venta = await this.ventaRepository.findOne({
      where: { id: createDetallesVentaDto.idVenta },
    });
    if (!venta) throw new NotFoundException('Venta no encontrada');

    const detalleventa = new DetallesVenta();
    detalleventa.venta = venta;
    detalleventa.producto = producto;
    detalleventa.cantidad = createDetallesVentaDto.cantidad;
    detalleventa.subtotal =
      createDetallesVentaDto.cantidad * producto.precio;

    const savedDetalleventa =
      await this.detalleventaRepository.save(detalleventa);

    // Actualizar el stock del producto después de la venta
    producto.cantidadDisponible -= createDetallesVentaDto.cantidad;
    await this.productoRepository.save(producto); // Guardar el producto con el nuevo stock

    // Actualizamos el montoTotal de la venta
    venta.total = venta.detallesVentas.reduce(
      (total, detalle) => total + detalle.subtotal,
      0,
    );
    await this.ventaRepository.save(venta);

    return savedDetalleventa;
  }

  // Obtener todos los detalles de venta
  async findAll(): Promise<DetallesVenta[]> {
    return this.detalleventaRepository.find({
      relations: ['venta', 'producto'],
    });
  }

  // Obtener un detalle de venta por ID
  async findOne(id: number): Promise<DetallesVenta> {
    const detalleventa = await this.detalleventaRepository.findOne({
      where: { id },
      relations: ['venta', 'producto'],
    });

    if (!detalleventa) {
      throw new NotFoundException('Detalle de venta no encontrado');
    }

    return detalleventa;
  }

  // Método para actualizar parcialmente un detalle de venta
  async update(
    id: number,
    updateDetallesVentaDto: UpdateDetallesVentaDto,
  ): Promise<DetallesVenta> {
    const detalleventa = await this.detalleventaRepository.findOne({
      where: { id },
    });
    if (!detalleventa) {
      throw new NotFoundException(
        `Detalle de venta con id ${id} no encontrado`,
      );
    }

    // Actualizamos solo los campos proporcionados en el DTO
    if (updateDetallesVentaDto.idProducto) {
      const producto = await this.productoRepository.findOne({
        where: { id: updateDetallesVentaDto.idProducto },
      });
      if (!producto) throw new NotFoundException('Producto no encontrado');
      detalleventa.producto = producto;
    }

    if (updateDetallesVentaDto.cantidad) {
      const producto = detalleventa.producto;
      detalleventa.cantidad = updateDetallesVentaDto.cantidad;
      detalleventa.subtotal =
        updateDetallesVentaDto.cantidad * producto.precio;
    }

    const updatedDetalleventa =
      await this.detalleventaRepository.save(detalleventa);

    // Actualizar el montoTotal de la venta
    const venta = detalleventa.venta;
    venta.total = venta.detallesVentas.reduce(
      (total, detalle) => total + detalle.subtotal,
      0,
    );
    await this.ventaRepository.save(venta);

    return updatedDetalleventa;
  }

  // Método para eliminar lógicamente un detalle de venta
  async remove(id: number): Promise<void> {
    const detalleventa = await this.detalleventaRepository.findOne({
      where: { id },
    });
    if (!detalleventa) {
      throw new NotFoundException(
        `Detalle de venta con id ${id} no encontrado`,
      );
    }

    // Marcar el detalle como eliminado
    detalleventa.fechaEliminacion = new Date(); // Establecer la fecha de eliminación
    await this.detalleventaRepository.save(detalleventa);

    // Actualizar el montoTotal de la venta
    const venta = detalleventa.venta;
    venta.total = venta.detallesVentas.reduce(
      (total, detalle) => total + detalle.subtotal,
      0,
    );
    await this.ventaRepository.save(venta);
  }
}

