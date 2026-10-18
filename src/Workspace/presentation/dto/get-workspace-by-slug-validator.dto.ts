import { IsString } from "class-validator";

export class GetWorkspaceBySlugValidatorDto {
    @IsString()
    slug: string;
}