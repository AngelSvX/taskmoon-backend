import { Injectable } from "@nestjs/common";
import { Prisma } from "generated/prisma/client";
import { WorkspaceStatus as PrismaWorkspaceStatus } from "generated/prisma/enums";
import { PrismaService } from "src/shared/infrastructure/persistance/prisma/prisma.service";
import { Workspace, WorkspaceStatus } from "../domain/entities/workspace.entity";
import { WorkspaceRepository } from "../domain/repository/workspace.repository";

const workspaceStatusToDomain: Record<PrismaWorkspaceStatus, WorkspaceStatus> = {
    [PrismaWorkspaceStatus.active]: WorkspaceStatus.ACTIVE,
    [PrismaWorkspaceStatus.archived]: WorkspaceStatus.ARCHIVED,
}

export type PrismaWorkspace = Prisma.workspaceGetPayload<{
    select: {
        id: true,
        ownerId: true,
        name: true,
        description: true,
        icon: true,
        slug: true,
        status: true,
        settings: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true
    }
}>

@Injectable()
export class PrismaWorkspaceRepository implements WorkspaceRepository {
    constructor(
        private readonly prismaService: PrismaService
    ) { }

    async createWorkspace(workspace: Workspace): Promise<void> {
        await this.prismaService.workspace.create({
            data: {
                ownerId: workspace.owner_id,
                name: workspace.name,
                description: workspace.description,
                icon: workspace.icon,
                slug: workspace.slug,
                status: PrismaWorkspaceStatus.active,
                settings: 'default',
                deletedAt: null
            }
        })
    }

    async getWorkspacesByUserId(owner_id: number): Promise<Workspace[]> {
        const workspaces = await this.prismaService.workspace.findMany({
            select: {
                id: true,
                ownerId: true,
                name: true,
                description: true,
                icon: true,
                slug: true,
                status: true,
                settings: true,
                createdAt: true,
                updatedAt: true,
                deletedAt: true
            },
            where: {
                ownerId: owner_id
            }
        })

        return workspaces.map((workspace) => {
            return this.toWorkspace(workspace)
        })

    }

    async getWorkspaceBySlug(slug: string): Promise<Workspace | null> {
        const workspace = await this.prismaService.workspace.findUnique({
            where: {
                slug: slug
            },
            select: {
                id: true,
                ownerId: true,
                name: true,
                description: true,
                icon: true,
                slug: true,
                status: true,
                settings: true,
                createdAt: true,
                updatedAt: true,
                deletedAt: true
            }
        })

        if (!workspace) return null

        return this.toWorkspace(workspace)

    }

    async activeWorkspace(slug: string): Promise<void> {
        await this.prismaService.workspace.update({
            where: {
                slug: slug
            },
            data: {
                status: PrismaWorkspaceStatus.active
            }
        })
    }

    async archiveWorkspace(slug: string): Promise<void> {
        await this.prismaService.workspace.update({
            where: {
                slug: slug
            },
            data: {
                status: PrismaWorkspaceStatus.archived
            }
        })
    }

    async deleteWorkspaceBySlug(slug: string): Promise<void> {
        await this.prismaService.workspace.delete({
            where: {
                slug: slug
            }
        })
    }

    async updateWorkspace(workspace: Workspace): Promise<void> {
        await this.prismaService.workspace.update({
            where: {
                slug: workspace.slug
            },
            data: {
                name: workspace.name,
                description: workspace.description,
                icon: workspace.icon
            }
        })
    }

    private toWorkspace(prismaWorkspaceData: PrismaWorkspace): Workspace {
        return Workspace.fromPrimitives({
            id: Number(prismaWorkspaceData.id),
            owner_id: Number(prismaWorkspaceData.ownerId),
            name: prismaWorkspaceData.name,
            description: prismaWorkspaceData.description || "",
            icon: prismaWorkspaceData.icon || "",
            slug: prismaWorkspaceData.slug,
            status: workspaceStatusToDomain[prismaWorkspaceData.status],
            settings: String(prismaWorkspaceData.settings),
            created_at: prismaWorkspaceData.createdAt.toDateString(),
            updated_at: prismaWorkspaceData.updatedAt.toDateString(),
            deleted_at: prismaWorkspaceData.deletedAt?.toDateString() || null
        })
    }

}