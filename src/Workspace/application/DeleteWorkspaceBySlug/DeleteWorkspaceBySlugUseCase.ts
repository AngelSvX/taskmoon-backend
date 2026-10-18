import { Inject } from "@nestjs/common";
import { WORKSPACE_REPOSITORY, type WorkspaceRepository } from "src/Workspace/domain/repository/workspace.repository";

export class DeleteWorkspaceBySlugUseCase {
    constructor (
        @Inject(WORKSPACE_REPOSITORY)
        private readonly workspaceRepository: WorkspaceRepository
    ) {}

    async execute (slug: string) {
        return await this.workspaceRepository.deleteWorkspaceBySlug(slug);
    }

}