import { AuthenticationMiddleware } from './auth.middleware';

describe('AuthenticationMiddleware', () => {
  it('should be defined', () => {
    expect(new AuthenticationMiddleware()).toBeDefined();
  });
});
