export interface TokenPayload {
    id: number;
    email: string;
    username: string;
    display_name: string;
    created_at: string;
    roles: string[];
}

export interface TokenPair {
    accessToken: string;
    refreshToken: string;
}

export interface TokenRepository {
    generateAccessToken(payload: TokenPayload): Promise<string>;
    generateRefreshToken(): string;
    verifyToken(token: string): TokenPayload;
}

export const TOKEN_REPOSITORY = Symbol('TOKEN_REPOSITORY');