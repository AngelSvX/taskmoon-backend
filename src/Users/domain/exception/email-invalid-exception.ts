export class InvalidEmailException extends Error {
    constructor (email: string) {
        super(`The email format ${email} is not valid.`)
        this.name = 'InvalidEmailException'
    }
}