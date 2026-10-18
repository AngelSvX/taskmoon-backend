export interface RoleRepository {
    findNamesByUserId(userId: number): Promise<string[]>
}

export const ROLE_REPOSITORY = Symbol("ROLE_REPOSITORY")