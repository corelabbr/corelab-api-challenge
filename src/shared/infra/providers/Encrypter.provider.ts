import { createCipheriv, createDecipheriv } from 'crypto';
import { EncrypterProviderInterface } from '../../domain/providers/Encrypter.provider';
import { appConfigurations } from '../../config/app.config';
import {
  EncrypterDecryptDTO,
  EncrypterEncryptDTO,
} from '../../domain/dtos/providers/Encrypter.provider.dto';

export class EncrypterProvider implements EncrypterProviderInterface {
  private readonly algorithm: string;
  private readonly iv: Buffer;
  private readonly secret: string;

  constructor() {
    this.algorithm = 'aes-256-cbc';
    this.iv = Buffer.from(appConfigurations.CRYPTO_IV);
    this.secret = appConfigurations.CRYPTO_SECRET;
  }

  public encrypt({ content, secret }: EncrypterEncryptDTO): string {
    const cipher = createCipheriv(
      this.algorithm,
      Buffer.from(secret || this.secret),
      this.iv,
    );

    const encrypted = Buffer.concat([cipher.update(content), cipher.final()]);

    const encryptedPayload = encrypted.toString('hex');

    return encryptedPayload;
  }

  public decrypt({ content, secret }: EncrypterDecryptDTO): string {
    const decipher = createDecipheriv(
      this.algorithm,
      secret || this.secret,
      this.iv,
    );

    const decrypted = Buffer.concat([
      decipher.update(Buffer.from(content, 'hex')),
      decipher.final(),
    ]);

    return decrypted.toString();
  }

  public decryptData<T>(data: T, fields: (keyof T)[]): T {
    if (!data || typeof data !== 'object') {
      return data;
    }

    const objectToArray = Object.entries(data);

    const response: Partial<T> = {};

    for (const item of objectToArray) {
      const key = item[0];
      let value = item[1] === null ? undefined : item[1];

      if (value) {
        if (fields.includes(key as keyof T)) {
          value = this.decrypt({ content: value.toString() });
        }
        response[key] = value;
      }
    }

    return response as T;
  }

  public encryptData<T>(data: T, fields: (keyof T)[]): T {
    if (!data || typeof data !== 'object') {
      return data;
    }

    const objectToArray = Object.entries(data);

    const response: Partial<T> = {};

    for (const item of objectToArray) {
      const key = item[0];
      let value = item[1];
      if (fields.includes(key as keyof T)) {
        value = this.encrypt({ content: value.toString() });
      }
      response[key] = value;
    }

    return response as T;
  }
}
