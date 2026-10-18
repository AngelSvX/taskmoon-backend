import { WorkspaceStatus } from "generated/prisma/enums";
import { Workspace } from "../entities/workspace.entity";

export interface WorkspaceRepository {
    createWorkspace(workspace: Workspace): Promise<void>;
    getWorkspacesByUserId(owner_id: number): Promise<Workspace[]>
    getWorkspaceBySlug(slug: string): Promise<Workspace | null>
    archiveWorkspace(slug: string): Promise<void>
    activeWorkspace(slug: string): Promise<void>
    deleteWorkspaceBySlug(slug: string): Promise<void>
    updateWorkspace(workspace: Workspace): Promise<void>
}

export const WORKSPACE_REPOSITORY = Symbol("WORKSPACE_REPOSITORY")