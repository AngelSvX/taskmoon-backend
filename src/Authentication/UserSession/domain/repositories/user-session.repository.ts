import { UserSession } from "../entities/UserSession";

export interface UserSessionRepository {
    loggedIn(userSession: UserSession): Promise<void>;
}

export const USER_SESSION_REPOSITORY = Symbol('USER_SESSION_REPOSITORY')