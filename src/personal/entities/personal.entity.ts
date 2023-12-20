import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Puestos } from './puestos.entity';

@Entity()
export class Personal {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('text')
  nombres: string;

  @Column('text')
  apellidos: string;

  @Column('int', {
    default: 0,
  })
  edad: number;

  @Column('text')
  correo: string;

  @Column('text')
  localidadAsociada: String;

  @BeforeInsert()
  async beforeInsert() {
    console.log('Se ha insertado al personal de manera correcta');
    this.validateData();
  }

  @BeforeUpdate()
  async beforeUpdate() {
    console.log('Antes de actualizar datos en la tabla Alumno...');
    this.validateData();
  }

  private validateData() {
    if (this.edad < 0) {
      console.error('Error: La edad no puede ser un número negativo.');
      throw new Error('La edad no puede ser un número negativo.');
    }
  }

  //RELACION DEL ESTUDIANTE AL puestos

  @OneToMany(() => Puestos, (puestos) => puestos.personal, {
    cascade: true,
    eager: true,
  })
  puestospersonal?: Puestos[];
}
