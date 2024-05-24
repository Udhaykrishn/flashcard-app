import { IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class CreateDeckDto {
  @IsString()
  @MinLength(5)
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;
}

export class UpdateDeckDto {
  @IsOptional()
  @IsString()
  @MinLength(5)
  @IsNotEmpty()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;
}
