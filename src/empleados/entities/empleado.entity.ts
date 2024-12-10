import { Usuario } from 'src/usuarios/entities/usuario.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('empleados')
export class Empleado {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column('varchar', { length: 30, nullable: false })
  nombre: string;

  @Column('varchar', { length: 30, nullable: false, name: 'apellido_paterno' })
  apellidoPaterno: string;

  @Column('varchar', { length: 30, nullable: false, name: 'apellido_materno' })
  apellidoMaterno: string;

  @Column('varchar', { length: 40, nullable: false })
  cargo: string;

  @Column('varchar', { length: 8, nullable: false })
  telefono: string;

  @Column('varchar', { length: 10, nullable: false })
  salario: string;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;

  @DeleteDateColumn({ name: 'fecha_eliminacion', select: false })
  fechaEliminacion: Date;

  @OneToOne(() => Usuario, (usuario) => usuario.empleado)
  usuario: Usuario[];
}
