export class InvalidStatusException extends Error{
    constructor (status: string) {
        super(`The entered status doesn't exist: ${status}`)
        this.name = 'InvalidEmailException'
    }

}