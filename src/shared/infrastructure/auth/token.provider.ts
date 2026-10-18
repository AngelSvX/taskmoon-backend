import { TOKEN_REPOSITORY } from "src/shared/domain/repository/TokenRepository";
import { JwtTokenService } from "./jwt/jwt.service";

export const TokenProvider = {
    provide: TOKEN_REPOSITORY,
    useClass: JwtTokenService
}