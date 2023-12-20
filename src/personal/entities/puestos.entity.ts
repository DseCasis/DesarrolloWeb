import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Personal } from './personal.entity';

@Entity()
export class Puestos {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('text')
  descripcion: string;

  @ManyToOne(
    () => Personal,
    (personal) => personal.puestospersonal,
  )
  personal?: Personal;
}
