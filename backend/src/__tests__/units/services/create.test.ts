import createItem from '../../../services/create';

const mockItem = {
  id: 'abc123',
  name: 'Item Exemplo',
  description: 'Descrição',
  favorite: false,
  color: '#fff',
  createdAt: new Date(),
  deleted: false,
  deletedAt: null,
  updatedAt: new Date(),
};

describe('Service Create Item', () => {
  it('should create a new item', async () => {
    const mockPrisma = {
      item: {
        create: jest.fn().mockResolvedValue(mockItem),
      },
    };

    const input = {
      name: 'Item Exemplo',
      description: 'Descrição',
      favorite: false,
      color: '#fff',
    };

    const result = await createItem(input as any, mockPrisma as any);

    expect(result).toEqual(mockItem);
    expect(mockPrisma.item.create).toHaveBeenCalledWith({
      data: input,
    });
  });

  it('should throw an error if creation fails', async () => {
    const mockPrisma = {
      item: {
        create: jest.fn().mockRejectedValue(new Error('Erro ao criar')),
      },
    };

    const input = {
      name: 'Item com erro',
      description: 'Testando erro',
      favorite: true,
      color: '#000',
    };

    await expect(createItem(input as any, mockPrisma as any)).rejects.toThrow('Erro ao criar');
    expect(mockPrisma.item.create).toHaveBeenCalledWith({
      data: input,
    });
  });
});
