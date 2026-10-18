import { PrismaService } from "src/shared/infrastructure/persistance/prisma/prisma.service";
import { UserCredentials } from "../domain/entities/user-credentials.entity";
import { UserCredentialsRepository } from "../domain/repositories/user-credentials.repository";
import { Injectable } from "@nestjs/common";
import { Prisma } from "generated/prisma/browser";

type PrismaUserCredentialsPayload = Prisma.user_credentialsGetPayload<{
    select: {
        user_id: true,
        password_hash: true,
        password_changed_at: true,
        failed_attempts: true,
        locked_until: true
    }
}>

@Injectable()
export class PrismaUserCredentialsRepository implements UserCredentialsRepository{
    constructor(
        private readonly prismaUserCredentials: PrismaService
    ){}

    async save(userCredentials: UserCredentials): Promise<void> {
        await this.prismaUserCredentials.user_credentials.create({
            data: {
                user_id: userCredentials.userId,
                password_hash: userCredentials.passwordHash,
                password_changed_at: userCredentials.passwordChangedAt || '',
                failed_attempts: userCredentials.failedAttempts,
                locked_until: userCredentials.lockedUntil ? new Date(userCredentials.lockedUntil) : null
            }
        })
    }

    async findByUserId(userId: number): Promise<UserCredentials | null> {
        const prismaUserCredentials = await this.prismaUserCredentials.user_credentials.findUnique({
            where: {
                user_id: userId
            },
            select: {
                user_id: true,
                password_hash: true,
                password_changed_at: true,
                failed_attempts: true,
                locked_until: true
            }
        })

        if(!prismaUserCredentials) return null

        return this.toUserCredentials(prismaUserCredentials)
    }

    private toUserCredentials(prismaUserData: PrismaUserCredentialsPayload): UserCredentials {
        return UserCredentials.fromPrimitives({
            user_id: Number(prismaUserData.user_id),
            password_hash: prismaUserData.password_hash,
            password_changed_at: prismaUserData.password_changed_at.toDateString(),
            failed_attempts: prismaUserData.failed_attempts,
            locked_until: prismaUserData.locked_until?.toDateString() || ''
        })
    }
    
}