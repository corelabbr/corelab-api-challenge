import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Tasks extends BaseSchema {
  protected tableName = 'tasks'
  private enumName = 'task_color'

  public async up () {
    this.schema.raw(`DO $$
    BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = '${this.enumName}') THEN
        CREATE TYPE ${this.enumName} AS ENUM ('yellow', 'blue', 'green', 'peach');
      END IF;
    END$$;`)

    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title', 120).notNullable()
      table.text('description').nullable()
      table.specificType('color', this.enumName).notNullable().defaultTo('yellow')
      table.boolean('is_favorite').notNullable().defaultTo(false)
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
    })
  }

  public async down () {
    this.schema.dropTableIfExists(this.tableName)
    this.schema.raw(`DO $$
    BEGIN
      IF EXISTS (SELECT 1 FROM pg_type WHERE typname = '${this.enumName}') THEN
        DROP TYPE ${this.enumName};
      END IF;
    END$$;`)
  }
}
