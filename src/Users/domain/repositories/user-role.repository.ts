export interface UserRoleRepository {
    save(userId: number, roleId: number): Promise<void>
}

export const USER_ROLE_REPOSITORY = Symbol('USER_ROLE_REPOSITORY')