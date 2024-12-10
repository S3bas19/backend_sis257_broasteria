import { Venta } from 'src/ventas/entities/venta.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('pagos')
export class Pago {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column('integer', { name: 'id_venta' })
  idVenta: number;

  @Column('int')
  monto: number;

  @Column('date', { name: 'fecha_pago' })
  fechaPago: Date;

  @Column('varchar', { name: 'metodo_pago', length: 30 })
  metodoPago: string;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;

  @DeleteDateColumn({ name: 'fecha_eliminacion', select: false })
  fechaEliminacion: Date;

  @OneToOne(() => Venta, (venta) => venta.pago)
  @JoinColumn({ name: 'id_venta', referencedColumnName: 'id' })
  venta: Venta;
}
