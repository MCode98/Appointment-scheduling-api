import { IsEmail, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";


export class UpdateJobSeekerDto {
    @IsString()
    @IsOptional()
    name: string;
  
    @IsEmail()
    @IsOptional()
    email: string;
  
    @IsString()
    @IsOptional()
    @MinLength(8)
    @MaxLength(15)
    mobile: string;

    @IsNumber()
    @IsOptional()
    age: number;
}
