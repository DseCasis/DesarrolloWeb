import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePersonalDto } from './dto/create-personal.dto';
import { UpdatePersonalDto } from './dto/update-personal.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Personal } from './entities/personal.entity';
import { Repository } from 'typeorm';
import { Puestos } from './entities/puestos.entity';
import { PaginacionDto } from 'src/common/dto/paginacion.dto';

@Injectable()
export class PersonalService {
  //ESTA ES LA INJECCION DE LA BASE DE DATOS(ENTITY)
  constructor(
    @InjectRepository(Personal)
    private readonly personalRepository: Repository<Personal>,
    @InjectRepository(Puestos)
    private readonly puestosRepository: Repository<Puestos>,
  ) {}

  async create(createPersonalDto: CreatePersonalDto) {
    try {
      const { puestospersonal = [], ...puestosdetalles } = createPersonalDto;

      const personal = this.personalRepository.create({
        ...puestosdetalles,
        puestospersonal: puestospersonal.map((puestospersonal) =>
          this.puestosRepository.create({
            descripcion: puestospersonal,
          }),
        ),
      });
      await this.personalRepository.save(personal);
      return { ...personal, puestospersonal };
    } catch (error) {
      console.log(error);
      throw new Error('NO SE PUDO REALIZAR EL INGRESO A LA BD');
    }
  }

  //TRAEMOS LOS DATOS MEDIANTE EL METODO GET

  async findAll(paginacionDto: PaginacionDto) {
    const { limit = 10, offset = 1 } = paginacionDto;
    const personal = await this.personalRepository.find({
      take: limit,
      skip: offset,
      relations: {
        puestospersonal: true,
      },
    });

    return personal.map((personal) => ({
      ...personal,
      puestospersonal: personal.puestospersonal.map(
        (nombrep) => nombrep.descripcion,
      ),
    }));

    //return this.personalRepository.find({})
  }

  // BUSCAR LOS DATOS MEDIANTE EL ID

  async findOne(id: number) {
    const personal = await this.personalRepository.findOneBy({ id });
    // MESNAJE CUANDO SE BUSQUE UN ID QUE NO EXISTA
    if (!personal) throw new NotFoundException(id);
    return personal;
  }

  async update(id: number, updatePersonalDto: UpdatePersonalDto) {
    const personal = await this.personalRepository.preload({
      id: id,
      ...updatePersonalDto,
      puestospersonal: [],
    });
    if (!personal) throw new NotFoundException('NO SE PUDO ELIMINAR');
    await this.personalRepository.save(personal);
    return personal;
  }

  //ELIMINAMOS DATOS MEDIANTE EL ID
  async remove(id: number) {
    const personal = await this.findOne(id);
    await this.personalRepository.delete(id);
    return personal; // Puedes devolver el personal eliminado si es necesario
  }
}
