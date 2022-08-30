import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  MigrationInterface,
  QueryRunner
} from 'typeorm';

export class CreateReport1661821798959 implements MigrationInterface {
  name = 'CreateReport1661821798959';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "reports" (
            "id" SERIAL NOT NULL, 
            "user_id" int not null, 
            "word_id" int not null, 
            "opportunity" int  DEFAULT 1,
            "win" boolean,
            "created_at" TIMESTAMP NOT NULL DEFAULT now(), 
            "updated_at" TIMESTAMP NOT NULL DEFAULT now(), 
            CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7435" PRIMARY KEY ("id")
        )`,
      undefined
    );

    await queryRunner.query(
      `
      CREATE INDEX rps_user_id ON reports USING btree (user_id);
      CREATE INDEX rps_word_id ON reports USING btree (word_id);
      `,
      undefined
    );

    await queryRunner.query(
      `
      ALTER TABLE reports ADD CONSTRAINT reports_user_id FOREIGN KEY (user_id) REFERENCES users(id);
      ALTER TABLE reports ADD CONSTRAINT reports_word_id FOREIGN KEY (word_id) REFERENCES words(id);
      `,
      undefined
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "reports"`, undefined);
  }
}
