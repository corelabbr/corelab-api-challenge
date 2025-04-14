import favoriteItem from '../../../services/favorite';

const mockItem = {
  id: 'abc123',
  name: 'Item Qualquer',
  description: 'Desc',
  favorite: true,
  color: '#000',
  createdAt: new Date(),
  updatedAt: new Date(),
  deleted: false,
  deletedAt: null,
};

describe('Service Favorite Item', () => {
  it('should favorite an item by ID', async () => {
    const mockPrisma = {
      item: {
        update: jest.fn().mockResolvedValue(mockItem),
      },
    };

    const result = await favoriteItem('abc123', true, mockPrisma as any);

    expect(result).toEqual(mockItem);
    expect(mockPrisma.item.update).toHaveBeenCalledWith({
      where: { id: 'abc123' },
      data: { favorite: true },
    });
  });

  it('should unfavorite an item by ID', async () => {
    const mockPrisma = {
      item: {
        update: jest.fn().mockResolvedValue({ ...mockItem, favorite: false }),
      },
    };

    const result = await favoriteItem('abc123', false, mockPrisma as any);

    expect(result.favorite).toBe(false);
    expect(mockPrisma.item.update).toHaveBeenCalledWith({
      where: { id: 'abc123' },
      data: { favorite: false },
    });
  });

  it('should throw error on failure', async () => {
    const mockPrisma = {
      item: {
        update: jest.fn().mockRejectedValue(new Error('Erro ao favoritar')),
      },
    };

    await expect(favoriteItem('abc123', true, mockPrisma as any)).rejects.toThrow('Erro ao favoritar');
    expect(mockPrisma.item.update).toHaveBeenCalledWith({
      where: { id: 'abc123' },
      data: { favorite: true },
    });
  });
});
