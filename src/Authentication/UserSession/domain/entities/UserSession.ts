export type UserSessionPrimitive = Readonly<{
    id: number,
    user_id: number,
    token_hash: string,
    ip_address: string,
    user_agent: string,
    created_at: string,
    last_used_at: string,
    expires_at: string | null,
    revoked_at: string | null,
}>

export class UserSession {
    private constructor (
        readonly id: number,
        readonly user_id: number,
        readonly token_hash: string,
        readonly ip_address: string,
        readonly user_agent: string, // No se que es xd
        readonly created_at: Date,
        readonly last_used_at: Date,
        readonly expires_at: Date | null,
        readonly revoked_at: Date | null,
    ) {}

    static fromPrimitive(primitive: UserSessionPrimitive): UserSession {
        return new UserSession(
            primitive.id,
            primitive.user_id,
            primitive.token_hash,
            primitive.ip_address,
            primitive.user_agent,
            new Date(primitive.created_at),
            new Date(primitive.last_used_at),
            primitive.expires_at ? new Date(primitive.expires_at) : null,
            primitive.revoked_at ? new Date(primitive.revoked_at) : null,
        )
    }

    toPrimitives(): UserSessionPrimitive {
        return {
            id: this.id,
            user_id: this.user_id,
            token_hash: this.token_hash,
            ip_address: this.ip_address,
            user_agent: this.user_agent,
            created_at: this.created_at.toISOString(),
            last_used_at: this.last_used_at.toISOString(),
            expires_at: this.expires_at ? this.expires_at.toISOString() : null,
            revoked_at: this.revoked_at ? this.revoked_at.toISOString() : null,
        }
    }

    static create(
        props: {
            id: number,
            user_id: number,
            token_hash: string
            ip_address: string
            user_agent: string,
            created_at: Date,
            last_usedt_at: Date,
            expires_at: Date | null,
            revoked_at: Date | null,
        }
    ): UserSession {
        return new UserSession(
            props.id,
            props.user_id,
            props.token_hash,
            props.ip_address,
            props.user_agent,
            props.created_at,
            props.last_usedt_at,
            props.expires_at ?? new Date(),
            props.revoked_at ?? new Date(),
        )
    }

    get Id(): number {
        return this.id;
    }

    
    get UserId(): number {
        return this.user_id;
    }

    
    get TokenHash(): string {
        return this.token_hash;
    }

    get IpAddress(): string {
        return this.ip_address;
    }

    get UserAgent(): string {
        return this.user_agent;
    }

    get CreatedAt(): Date {
        return this.created_at;
    }

    get LastUsedAt(): Date {
        return this.last_used_at;
    }

    get ExpiresAt(): Date | null {
        return this.expires_at;
    }

    get RevokedAt(): Date | null {
        return this.revoked_at;
    }

}