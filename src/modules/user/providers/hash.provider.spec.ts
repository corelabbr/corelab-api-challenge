import { Test, TestingModule } from '@nestjs/testing';
import { HashProvider } from './hash.provider';

describe('Hash Provider Test Suites', () => {
  let hashProvider: HashProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HashProvider],
    }).compile();

    hashProvider = module.get<HashProvider>(HashProvider);
  });

  it('should return a hash when the hash method is called', async () => {
    const hashedValue = await hashProvider.hash('password');

    expect(hashedValue).toEqual(expect.any(String));
    expect(hashedValue).toContain('$');
  });

  it('should not return true when the compare method is called with different values', async () => {
    const isHashEqual = await hashProvider.compare('password', 'wrong_hash');

    expect(isHashEqual).toBe(false);
  });

  it('should return true when the compare method is called with the same values', async () => {
    const hashedValue = await hashProvider.hash('password');
    const isHashEqual = await hashProvider.compare('password', hashedValue);

    expect(isHashEqual).toBe(true);
  });
});
