import { Module } from '@nestjs/common';
import { PersonalService } from './personal.service';
import { PersonalController } from './personal.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Puestos } from './entities/puestos.entity';
import { Personal } from './entities/personal.entity';

@Module({
  controllers: [PersonalController],
  providers: [PersonalService],
  imports: [
    TypeOrmModule.forFeature([Personal]),
    TypeOrmModule.forFeature([Puestos]),
  ],
})
export class PersonalModule {}
