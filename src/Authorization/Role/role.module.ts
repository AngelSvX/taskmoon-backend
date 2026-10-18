import { Module } from "@nestjs/common";
import { RolePrismaModule } from "./infrastructure/role-prisma.module";

@Module({
    imports:[
        RolePrismaModule
    ],
    exports: [
        RolePrismaModule
    ],
    controllers: [],
    providers: []
})

export class RoleModule {}