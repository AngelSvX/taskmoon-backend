import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { WORKSPACE_REPOSITORY, type WorkspaceRepository } from "src/Workspace/domain/repository/workspace.repository";
import { UpdateWorkspaceRequest } from "./UpdateWorkspaceRequest";

@Injectable()
export class UpdateWorkspaceUseCase {
    constructor(
        @Inject(WORKSPACE_REPOSITORY)
        private readonly workspaceRepository: WorkspaceRepository
    ) { }

    async execute(request: UpdateWorkspaceRequest) {
        const workspace = await this.workspaceRepository.getWorkspaceBySlug(request.slug)

        if (!workspace) throw new NotFoundException("Workspace doesn't exist")

        const workspaceUpdated = workspace.update({
            name: request.name,
            description: request.description,
            icon: request.icon
        })

        await this.workspaceRepository.updateWorkspace(workspaceUpdated)

        return workspaceUpdated
    }

}
