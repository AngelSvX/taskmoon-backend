import { Inject, Injectable } from "@nestjs/common";
import { WORKSPACE_REPOSITORY, type WorkspaceRepository } from "src/Workspace/domain/repository/workspace.repository";

@Injectable()
export class GetWorkspacesUseCase {
    constructor(
        @Inject(WORKSPACE_REPOSITORY)
        private readonly workspaceRepository: WorkspaceRepository
    ) { }

    async execute(owner_id: number) {
        const workspaces = await this.workspaceRepository.getWorkspacesByUserId(owner_id)
        return workspaces;
    }
}