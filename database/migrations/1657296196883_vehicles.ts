import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'vehicles'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      
      table.string('name').notNullable()
      table.string('description').notNullable()
      table.string('plate').notNullable()
      table.boolean('isFavorite').notNullable()
      table.string('brand').notNullable()
      table.integer('year').notNullable()
      table.string('color').notNullable()
      table.float('price').notNullable()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('createdAt', { useTz: true })
      table.timestamp('updatedAt', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
