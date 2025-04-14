import update from '../../../services/update';

const mockItem = {
  id: 'abc123',
  name: 'Item Atualizado',
  description: 'Descrição atualizada',
  favorite: true,
  color: '#000',
  createdAt: new Date(),
  updatedAt: new Date(),
  deleted: false,
  deletedAt: null,
};

describe('Service Update Item', () => {
  it('should update an item by ID', async () => {
    const mockPrisma = {
      item: {
        update: jest.fn().mockResolvedValue(mockItem),
      },
    };

    const userId = 'abc123';
    const input = {
      name: 'Item Atualizado',
      description: 'Descrição atualizada',
      favorite: true,
    };

    const result = await update(userId, input as any, mockPrisma as any);

    expect(result).toEqual(mockItem);
    expect(mockPrisma.item.update).toHaveBeenCalledWith({
      where: { id: userId },
      data: input,
    });
  });

  it('should throw an error when update fails', async () => {
    const mockPrisma = {
      item: {
        update: jest.fn().mockRejectedValue(new Error('Erro ao atualizar')),
      },
    };

    const userId = 'abc123';
    const input = {
      name: 'Erro',
      description: 'Falhou',
    };

    await expect(update(userId, input as any, mockPrisma as any)).rejects.toThrow('Erro ao atualizar');
    expect(mockPrisma.item.update).toHaveBeenCalledWith({
      where: { id: userId },
      data: input,
    });
  });
});
