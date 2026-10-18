import { Module } from "@nestjs/common";
import { WORKSPACE_REPOSITORY } from "../domain/repository/workspace.repository";
import { PrismaWorkspaceRepository } from "./workspace-prisma.repository";

@Module({
    providers:[{
        provide: WORKSPACE_REPOSITORY,
        useClass: PrismaWorkspaceRepository
    }],
    exports: [WORKSPACE_REPOSITORY]
})

export class WorkspacePrismaModule {}