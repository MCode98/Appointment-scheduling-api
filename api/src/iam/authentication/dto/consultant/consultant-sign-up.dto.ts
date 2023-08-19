import { IsEmail, IsString, MinLength } from "class-validator";

export class ConsultantSignUpDto {

    @IsEmail()
    email: string;

    @IsString()
    name: string;

    @IsString()
    country: string;

    @IsString()
    job_type: string;

    @MinLength(10)
    password: string;
}
