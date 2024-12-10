import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';
import { UpdateEmpleadoDto } from './dto/update-empleado.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Empleado } from './entities/empleado.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmpleadosService {
  constructor(
    @InjectRepository(Empleado)
    private empleadosRepository: Repository<Empleado>,
  ) {}

  async create(createEmpleadoDto: CreateEmpleadoDto): Promise<Empleado> {
    const existe = await this.empleadosRepository.findOneBy({
      nombre: createEmpleadoDto.nombre.trim(),
      apellidoPaterno: createEmpleadoDto.apellidoPaterno.trim(),
      apellidoMaterno: createEmpleadoDto.apellidoMaterno.trim(),
    });

    if (existe) throw new ConflictException('Ya existe el empleado');

    const empleado = new Empleado();
    empleado.nombre = createEmpleadoDto.nombre.trim();
    empleado.apellidoPaterno = createEmpleadoDto.apellidoPaterno.trim();
    empleado.apellidoMaterno = createEmpleadoDto.apellidoMaterno.trim();
    empleado.cargo = createEmpleadoDto.cargo.trim();
    empleado.telefono = createEmpleadoDto.telefono.trim();
    empleado.salario = createEmpleadoDto.salario.trim();

    return this.empleadosRepository.save(empleado);
  }

  async findAll(): Promise<Empleado[]> {
    return await this.empleadosRepository.find();
  }

  async findOne(id: number): Promise<Empleado> {
    const empleado = await this.empleadosRepository.findOneBy({ id });
    if (!empleado) throw new NotFoundException('El empleado no existe');
    return empleado;
  }

  async update(
    id: number,
    updateEmpleadoDto: UpdateEmpleadoDto,
  ): Promise<Empleado> {
    const empleado = await this.findOne(id);
    const updateEmpleado = Object.assign(empleado, updateEmpleadoDto);
    return this.empleadosRepository.save(updateEmpleado);
  }

  async remove(id: number) {
    const empleado = await this.findOne(id);
    return this.empleadosRepository.softRemove(empleado);
  }
}
