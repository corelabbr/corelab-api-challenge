import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateVehicles1657668707904 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: "vehicles",
				columns: [
					{
						name: "id",
						type: "uuid",
						isPrimary: true,
					},
					{
						name: "name",
						type: "varchar",
					},
					{
						name: "brand",
						type: "varchar",
					},
					{
						name: "description",
						type: "varchar",
					},
					{
						name: "plate",
						type: "varchar",
					},
					{
						name: "color",
						type: "varchar",
					},
					{
						name: "price",
						type: "int",
					},
					{
						name: "year",
						type: "int",
					},
					{
						name: "isFavorite",
						type: "boolean",
						default: false,
					},
					{
						name: "createdAt",
						type: "timestamp",
						default: "now()",
					},
				],
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable("vehicles");
	}
}
