import {MigrationInterface, QueryRunner} from "typeorm";

export class rerefixTableName1646406130934 implements MigrationInterface {
    name = 'rerefixTableName1646406130934'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`comments\` (\`id\` int NOT NULL AUTO_INCREMENT, \`comment\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`comments\``);
    }

}
