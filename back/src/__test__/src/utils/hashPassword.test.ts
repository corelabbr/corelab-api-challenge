import { describe, it, expect } from 'vitest';
import { hashPassword } from '@utils/password-generator'; 
import bcrypt from 'bcrypt';

describe('hashPassword', () => {
  it('deve retornar um hash válido para a senha fornecida', async () => {
    const senhaOriginal = 'minhaSenha123';
    const hash = await hashPassword(senhaOriginal);

    expect(typeof hash).toBe('string');
    const corresponde = await bcrypt.compare(senhaOriginal, hash);
    expect(corresponde).toBe(true);
  });
});
