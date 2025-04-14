import deleteItem from '../../../services/delete';

const mockItem = {
  id: 'abc123',
  name: 'Item Teste',
  description: 'Qualquer descrição',
  favorite: false,
  color: '#123456',
  deleted: true,
  deletedAt: new Date(),
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('Service Delete Item', () => {
  it('should soft delete an item by ID', async () => {
    const mockPrisma = {
      item: {
        update: jest.fn().mockResolvedValue(mockItem),
      },
    };

    const result = await deleteItem('abc123', mockPrisma as any);

    expect(result).toEqual(mockItem);
    expect(mockPrisma.item.update).toHaveBeenCalledWith({
      where: { id: 'abc123' },
      data: {
        deleted: true,
        deletedAt: expect.any(Date),
      },
    });
  });

  it('should throw error if deletion fails', async () => {
    const mockPrisma = {
      item: {
        update: jest.fn().mockRejectedValue(new Error('Erro ao deletar')),
      },
    };

    await expect(deleteItem('abc123', mockPrisma as any)).rejects.toThrow('Erro ao deletar');
    expect(mockPrisma.item.update).toHaveBeenCalledWith({
      where: { id: 'abc123' },
      data: {
        deleted: true,
        deletedAt: expect.any(Date),
      },
    });
  });
});
