import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  protected tableName = 'todos';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.string('title');
      table.text('content', 'mediumtext');
      table.boolean('is_favorite');
      table.string('color').nullable();
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
