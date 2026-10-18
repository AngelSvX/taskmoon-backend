import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserUseCase } from "../application/CreateUser/CreateUserUseCase";
import { RegisterValidatorDto } from "./dto/register-validator.dto";

@Controller('/user')
export class UserController {
    constructor (
        private readonly createUserUseCase: CreateUserUseCase
    ) {}
    @Post('/register')
    async createUser(@Body() dto: RegisterValidatorDto) {
        await this.createUserUseCase.execute(dto)

        return {
            message: 'User created successfully',
            status: 200
        }

    }

}