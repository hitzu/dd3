import { MigrationInterface, QueryRunner, getRepository } from 'typeorm';

import { Word } from '../entities/Words';

export class SeedWord1590519635402 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    let word = new Word();
    const wordRepository = getRepository(Word);
    word.description = 'abade';
    await wordRepository.save(word);

    word = new Word();
    word.description = 'gatos';
    await wordRepository.save(word);

    word = new Word();
    word.description = 'perro';
    await wordRepository.save(word);

    word = new Word();
    word.description = 'cedes';
    await wordRepository.save(word);

    word = new Word();
    word.description = 'niños';
    await wordRepository.save(word);

    word = new Word();
    word.description = 'ticke';
    await wordRepository.save(word);

    word = new Word();
    word.description = 'malas';
    await wordRepository.save(word);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    console.log('Not implemented');
  }
}
