import { getRepository } from 'typeorm';
import { Report } from '../entities/Report';
import { User } from '../entities/User';
import { Word } from '../entities/Words';

import { GeneralError } from '../../classes/general-error';

export class reportCommands {
  static async insert(params): Promise<Report> {
    try {
      const reportRepository = getRepository(Report);
      const report = new Report();
      Object.keys(params).forEach(key => {
        report[key] = params[key];
      });
      return await reportRepository.save(report);
    } catch (error) {
      const customError = new GeneralError(error, 'Error', 400);
      throw customError;
    }
  }

  static async getOne(params): Promise<Report> {
    try {
      const reportRepository = getRepository(Report);
      return await reportRepository.findOne(params);
    } catch (error) {
      const customError = new GeneralError(error, 'Error', 400);
      throw customError;
    }
  }

  static async update(report: Report): Promise<void> {
    try {
      const reportRepository = getRepository(Report);
      await reportRepository.save(report);
    } catch (error) {
      const customError = new GeneralError(error, 'Error', 400);
      throw customError;
    }
  }

  static async getMany(params): Promise<Report[]> {
    try {
      const reportRepository = getRepository(Report);
      return await reportRepository.find(params);
    } catch (error) {
      const customError = new GeneralError(error, 'Error', 400);
      throw customError;
    }
  }

  static async getUserTopTen(): Promise<any[]> {
    try {
      const reportRepository = getRepository(Report);
      const query = reportRepository
        .createQueryBuilder('r')
        .select(['r.user_id', 'COUNT(r.win)'])
        .innerJoin(User, 'u', 'r.user_id = u.id')
        .addSelect(['u.username'])
        .groupBy('r.user_id')
        .addGroupBy('u.username')
        .orderBy('count', 'DESC')
        .limit(10);

      console.log(query.getQuery());

      return query.getRawMany();
    } catch (error) {
      const customError = new GeneralError(error, 'Error', 400);
      throw customError;
    }
  }

  static async getWordTopTen(): Promise<any[]> {
    try {
      const reportRepository = getRepository(Report);
      const query = reportRepository
        .createQueryBuilder('r')
        .select(['r.word_id', 'COUNT(r.win)'])
        .innerJoin(Word, 'w', 'r.word_id = w.id')
        .addSelect(['w.description'])
        .groupBy('r.word_id')
        .addGroupBy('w.description')
        .orderBy('count', 'DESC')
        .limit(10);

      console.log(query.getQuery());

      return query.getRawMany();
    } catch (error) {
      const customError = new GeneralError(error, 'Error', 400);
      throw customError;
    }
  }
}
