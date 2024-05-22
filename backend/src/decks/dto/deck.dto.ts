import { IsNotEmpty, IsString } from "class-validator";

export class CreateDeckDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  description?: string;
}

export class UpdateDeckDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  description?: string;
}
