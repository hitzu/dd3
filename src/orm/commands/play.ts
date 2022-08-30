import { getRepository, Between, IsNull } from 'typeorm';
import { Word } from '../entities/Words';
import { GeneralError } from '../../classes/general-error';

export class playCommands {
  static async getCurrentWord(): Promise<Word> {
    try {
      const date = new Date();
      const offset = date.getTimezoneOffset();
      const MS_PER_MINUTE = 60000;
      const startDate = new Date(date.getTime() - offset * MS_PER_MINUTE);
      const after = startDate.toISOString();
      const endDate = new Date(startDate.getTime() - 5 * MS_PER_MINUTE);
      const before = endDate.toISOString();

      const wordRepository = getRepository(Word);
      const query = wordRepository
        .createQueryBuilder()
        .select(['word.description', 'word.id'])
        .from(Word, 'word')
        .where({
          selected_at: Between(before, after)
        });

      return query.getOne();
    } catch (error) {
      const customError = new GeneralError(error, 'Error', 400);
      throw customError;
    }
  }

  static async getRandomWord(): Promise<Word> {
    try {
      const wordRepository = getRepository(Word);
      const query = wordRepository
        .createQueryBuilder()
        .select(['word.description', 'word.id'])
        .from(Word, 'word')
        .orderBy('RANDOM()')
        .limit(1)
        .where({ selected_at: IsNull() });

      return query.getOne();
    } catch (error) {
      const customError = new GeneralError(error, 'Error', 400);
      throw customError;
    }
  }

  static async updateWord(id): Promise<void> {
    try {
      console.log(id);
      const wordRepository = getRepository(Word);
      const wordFound = await wordRepository.findOne({ id });
      wordFound.selected_at = new Date();
      wordRepository.save(wordFound);
    } catch (error) {
      const customError = new GeneralError(error, 'Error', 400);
      throw customError;
    }
  }
}
