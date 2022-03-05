import {MigrationInterface, QueryRunner} from "typeorm";

export class test1646405014455 implements MigrationInterface {
    name = 'test1646405014455'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`comment\` (\`id\` int NOT NULL AUTO_INCREMENT, \`comment\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`comment\``);
    }

}
