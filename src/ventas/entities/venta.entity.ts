import { Cliente } from 'src/clientes/entities/cliente.entity';
import { DetallesVenta } from 'src/detalles-ventas/entities/detalles-venta.entity';
import { Pago } from 'src/pagos/entities/pago.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('ventas')
export class Venta {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column('integer', { name: 'id_cliente' })
  idCliente: number;

  @Column('date', { name: 'fecha_venta' , nullable: true })
  fechaVenta: Date;

  @Column('int')
  total: number;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;

  @DeleteDateColumn({ name: 'fecha_eliminacion', select: false })
  fechaEliminacion: Date;

  @ManyToOne(() => Cliente, (cliente) => cliente.ventas)
  @JoinColumn({ name: 'id_cliente', referencedColumnName: 'id' })
  cliente: Cliente;

  @OneToOne(() => Pago, (pago) => pago.venta)
  pago: Pago[];

  @OneToMany(() => DetallesVenta, (detallesVentas) => detallesVentas.venta)
  detallesVentas: DetallesVenta[];
}
