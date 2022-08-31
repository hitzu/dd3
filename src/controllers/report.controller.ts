import { Response } from 'express';
import { RequestCustom } from '../interfaces/start-options.interface';
import { reportCommands } from '../orm/commands/report';
import { GeneralError } from '../classes/general-error';

const getWordMetrics = async (req: RequestCustom, res: Response) => {
  try {
    const reports = await reportCommands.getWordTopTen();
    res.status(200).send(reports);
  } catch (error) {
    res.status(error.code | 500).send(error);
  }
};

const getUserMetrics = async (req: RequestCustom, res: Response) => {
  try {
    const userId = req.token.user_id;
    const reports = await reportCommands.getMany({ userId });

    const initialValue = 0;
    const attends = reports.reduce(
      (previousValue, currentValue) => previousValue + currentValue.opportunity,
      initialValue
    );

    const wins = reports.reduce(
      (previousValue, currentValue) =>
        previousValue + (currentValue.win ? 1 : 0),
      initialValue
    );
    res.status(200).send({ attends, wins });
  } catch (error) {
    res.status(error.code | 500).send(error);
  }
};

const getTopUserMetrics = async (req: RequestCustom, res: Response) => {
  try {
    const reports = await reportCommands.getUserTopTen();
    res.status(200).send(reports);
  } catch (error) {
    res.status(error.code | 500).send(error);
  }
};

export { getWordMetrics, getUserMetrics, getTopUserMetrics };
