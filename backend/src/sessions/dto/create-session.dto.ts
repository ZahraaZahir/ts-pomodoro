import { IsNumber, IsString } from 'class-validator';

export class CreateSessionDto {
  @IsString()
  mode: string;

  @IsNumber()
  durationSeconds: number;
}
