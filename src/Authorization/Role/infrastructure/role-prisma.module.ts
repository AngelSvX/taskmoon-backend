import { Module } from "@nestjs/common";
import { ROLE_REPOSITORY } from "../domain/repositories/role.repository";
import { PrismaRoleRepository } from "./role-prisma.repository";

@Module({
    imports: [],
    controllers: [],
    providers: [{
        provide: ROLE_REPOSITORY,
        useClass: PrismaRoleRepository
    }],
    exports: [ROLE_REPOSITORY]
})

export class RolePrismaModule {}