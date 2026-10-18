import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TokenProvider } from "./token.provider";

@Module({
    imports: [
        JwtModule.register({
            global: true,
            secretOrPrivateKey: process.env.JWT_SECRET || "I-really-want-to-stay-at-your-house",
            signOptions: { expiresIn: '1d' }
        })
    ],
    providers: [TokenProvider],
    exports: [TokenProvider],
    controllers: []
})

export class TokenModule {}