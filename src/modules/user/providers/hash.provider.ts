import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcryptjs';
import { HashProviderInterface } from '../domain/providers/hash.provider';

@Injectable()
export class HashProvider implements HashProviderInterface {
  public async hash(payload: string): Promise<string> {
    const hashedValue = await hash(payload, 10);

    return hashedValue;
  }
  public async compare(payload: string, hash: string): Promise<boolean> {
    const isHashEqual = await compare(payload, hash);
    return isHashEqual;
  }
}
