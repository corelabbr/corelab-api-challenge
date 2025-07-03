import { IsBoolean, IsString } from 'class-validator';

export class CreateNoteDto {
  @IsString()
  title: string;

  @IsString()
  body: string;

  @IsString()
  color: string;

  @IsBoolean()
  isFavorite?: boolean;

  @IsString()
  userId: string;
}
