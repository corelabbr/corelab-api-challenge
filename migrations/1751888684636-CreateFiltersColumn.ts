import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class CreateFiltersColumn1751888684636 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('task', [
      new TableColumn({
        name: 'favorite',
        type: 'boolean',
        isNullable: false,
        default: false,
      }),
      new TableColumn({
        name: 'color',
        type: 'varchar',
        isNullable: true,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('task', ['favorite', 'color']);
  }
}
