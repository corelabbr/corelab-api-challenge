import { Test, TestingModule } from '@nestjs/testing';
import { JWTProvider } from './jwt.provider';

describe('JWT Provider Test Suites', () => {
  let jwtProvider: JWTProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JWTProvider],
    }).compile();

    jwtProvider = module.get<JWTProvider>(JWTProvider);
  });

  it('should generate a JWT given the proper data', async () => {
    const token = jwtProvider.generate({
      payload: {
        id: 1,
        role: 'admin',
      },
    });

    expect(token).toEqual(expect.any(String));
    expect(token).toContain('.');
    expect(token).toContain('eyJ');
  });

  it('should return the decoded JWT given the proper data', async () => {
    const token = jwtProvider.generate({
      payload: {
        id: 1,
        role: 'admin',
      },
    });

    const decoded = jwtProvider.validate({
      token,
      secret: String(process.env.JWT_KEY),
    });

    expect(decoded).toEqual(
      expect.objectContaining({
        id: 1,
        role: 'admin',
      }),
    );
  });

  it('should throw an error when the JWT is invalid', async () => {
    const token = 'invalid_token';

    expect(() =>
      jwtProvider.validate({
        token,
        secret: String(process.env.JWT_KEY),
      }),
    ).toThrow();
  });
});
