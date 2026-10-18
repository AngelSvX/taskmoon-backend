import { PrismaService } from "src/shared/infrastructure/persistance/prisma/prisma.service";
import { UserRoleRepository } from "../domain/repositories/user-role.repository";
import { Prisma } from "generated/prisma/browser";

type PrismaUserRolePayload = Prisma.user_rolesGetPayload<{
    select: {
        user_id: true,
        role_id: true,
    }
}>

export class PrismaUserRoleRepository implements UserRoleRepository {
    constructor (
        private readonly prismaUserRole: PrismaService
    ) {}

    async save(userId: number, roleId: number): Promise<void> {
        await this.prismaUserRole.user_roles.create({
            data: {
                user_id: userId,
                role_id: roleId
            }
        })
    }

}