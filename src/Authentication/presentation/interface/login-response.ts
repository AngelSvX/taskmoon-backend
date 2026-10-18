import { Expose } from 'class-transformer'

export class LoginResponse {
  @Expose({ name: 'access_token' })
  token: string
}