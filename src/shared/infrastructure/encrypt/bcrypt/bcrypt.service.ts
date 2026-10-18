import { Logger } from "@nestjs/common";
import bcrypt from 'bcrypt';
import { EncryptPayload, EncryptRepository } from "src/shared/domain/repository/EncryptRepository";

export class BcryptService implements EncryptRepository {
    constructor () {}

    async compare(payload: EncryptPayload): Promise<boolean> {
        const logger = new Logger('BcryptService')
        if (!payload.hashedPassword || !payload.payloadPassword) {
            return false;
        }
        return await bcrypt.compare(payload.hashedPassword, payload.payloadPassword)
    }

    async create(password: string): Promise<string> {
        const passwordHashed = await bcrypt.hash(password, 10)
        return passwordHashed
    }

}