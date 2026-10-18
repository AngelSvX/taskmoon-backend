import { Injectable } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { TokenPayload, TokenRepository } from "src/shared/domain/repository/TokenRepository";

@Injectable()
export class JwtTokenService implements TokenRepository {
    constructor (
        private readonly jwtService: JwtService
    ) {}

    async generateAccessToken(authPayload: TokenPayload): Promise<string> {
        const payload = {
            id: authPayload.id,
            email: authPayload.email,
            username: authPayload.username,
            display_name: authPayload.display_name,
            created_at: authPayload.created_at,
            roles: authPayload.roles
        }

        const token = await this.jwtService.signAsync(payload)

        return token;

    }

    verifyToken(token: string): TokenPayload {
        const verify = this.jwtService.verify<TokenPayload>(token)
        return verify;
    }
    
    generateRefreshToken(): string {
        return 'Not yet :('
    }

}