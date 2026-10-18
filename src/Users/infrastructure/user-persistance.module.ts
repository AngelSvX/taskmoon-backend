import { Module } from "@nestjs/common";
import { USER_REPOSITORY } from "../domain/repositories/user.repository";
import { PrismaUserRepository } from "./user-prisma.repository";

@Module({
    imports: [],
    controllers: [],
    providers: [{
        provide: USER_REPOSITORY,
        useClass: PrismaUserRepository
    }], 
    exports: [USER_REPOSITORY],
})

export class UserPersistenceModule {}
