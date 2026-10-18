import { PrismaService } from "src/shared/infrastructure/persistance/prisma/prisma.service";
import { UserRepository } from "../domain/repositories/user.repository";
import { User } from "../domain/entities/user.entity";
import { Injectable, NotFoundException } from "@nestjs/common";
import { Prisma } from "generated/prisma/client";
import { UserStatusValue } from "../domain/value-objects/user-status.vo";
import { UserCredentials } from "src/Authentication/UserCredentials/domain/entities/user-credentials.entity";

export type PrismaUser = Prisma.usersGetPayload<{
    select: {
        id: true,
        email: true,
        username: true,
        display_name: true,
        status: true,
        email_verified_at: true,
        created_at: true,
        updated_at: true,
    }
}>

@Injectable()
export class PrismaUserRepository implements UserRepository {
    constructor (
        private readonly prismaUser: PrismaService
    ) {}

    async save(user: User, userCredentials: UserCredentials, roleId: number): Promise<void> {
        await this.prismaUser.$transaction(async (tx) => {
            const userCreated = await tx.users.create({
                data: {
                    email: user.Email,
                    username: user.Username,
                    display_name: user.DisplayName,
                    status: user.Status,
                    email_verified_at: user.EmailVerified ? new Date(user.EmailVerified) : null,
                    created_at: new Date(user.CreatedAt),
                    updated_at: new Date(user.UpdatedAt)
                }
            })

            await tx.user_credentials.create({
                data: {
                    user_id: userCreated.id,
                    password_hash: userCredentials.passwordHash,
                    password_changed_at: userCredentials.passwordChangedAt ? userCredentials.passwordChangedAt : new Date(),
                    failed_attempts: userCredentials.failedAttempts,
                    locked_until: userCredentials.lockedUntil
                }
            })

            await tx.user_roles.create({
                data: {
                    user_id: userCreated.id,
                    role_id: roleId
                }
            })

        })

    }

    async findByEmail(email: string): Promise<User | null> {
        const user = await this.prismaUser.users.findUnique({
            where: {
                email: email
            }
        })

        if (!user) return null;

        return this.toUser(user)

    }

    private toUser(prismaUserData: PrismaUser): User {
        return User.fromPrimivites({
            id: Number(prismaUserData.id),
            email: prismaUserData.email,
            username: prismaUserData.username || '',
            display_name: prismaUserData.display_name || '',
            status: UserStatusValue.ACTIVE,
            email_verified: prismaUserData.email_verified_at?.toDateString() || '',
            created_at: prismaUserData.created_at.toDateString(),
            updated_at: prismaUserData.updated_at.toDateString()
        })
    }

}