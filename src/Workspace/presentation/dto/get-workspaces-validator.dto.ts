import { IsNumber, IsString } from "class-validator";

export class WorkspaceValidatorDto {
    @IsNumber()
    owner_id: number
}