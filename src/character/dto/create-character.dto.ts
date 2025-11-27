import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateCharacterDto {
  @IsString()
  name: string;

  @IsNumber()
  salary: number;

  @IsBoolean()
  employee: boolean;
}