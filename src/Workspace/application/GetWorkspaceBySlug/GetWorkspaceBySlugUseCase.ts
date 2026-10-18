import { Inject, Injectable } from "@nestjs/common";
import { WORKSPACE_REPOSITORY, type WorkspaceRepository } from "src/Workspace/domain/repository/workspace.repository";
import { GetWorkspaceBySlugRequest } from "./GetWorkspaceBySlugRequest";

@Injectable()
export class GetWorkspaceBySlugUseCase {
    constructor(
        @Inject(WORKSPACE_REPOSITORY)
        private readonly workspaceRepository: WorkspaceRepository
    ) { }

    async execute(request: GetWorkspaceBySlugRequest) {
        return await this.workspaceRepository.getWorkspaceBySlug(request.slug);
    }

}