import { Module } from "@nestjs/common";
import { USER_CREDENTIALS_REPOSITORY } from "../domain/repositories/user-credentials.repository";
import { PrismaUserCredentialsRepository } from "./user-credentials-prisma.repository";

@Module({
    controllers: [],
    providers: [
        {
            provide: USER_CREDENTIALS_REPOSITORY,
            useClass: PrismaUserCredentialsRepository
        }
    ],
    imports: [],
    exports: [USER_CREDENTIALS_REPOSITORY]
})

export class UserCredentialsPrismaModule {};