import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateWorkspaceValidatorDto {
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    name?: string
    @IsOptional()
    @IsString()
    description?: string
    @IsOptional()
    @IsString()
    icon?: string
}
