import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
	protected tableName = 'vehicles'

	public async up () {
		this.schema.createTable(this.tableName, (table) => {
			table.increments('id')
			table.string('name')
			table.string('brand')
			table.string('description')
			table.float('price')
			table.boolean('is_favorite').notNullable().defaultTo(false)
			table.string('color')
			table.string('plate')
			table.integer('year')
			table.timestamp('created_at', { useTz: true })
			table.timestamp('updated_at', { useTz: true })
		})
	}

	public async down () {
		this.schema.dropTable(this.tableName)
	}
}
