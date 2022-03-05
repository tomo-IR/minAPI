import {MigrationInterface, QueryRunner} from "typeorm";

export class refixTableName1646406071637 implements MigrationInterface {
    name = 'refixTableName1646406071637'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`comment\` CHANGE \`comments\` \`comment\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`comment\` DROP COLUMN \`comment\``);
        await queryRunner.query(`ALTER TABLE \`comment\` ADD \`comment\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`comment\` DROP COLUMN \`comment\``);
        await queryRunner.query(`ALTER TABLE \`comment\` ADD \`comment\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`comment\` CHANGE \`comment\` \`comments\` varchar(255) NOT NULL`);
    }

}
