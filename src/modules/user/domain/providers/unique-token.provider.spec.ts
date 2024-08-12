import { Test, TestingModule } from '@nestjs/testing';
import { UniqueTokenProviderInterface } from './unique-token.provider';

describe('Unique Token Provider Interface Test Suites', () => {
  const mockUniqueTokenProviderInterface: UniqueTokenProviderInterface = {
    createToken: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({}).compile();
  });

  it('should have the createToken method', async () => {
    expect(mockUniqueTokenProviderInterface.createToken).toBeTruthy();
  });
});
