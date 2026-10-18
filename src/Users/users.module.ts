import { Module } from "@nestjs/common";
import { UserPersistenceModule } from "./infrastructure/user-persistance.module";
import { UserController } from "./presentation/users.controller";
import { CreateUserUseCase } from "./application/CreateUser/CreateUserUseCase";
import { USER_REPOSITORY, UserRepository } from "./domain/repositories/user.repository";
import { ENCRYPT_REPOSITORY, EncryptRepository } from "src/shared/domain/repository/EncryptRepository";
import { EncryptModule } from "src/shared/infrastructure/encrypt/encrypt.module";

@Module({
    imports: [
        UserPersistenceModule,
        EncryptModule
    ],
    controllers: [UserController],
    providers: [
        {
            provide: CreateUserUseCase,
            useFactory: (
                userRepository: UserRepository,
                encryptRepository: EncryptRepository
            ) => {
                return new CreateUserUseCase(userRepository, encryptRepository)
            },
            inject: [USER_REPOSITORY, ENCRYPT_REPOSITORY]
        },
    ],
    exports: [UserPersistenceModule],
})

export class UsersModule {}