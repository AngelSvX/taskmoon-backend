import { Inject, Injectable } from "@nestjs/common";
import { WORKSPACE_REPOSITORY, type WorkspaceRepository } from "src/Workspace/domain/repository/workspace.repository";
import { CreateWorkspaceRequest } from "./CreateWorkspaceRequest";
import { SLUG_REPOSITORY, type SlugRepository } from "src/shared/domain/repository/SlugRepository";
import { Workspace } from "src/Workspace/domain/entities/workspace.entity";

@Injectable()
export class CreateWorkspaceUseCase {
    constructor(
        @Inject(WORKSPACE_REPOSITORY)
        private readonly workspaceRepository: WorkspaceRepository,
        @Inject(SLUG_REPOSITORY)
        private readonly slugRepository: SlugRepository
    ){}

    async execute(request: CreateWorkspaceRequest){
        const slug = this.slugRepository.generate(request.name)

        const workspaceCreated = Workspace.create({
            owner_id: request.owner_id,
            name: request.name,
            description: request.description,
            icon: request.icon,
            slug: slug
        })

        return await this.workspaceRepository.createWorkspace(workspaceCreated)

    }

}