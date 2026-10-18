import { Injectable } from "@nestjs/common";
import { RoleRepository } from "../domain/repositories/role.repository";
import { PrismaService } from "src/shared/infrastructure/persistance/prisma/prisma.service";

@Injectable()
export class PrismaRoleRepository implements RoleRepository {
    constructor (
        private readonly prismaService: PrismaService
    ) {}
    
    async findNamesByUserId(userId: number): Promise<string[]> {
        const roles = await this.prismaService.user_roles.findMany({
            where: {
                user_id: userId
            },
            select: {
                roles: {
                    select: {
                        name: true,
                    }
                }
            }
        })

        return roles.map((r) => r.roles.name)

    }
}