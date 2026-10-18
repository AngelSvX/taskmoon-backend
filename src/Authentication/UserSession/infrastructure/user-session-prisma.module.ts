import { Module } from "@nestjs/common";
import { USER_SESSION_REPOSITORY } from "../domain/repositories/user-session.repository";
import { PrismaUserSessionRepository } from "./user-session-prisma.repository";

@Module({
    exports: [USER_SESSION_REPOSITORY],
    providers: [{
        provide: USER_SESSION_REPOSITORY,
        useClass: PrismaUserSessionRepository
    }]
})

export class UserSessionPrismaModule {}