import { InvalidStatusException } from "../exception/status-invalid-exception";


export enum UserStatusValue {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
    SUSPENDED = 'suspended'
}

export class UserStatus {
    constructor(
        private status: UserStatusValue
    ){}

  static create(value: string): UserStatus {
    if (!Object.values(UserStatusValue).includes(value as UserStatusValue)) {
      throw new InvalidStatusException(value);
    }

    return new UserStatus(value as UserStatusValue);
  }

    public getStatus(): UserStatusValue {
        return this.status;
    }

}