import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from "@nestjs/common";
import { CreateWorkspaceUseCase } from "../application/CreateWorkspace/CreateWorkspaceUseCase";
import { GetWorkspaceBySlugUseCase } from "../application/GetWorkspaceBySlug/GetWorkspaceBySlugUseCase";
import { GetWorkspacesUseCase } from "../application/GetWorkspaces/GetWorkspacesUseCase";
import { WorkspaceValidatorDto } from "./dto/create-workspace-validator.dto";
import { ActiveWorkspaceUseCase } from "../application/ActiveWorkspace/ActiveWorkspaceUseCase";
import { ArchiveWorkspaceUseCase } from "../application/ArchiveWorkspace/ArchiveWorkspaceUseCase";
import { DeleteWorkspaceBySlugUseCase } from "../application/DeleteWorkspaceBySlug/DeleteWorkspaceBySlugUseCase";
import { UpdateWorkspaceUseCase } from "../application/UpdateWorkspace/UpdateWorkspaceUseCase";
import { UpdateWorkspaceValidatorDto } from "./dto/update-workspace-validator.dto";

@Controller('/workspace')
export class WorkspaceController {
    constructor(
        private readonly createWorkspaceUseCase: CreateWorkspaceUseCase,
        private readonly getWorkspacesUseCase: GetWorkspacesUseCase,
        private readonly getWorkspaceBySlugUseCase: GetWorkspaceBySlugUseCase,
        private readonly activeWorkspaceUseCase: ActiveWorkspaceUseCase,
        private readonly archiveWorkspaceUseCase: ArchiveWorkspaceUseCase,
        private readonly deleteWorkspaceBySlugUseCase: DeleteWorkspaceBySlugUseCase,
        private readonly updateWorkspaceUseCase: UpdateWorkspaceUseCase
    ) { }

    @Get('/')
    async getWorkspacesByUserId(@Query('owner_id', ParseIntPipe) owner_id: number) {
        return await this.getWorkspacesUseCase.execute(owner_id);
    }

    @Get('/:slug')
    async getWorkspaceBySlug(@Param('slug') slug: string) {
        return await this.getWorkspaceBySlugUseCase.execute({ slug })
    }

    @Post('/create')
    async create(@Body() request: WorkspaceValidatorDto) {
        await this.createWorkspaceUseCase.execute(request);
    }

    @Put('/active')
    async activeWorkspace(@Query('slug') slug: string ){
        await this.activeWorkspaceUseCase.execute(slug)
    }

    @Put('/archive')
    async archiveWorkspace(@Query('slug') slug: string ){
        await this.archiveWorkspaceUseCase.execute(slug)
    }

    @Put('/:slug')
    async updateWorkspace(@Param('slug') slug: string, @Body() request: UpdateWorkspaceValidatorDto) {
        return await this.updateWorkspaceUseCase.execute({ slug, ...request })
    }

    @Delete('/')
    async deleteWorkspace(@Query('slug') slug: string) {
        await this.deleteWorkspaceBySlugUseCase.execute(slug)
    }


}