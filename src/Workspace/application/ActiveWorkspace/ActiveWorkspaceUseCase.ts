import { Inject, Injectable } from "@nestjs/common";
import { WORKSPACE_REPOSITORY, type WorkspaceRepository } from "src/Workspace/domain/repository/workspace.repository";

@Injectable()
export class ActiveWorkspaceUseCase{
    constructor(
        @Inject(WORKSPACE_REPOSITORY)
        private readonly workspaceRepository: WorkspaceRepository
    ){}

    async execute(slug: string){
        await this.workspaceRepository.activeWorkspace(slug)
    }

}