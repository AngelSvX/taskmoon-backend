import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class RegisterValidatorDto {
    @IsNotEmpty()
    @IsString()
    email: string;
    @IsNotEmpty()
    @IsString()
    username: string;
    @IsNotEmpty()
    @IsString()
    password: string;
    @IsNotEmpty()
    @IsNumber()
    role_id: number;
}