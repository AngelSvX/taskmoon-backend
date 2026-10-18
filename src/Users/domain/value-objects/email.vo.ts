import { InvalidEmailException } from "../exception/email-invalid-exception";

export class Email {
    constructor(
        private email: string
    ){}

    static create(email: string) {
        if (!email || !email.includes('@')) {
            throw new InvalidEmailException(email)
        }
        return new Email(email.toLowerCase().trim())
    }

    getValue(): string{
        return this.email
    }

}