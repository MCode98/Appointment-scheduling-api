import { IsEmail, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class UpdateConsultantDto{
    @IsString()
    @IsOptional()
    name: string;
  
    @IsEmail()
    @IsOptional()
    email: string;

    @IsString()
    @IsOptional()
    country: string;

    @IsString()
    @IsOptional()
    job_type: string;

    @IsString()
    @IsOptional()
    address: string;

    @IsString()
    @IsOptional()
    description: string;
  
    @IsString()
    @IsOptional()
    @MinLength(8)
    @MaxLength(15)
    mobile: string;
}
