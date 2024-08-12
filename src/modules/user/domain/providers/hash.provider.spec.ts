import { Test, TestingModule } from '@nestjs/testing';
import { HashProviderInterface } from './hash.provider';

describe('Hash Provider Interface Test Suites', () => {
  const mockHashProviderInterface: HashProviderInterface = {
    hash: jest.fn(),
    compare: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({}).compile();
  });

  it('should have the hash method', async () => {
    expect(mockHashProviderInterface.hash).toBeTruthy();
  });

  it('should have the compare method', async () => {
    expect(mockHashProviderInterface.compare).toBeTruthy();
  });
});
