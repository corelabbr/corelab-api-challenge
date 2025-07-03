import { IsBoolean, IsString } from 'class-validator';

export class UpdateNoteDto {
  @IsString()
  title: string;

  @IsString()
  body: string;

  @IsString()
  color: string;

  @IsBoolean()
  isFavorite?: boolean;
}
