import { Module } from "@nestjs/common";
import { WorkspacePrismaModule } from "./infrastructure/workspace-prisma.module";
import { WorkspaceController } from "./presentation/workspace.controller";
import { CreateWorkspaceUseCase } from "./application/CreateWorkspace/CreateWorkspaceUseCase";
import { WORKSPACE_REPOSITORY, WorkspaceRepository } from "./domain/repository/workspace.repository";
import { SLUG_REPOSITORY, SlugRepository } from "src/shared/domain/repository/SlugRepository";
import { SlugModule } from "src/shared/infrastructure/slug/slug.module";
import { GetWorkspacesUseCase } from "./application/GetWorkspaces/GetWorkspacesUseCase";
import { GetWorkspaceBySlugUseCase } from "./application/GetWorkspaceBySlug/GetWorkspaceBySlugUseCase";
import { ActiveWorkspaceUseCase } from "./application/ActiveWorkspace/ActiveWorkspaceUseCase";
import { ArchiveWorkspaceUseCase } from "./application/ArchiveWorkspace/ArchiveWorkspaceUseCase";
import { DeleteWorkspaceBySlugUseCase } from "./application/DeleteWorkspaceBySlug/DeleteWorkspaceBySlugUseCase";
import { UpdateWorkspaceUseCase } from "./application/UpdateWorkspace/UpdateWorkspaceUseCase";

@Module({
    imports: [
        WorkspacePrismaModule,
        SlugModule,
    ],
    controllers: [WorkspaceController],
    providers: [
        {
            provide: CreateWorkspaceUseCase,
            useFactory: (
                workspaceRepository: WorkspaceRepository,
                slugRepository: SlugRepository
            ) => {
                return new CreateWorkspaceUseCase(workspaceRepository, slugRepository)
            },
            inject: [WORKSPACE_REPOSITORY, SLUG_REPOSITORY]
        },
        {
            provide: GetWorkspacesUseCase,
            useFactory: (
                workspaceRepository: WorkspaceRepository,
            ) => {
                return new GetWorkspacesUseCase(workspaceRepository)
            },
            inject: [WORKSPACE_REPOSITORY]
        },
        {
            provide: GetWorkspaceBySlugUseCase,
            useFactory: (
                workspaceRepository: WorkspaceRepository,
            ) => {
                return new GetWorkspaceBySlugUseCase(workspaceRepository)
            },
            inject: [WORKSPACE_REPOSITORY]
        },
        {
            provide: ActiveWorkspaceUseCase,
            useFactory: (
                workspaceRepository: WorkspaceRepository,
            ) => {
                return new ActiveWorkspaceUseCase(workspaceRepository)
            },
            inject:  [WORKSPACE_REPOSITORY]
        },
        {
            provide: ArchiveWorkspaceUseCase,
            useFactory: (
                workspaceRepository: WorkspaceRepository
            ) => {
                return new ArchiveWorkspaceUseCase(workspaceRepository)
            },
            inject: [WORKSPACE_REPOSITORY]
        },
        {
            provide: DeleteWorkspaceBySlugUseCase,
            useFactory: (
                workspaceRepository: WorkspaceRepository
            ) => {
                return new DeleteWorkspaceBySlugUseCase(workspaceRepository)
            },
            inject: [WORKSPACE_REPOSITORY]
        },
        {
            provide: UpdateWorkspaceUseCase,
            useFactory: (
                workspaceRepository: WorkspaceRepository
            ) => {
                return new UpdateWorkspaceUseCase(workspaceRepository)
            },
            inject: [WORKSPACE_REPOSITORY]
        }
    ],
})

export class WorkspaceModule {}