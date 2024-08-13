import prisma from '../src/libs/prisma'

async function main() {
  await prisma.todos.createMany({
    data: [
      { title: 'todo 1', description: 'description 1', color: 'COLOR_DEFAULT' },
      {
        title: 'todo 2',
        description: 'description 2',
        color: 'COLOR_OPTION_2',
      },
      {
        title: 'todo 3',
        description: 'description 3',
        color: 'COLOR_OPTION_6',
      },
      {
        title: 'todo 4',
        description: 'description 4',
        color: 'COLOR_OPTION_9',
        deleted: true,
      },
      {
        title: 'todo 5',
        description: 'description 5',
        color: 'COLOR_OPTION_11',
        favorite: true,
      },
    ],
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
    return
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
