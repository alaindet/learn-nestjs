import { IsDateString, IsString, Length } from 'class-validator';

export class CreateEventDto {

  @IsString()
  @Length(3, 255, { message: 'The name length is wrong  ' })
  name: string;

  @Length(3, 255)
  description: string;

  @IsDateString()
  when: string;

  @Length(3, 255)
  where: string;
}