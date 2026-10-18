import { Injectable } from "@nestjs/common";
import { UserSessionRepository } from "../domain/repositories/user-session.repository";
import { UserSession } from "../domain/entities/UserSession";
import { PrismaService } from "src/shared/infrastructure/persistance/prisma/prisma.service";

@Injectable()
export class PrismaUserSessionRepository implements UserSessionRepository {
    constructor(
        private readonly prismaService: PrismaService
    ) {}

    async loggedIn(userSession: UserSession): Promise<void> {
        await this.prismaService.user_sessions.create({
            data: {
                user_id: userSession.UserId,
                token_hash: userSession.TokenHash,
                ip_address: userSession.IpAddress,
                user_agent: 'later',
                created_at: new Date(),
                last_used_at: new Date(),
                expires_at: new Date()
            }
        })
    }

}