import { FavoriteRepository } from './favorite.repository';

describe('FavoriteRepository', () => {
  it('should be defined', () => {
    expect(new FavoriteRepository()).toBeDefined();
  });
});
