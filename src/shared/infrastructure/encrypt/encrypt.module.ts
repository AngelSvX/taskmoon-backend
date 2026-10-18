import { Module } from "@nestjs/common";
import { EncryptProvider } from "./encrypt.provider";

@Module({
    exports: [EncryptProvider],
    providers: [EncryptProvider]
})

export class EncryptModule {}