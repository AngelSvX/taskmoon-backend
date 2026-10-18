import { Inject, Injectable, Logger, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { USER_CREDENTIALS_REPOSITORY, type UserCredentialsRepository } from "src/Authentication/UserCredentials/domain/repositories/user-credentials.repository";
import { USER_SESSION_REPOSITORY, type UserSessionRepository } from "src/Authentication/UserSession/domain/repositories/user-session.repository";
import { ROLE_REPOSITORY, type RoleRepository } from "src/Authorization/Role/domain/repositories/role.repository";
import { ENCRYPT_REPOSITORY, type EncryptRepository } from "src/shared/domain/repository/EncryptRepository";
import { TOKEN_REPOSITORY, type TokenRepository } from "src/shared/domain/repository/TokenRepository";
import { USER_REPOSITORY, type UserRepository } from "src/Users/domain/repositories/user.repository";
import { LoginRequest } from "./LoginRequest";
import { UserSession } from "src/Authentication/UserSession/domain/entities/UserSession";

@Injectable()
export class LoginUseCase {
    constructor (
        private readonly logger: Logger,
        @Inject(USER_REPOSITORY)
        private readonly userRepository: UserRepository,
        @Inject(USER_CREDENTIALS_REPOSITORY)
        private readonly userCredentialsRepository: UserCredentialsRepository,
        @Inject(ROLE_REPOSITORY)
        private readonly roleRepository: RoleRepository,
        @Inject(ENCRYPT_REPOSITORY)
        private readonly encryptRepository: EncryptRepository,
        @Inject(TOKEN_REPOSITORY)
        private readonly tokenRepository: TokenRepository,
        @Inject(USER_SESSION_REPOSITORY)
        private readonly userSessionRepository: UserSessionRepository
    ) {}

    async execute(request: LoginRequest, ip: string): Promise<string> {
        try {
            const user = await this.userRepository.findByEmail(request.email)

            if (!user) throw new NotFoundException("User doesn't exist")

            const userCredentials = await this.userCredentialsRepository.findByUserId(user.Id)

            if (!userCredentials) throw new NotFoundException("User credentials don't exist")

            const passwordValid = await this.encryptRepository.compare({hashedPassword: request.password, payloadPassword: userCredentials.passwordHash})

            if(!passwordValid) throw new UnauthorizedException("Wrong credentials")

            const roles = await this.roleRepository.findNamesByUserId(user.Id)

            const token = await this.tokenRepository.generateAccessToken({
                id: user.Id,
                email: user.Email,
                username: user.Username,
                display_name: user.DisplayName,
                roles: roles,
                created_at: user.CreatedAt.toDateString()
            })

            const userSession = UserSession.create({
                id: 1,
                user_id: user.Id,
                token_hash: token,
                ip_address: ip,
                user_agent: 'later',
                created_at: new Date(),
                last_usedt_at: new Date(),
                expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000),
                revoked_at: new Date()
            })

            await this.userSessionRepository.loggedIn(userSession)
            
            return token

        } catch (error) {
            this.logger.log('LoginUseCase Error', error)
            throw error
        }
    }
}