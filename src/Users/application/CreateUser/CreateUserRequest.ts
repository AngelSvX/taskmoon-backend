import { UserStatusValue } from "src/Users/domain/value-objects/user-status.vo"

export type CreateUserRequest = {
    email: string,
    username: string,
    password: string
    role_id: number
}