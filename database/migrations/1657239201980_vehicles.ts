import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
	protected tableName = 'vehicles';

	public async up () {
		this.schema.createTable(this.tableName, (table) => {
			table.increments('id');
			table.string('name').notNullable();
			table.string('brand').notNullable();
			table.string('description').notNullable();
			table.string('plate').notNullable();
			table.integer('year').unsigned();
			table.string('color').notNullable();
			table.integer('price').unsigned();
			table.integer('km').notNullable();
			table.string('user_id').unsigned();

			/**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
			table.timestamp('created_at', { useTz: true });
			table.timestamp('updated_at', { useTz: true });
		});
	}

	public async down () {
		this.schema.dropTable(this.tableName);
	}
}
