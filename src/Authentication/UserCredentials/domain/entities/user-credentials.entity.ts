export type UserCredentialsPrimitive = Readonly<{
    user_id: number,
    password_hash: string,
    password_changed_at: string | null,
    failed_attempts: number,
    locked_until: string | null
}>

export class UserCredentials {
    private constructor (
        private readonly user_id: number,
        private readonly password_hash: string,
        private readonly password_changed_at: Date | null,
        private readonly failed_attempts: number,
        private readonly locked_until: Date | null
    ){}

    static fromPrimitives (props: UserCredentialsPrimitive): UserCredentials{
        return new UserCredentials(
            props.user_id,
            props.password_hash,
            props.password_changed_at ? new Date(props.password_changed_at) : null,
            props.failed_attempts,
            props.locked_until ? new Date(props.locked_until) : null
        )
    }

    toPrimitives(): UserCredentialsPrimitive {
        return {
            user_id: this.user_id,
            password_hash: this.password_hash,
            password_changed_at: this.password_changed_at ? this.password_changed_at.toISOString() : null,
            failed_attempts: this.failed_attempts,
            locked_until: this.locked_until ? this.locked_until.toISOString() : null
        }
    }

    static create(
        props: {
            user_id: number,
            password_hash: string,
            password_changed_at: Date | null,
            failed_attempts: number,
            locked_until: Date | null
        }
    ): UserCredentials {
        return new UserCredentials(
            props.user_id,
            props.password_hash,
            props.password_changed_at,
            props.failed_attempts,
            props.locked_until
        )
    }

    get userId(): number{
        return this.user_id;
    }
    get passwordHash(): string{
        return this.password_hash;
    }
    get passwordChangedAt(): Date | null {
        return this.password_changed_at;
    }
    get failedAttempts(): number{
        return this.failed_attempts;
    }
    get lockedUntil(): Date | null {
        return this.locked_until;
    }

}