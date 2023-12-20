import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreatePersonalDto {
  @IsString()
  @IsOptional()
  nombres?: string;

  @IsString()
  @IsOptional()
  apellidos?: string;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  edad?: number;

  @IsString()
  @IsOptional()
  correo?: string;

  @IsString()
  @IsOptional()
  localidadAsociada?: string;

  // dto de la relacion

  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  puestospersonal?: string[];
}
