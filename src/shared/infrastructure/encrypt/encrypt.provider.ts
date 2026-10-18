import { ENCRYPT_REPOSITORY } from "src/shared/domain/repository/EncryptRepository";
import { BcryptService } from "./bcrypt/bcrypt.service";

export const EncryptProvider = {
  provide: ENCRYPT_REPOSITORY,
  useClass: BcryptService,
};