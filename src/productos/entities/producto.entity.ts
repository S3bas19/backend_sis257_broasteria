import { Categoria } from 'src/categorias/entities/categoria.entity';
import { DetallesVenta } from 'src/detalles-ventas/entities/detalles-venta.entity';
import { Promocion } from 'src/promociones/entities/promocion.entity';
import { Proveedor } from 'src/proveedores/entities/proveedor.entity';
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

@Entity('productos')
export class Producto {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column('integer', { name: 'id_categoria' })
  idCategoria: number;

  @Column('varchar', { length: 30 })
  nombre: string;

  @Column('varchar', { length: 250 })
  descripcion: string;

  @Column('int', { name: 'cantidad_disponible' })
  cantidadDisponible: number;

  @Column('int')
  precio: number;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;

  @DeleteDateColumn({ name: 'fecha_eliminacion', select: false })
  fechaEliminacion: Date;

  @ManyToOne(() => Categoria, (categoria) => categoria.productos)
  @JoinColumn({ name: 'id_categoria', referencedColumnName: 'id' })
  categoria: Categoria;

  @OneToMany(() => Promocion, (promocion) => promocion.producto)
  promociones: Promocion[];

  @OneToMany(() => Proveedor, (proveedor) => proveedor.producto)
  proveedores: Proveedor[];

  @OneToMany(() => DetallesVenta, (detallesVentas) => detallesVentas.producto)
  detallesVentas: DetallesVenta[];
}
