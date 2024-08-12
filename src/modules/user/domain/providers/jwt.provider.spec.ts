import { Test, TestingModule } from '@nestjs/testing';
import { JWTProviderInterface } from './jwt.provider';

describe('JWT Provider Interface Test Suites', () => {
  const mockJWTProviderInterface: JWTProviderInterface = {
    generate: jest.fn(),
    validate: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({}).compile();
  });

  it('should have the generate method', async () => {
    expect(mockJWTProviderInterface.generate).toBeTruthy();
  });

  it('should have the validate method', async () => {
    expect(mockJWTProviderInterface.validate).toBeTruthy();
  });
});
