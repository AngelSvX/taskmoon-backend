import { Email } from "../value-objects/email.vo"
import { UserStatus, UserStatusValue } from "../value-objects/user-status.vo"

export type UserPrimitives = Readonly<{
    id: number,
    email: string,
    username: string,
    display_name: string,
    status: UserStatusValue,
    email_verified: string | null,
    created_at: string,
    updated_at: string,
}>

export class User {
    private constructor (
        private readonly id: number,
        private readonly email: Email,
        private readonly username: string,
        private readonly display_name: string,
        private readonly status: UserStatus,
        private readonly email_verified: Date | null,
        private readonly created_at: Date,
        private readonly updated_at: Date,
    ) {}

    static fromPrimivites(props: UserPrimitives): User{
        return new User(
            props.id,
            Email.create(props.email),
            props.username,
            props.display_name,
            UserStatus.create(props.status),
            props.email_verified ? new Date(props.email_verified) : null,
            new Date(props.created_at),
            new Date(props.updated_at),
        )
    }

    toPrimitives(): UserPrimitives {
        return {
            id: this.id,
            email: this.email.getValue(),
            username: this.username,
            display_name: this.display_name,
            status: this.status.getStatus(),
            email_verified: this.email_verified ? this.email_verified.toISOString() : null,
            created_at: this.created_at.toISOString(),
            updated_at: this.updated_at.toISOString(),
        }
    }

    static create(
        props: {
            id: number
            email: string,
            username: string,
            display_name: string,
            email_verified: Date | null,
            created_at: Date,
            updated_at: Date,
        }
    ): User {
        return new User(
            props.id,
            Email.create(props.email),
            props.username,
            props.display_name,
            UserStatus.create(UserStatusValue.ACTIVE),
            props.email_verified,
            props.created_at,
            props.updated_at,
        )
    }

    get Id(): number {
        return this.id;
    }
    get Email(): string {
        return this.email.getValue();
    }
    get Username(): string {
        return this.username;
    }
    get DisplayName(): string {
        return this.display_name;
    }
    get Status(): UserStatusValue {
        return this.status.getStatus();
    }
    get EmailVerified(): Date | null {
        return this.email_verified;
    }
    get CreatedAt(): Date {
        return this.created_at;
    }
    get UpdatedAt(): Date {
        return this.updated_at;
    }
}