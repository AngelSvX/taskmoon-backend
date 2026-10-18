import { UserCredentials } from "src/Authentication/UserCredentials/domain/entities/user-credentials.entity";
import { User } from "../entities/user.entity";

export interface UserRepository {
    save(user: User, userCredentials: UserCredentials, roleId: number): Promise<void>;
    findByEmail(email: string): Promise<User | null>;
}

export const USER_REPOSITORY = Symbol("USER_REPOSITORY");