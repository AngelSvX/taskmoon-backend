import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginValidatorDto {
    @IsNotEmpty()
    @IsEmail()
    @IsString()
    email: string;
    @IsNotEmpty()
    @IsString()
    password: string;
}