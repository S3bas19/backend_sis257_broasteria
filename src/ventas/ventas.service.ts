import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from 'src/clientes/entities/cliente.entity';
import { DetallesVenta } from 'src/detalles-ventas/entities/detalles-venta.entity';
import { Repository } from 'typeorm';
import { CreateVentaDto } from './dto/create-venta.dto';
import { Venta } from './entities/venta.entity';
import { UpdateVentaDto } from './dto/update-venta.dto';

@Injectable()
export class VentasService {
  constructor(
    @InjectRepository(Venta) private ventasRepository: Repository<Venta>,
    @InjectRepository(DetallesVenta)
    private detalleventaRepository: Repository<DetallesVenta>,
  ) {}

  // Elimina la verificación de "venta existente" para permitir múltiples ventas por cliente
  async create(createVentaDto: CreateVentaDto): Promise<Venta> {
    // Ya no estamos verificando si existe una venta para este cliente

    // Crear la venta sin montoTotal
    const venta = new Venta();
    venta.cliente = { id: createVentaDto.idCliente } as Cliente;

    // Guardamos la venta inicialmente
    const savedVenta = await this.ventasRepository.save(venta);

    // Obtenemos los detalles de venta para esta venta recién creada
    const detallesVenta = await this.detalleventaRepository.find({
      where: { venta: { id: savedVenta.id } },
    });

    // Calcular el monto total
    const montoTotal = detallesVenta.reduce(
      (total, detalle) => total + detalle.subtotal,
      0,
    );

    // Actualizar la venta con el montoTotal calculado
    savedVenta.total = montoTotal;

    // Guardamos la venta con el monto total actualizado
    return this.ventasRepository.save(savedVenta);
  }

  async findAll(): Promise<Venta[]> {
    return this.ventasRepository.find({ relations: ['cliente'] });
  }

  async findOne(id: number): Promise<Venta> {
    const venta = await this.ventasRepository.findOne({
      where: { id },
      relations: ['cliente', 'detalleventas'],
    });
    if (!venta) {
      throw new NotFoundException(`La venta ${id} no existe`);
    }
    return venta;
  }

  // Método para actualizar parcialmente una venta existente (usando PATCH)
  async update(id: number, updateVentaDto: UpdateVentaDto): Promise<Venta> {
    const venta = await this.ventasRepository.findOne({ where: { id } });
    if (!venta) {
      throw new NotFoundException(`Venta con id ${id} no encontrada`);
    }

    // Actualizar los campos que vengan en el DTO
    if (updateVentaDto.idCliente) {
      venta.cliente = { id: updateVentaDto.idCliente } as Cliente;
    }

    // Guardar la venta con los cambios parciales
    return this.ventasRepository.save(venta);
  }

  // Método para eliminar lógicamente una venta
  async remove(id: number): Promise<void> {
    const venta = await this.ventasRepository.findOne({ where: { id } });
    if (!venta) {
      throw new NotFoundException(`Venta con id ${id} no encontrada`);
    }

    // Marcar la venta como eliminada
    venta.fechaEliminacion = new Date(); // Establecemos la fecha de eliminación

    // Guardamos la venta con la fecha de eliminación
    await this.ventasRepository.save(venta);
  }
}
