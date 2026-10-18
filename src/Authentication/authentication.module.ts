import { Logger, Module } from "@nestjs/common";
import { RoleModule } from "src/Authorization/Role/role.module";
import { TokenModule } from "src/shared/infrastructure/auth/token.module";
import { EncryptModule } from "src/shared/infrastructure/encrypt/encrypt.module";
import { UsersModule } from "src/Users/users.module";
import { LoginUseCase } from "./Login/application/LoginUseCase";
import { AuthenticationController } from "./presentation/authentication.controller";
import { UserCredentialsPrismaModule } from "./UserCredentials/infrastructure/user-credentials-persistance.module";
import { UserSessionPrismaModule } from "./UserSession/infrastructure/user-session-prisma.module";

@Module({
    imports: [
        // Modulos
        UsersModule,
        RoleModule,
        // Servicios
        EncryptModule,
        TokenModule,
        // Persistencia
        UserCredentialsPrismaModule,
        UserSessionPrismaModule
    ],
    controllers: [
        AuthenticationController
    ],
    providers: [
        Logger,
        LoginUseCase
    ],
    exports: []
})

export class AuthenticationModule {}