import { Body, ClassSerializerInterceptor, Controller, Ip, Post, UseInterceptors } from "@nestjs/common";
import { LoginUseCase } from "../Login/application/LoginUseCase";
import { LoginValidatorDto } from "./dto/login-validator.dto";
import { LoginResponse } from "./interface/login-response";

@Controller('/auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthenticationController {
    constructor (
        private readonly loginUseCase: LoginUseCase
    ) {}

    @Post('/login')
    async login(@Body() dto: LoginValidatorDto, @Ip() ip: string): Promise<LoginResponse> {
        const token = await this.loginUseCase.execute(dto, ip)
        const response = new LoginResponse()
        response.token = token
         
        return response
    }

}