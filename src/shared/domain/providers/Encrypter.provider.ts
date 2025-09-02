import {
  EncrypterDecryptDTO,
  EncrypterEncryptDTO,
} from '../dtos/providers/Encrypter.provider.dto';

export interface EncrypterProviderInterface {
  encrypt(data: EncrypterEncryptDTO): string;
  decrypt(data: EncrypterDecryptDTO): string;
  decryptData<T>(data: T, fields: (keyof T)[]): T;
  encryptData<T>(data: T, fields: (keyof T)[]): T;
}
