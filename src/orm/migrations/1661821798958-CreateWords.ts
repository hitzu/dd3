import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  MigrationInterface,
  QueryRunner
} from 'typeorm';

export class CreateWords1661821798958 implements MigrationInterface {
  name = 'CreateWords1661821798958';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "words" (
            "id" SERIAL NOT NULL, 
            "description" character varying(40), 
            "selected_at" timestamp NULL, 
            "created_at" TIMESTAMP NOT NULL DEFAULT now(), 
            "updated_at" TIMESTAMP NOT NULL DEFAULT now(), 
            CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7434" PRIMARY KEY ("id")
        )`,
      undefined
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "words"`, undefined);
  }
}
