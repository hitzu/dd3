import { getRepository } from 'typeorm';
import { Report } from '../entities/Report';
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
}
