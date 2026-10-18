export interface EncryptPayload {
    hashedPassword: string;
    payloadPassword: string;
}

export interface EncryptRepository {
    create(password: string): Promise<string>;
    compare(payload: EncryptPayload): Promise<boolean>
}

export const ENCRYPT_REPOSITORY = Symbol('ENCRYPT_REPOSITORY');