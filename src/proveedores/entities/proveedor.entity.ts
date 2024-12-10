import { Producto } from 'src/productos/entities/producto.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('proveedores')
export class Proveedor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('integer', { name: 'id_producto' })
  idProducto: number;

  @Column('varchar', { length: 30, nullable: false })
  nombre: string;

  @Column('varchar', { length: 30, nullable: false, name: 'apellido_paterno' })
  apellidoPaterno: string;

  @Column('varchar', { length: 8, nullable: false })
  telefono: string;

  @Column('varchar', { length: 250, nullable: false })
  direccion: string;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;

  @DeleteDateColumn({ name: 'fecha_eliminacion', select: false })
  fechaEliminacion: Date;

  @ManyToOne(() => Producto, (producto) => producto.proveedores)
  @JoinColumn({ name: 'id_producto', referencedColumnName: 'id' })
  producto: Producto;

}
