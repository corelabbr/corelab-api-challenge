import findAll from '../../../services/find-all';

const mockItems = [
  {
    id: 'item1',
    name: 'Azul Royal',
    description: 'Item azul royal',
    favorite: true,
    color: '002366',
    createdAt: new Date(),
    deleted: false,
    deletedAt: null,
    updatedAt: new Date(),
  },
  {
    id: 'item2',
    name: 'Vermelho',
    description: 'Item vermelho',
    favorite: false,
    color: 'FF0000',
    createdAt: new Date(),
    deleted: false,
    deletedAt: null,
    updatedAt: new Date(),
  },
];

describe('Service Find All', () => {
  it('should return all items with no filters', async () => {
    const mockPrisma = {
      item: {
        findMany: jest.fn().mockResolvedValue(mockItems),
      },
    };

    const result = await findAll({ db: mockPrisma as any });

    expect(result).toEqual(mockItems);
    expect(mockPrisma.item.findMany).toHaveBeenCalledWith({
      where: { deleted: false },
      orderBy: [
        { favorite: 'desc' },
        { createdAt: 'desc' },
      ],
    });
  });

  it('should return filtered items by name', async () => {
    const mockPrisma = {
      item: {
        findMany: jest.fn().mockResolvedValue([mockItems[0]]),
      },
    };

    const result = await findAll({ name: 'Azul', db: mockPrisma as any });

    expect(result).toEqual([mockItems[0]]);
    expect(mockPrisma.item.findMany).toHaveBeenCalledWith({
      where: {
        deleted: false,
        name: {
          contains: 'Azul',
          mode: 'insensitive',
        },
      },
      orderBy: [
        { favorite: 'desc' },
        { createdAt: 'desc' },
      ],
    });
  });

  it('should return filtered items by color (partial match)', async () => {
    const mockPrisma = {
      item: {
        findMany: jest.fn().mockResolvedValue([mockItems[0]]),
      },
    };

    const result = await findAll({ color: '002', db: mockPrisma as any });

    expect(result).toEqual([mockItems[0]]);
    expect(mockPrisma.item.findMany).toHaveBeenCalledWith({
      where: {
        deleted: false,
        color: {
          contains: '002',
          mode: 'insensitive',
        },
      },
      orderBy: [
        { favorite: 'desc' },
        { createdAt: 'desc' },
      ],
    });
  });

  it('should return items matching search term in name OR color', async () => {
    const mockPrisma = {
      item: {
        findMany: jest.fn().mockResolvedValue([mockItems[0], mockItems[1]]),
      },
    };

    const result = await findAll({ search: 're', db: mockPrisma as any });

    expect(result).toEqual([mockItems[0], mockItems[1]]);
    expect(mockPrisma.item.findMany).toHaveBeenCalledWith({
      where: {
        deleted: false,
        OR: [
          {
            name: {
              contains: 're',
              mode: 'insensitive',
            },
          },
          {
            color: {
              contains: 're',
              mode: 'insensitive',
            },
          },
        ],
      },
      orderBy: [
        { favorite: 'desc' },
        { createdAt: 'desc' },
      ],
    });
  });
  
  it('should return filtered items by name AND color', async () => {
    const mockPrisma = {
      item: {
        findMany: jest.fn().mockResolvedValue([mockItems[0]]),
      },
    };

    const result = await findAll({ 
      name: 'Azul', 
      color: '002', 
      db: mockPrisma as any 
    });

    expect(result).toEqual([mockItems[0]]);
    expect(mockPrisma.item.findMany).toHaveBeenCalledWith({
      where: {
        deleted: false,
        AND: [
          {
            name: {
              contains: 'Azul',
              mode: 'insensitive',
            },
          },
          {
            color: {
              contains: '002',
              mode: 'insensitive',
            },
          },
        ],
      },
      orderBy: [
        { favorite: 'desc' },
        { createdAt: 'desc' },
      ],
    });
  });
});