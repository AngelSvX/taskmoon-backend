import { ENCRYPT_REPOSITORY, type EncryptRepository } from "src/shared/domain/repository/EncryptRepository";
import { USER_REPOSITORY, type UserRepository } from "src/Users/domain/repositories/user.repository";
import { CreateUserRequest } from "./CreateUserRequest";
import { ConflictException, Inject, Injectable } from "@nestjs/common";
import { User } from "src/Users/domain/entities/user.entity";
import { UserCredentials } from "src/Authentication/UserCredentials/domain/entities/user-credentials.entity";

@Injectable()
export class CreateUserUseCase {
    constructor (
        @Inject(USER_REPOSITORY)
        private readonly userRepository: UserRepository,
        @Inject(ENCRYPT_REPOSITORY)
        private readonly encryptRepository: EncryptRepository
    ) {}

    async execute(createUserRequest: CreateUserRequest) {
        const userExist = await this.userRepository.findByEmail(createUserRequest.email)

        if (userExist) {
            throw new ConflictException('User with this email already exist.')
        }

        const hashedPassword = await this.encryptRepository.create(createUserRequest.password)

        const userCreated = User.create({
            id: 0,
            email: createUserRequest.email,
            username: createUserRequest.username,
            display_name: createUserRequest.username,
            email_verified: null,
            created_at: new Date(),
            updated_at: new Date()
        })

        const userCredentialsCreated = UserCredentials.create({
            user_id: userCreated.Id,
            password_hash: hashedPassword,
            password_changed_at: null,
            failed_attempts: 0,
            locked_until: null
        })

        return await this.userRepository.save(userCreated, userCredentialsCreated, createUserRequest.role_id)

    }

}