import { Venta } from 'src/ventas/entities/venta.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('clientes')
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 30, nullable: false })
  nombre: string;

  @Column('varchar', { length: 30, nullable: false, name: 'apellido_paterno' })
  apellidoPaterno: string;

  @Column('varchar', { length: 30, nullable: false, name: 'apellido_materno' })
  apellidoMaterno: string;

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

  @Column('varchar', { length: 8, nullable: true })
  ci: string;

  @OneToMany(() => Venta, (venta) => venta.cliente)
  ventas: Venta[];
}
