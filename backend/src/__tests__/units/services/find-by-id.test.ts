import findById from '../../../services/find-by-id';

const mockItem = {
  id: 'abc123',
  title: 'Teste',
  description: 'Descrição',
  favorite: false,
  color: '#fff',
  createdAt: new Date(),
  deleted: false,
  deletedAt: null,
  updatedAt: new Date(),
};

describe('Service Find by ID', () => {
  it('should return the item with the indicated ID', async () => {
    const mockPrisma = {
      item: {
        findFirst: jest.fn().mockResolvedValue(mockItem),
      },
    };

    const result = await findById('abc123', mockPrisma as any);
    expect(result).toEqual(mockItem);
    expect(mockPrisma.item.findFirst).toHaveBeenCalledWith({
      where: { id: 'abc123', deleted: false },
    });
  });

  it('should return null when item is not found', async () => {
    const mockPrisma = {
      item: {
        findFirst: jest.fn().mockResolvedValue(null),
      },
    };

    const result = await findById('aaaaa', mockPrisma as any);
    expect(result).toBeNull();
    expect(mockPrisma.item.findFirst).toHaveBeenCalledWith({
      where: { id: 'aaaaa', deleted: false },
    });
  });
});
