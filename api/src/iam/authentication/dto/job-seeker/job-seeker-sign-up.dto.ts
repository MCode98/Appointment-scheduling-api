import { IsEmail, IsString, MinLength } from "class-validator";

export class JobSeekerSignUpDto {

    @IsEmail()
    email: string;

    @IsString()
    name: string;

    @IsString()
    age: number;

    @MinLength(10)
    password: string;
}
