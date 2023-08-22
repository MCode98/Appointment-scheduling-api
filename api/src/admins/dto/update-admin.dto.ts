import { IsEmail, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class UpdateAdminDto {
  @IsString()
  @IsOptional()
  user_name: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  @MinLength(8)
  @MaxLength(15)
  mobile: string;
}
