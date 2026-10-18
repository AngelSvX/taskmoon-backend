import { UserCredentials } from "../entities/user-credentials.entity";

export interface UserCredentialsRepository {
    save(userCredentials: UserCredentials): Promise<void>;
    findByUserId(userId: number): Promise<UserCredentials | null>
}

export const USER_CREDENTIALS_REPOSITORY = Symbol('USER_CREDENTIALS_REPOSITORY');