import { Producto } from 'src/productos/entities/producto.entity';
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

@Entity('promociones')
export class Promocion {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column('integer', { name: 'id_producto' })
  idProducto: number;

  @Column('varchar', { length: 30 })
  nombre: string;

  @Column('varchar', { length: 250 })
  descripcion: string;

  @Column('date', { name: 'fecha_inicio' })
  fechaInicio: Date;

  @Column('date', { name: 'fecha_fin' })
  fechaFin: Date;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;

  @DeleteDateColumn({ name: 'fecha_eliminacion', select: false })
  fechaEliminacion: Date;

  @ManyToOne(() => Producto, (producto) => producto.promociones)
  @JoinColumn({ name: 'id_producto', referencedColumnName: 'id' })
  producto: Producto;
}
