import {MigrationInterface, QueryRunner} from "typeorm";

export class fixTableName1646405927338 implements MigrationInterface {
    name = 'fixTableName1646405927338'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`comment\` CHANGE \`comment\` \`comments\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`comment\` DROP COLUMN \`comments\``);
        await queryRunner.query(`ALTER TABLE \`comment\` ADD \`comments\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`comment\` DROP COLUMN \`comments\``);
        await queryRunner.query(`ALTER TABLE \`comment\` ADD \`comments\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`comment\` CHANGE \`comments\` \`comment\` varchar(255) NOT NULL`);
    }

}
