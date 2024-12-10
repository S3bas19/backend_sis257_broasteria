import { Producto } from 'src/productos/entities/producto.entity';
import { Venta } from 'src/ventas/entities/venta.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('detallesVentas')
export class DetallesVenta {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column('integer', { name: 'id_producto' })
  idProducto: number;

  @Column('integer', { name: 'id_venta' })
  idVenta: number;

  @Column('int', { name: 'cantidad_disponible' })
  cantidad: number;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;

  @DeleteDateColumn({ name: 'fecha_eliminacion', select: false })
  fechaEliminacion: Date;

  @Column('int')
  subtotal: number;

  @ManyToOne(() => Producto, (producto) => producto.detallesVentas)
  @JoinColumn({ name: 'id_producto', referencedColumnName: 'id' })
  producto: Producto;

  @ManyToOne(() => Venta, (venta) => venta.detallesVentas)
  @JoinColumn({ name: 'id_venta', referencedColumnName: 'id' })
  venta: Venta;
}
